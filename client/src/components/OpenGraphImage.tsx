import ogImage from '@assets_dir/images/og-image.jpg';

// This component is never rendered in the UI
// It's just to ensure the image is bundled with the app
const OpenGraphImage = () => {
  return null;
};

// Export the image URL for use in the index.html file
export const ogImagePath = ogImage;

export default OpenGraphImage;