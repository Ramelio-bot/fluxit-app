/// <reference lib="webworker" />

self.onmessage = async (e: MessageEvent) => {
  const { id, formatOut, file } = e.data;

  // Simulate heavy processing per file without freezing DOM
  let progress = 0;
  
  // Calculate mock processing time based on file size (larger = slower)
  // Max duration cap at ~4 seconds to keep UX snappy
  const baseTime = 100;
  const sizeFactor = Math.min((file.size / (1024 * 1024)) * 10, 50); 
  const tickTime = baseTime + sizeFactor;

  while (progress < 100) {
    progress += Math.floor(Math.random() * 10) + 10;
    if (progress > 100) progress = 100;
    
    self.postMessage({ id, progress, status: progress === 100 ? "success" : "converting" });
    
    // Non-blocking wait
    await new Promise(resolve => setTimeout(resolve, tickTime));
  }
};
