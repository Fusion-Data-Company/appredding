import { ogImagePath } from "@/components/OpenGraphImage";

// This function dynamically updates the OG image meta tag with the bundled image path
export function injectOgImage() {
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateOgImage);
  } else {
    updateOgImage();
  }
}

function updateOgImage() {
  // Find the og:image meta tag
  const ogImageMeta = document.querySelector('meta[property="og:image"]');
  
  if (ogImageMeta) {
    // Update with the bundled image path
    ogImageMeta.setAttribute('content', ogImagePath);
    console.log('OG Image updated to:', ogImagePath);
  } else {
    console.warn('OG Image meta tag not found');
  }
}

// Call the function immediately
injectOgImage();