export  const getFaviconUrl = () => {
    const faviconLink = document.querySelector("link[rel~='icon']");

    if (faviconLink !== null) {
        const href = faviconLink.getAttribute("href");
        return href
    }
    return undefined
};
