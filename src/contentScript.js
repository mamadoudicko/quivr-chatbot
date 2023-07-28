// contentScript.js

function addIframeToDOM() {
    const iframe = document.createElement("iframe");
    iframe.src = chrome.runtime.getURL("iframe.html");
    iframe.id = "quivr-extension-iframe";
    iframe.style = "border: 0; color-scheme: normal; ";
    iframe.style.position = "initial";
    iframe.style.bottom = "0";
    iframe.style.right = "0";
    iframe.style.height = "100vh";
    iframe.style.width = "100vw";
    iframe.style.zIndex = "2147483647";
    iframe.style.pointerEvents = "none";

    const button = document.createElement("button");
    button.id = "open-quivr-extension-button";

    // Set the text content
    button.textContent = "Open Quivr";

    // Set the class names
    button.textContent = "Open Quivr";

    // Apply styles directly using the style property
    button.style.position = "fixed";
    button.style.bottom = "0";
    button.style.right = "0";
    button.style.margin = "4px";
    button.style.padding = "10px";
    button.style.backgroundColor = "black";
    button.style.color = "white";
    button.style.borderRadius = "10px";
    button.style.boxShadow = "0px 4px 8px rgba(0, 0, 0, 0.2)";
    button.style.fontFamily = "system-ui, sans-serif";
    button.style.fontSize = "16px";
    button.style.fontWeight = "700";
    button.style.lineHeight = "1.5";
    button.style.cursor = "pointer";
    button.style.border = "none";
    button.style.outline = "none";
    button.style.textAlign = "center";
    button.style.textDecoration = "none";
    button.style.display = "inline-block";
    button.style.transition = "background-color 0.3s ease";


    button.addEventListener('click', () => {
        iframe.style.pointerEvents = "auto";
        iframe.style.position = "fixed";
        iframe.contentWindow.postMessage('OPEN_EXTENSION', '*');
    });

    //add messge listener for CLOSE_EXTENSION and set iframe.style.display = "none"
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
