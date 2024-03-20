const MAX_CONCURRENT_REQUESTS = 10;
let activeRequests = 0;
let requestQueue: any = [];

function processQueue() {
  while (activeRequests < MAX_CONCURRENT_REQUESTS && requestQueue.length > 0) {
    const nextRequest = requestQueue.shift(); // Remove the next request from the queue
    if (nextRequest) {
      activeRequests++;
      nextRequest().then(() => {
        activeRequests--;
        processQueue(); // Process the next request in the queue
      });
    }
  }
}

export function enqueueRequest(requestFunction: any) {
  requestQueue.push(requestFunction); // Add new request to the queue
  processQueue(); // Attempt to process the queue
}
