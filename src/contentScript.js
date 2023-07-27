// contentScript.js

function addIframeToDOM() {
    const iframe = document.createElement("iframe");
    iframe.src = chrome.runtime.getURL("iframe.html");
    iframe.id = "popup-iframe";
    iframe.style = "border: 0; color-scheme: normal; ";
    iframe.style.position = "fixed";
    iframe.style.bottom = "0";
    iframe.style.right = "0";
    iframe.style.height = "100vh";
    iframe.style.width = "100vw";
    iframe.style.zIndex = "2147483647";

    const div = document.createElement("div");
    div.id = "popup";
    div.appendChild(iframe);

    document.body.appendChild(div);

    
}

addIframeToDOM();
