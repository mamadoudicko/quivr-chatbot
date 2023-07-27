// index.tsx

import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const rootElement = document.createElement("div");
rootElement.id = "quivr-extension";

document.body.appendChild(rootElement);

//create iframe with url 'iframe.html' and add it to dom
const iframe = document.createElement('iframe');
iframe.src = chrome.runtime.getURL('iframe.html');
rootElement.appendChild(iframe);

const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
