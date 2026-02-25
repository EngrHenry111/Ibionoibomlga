

export const getImageUrl = (image) => {
  if (!image) return "/placeholder.png";

  // Already full URL (Cloudinary or Render)
  if (image.startsWith("http")) {
    return image;
  }

  // Remove accidental leading "uploads/"
  const cleanImage = image.replace(/^uploads\//, "");

  return `https://ibionoibom-2.onrender.com/uploads/${cleanImage}`;
};



// export const getImageUrl = (image) => {
//   if (!image) return "/placeholder.png";

//   // If already full URL (Render, Cloudinary, etc.)
//   if (image.startsWith("http")) {
//     return image;
//   }

//   // Otherwise assume it is a filename
//   return `https://ibionoibom-2.onrender.com/uploads/${image}`;
// };