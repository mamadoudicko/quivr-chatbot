// Inside the iframe
// Function to send a message and wait for the response
export function sendMessageAndWaitForResponse(message: {type:string}): Promise<string> {
  return new Promise((resolve) => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'currentPageURL') {
        // Remove the event listener to avoid memory leaks
        window.removeEventListener('message', handleMessage);
        // Resolve the Promise with the URL
        resolve(event.data.url);
      }

      if (event.data.type === 'faviconLink') {
        // Remove the event listener to avoid memory leaks
        window.removeEventListener('message', handleMessage);
        // Resolve the Promise with the URL
        resolve(event.data.link);
      }

    };

    // Listen for messages from the content script
    window.addEventListener('message', handleMessage);

    // Send a message to the content script requesting the current page's URL
    window.parent.postMessage(message, '*');
  });
}
