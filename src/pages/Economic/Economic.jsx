// import { useEffect, useState } from "react";
// import axios from "axios";
// import "./economic.css";

// const API = "https://ibionoibom-2.onrender.com/api";

// const Economic = () => {

//   const [items, setItems] = useState([]);
//   const [expandedIndex, setExpandedIndex] = useState(null);

//   const [visibleAgri, setVisibleAgri] = useState(4);
//   const [visibleTrade, setVisibleTrade] = useState(4);
//   const [visibleResources, setVisibleResources] = useState(4);
//   const [visibleSME, setVisibleSME] = useState(4);

//   /* ================= FETCH ================= */
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await axios.get(`${API}/economic`);
//         setItems(res.data || []);
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     fetchData();
//   }, []);

//   /* ================= TOGGLE ================= */
//   const toggleReadMore = (uniqueIndex) => {
//     setExpandedIndex(prev => (prev === uniqueIndex ? null : uniqueIndex));
//   };

//   /* ================= GROUP ================= */
//   const agri = items.filter(i => i.type === "Agriculture");
//   const trade = items.filter(i => i.type === "Trade");
//   const resources = items.filter(i => i.type === "Resources");
//   const sme = items.filter(i => i.type === "SME");

//   /* ================= CARD ================= */
//   const renderCard = (item, uniqueIndex) => {
//     const text = item.description || "No description available";
//     const isExpanded = expandedIndex === uniqueIndex;

//     return (
//       <div className="econ-card" key={uniqueIndex}>
//         <h4>{item.title}</h4>

//         <p>
//           {isExpanded ? text : text.slice(0, 120)}
//           {text.length > 120 && !isExpanded && "..."}
//         </p>

//         {text.length > 120 && (
//           <button
//             className="read-btn"
//             onClick={() => toggleReadMore(uniqueIndex)}
//           >
//             {isExpanded ? "Read Less" : "Read More"}
//           </button>
//         )}

//         {item.location && <span>{item.location}</span>}
//       </div>
//     );
//   };

//   return (
//     <div className="economic-page">

//       {/* HERO */}
//       <section className="economic-hero">
//         <h1>Economic Potentials</h1>
//         <p>Explore investment opportunities and economic growth sectors</p>
//       </section>

//       {/* AGRICULTURE */}
//       <section className="econ-group">
//         <h3>Agriculture Opportunities</h3>
//         <div className="econ-grid">
//           {agri.slice(0, visibleAgri).map((item, index) =>
//             renderCard(item, `agri-${index}`)
//           )}
//         </div>

//         {visibleAgri < agri.length && (
//           <button onClick={() => setVisibleAgri(prev => prev + 4)}>
//             Show More
//           </button>
//         )}
//       </section>

//       {/* TRADE */}
//       <section className="econ-group">
//         <h3>Commerce & Trade</h3>
//         <div className="econ-grid">
//           {trade.slice(0, visibleTrade).map((item, index) =>
//             renderCard(item, `trade-${index}`)
//           )}
//         </div>

//         {visibleTrade < trade.length && (
//           <button onClick={() => setVisibleTrade(prev => prev + 4)}>
//             Show More
//           </button>
//         )}
//       </section>

//       {/* RESOURCES */}
//       <section className="econ-group">
//         <h3>Natural Resources</h3>
//         <div className="econ-grid">
//           {resources.slice(0, visibleResources).map((item, index) =>
//             renderCard(item, `res-${index}`)
//           )}
//         </div>
//       </section>

//       {/* SME */}
//       <section className="econ-group">
//         <h3>Small & Medium Enterprises</h3>
//         <div className="econ-grid">
//           {sme.slice(0, visibleSME).map((item, index) =>
//             renderCard(item, `sme-${index}`)
//           )}
//         </div>
//       </section>

//       {/* CTA */}
//       <section className="economic-cta">
//         <h2>Invest in Ibiono Ibom</h2>
//         <p>Partner with us to unlock economic opportunities</p>
//         <button>Contact Investment Desk</button>
//       </section>

//     </div>
//   );
// };

// export default Economic;



import { useEffect, useState } from "react";
import axios from "axios";
import agricculture from "../../assets/images/agriculture.jpeg";
import smallmedium from "../../assets/images/SMEs.jpeg";
import trademarket from "../../assets/images/trademarket.jpeg"
import "./economic.css";

const API = "https://ibionoibom-2.onrender.com/api";

const Economic = () => {

  const [items, setItems] = useState([]);

  const [visibleAgri, setVisibleAgri] = useState(4);
  const [visibleTrade, setVisibleTrade] = useState(4);
  const [visibleResources, setVisibleResources] = useState(4);
  const [visibleSME, setVisibleSME] = useState(4);
  const [expandedId, setExpandedId] = useState(null);

  const toggleReadMore = (id) => {
  setExpandedId(prev => (prev === id ? null : id));
    };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API}/economic`);
        setItems(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  /* ================= GROUP ================= */
  const agri = items.filter(i => i.type === "Agriculture");
  const trade = items.filter(i => i.type === "Trade");
  const resources = items.filter(i => i.type === "Resources");
  const sme = items.filter(i => i.type === "SME");

  return (
    <div className="economic-page">

      {/* HERO */}
      <section className="economic-hero">
        <h1>Economic Potentials</h1>
        <p>Explore investment opportunities and economic growth sectors</p>
      </section>

      {/* ABOUT */}
      <section className="economic-about">
        <h2>Economic Overview</h2>
        <p>
          Ibiono Ibom Local Government offers diverse economic opportunities
          across agriculture, trade, natural resources, and small businesses.
        </p>
      </section>

      {/* FEATURED */}
      <section className="economic-featured">
        <h2>Key Investment Areas</h2>

        <div className="featured-grid">
          <div className="featured-card">
            <img src={agricculture} alt="" />
            <h4>Agriculture</h4>
          </div>

          <div className="featured-card">
            <img src={trademarket} alt="" />
            <h4>Trade & Markets</h4>
          </div>

          <div className="featured-card">
            <img src={smallmedium} alt="" />
            <h4>SMEs</h4>
          </div>
        </div>
      </section>

      {/* AGRICULTURE */}
      <section className="econ-group">
        <h3>Agriculture Opportunities</h3>
        <div className="econ-grid">
          {agri.slice(0, visibleAgri).map(item => (
            <div className="econ-card" key={item._id}>
              <h4>{item.title}</h4>
              <p>
                {expandedId === item._id
                    ? item.description
                    : item.description?.slice(0, 120)}

                {item.description?.length > 120 && expandedId !== item._id && "..."}
                </p>

                {item.description?.length > 120 && (
                <button
                    className="read-btn"
                    onClick={() => toggleReadMore(item._id)}
                >
                    {expandedId === item._id ? "Read Less" : "Read More"}
                </button>
                )}
              <span>{item.location}</span>
            </div>
          ))}
        </div>

        {visibleAgri < agri.length && (
          <button onClick={() => setVisibleAgri(visibleAgri + 4)}>Show More</button>
        )}
      </section>

      {/* TRADE */}
      <section className="econ-group">
        <h3>Commerce & Trade</h3>
        <div className="econ-grid">
          {trade.slice(0, visibleTrade).map(item => (
            <div className="econ-card" key={item._id}>
              <h4>{item.title}</h4>
              <p>{item.description}</p>
            </div>
          ))}
        </div>

        {visibleTrade < trade.length && (
          <button onClick={() => setVisibleTrade(visibleTrade + 4)}>Show More</button>
        )}
      </section>

      {/* RESOURCES */}
      <section className="econ-group">
        <h3>Natural Resources</h3>
        <div className="econ-grid">
          {resources.slice(0, visibleResources).map(item => (
            <div className="econ-card" key={item._id}>
              <h4>{item.title}</h4>
              <p>
                {expandedId === item._id
                    ? item.description
                    : item.description?.slice(0, 120)}

                {item.description?.length > 120 && expandedId !== item._id && "..."}
                </p>

                {item.description?.length > 120 && (
                <button
                    className="read-btn"
                    onClick={() => toggleReadMore(item._id)}
                >
                    {expandedId === item._id ? "Read Less" : "Read More"}
                </button>
                )}
            </div>
          ))}
        </div>
      </section>

      {/* SME */}
      <section className="econ-group">
        <h3>Small & Medium Enterprises</h3>
        <div className="econ-grid">
          {sme.slice(0, visibleSME).map(item => (
            <div className="econ-card" key={item._id}>
              <h4>{item.title}</h4>
             <p>
                {expandedId === item._id
                    ? item.description
                    : item.description?.slice(0, 120)}

                {item.description?.length > 120 && expandedId !== item._id && "..."}
                </p>

                {item.description?.length > 120 && (
                <button
                    className="read-btn"
                    onClick={() => toggleReadMore(item._id)}
                >
                    {expandedId === item._id ? "Read Less" : "Read More"}
                </button>
                )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="economic-cta">
        <h2>Invest in Ibiono Ibom</h2>
        <p>Partner with us to unlock economic opportunities</p>
        <button>Contact Investment Desk</button>
      </section>

    </div>
  );
};

export default Economic;