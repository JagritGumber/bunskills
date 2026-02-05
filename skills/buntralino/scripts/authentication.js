// Example: User Authentication System
// Demonstrates secure authentication with session management

// Frontend
import * as buntralino from 'buntralino-client';

class AuthManager {
  constructor() {
    this.currentUser = null;
    this.sessionTimeout = null;
  }
  
  async login(username, password) {
    try {
      await buntralino.ready;
      
      const result = await buntralino.run('auth:login', {
        username: username,
        password: password
      });
      
      if (result.success) {
        this.currentUser = result.user;
        this.setupSessionTimeout(result.sessionTimeout);
        
        // Listen for session events
        Neutralino.events.on('sessionExpired', () => {
          this.handleSessionExpired();
        });
        
        console.log('✅ Login successful:', result.user.username);
        return { success: true, user: result.user };
      } else {
        console.error('❌ Login failed:', result.error);
        return { success: false, error: result.error };
      }
      
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Connection error' };
    }
  }
  
  async logout() {
    try {
      const result = await buntralino.run('auth:logout', {});
      
      if (result.success) {
        this.currentUser = null;
        this.clearSessionTimeout();
        console.log('✅ Logout successful');
        return { success: true };
      }
      
    } catch (error) {
      console.error('Logout error:', error);
    }
    
    return { success: false };
  }
  
  setupSessionTimeout(duration) {
    this.clearSessionTimeout();
    
    this.sessionTimeout = setTimeout(() => {
      this.handleSessionExpired();
    }, duration);
    
    console.log('Session timeout set for', duration, 'ms');
  }
  
  clearSessionTimeout() {
    if (this.sessionTimeout) {
      clearTimeout(this.sessionTimeout);
      this.sessionTimeout = null;
    }
  }
  
  handleSessionExpired() {
    console.log('Session expired');
    this.currentUser = null;
    this.clearSessionTimeout();
    // Show login screen
  }
}

// Backend
import * as buntralino from 'buntralino';
import { validateUser, createSession, destroySession, getSession } from './auth.js';

const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes
const activeSessions = new Map();

// Login endpoint
buntralino.registerMethod('auth:login', async (payload) => {
  const { username, password } = payload;
  
  try {
    // Validate credentials
    const user = await validateUser(username, password);
    
    if (!user) {
      return { success: false, error: 'Invalid credentials' };
    }
    
    // Create session
    const session = await createSession(user.id);
    activeSessions.set(session.id, {
      userId: user.id,
      username: user.username,
      createdAt: Date.now(),
      lastActivity: Date.now()
    });
    
    // Set up session timeout
    setTimeout(() => {
      if (activeSessions.has(session.id)) {
        activeSessions.delete(session.id);
        destroySession(session.id);
        
        // Notify all windows
        buntralino.broadcast('sessionExpired', {
          userId: user.id,
          reason: 'timeout'
        });
      }
    }, SESSION_TIMEOUT);
    
    return {
      success: true,
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      },
      sessionId: session.id,
      sessionTimeout: SESSION_TIMEOUT
    };
    
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, error: 'Internal server error' };
  }
});

// Logout endpoint
buntralino.registerMethod('auth:logout', async (payload) => {
  try {
    // Get session from request
    const sessionId = payload.sessionId || getSessionIdFromRequest();
    
    if (sessionId && activeSessions.has(sessionId)) {
      const session = activeSessions.get(sessionId);
      activeSessions.delete(sessionId);
      await destroySession(sessionId);
      
      // Notify all windows
      buntralino.broadcast('userLoggedOut', {
        userId: session.userId,
        username: session.username
      });
      
      return { success: true };
    }
    
    return { success: false, error: 'No active session' };
    
  } catch (error) {
    console.error('Logout error:', error);
    return { success: false, error: 'Internal server error' };
  }
});

// Session validation endpoint
buntralino.registerMethod('auth:validate', async (payload) => {
  const { sessionId } = payload;
  
  try {
    if (!sessionId || !activeSessions.has(sessionId)) {
      return { success: false, error: 'Invalid session' };
    }
    
    const session = activeSessions.get(sessionId);
    const now = Date.now();
    
    // Check if session expired
    if (now - session.lastActivity > SESSION_TIMEOUT) {
      activeSessions.delete(sessionId);
      await destroySession(sessionId);
      
      buntralino.broadcast('sessionExpired', {
        userId: session.userId,
        reason: 'expired'
      });
      
      return { success: false, error: 'Session expired' };
    }
    
    // Update last activity
    session.lastActivity = now;
    
    return {
      success: true,
      user: {
        id: session.userId,
        username: session.username
      }
    };
    
  } catch (error) {
    console.error('Session validation error:', error);
    return { success: false, error: 'Internal server error' };
  }
});

// Usage
const authManager = new AuthManager();

// Login
authManager.login('john_doe', 'password123').then(result => {
  if (result.success) {
    console.log('Welcome', result.user.username);
  } else {
    console.error('Login failed:', result.error);
  }
});