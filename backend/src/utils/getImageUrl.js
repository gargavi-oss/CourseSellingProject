export function getImageUrl(url, width = 800, quality = 60) {
    if (!url) return "";
  
    // If URL already has params, just return it
    if (url.includes("?")) return url;
  
    // Append Unsplash query params
    return `${url}?ixlib=rb-4.0.3&auto=format&fit=crop&w=${width}&q=${quality}`;
  }
  