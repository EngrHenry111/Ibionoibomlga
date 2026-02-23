import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPublicNews } from "../../api/publicApi";
// import { useSEO } from "../../hooks/useSEO";
import "./News.css";

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  // useSEO({
  //   title: "News | Ibiono Ibom LGA",
  //   description:
  //     "Latest news and updates from Ibiono Ibom Local Government Area",
  // });

  const getNewsImage = (image) => {
    if (!image) return "/placeholder-image.png";
    if (image.startsWith("http")) return image;
    return `https://ibionoibom-2.onrender.com/uploads/news/${image}`;
  };

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await getPublicNews();
        setNews(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Failed to load news", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) return <p className="page-loading">Loading news…</p>;

  return (
    <div className="news-page">
      <h1>Latest News</h1>

      {news.length === 0 && (
        <p className="empty-state">No news published yet.</p>
      )}

      <div className="news-grid">
        {news.map((item) => (
          <Link
            to={`/news/${item._id}`}
            className="news-card hover-card fade-in"
            key={item._id}
          >
            {item.images?.[0] && (
              <img
                src={getNewsImage(item.images[0])}
                alt={item.title}
                loading="lazy"
              />
            )}

            <div className="news-card-body">
              <h3>{item.title}</h3>
              <p>{item.content.slice(0, 120)}…</p>
              <span className="news-date">
                {new Date(item.createdAt).toLocaleDateString()}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default News;




// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import useSEO from "../../hooks/useSEO"
// import { getPublicNews } from "../../api/publicApi";
// import "./News.css";

// const News = () => {
//   const [news, setNews] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useSEO({
//     title: news ? news.title : "News | Ibiono Ibom LGA",
//     description: news?.content?.slice(0, 150),
//   });


//   useEffect(() => {
//     const fetchNews = async () => {
//       try {
//         const res = await getPublicNews();
//         setNews(Array.isArray(res.data) ? res.data : []);
//       } catch (err) {
//         console.error("Failed to load news",err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchNews();
//   }, []);

//   if (loading) return <p className="page-loading">Loading news…</p>;



//   const mainImage =
//   news?.images?.[0]
//     ? news.images[0].startsWith("http")
//       ? news.images[0]
//       : `https://ibionoibom-2.onrender.com/uploads/news/${news.images[0]}`
//     : null;
//   return (
//     <div className="news-page">
//       <h1>Latest News</h1>

//       {news.length === 0 && (
//         <p className="empty-state">No news published yet.</p>
//       )}

//       <div className="news-grid">
//         {news.map((item) => (
//           <Link
//             to={`/news/${item._id}`}
//             className="news-card hover-card fade-in"
//             key={item._id}
//           >
//             {item.images?.[0] && (
//               <img
//               src={mainImage}
//                 // src={`http://localhost:5000/uploads/news/${item.images[0]}`}
//                 alt={item.title}
//               />
//             )}

//             <div className="news-card-body ">
//               <h3>{item.title}</h3>
//               <p>{item.content.slice(0, 120)}…</p>
//               <span className="news-date">
//                 {new Date(item.createdAt).toLocaleDateString()}
//               </span>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default News;



// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { getPublicNews } from "../../api/publicApi";
// import useSEO from "../../hooks/useSEO";
// import "./News.css";

// const News = () => {
//   const [news, setNews] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useSEO({
//     title: "News | Ibiono Ibom LGA",
//     description:
//       "Latest news and official updates from Ibiono Ibom Local Government Area",
//   });

//   useEffect(() => {
//     const fetchNews = async () => {
//       try {
//         const res = await getPublicNews();
//         setNews(Array.isArray(res.data) ? res.data : []);
//       } catch {
//         setNews([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchNews();
//   }, []);

//   if (loading) {
//     return <p className="page-loading">Loading news…</p>;
//   }

//   return (
//     <div className="news-page">
//       <header className="news-header">
//         <h1>Latest News</h1>
//         <p>Official announcements and updates</p>
//       </header>

//       {news.length === 0 && (
//         <p className="empty-state">No news published yet.</p>
//       )}

//       <div className="news-grid">
//         {news.map((item) => (
//           <article className="news-card" key={item._id}>
//             {item.images?.[0] && (
//               <img
//                 src={`http://localhost:5000/uploads/news/${item.images[0]}`}
//                 alt={item.title}
//               />
//             )}

//             <div className="news-card-body">
//               <h3>{item.title}</h3>
//               <p>{item.content.slice(0, 120)}…</p>

//               <Link to={`/news/${item._id}`} className="read-more">
//                 Read more →
//               </Link>
//             </div>
//           </article>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default News;





// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { getPublicNews } from "../../api/publicApi";
// import "./News.css";

// const News = () => {
//   const [news, setNews] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchNews = async () => {
//       try {
//         const res = await getPublicNews();
//         setNews(Array.isArray(res.data) ? res.data : []);
//       } catch (err) {
//         console.error("Failed to load public news",err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchNews();
//   }, []);

//   if (loading) {
//     return <p className="page-loading">Loading news…</p>;
//   }

//   return (
//     <div className="news-page">
//       {/* HEADER */}
//       <header className="news-header">
//         <h1>Latest News</h1>
//         <p>Official updates and announcements from Ibiono Ibom LGA</p>
//       </header>

//       {/* EMPTY STATE */}
//       {news.length === 0 && (
//         <p className="empty-state">No news has been published yet.</p>
//       )}

//       {/* NEWS GRID */}
//       <div className="news-grid">
//         {news.map((item) => (
//           <div className="news-card" key={item._id}>
//             {item.images?.[0] && (
//               <img
//                 src={`http://localhost:5000/uploads/news/${item.images[0]}`}
//                 alt={item.title}
//               />
//             )}

//             <div className="news-body">
//               <h3>{item.title}</h3>

//               <p className="news-date">
//                 {new Date(item.createdAt).toLocaleDateString()}
//               </p>

//               <p className="news-excerpt">
//                 {item.content?.slice(0, 120)}…
//               </p>

//               <Link
//                 to={`/news/${item._id}`}
//                 className="read-more"
//               >
//                 Read More →
//               </Link>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default News;





// import { useEffect, useState } from "react";
// import { getPublicNews } from "../../api/publicApi";
// import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
// import "./News.css";

// const News = () => {
//   const [news, setNews] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//   const fetchNews = async () => {
//     try {
//       const res = await getPublicNews();
//       setNews(Array.isArray(res.data) ? res.data : []);
//     } catch (err) {
//       console.error("Failed to load news", err);
//       setNews([]);
//     }
//   };

//   fetchNews();
// }, []);


//   return (
//     <div className="news-page">
//       <h2>Latest News</h2>

//       {news.length === 0 && <p>No published news available.</p>}

//       <div className="news-grid">
//         {news.map((item) => (
//           <div
//             key={item._id}
//             className="news-card"
//             onClick={() => navigate(`/news/${item._id}`)}
//           >
//             {item.images?.length > 0 && (
//               <img
//                 src={`http://localhost:5000/uploads/news/${item.images[0]}`}
//                 alt="news"
//               />
//             )}
//             <h3>{item.title}</h3>
//             <p>{item.content.slice(0, 120)}...</p>
 
//       <Link to={`/news/${item._id}`}>
//        <h3>{item.title}</h3>
//       </Link>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default News;
