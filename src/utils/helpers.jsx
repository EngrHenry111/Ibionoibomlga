export const extractArray = (response) => {
  if (!response) return [];
  if (Array.isArray(response)) return response;
  if (Array.isArray(response.data)) return response.data;
  if (Array.isArray(response.data?.data)) return response.data.data;
  return [];
};




// export const formatDate = (date) => {
//   return new Date(date).toLocaleDateString();
// };

// export const truncateText = (text, length = 100) => {
//   if (!text) return "";
//   return text.length > length
//     ? text.substring(0, length) + "..."
//     : text;
// };
