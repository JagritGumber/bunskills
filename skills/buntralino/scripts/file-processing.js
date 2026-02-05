// Example: File Processing Application
// Demonstrates file operations with progress updates

// Frontend
import * as buntralino from 'buntralino-client';

async function processFiles(filePaths) {
  try {
    await buntralino.ready;
    
    // Listen for progress updates
    Neutralino.events.on('fileProgress', (event) => {
      const { file, progress, status } = event.detail;
      updateProgressBar(file, progress, status);
    });
    
    // Process files
    const result = await buntralino.run('processFiles', { 
      files: filePaths,
      options: { 
        format: 'json',
        compress: true 
      }
    });
    
    if (result.success) {
      console.log('Files processed:', result.processed);
      showSuccessMessage(result.processed);
    } else {
      console.error('Processing failed:', result.error);
      showErrorMessage(result.error);
    }
    
  } catch (error) {
    console.error('File processing error:', error);
  }
}

// Backend
import * as buntralino from 'buntralino';
import { processFile } from './fileProcessor.js';

buntralino.registerMethod('processFiles', async (payload) => {
  const { files, options } = payload;
  const processed = [];
  
  try {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      // Send progress update
      buntralino.broadcast('fileProgress', {
        file: file,
        progress: Math.round((i / files.length) * 100),
        status: 'processing'
      });
      
      // Process file
      const result = await processFile(file, options);
      processed.push({ file, result });
      
      // Send completion update
      buntralino.broadcast('fileProgress', {
        file: file,
        progress: Math.round(((i + 1) / files.length) * 100),
        status: 'completed'
      });
    }
    
    return { 
      success: true, 
      processed: processed.length,
      results: processed 
    };
    
  } catch (error) {
    buntralino.broadcast('fileProgress', {
      file: files[processed.length],
      progress: 0,
      status: 'error',
      error: error.message
    });
    
    return { 
      success: false, 
      error: error.message,
      processed: processed.length 
    };
  }
});