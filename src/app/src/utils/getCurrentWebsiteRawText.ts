import DOMPurify from "dompurify";

export const getCurrentWebsiteRawText = () => {
  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    null,
  );

  let rawText = "";

  while (walker.nextNode()) {
    const node = walker.currentNode;
    if (node?.parentNode?.nodeName !== "SCRIPT") {
      if(node?.textContent !== null) {
        rawText += DOMPurify.sanitize(node?.textContent);
      }
    }
  }

  return rawText;
};
