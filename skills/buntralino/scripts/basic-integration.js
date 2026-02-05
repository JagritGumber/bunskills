// Example: Basic Buntralino Integration
// This script demonstrates client-server communication patterns

// Frontend (Neutralino)
import * as buntralino from 'buntralino-client';

async function initializeApp() {
  try {
    // Wait for backend connection
    await buntralino.ready;
    console.log('✅ Connected to Bun backend');
    
    // Call backend method
    const userData = await buntralino.run('getUser', { userId: 123 });
    console.log('User data:', userData);
    
    // Listen for events
    Neutralino.events.on('userUpdated', (event) => {
      console.log('User updated:', event.detail);
      updateUI(event.detail);
    });
    
  } catch (error) {
    console.error('❌ Failed to connect:', error);
  }
}

// Backend (Bun)
import * as buntralino from 'buntralino';

// Register methods
buntralino.registerMethod('getUser', async (payload) => {
  const user = await db.users.findById(payload.userId);
  return { success: true, data: user };
});

buntralino.registerMethod('updateUser', async (payload) => {
  try {
    const updatedUser = await db.users.update(payload.userId, payload.data);
    
    // Broadcast update event
    buntralino.broadcast('userUpdated', {
      userId: payload.userId,
      changes: Object.keys(payload.data),
      timestamp: Date.now()
    });
    
    return { success: true, data: updatedUser };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

// Initialize
initializeApp();