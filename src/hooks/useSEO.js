import { useEffect } from "react";

const setMeta = (property, content) => {
  if (!content) return;

  let meta = document.querySelector(`meta[property="${property}"]`);
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute("property", property);
    document.head.appendChild(meta);
  }
  meta.content = content;
};

const setNameMeta = (name, content) => {
  if (!content) return;

  let meta = document.querySelector(`meta[name="${name}"]`);
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute("name", name);
    document.head.appendChild(meta);
  }
  meta.content = content;
};

const useSEO = ({
  title,
  description,
  image,
  url,
}) => {
  useEffect(() => {
    if (title) document.title = title;

    setNameMeta("description", description);

    // Open Graph
    setMeta("og:title", title);
    setMeta("og:description", description);
    setMeta("og:type", "website");
    setMeta("og:url", url);
    setMeta("og:image", image);

    // Twitter
    setNameMeta("twitter:card", "summary_large_image");
    setNameMeta("twitter:title", title);
    setNameMeta("twitter:description", description);
    setNameMeta("twitter:image", image);
  }, [title, description, image, url]);
};

export default useSEO;




// import { useEffect } from "react";

// /**
//  * SEO hook (React 19 safe)
//  * @param {Object} params
//  * @param {string} params.title
//  * @param {string} params.description
//  */
// const useSEO = ({ title, description }) => {
//   useEffect(() => {
//     if (title) {
//       document.title = title;
//     }

//     if (description) {
//       let meta = document.querySelector("meta[name='description']");

//       if (!meta) {
//         meta = document.createElement("meta");
//         meta.name = "description";
//         document.head.appendChild(meta);
//       }

//       meta.content = description;
//     }
//   }, [title, description]);
// };

// export default useSEO;




// import { useEffect } from "react";

// export const useSEO = ({
//   title,
//   description,
//   canonical,
//   image,
// }) => {
//   useEffect(() => {
//     /* ===== TITLE ===== */
//     if (title) {
//       document.title = title;
//     }

//     /* ===== DESCRIPTION ===== */
//     if (description) {
//       let metaDesc = document.querySelector(
//         "meta[name='description']"
//       );

//       if (!metaDesc) {
//         metaDesc = document.createElement("meta");
//         metaDesc.setAttribute("name", "description");
//         document.head.appendChild(metaDesc);
//       }

//       metaDesc.setAttribute("content", description);
//     }

//     /* ===== CANONICAL ===== */
//     if (canonical) {
//       let link = document.querySelector("link[rel='canonical']");
//       if (!link) {
//         link = document.createElement("link");
//         link.rel = "canonical";
//         document.head.appendChild(link);
//       }
//       link.href = canonical;
//     }

//     /* ===== OPEN GRAPH IMAGE ===== */
//     if (image) {
//       let ogImage = document.querySelector(
//         "meta[property='og:image']"
//       );

//       if (!ogImage) {
//         ogImage = document.createElement("meta");
//         ogImage.setAttribute("property", "og:image");
//         document.head.appendChild(ogImage);
//       }

//       ogImage.setAttribute("content", image);
//     }
//   }, [title, description, canonical, image]);
// };




// import { useEffect } from "react";

// const useSEO = ({ title, description }) => {
//   useEffect(() => {
//     if (title) {
//       document.title = title;
//     }

//     if (description) {
//       let meta = document.querySelector('meta[name="description"]');

//       if (!meta) {
//         meta = document.createElement("meta");
//         meta.name = "description";
//         document.head.appendChild(meta);
//       }

//       meta.content = description;
//     }
//   }, [title, description]);
// };

// export default useSEO; // ✅ THIS IS THE FIX


// const useSEO = ({ title, description }) => {
//   if (title) {
//     document.title = title;
//   }

//   if (description) {
//     let meta = document.querySelector("meta[name='description']");
//     if (!meta) {
//       meta = document.createElement("meta");
//       meta.name = "description";
//       document.head.appendChild(meta);
//     }
//     meta.content = description;
//   }
// };

// export default useSEO;
