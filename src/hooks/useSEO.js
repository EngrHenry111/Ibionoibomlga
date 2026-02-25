import { useEffect } from "react";

const useSEO = ({
  title,
  description,
  canonical,
  image,
  type = "website",
}) => {
  useEffect(() => {
    if (title) {
      document.title = title;
    }

    const setMetaTag = (attr, value, content) => {
      if (!content) return;

      let tag = document.querySelector(`meta[${attr}='${value}']`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(attr, value);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };

    const setLinkTag = (rel, href) => {
      if (!href) return;

      let link = document.querySelector(`link[rel='${rel}']`);
      if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", rel);
        document.head.appendChild(link);
      }
      link.setAttribute("href", href);
    };

    /* ================= BASIC SEO ================= */
    setMetaTag("name", "description", description);
    setLinkTag("canonical", canonical);

    /* ================= OPEN GRAPH ================= */
    setMetaTag("property", "og:title", title);
    setMetaTag("property", "og:description", description);
    setMetaTag("property", "og:type", type);
    setMetaTag("property", "og:url", canonical);
    setMetaTag("property", "og:image", image);

    /* ================= TWITTER ================= */
    setMetaTag("name", "twitter:card", "summary_large_image");
    setMetaTag("name", "twitter:title", title);
    setMetaTag("name", "twitter:description", description);
    setMetaTag("name", "twitter:image", image);

  }, [title, description, canonical, image, type]);
};

export default useSEO;

// import { useEffect } from "react";

// const useSEO = ({ title, description, canonical }) => {
//   useEffect(() => {
//     if (title) {
//       document.title = title;
//     }

//     if (description) {
//       let metaTag = document.querySelector("meta[name='description']");
//       if (!metaTag) {
//         metaTag = document.createElement("meta");
//         metaTag.name = "description";
//         document.head.appendChild(metaTag);
//       }
//       metaTag.content = description;
//     }

//     if (canonical) {
//       let linkTag = document.querySelector("link[rel='canonical']");
//       if (!linkTag) {
//         linkTag = document.createElement("link");
//         linkTag.rel = "canonical";
//         document.head.appendChild(linkTag);
//       }
//       linkTag.href = canonical;
//     }
//   }, [title, description, canonical]);
// };

// export default useSEO;


// import { useEffect } from "react";

//  const useSEO = ({
//   title,
//   description,
//   keywords,
//   image,
//   url,
// }) => {
//   useEffect(() => {
//     /* Title */
//     if (title) {
//       document.title = title;
//     }

//     /* Description */
//     if (description) {
//       setMeta("description", description);
//     }

//     /* Keywords */
//     if (keywords) {
//       setMeta("keywords", keywords);
//     }

//     /* Open Graph */
//     setProperty("og:title", title);
//     setProperty("og:description", description);
//     setProperty("og:image", image);
//     setProperty("og:url", url);
//     setProperty("og:type", "website");

//   }, [title, description, keywords, image, url]);
// };

// /* Helpers */
// const setMeta = (name, content) => {
//   if (!content) return;
//   let tag = document.querySelector(`meta[name="${name}"]`);
//   if (!tag) {
//     tag = document.createElement("meta");
//     tag.setAttribute("name", name);
//     document.head.appendChild(tag);
//   }
//   tag.setAttribute("content", content);
// };

// const setProperty = (property, content) => {
//   if (!content) return;
//   let tag = document.querySelector(`meta[property="${property}"]`);
//   if (!tag) {
//     tag = document.createElement("meta");
//     tag.setAttribute("property", property);
//     document.head.appendChild(tag);
//   }
//   tag.setAttribute("content", content);
// };


// export default useSEO;