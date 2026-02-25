import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPublicLeaders, getPublicNews } from "../../api/publicApi";
import useSEO from "../../hooks/useSEO";
import {getImageUrl} from "../../utils/getImageUrl"
import { useStructuredData } from "../../hooks/useStructureData";
import "./Home.css";


const Home = () => {
  const [leaders, setLeaders] = useState([]);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

//   const getNewsImage = (image) => {
//   if (!image) return "/placeholder-image.png";

//   if (image.startsWith("http")) {
//     return image; // Cloudinary / full URL
//   }

//   return `https://ibionoibom-2.onrender.com/uploads/news/${image}`;
// };

 useSEO({
    title: "Ibiono Ibom Local Government Area | Official Website",
    description:
      "Official website of Ibiono Ibom Local Government Area. News, leadership, departments, and public services.",
    keywords:
      "Ibiono Ibom LGA, Akwa Ibom State, local government, Nigeria",
    canonical: "https://ibionoibomlga.vercel.app",
    image: "https://ibionoibomlga.vercel.app/logo.png",
  });



useStructuredData({
  "@context": "https://schema.org",
  "@type": "GovernmentOrganization",
  name: "Ibiono Ibom Local Government Area",
  url: "ibionoibomlga.vercel.app",
  logo: "ibionoibomlga.vercel.app/logo.png",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Ibiono Ibom",
    addressRegion: "Akwa Ibom",
    addressCountry: "NG",
  },
});


  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const [leadersRes, newsRes] = await Promise.all([
          getPublicLeaders(),
          getPublicNews(),
        ]);

        setLeaders(Array.isArray(leadersRes.data) ? leadersRes.data : []);
        setNews(Array.isArray(newsRes.data) ? newsRes.data.slice(0, 3) : []);
      } catch (err) {
        console.error("Failed to load home data",err);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  if (loading) {
    return <p className="page-loading">Loading homepage…</p>;
  }

  
// const imgSrc = leaders.imageUrl?.startsWith("http")
//   ? leaders.imageUrl
//   : `https://ibionoibom-2.onrender.com/uploads/leaders/${leader.imageUrl}`;

  

  return (
    <div className="home-page">
      {/* HERO */}
      <section className="home-hero">
        <h1 className="hero-title">
        <span>
          RT. HON. ASUAKAK UMOH: CHAIRMAN, IBIONO IBOM LOCAL GOVERNMENT COUNCIL
        </span>
      </h1>
        <h2 className="hero-subtitle">
         Ibiono Ibom Local Government Area
       </h2>
        <p>
          Official public information portal for governance, leadership,
          departments, and community updates.
        </p>

        <div className="hero-actions">
          <Link to="/leaders" className="btn primary">
            View Leadership
          </Link>
          <Link to="/news" className="btn outline">
            Latest News
          </Link>
        </div>
      </section>

      {/* FEATURED LEADERS */}
      <section className="home-section">
        <h2>Leadership</h2>

        {leaders.length === 0 ? (
          <p>No leaders published yet.</p>
        ) : (
          <div className="leaders-preview">
            {leaders.slice(0, 4).map((leader) => (
              <Link
                to={`/leaders/${leader._id}`}
                key={leader._id}
                className="leader-preview-card"
              >
                <img
                  src={getImageUrl(leader.imageUrl)}
                  alt={leader.fullName}
                />
                {/* <img
                  // src={imgSrc} alt={leader.fullName} 
                  src={`https://ibionoibom-2.onrender.com/uploads/leaders/${leader.imageUrl}`}
                  // alt={leader.fullName}
                /> */}
                <h3>{leader.fullName}</h3>
                <p>{leader.position}</p>
              </Link>
            ))}
          </div>
        )}

        <Link to="/leaders" className="view-more">
          View all leaders →
        </Link>
      </section>

      {/* LATEST NEWS */}
      <section className="home-section alt">
        <h2>Latest News</h2>

        {news.length === 0 ? (
          <p>No news published yet.</p>
        ) : (
          <div className="news-preview">
            {news.map((item) => (
              <Link
                to={`/news/${item._id}`}
                key={item._id}
                className="news-preview-card"
              >
                {item.images?.[0] && (
          <img
            src={getImageUrl(item.images[0])}
            alt={item.title}
           />
          )}
                {/* {item.images?.[0] && (
                  <img
                  // src={getNewsImage}  
                    src={`https://ibionoibom-2.onrender.com/uploads/news/${item.images[0]}`}
                    alt={item.title}
                  />
                )} */}
                <h3>{item.title}</h3>
                <span>
                  {new Date(item.createdAt).toLocaleDateString()}
                </span>
              </Link>
            ))}
          </div>
        )}

        <Link to="/news" className="view-more">
          View all news →
        </Link>
      </section>

      {/* QUICK LINKS */}
      <section className="home-links">
        <Link to="/leaders">Leadership</Link>
        <Link to="/departments">Departments</Link>
        <Link to="/news">News</Link>
      </section>
    </div>
  );
};

export default Home;





// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { getPublicNews } from "../../api/publicApi";
// import { getPublicLeaders } from "../../api/publicApi";
// import useSEO from "../../hooks/useSEO";
// import "./Home.css";

// const Home = () => {
//   const [news, setNews] = useState([]);
//   const [leaders, setLeaders] = useState([]);

//   useSEO({
//     title: "Ibiono Ibom Local Government Area",
//     description:
//       "Official website of Ibiono Ibom Local Government Area. News, leadership, departments, and public information.",
//   });

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const newsRes = await getPublicNews();
//         const leadersRes = await getPublicLeaders();

//         setNews(Array.isArray(newsRes.data) ? newsRes.data.slice(0, 3) : []);
//         setLeaders(
//           Array.isArray(leadersRes.data)
//             ? leadersRes.data.slice(0, 4)
//             : []
//         );
//       } catch {
//         setNews([]);
//         setLeaders([]);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div className="home-page">
//       {/* HERO */}
//       <section className="home-hero">
//         <h1>Ibiono Ibom Local Government Area</h1>
//         <p>
//           Promoting transparency, leadership, and development for our people
//         </p>

//         <div className="hero-actions">
//           <Link to="/news" className="btn primary">
//             Latest News
//           </Link>
//           <Link to="/leaders" className="btn outline">
//             Leadership
//           </Link>
//         </div>
//       </section>

//       {/* NEWS PREVIEW */}
//       <section className="home-section">
//         <header className="section-header">
//           <h2>Latest News</h2>
//           <Link to="/news">View all →</Link>
//         </header>

//         {news.length === 0 ? (
//           <p>No news published yet.</p>
//         ) : (
//           <div className="news-preview-grid">
//             {news.map((item) => (
//               <article key={item._id} className="news-preview-card">
//                 {item.images?.[0] && (
//                   <img
//                     src={`http://localhost:5000/uploads/news/${item.images[0]}`}
//                     alt={item.title}
//                   />
//                 )}
//                 <h3>{item.title}</h3>
//                 <p>{item.content.slice(0, 90)}…</p>
//                 <Link to={`/news/${item._id}`}>Read more →</Link>
//               </article>
//             ))}
//           </div>
//         )}
//       </section>

//       {/* LEADERS PREVIEW */}
//       <section className="home-section">
//         <header className="section-header">
//           <h2>Leadership</h2>
//           <Link to="/leaders">View all →</Link>
//         </header>

//         {leaders.length === 0 ? (
//           <p>No leaders published yet.</p>
//         ) : (
//           <div className="leaders-preview-grid">
//             {leaders.map((leader) => (
//               <div key={leader._id} className="leader-preview-card">
//                 <img
//                   src={`http://localhost:5000/uploads/leaders/${leader.imageUrl}`}
//                   alt={leader.fullName}
//                 />
//                 <h4>{leader.fullName}</h4>
//                 <p>{leader.position}</p>
//               </div>
//             ))}
//           </div>
//         )}
//       </section>

//       {/* CTA */}
//       <section className="home-cta">
//         <h2>Explore Ibiono Ibom</h2>
//         <p>Learn more about our departments, leaders, and initiatives</p>

//         <Link to="/departments" className="btn primary">
//           View Departments
//         </Link>
//       </section>
//     </div>
//   );
// };

// export default Home;










// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { getPublicNews } from "../../api/publicApi";
// import useSEO from "../../utils/useSEO";
// import "./Home.css";

// const resolveImage = (img) => {
//   if (!img) return null;
//   if (img.startsWith("http")) return img;
//   if (img.includes("uploads"))
//     return `http://localhost:5000/${img.replace(/\\/g, "/")}`;
//   return `http://localhost:5000/uploads/news/${img}`;
// };

// const Home = () => {
//   const [news, setNews] = useState([]);

//   useSEO({
//     title: "Ibiono Ibom Local Government Area",
//     description:
//       "Official digital platform of Ibiono Ibom Local Government Area. News, leadership, departments, and public information.",
//   });

//   useEffect(() => {
//     const fetchNews = async () => {
//       try {
//         const res = await getPublicNews();
//         const published = Array.isArray(res.data)
//           ? res.data.slice(0, 3)
//           : [];
//         setNews(published);
//       } catch {
//         setNews([]);
//       }
//     };

//     fetchNews();
//   }, []);

//   return (
//     <div className="home">
//       {/* HERO */}
//       <section className="hero">
//         <h1>Ibiono Ibom Local Government Area</h1>
//         <p>
//           Official platform for governance, leadership history, departments,
//           and public updates.
//         </p>

//         <div className="hero-actions">
//           <Link to="/news" className="btn primary">
//             Latest News
//           </Link>
//           <Link to="/leaders" className="btn outline">
//             Leadership History
//           </Link>
//         </div>
//       </section>

//       {/* FEATURED NEWS */}
//       <section className="featured-news">
//         <div className="section-header">
//           <h2>Latest News</h2>
//           <Link to="/news">View all</Link>
//         </div>

//         {news.length === 0 && (
//           <p className="empty">No news published yet.</p>
//         )}

//         <div className="news-grid">
//           {news.map((item) => (
//             <Link
//               to={`/news/${item._id}`}
//               className="news-card"
//               key={item._id}
//             >
//               {item.images?.[0] && (
//                 <img
//                   src={resolveImage(item.images[0])}
//                   alt={item.title}
//                 />
//               )}

//               <div className="news-info">
//                 <h3>{item.title}</h3>
//                 <p>{item.content?.slice(0, 100)}…</p>
//               </div>
//             </Link>
//           ))}
//         </div>
//       </section>

//       {/* CTA */}
//       <section className="home-cta">
//         <div className="cta-card">
//           <h3>Leadership & Governance</h3>
//           <p>Explore past and present leaders of Ibiono Ibom.</p>
//           <Link to="/leaders">View Leaders →</Link>
//         </div>

//         <div className="cta-card">
//           <h3>Departments</h3>
//           <p>Discover departments driving local development.</p>
//           <Link to="/departments">View Departments →</Link>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Home;



