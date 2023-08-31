// contentScript.js

function addElement(tag, attributes = {}, styles = {}) {
    const element = document.createElement(tag);

    for (const [key, value] of Object.entries(attributes)) {
        element[key] = value;
    }

    for (const [key, value] of Object.entries(styles)) {
        element.style[key] = value;
    }

    return element;
}

function addIframeToDOM() {
    const iframe = addElement("iframe", {
        src: chrome.runtime.getURL("iframe.html"),
        id: "quivr-extension-iframe"
    }, {
        border: "0",
        colorScheme: "normal",
        position: "initial",
        bottom: "0",
        right: "0",
        height: "100vh",
        width: "100vw",
        zIndex: "2147483647",
        pointerEvents: "none"
    });

    const button = addElement("button", {
        id: "open-quivr-extension-button",
        textContent: "Open Quivr"
    }, {
        position: "fixed",
        bottom: "0",
        right: "0",
        margin: "4px",
        padding: "10px",
        backgroundColor: "black",
        color: "white",
        borderRadius: "10px",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
        fontFamily: "system-ui, sans-serif",
        fontSize: "16px",
        fontWeight: "700",
        lineHeight: "1.5",
        cursor: "pointer",
        border: "none",
        outline: "none",
        textAlign: "center",
        textDecoration: "none",
        display: "inline-block",
        transition: "background-color 0.3s ease",
        zIndex: "2147483647"
    });

    button.addEventListener('click', () => {
        iframe.style.pointerEvents = "auto";
        iframe.style.position = "fixed";
        iframe.contentWindow.postMessage('OPEN_EXTENSION', '*');
    });

    window.addEventListener('message', (event) => {
        if (event.data === 'CLOSE_EXTENSION') {
            iframe.style.pointerEvents = "none";
            iframe.style.position = "initial";
        }
    });

    document.body.appendChild(iframe);
    document.body.appendChild(button);
}


addIframeToDOM();



// Function to get the current page's URL
function getCurrentPageURL() {
  return new Promise((resolve) => {
    // Get the current page's URL
    const currentPageURL = window.location.href;

    // Resolve the Promise with the URL
    resolve(currentPageURL);
  });
}

// Function to get the favicon link
function getFaviconLink() {
  const faviconLink = document.querySelector("link[rel~='icon']");

  // Return the favicon link's href or null if not found
  return faviconLink ? faviconLink.href : undefined;
}


// Listen for messages from the iframe
window.addEventListener('message', async (event) => {
  if (event.data.type === 'getUrl') {
    // Get the current page's URL using the Promise
    const currentPageURL = await getCurrentPageURL();

    // Send the response back to the iframe
    event.source.postMessage({ type: 'currentPageURL', url: currentPageURL }, event.origin);
    return 
  }
  if (event.data.type === 'getFaviconLink') {
    // Get the favicon link and send the response back to the iframe
    const faviconLink = getFaviconLink();
    event.source.postMessage({ type: 'faviconLink', link: faviconLink }, event.origin);
  }

});

