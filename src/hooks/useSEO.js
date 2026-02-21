// import { useEffect } from "react";

// const setMeta = (property, content) => {
//   if (!content) return;

//   let meta = document.querySelector(`meta[property="${property}"]`);
//   if (!meta) {
//     meta = document.createElement("meta");
//     meta.setAttribute("property", property);
//     document.head.appendChild(meta);
//   }
//   meta.content = content;
// };

// const setNameMeta = (name, content) => {
//   if (!content) return;

//   let meta = document.querySelector(`meta[name="${name}"]`);
//   if (!meta) {
//     meta = document.createElement("meta");
//     meta.setAttribute("name", name);
//     document.head.appendChild(meta);
//   }
//   meta.content = content;
// };

// const useSEO = ({
//   title,
//   description,
//   image,
//   url,
// }) => {
//   useEffect(() => {
//     if (title) document.title = title;

//     setNameMeta("description", description);

//     // Open Graph
//     setMeta("og:title", title);
//     setMeta("og:description", description);
//     setMeta("og:type", "website");
//     setMeta("og:url", url);
//     setMeta("og:image", image);

//     // Twitter
//     setNameMeta("twitter:card", "summary_large_image");
//     setNameMeta("twitter:title", title);
//     setNameMeta("twitter:description", description);
//     setNameMeta("twitter:image", image);
//   }, [title, description, image, url]);
// };

// export default useSEO;




import { useEffect } from "react";

 const useSEO = ({
  title,
  description,
  keywords,
  image,
  url,
}) => {
  useEffect(() => {
    /* Title */
    if (title) {
      document.title = title;
    }

    /* Description */
    if (description) {
      setMeta("description", description);
    }

    /* Keywords */
    if (keywords) {
      setMeta("keywords", keywords);
    }

    /* Open Graph */
    setProperty("og:title", title);
    setProperty("og:description", description);
    setProperty("og:image", image);
    setProperty("og:url", url);
    setProperty("og:type", "website");

  }, [title, description, keywords, image, url]);
};

/* Helpers */
const setMeta = (name, content) => {
  if (!content) return;
  let tag = document.querySelector(`meta[name="${name}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("name", name);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
};

const setProperty = (property, content) => {
  if (!content) return;
  let tag = document.querySelector(`meta[property="${property}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("property", property);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
};


export default useSEO;