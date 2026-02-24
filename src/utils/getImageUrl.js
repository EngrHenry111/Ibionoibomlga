export const getImageUrl = (image) => {
  if (!image) return "/placeholder.png";

  // If already full URL (Render, Cloudinary, etc.)
  if (image.startsWith("http")) {
    return image;
  }

  // Otherwise assume it is a filename
  return `https://ibionoibom-2.onrender.com/uploads/${image}`;
};