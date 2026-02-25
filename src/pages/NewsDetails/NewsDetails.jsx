import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getPublicNewsById } from "../../api/publicApi";
import useSEO from "../../hooks/useSEO";
import { useStructuredData } from "../../hooks/useStructureData";
import "./NewsDetails.css";


const NewsDetails = () => {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const [activeImage, setActiveImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getNewsImage = (image) => {
    if (!image) return "/placeholder-image.png";
    if (image.startsWith("http")) return image;
    return `https://ibionoibom-2.onrender.com/uploads/news/${image}`;
  };

  useSEO({
    title: news?.title || "News | Ibiono Ibom LGA",
    description: news?.content?.slice(0, 150),
    image: news?.images?.[0]
      ? getNewsImage(news.images[0])
      : undefined,
    url: `https://ibionoibomlga.vercel.app/news/${id}`,
  });

  useStructuredData(
    news && {
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      headline: news.title,
      datePublished: news.createdAt,
      dateModified: news.updatedAt,
      author: {
        "@type": "Organization",
        name: "Ibiono Ibom LGA",
      },
      publisher: {
        "@type": "Organization",
        name: "Ibiono Ibom LGA",
      },
      image: news.images?.map(getNewsImage),
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `https://ibionoibomlga.vercel.app/news/${news._id}`,
      },
    }
  );

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await getPublicNewsById(id);
        setNews(res.data);
        setActiveImage(res.data.images?.[0] || null);
      } catch {
        setError("News not found or unavailable");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [id]);

  if (loading) return <p className="page-loading">Loading…</p>;
  if (error) return <p className="page-error">{error}</p>;

  return (
    <div className="news-details">
      <nav className="news-nav">
        <Link to="/">Home</Link> / <Link to="/news">News</Link>
      </nav>

      <h1>{news.title}</h1>

      <p className="news-date">
        {new Date(news.createdAt).toLocaleDateString()}
      </p>

      {activeImage && (
        <div className="news-main-image">
          <img
            src={getNewsImage(activeImage)}
            alt={news.title}
          />
        </div>
      )}

      {news.images?.length > 1 && (
        <div className="news-gallery">
          {news.images.map((img, i) => (
            <img
              key={i}
              src={getNewsImage(img)}
              alt="news"
              className={img === activeImage ? "active" : ""}
              onClick={() => setActiveImage(img)}
            />
          ))}
        </div>
      )}
      <div className="news-content">
      <p className="formatted-content">{news.content}</p>
      </div>

      {/* <div className="news-content">
        <p>{news.content}</p>
      </div> */}
    </div>
  );
};

export default NewsDetails;






// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { getPublicNewsById } from "../../api/publicApi";
// import "./NewsDetails.css";

// const NewsDetails = () => {
// const { id } = useParams();

//   const [news, setNews] = useState(null);
//   const [activeImage, setActiveImage] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // useEffect(() => {
//   //   const fetchNews = async () => {
//   //     try {
//   //       if (!id) {
//   //         setError("Invalid news link");
//   //         return;
//   //       }
        
//   //       const res = await getPublicNewsById(id);

//   //       setNews(res.data);
//   //       setActiveImage(res.data.images?.[0] || null);
//   //     } catch (err) {
//   //       console.error("Failed to load news:", err);
//   //       setError("News not found or unavailable");
//   //     } finally {
//   //       setLoading(false);
//   //     }
//   //   };

//   //   fetchNews();
//   // }, [id]);

//   useEffect(() => {
//   const fetchNews = async () => {
//     try {
//       console.log("NEWS ID FROM URL:", id);

//       const res = await getPublicNewsById(id);
//       setNews(res.data);
//       setActiveImage(res.data.images?.[0] || null);
//     } catch (err) {
//       console.error("Failed to load news:", err);
//       setError("News not found or unavailable");
//     } finally {
//       setLoading(false);
//     }
//   };

//   fetchNews();
// }, [id]);


//   /* ================= STATES ================= */

//   if (loading) {
//     return <p style={{ padding: 20 }}>Loading news…</p>;
//   }

//   if (error) {
//     return <p style={{ padding: 20 }}>{error}</p>;
//   }

//   if (!news) {
//     return <p style={{ padding: 20 }}>News not found.</p>;
//   }

//   /* ================= UI ================= */

//   return (
//     <div className="news-details">
//       <h1>{news.title}</h1>

//       <p className="news-date">
//         {new Date(news.createdAt).toLocaleDateString()}
//       </p>

//       {activeImage && (
//         <div className="news-main-image">
//           <img
//             src={`http://localhost:5000/uploads/news/${activeImage}`}
//             alt={news.title}
//           />
//         </div>
//       )}

//       {/* Gallery */}
//       {news.images?.length > 0 && (
//         <div className="news-gallery">
//           {news.images.map((img, index) => (
//             <img
//               key={index}
//               src={`http://localhost:5000/uploads/news/${img}`}
//               alt="news"
//               className={img === activeImage ? "active" : ""}
//               onClick={() => setActiveImage(img)}
//             />
//           ))}
//         </div>
//       )}

//       <div className="news-content">
//         <p>{news.content}</p>
//       </div>
//     </div>
//   );
// };

// export default NewsDetails;
