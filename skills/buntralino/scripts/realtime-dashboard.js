// Example: Real-time Dashboard
// Demonstrates real-time data updates with event broadcasting

// Frontend
import * as buntralino from 'buntralino-client';

class DashboardManager {
  constructor() {
    this.metrics = {};
    this.charts = {};
  }
  
  async initialize() {
    try {
      await buntralino.ready;
      
      // Set up event listeners
      Neutralino.events.on('metricsUpdate', (event) => {
        this.updateMetrics(event.detail);
      });
      
      Neutralino.events.on('alert', (event) => {
        this.showAlert(event.detail);
      });
      
      // Initial data fetch
      await this.refreshData();
      
      // Start periodic refresh
      setInterval(() => this.refreshData(), 5000);
      
    } catch (error) {
      console.error('Dashboard initialization failed:', error);
    }
  }
  
  async refreshData() {
    try {
      const result = await buntralino.run('getDashboardData', {
        timeframe: '1h',
        metrics: ['cpu', 'memory', 'disk']
      });
      
      if (result.success) {
        this.updateMetrics(result.data);
      }
    } catch (error) {
      console.error('Failed to refresh data:', error);
    }
  }
  
  updateMetrics(data) {
    this.metrics = { ...this.metrics, ...data };
    this.renderCharts();
  }
  
  showAlert(alert) {
    // Display alert to user
    console.warn('Alert:', alert.message);
    // Update UI to show alert
  }
}

// Backend
import * as buntralino from 'buntralino';
import { getSystemMetrics, checkAlerts } from './monitoring.js';

// Dashboard data endpoint
buntralino.registerMethod('getDashboardData', async (payload) => {
  const { timeframe, metrics } = payload;
  
  try {
    const data = await getSystemMetrics(timeframe, metrics);
    
    // Check for alerts
    const alerts = await checkAlerts(data);
    if (alerts.length > 0) {
      alerts.forEach(alert => {
        buntralino.broadcast('alert', {
          severity: alert.severity,
          message: alert.message,
          timestamp: Date.now()
        });
      });
    }
    
    return { success: true, data };
    
  } catch (error) {
    return { success: false, error: error.message };
  }
});

// Background monitoring
setInterval(async () => {
  try {
    const metrics = await getSystemMetrics('1m', ['cpu', 'memory']);
    
    // Broadcast metrics update
    buntralino.broadcast('metricsUpdate', {
      timestamp: Date.now(),
      metrics: metrics
    });
    
    // Check for critical conditions
    const alerts = await checkAlerts(metrics);
    alerts.forEach(alert => {
      buntralino.broadcast('alert', {
        severity: alert.severity,
        message: alert.message,
        timestamp: Date.now()
      });
    });
    
  } catch (error) {
    console.error('Background monitoring error:', error);
  }
}, 30000); // Every 30 seconds

// Initialize dashboard
const dashboard = new DashboardManager();
dashboard.initialize();