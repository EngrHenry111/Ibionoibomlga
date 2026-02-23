import { useEffect, useState } from "react";
import { getPublicLeaders } from "../../api/publicApi";
import { Link } from "react-router-dom";
import "./Leader.css";

const Leaders = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= IMAGE HELPER (SAFE) ================= */
  const getLeaderImage = (imageUrl) => {
    if (!imageUrl) return "/placeholder-user.png";

    if (imageUrl.startsWith("http")) {
      return imageUrl; // Cloudinary / full URL
    }

    return `https://ibionoibom-2.onrender.com/uploads/leaders/${imageUrl}`;
  };

  useEffect(() => {
    const fetchLeaders = async () => {
      try {
        const res = await getPublicLeaders();
        const leaders = Array.isArray(res.data) ? res.data : [];

        const grouped = {};

        leaders.forEach((leader) => {
          if (!leader.tenure || !leader.tenure._id) return;

          const tenureId = leader.tenure._id;

          if (!grouped[tenureId]) {
            grouped[tenureId] = {
              tenure: leader.tenure,
              leaders: [],
            };
          }

          grouped[tenureId].leaders.push(leader);
        });

        // 🔥 SORT: LATEST TENURE FIRST
        const sortedGroups = Object.values(grouped).sort(
          (a, b) => Number(b.tenure.startYear) - Number(a.tenure.startYear)
        );

        setGroups(sortedGroups);
      } catch (error) {
        console.error("Failed to load leaders", error);
        setGroups([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaders();
  }, []);

  /* ================= STATES ================= */

  if (loading) {
    return <p className="page-loading">Loading leadership history…</p>;
  }

  if (groups.length === 0) {
    return (
      <div className="leaders-page">
        <h2>Leadership History</h2>
        <p>No leaders published yet.</p>
      </div>
    );
  }

  /* ================= UI ================= */

  return (
    <div className="leaders-page">
      <header className="leaders-header">
        <h1>Leadership History</h1>
        <p>Past and present leadership of Ibiono Ibom LGA</p>
      </header>

      {groups.map((group) => (
        <section
          className="tenure-section fade-in"
          key={group.tenure._id}
        >
          <h2 className="tenure-title">
            Tenure:{" "}
            {group.tenure.startYear && group.tenure.endYear
              ? `${group.tenure.startYear} – ${group.tenure.endYear}`
              : "Date not available"}
          </h2>

          <div className="leaders-grid">
            {group.leaders.map((leader) => (
              <article
                className="leader-card hover-card fade-in"
                key={leader._id}
              >
                <img
                  src={getLeaderImage(leader.imageUrl)}
                  alt={leader.fullName}
                  loading="lazy"
                />

                <div className="leader-info">
                  <h3>{leader.fullName}</h3>
                  <p className="position">{leader.position}</p>

                  {leader.bio && (
                    <p className="leader-bio">
                      {leader.bio.slice(0, 90)}…
                    </p>
                  )}

                  <Link
                    to={`/leaders/${leader._id}`}
                    className="details-link"
                  >
                    View Profile →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default Leaders;











// import { useEffect, useState } from "react";
// import { getPublicLeaders } from "../../api/publicApi";
// import { Link } from "react-router-dom";
// // import { useSEO } from "../../hooks/useSEO";
// import "./Leader.css";

// const Leaders = () => {
//   const [groups, setGroups] = useState([]);
 
//   const [loading, setLoading] = useState(true);
// // useSEO({
// //   title: "Leadership History | Ibiono Ibom LGA",
// //   description:
// //     "Past and present leadership of Ibiono Ibom Local Government Area.",
// //   keywords:
// //     "Ibiono Ibom leaders, chairman, supervisors, leadership history",
// // });
// // useSEO({
// //   title: "Leadership History | Ibiono Ibom LGA",
// //   description:
// //     "Past and present leadership of Ibiono Ibom Local Government Area.",
// //   canonical: "https://ibionoibom.gov.ng/leaders",
// // });


//   useEffect(() => {
//     const fetchLeaders = async () => {
//       try {
//         const res = await getPublicLeaders();
//         const leaders = Array.isArray(res.data) ? res.data : [];

//         /*
//           EXPECTED leader shape (important):
//           leader.tenure = {
//             _id,
//             startYear,
//             endYear
//           }
//         */

//         const grouped = {};

//         leaders.forEach((leader) => {
//           if (!leader.tenure || !leader.tenure._id) return;

//           const tenureId = leader.tenure._id;

//           if (!grouped[tenureId]) {
//             grouped[tenureId] = {
//               tenure: leader.tenure,
//               leaders: [],
//             };
//           }

//           grouped[tenureId].leaders.push(leader);
//         });

//         /* 🔥 SORT TENURES: LATEST FIRST */
//         const sortedGroups = Object.values(grouped).sort(
//           (a, b) => Number(b.tenure.startYear) - Number(a.tenure.startYear)
//         );

//         setGroups(sortedGroups);
//       } catch (error) {
//         console.error("Failed to load leaders", error);
//         setGroups([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchLeaders();
//   }, []);

//   /* ================= IMAGE URL ================= */
//   const imgSrc = leader.imageUrl
//   ? leader.imageUrl.startsWith("http")
//     ? leader.imageUrl
//     : `https://ibionoibom-2.onrender.com/uploads/leaders/${leader.imageUrl}`
//   : "/placeholder-user.png";

  
// // const imgSrc = leader.imageUrl?.startsWith("http")
// //   ? leader.imageUrl
// //   : `https://ibionoibom-2.onrender.com/uploads/leaders/${leader.imageUrl}`;

//   // src={imgSrc} alt={leader.fullName} 


//   /* ================= STATES ================= */

//   if (loading) {
//     return <p className="page-loading">Loading leadership history…</p>;
//   }

//   if (groups.length === 0) {
//     return (
//       <div className="leaders-page">
//         <h2>Leadership History</h2>
//         <p>No leaders published yet.</p>
//       </div>
//     );
//   }

//   /* ================= UI ================= */

//   return (
//     <div className="leaders-page">
//       <header className="leaders-header">
//         <h1>Leadership History</h1>
//         <p>Past and present leadership of Ibiono Ibom LGA</p>
//       </header>

//       {groups.map((group) => (
//         <section
//           className="tenure-section fade-in"
//           key={group.tenure._id}
//         >
//           <h2 className="tenure-title">
//             Tenure:{" "}
//             {group.tenure.startYear && group.tenure.endYear
//               ? `${group.tenure.startYear} – ${group.tenure.endYear}`
//               : "Date not available"}
//           </h2>

//           <div className="leaders-grid ">
//             {group.leaders.map((leader) => (
//               <article
//                 className="leader-card hover-card fade-in "
//                 key={leader._id}
//               >
//                 <img
//                 src={imgSrc} alt={leader.fullName} 

//                   // src={`http://localhost:5000/uploads/leaders/${leader.imageUrl}`}
//                   // alt={leader.fullName}
//                   loading="lazy"
//                 />

//                 <div className="leader-info">
//                   <h3>{leader.fullName}</h3>
//                   <p className="position">{leader.position}</p>

//                   {leader.bio && (
//                     <p className="leader-bio">
//                       {leader.bio.slice(0, 90)}…
//                     </p>
//                   )}

//                   <Link
//                     to={`/leaders/${leader._id}`}
//                     className="details-link"
//                   >
//                     View Profile →
//                   </Link>
//                 </div>
//               </article>
//             ))}
//           </div>
//         </section>
//       ))}
//     </div>
//   );
// };

// export default Leaders;




// import { useEffect, useState } from "react";
// import { getPublicLeaders } from "../../api/publicApi";
// import { Link } from "react-router-dom";
// import "./Leader.css";

// const Leaders = () => {
//   const [groups, setGroups] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchLeaders = async () => {
//       try {
//         const res = await getPublicLeaders();
//         const leaders = Array.isArray(res.data) ? res.data : [];

//         const grouped = {};

//         leaders.forEach((leader) => {
//           // if (!leader.tenure || typeof leader.tenure !== "object") return;


          
//           const key = leader.tenure._id;

//           if (!grouped[key]) {
//             grouped[key] = {
//               tenure: leader.tenure,
//               leaders: [],
//             };
//           }

//           grouped[key].leaders.push(leader);
//         });

//         const sortedGroups = Object.values(grouped).sort(
//           (a, b) => a.tenure.startYear - b.tenure.startYear
//         );

//         setGroups(sortedGroups);
//       } catch (err) {
//         console.error("Failed to load leaders",err);
//         setGroups([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchLeaders();
//   }, []);

//   if (loading) {
//     return <p className="page-loading">Loading leadership history…</p>;
//   }

//   return (
//     <div className="leaders-page">
//       <header className="leaders-header">
//         <h1>Leadership History</h1>
//         <p>Past and present leadership of Ibiono Ibom LGA</p>
//       </header>

//       {groups.length === 0 && (
//         <p className="empty-state">No leaders published yet.</p>
//       )}

//       {groups.map((group) => (
//         <section className="tenure-section" key={group.tenure._id}>
//           <h2 className="tenure-title">
//             Tenure: {group.tenure.startYear} – {group.tenure.endYear}
//           </h2>

//           <div className="leaders-grid">
//             {group.leaders.map((leader) => (
//               <Link
//                 to={`/leaders/${leader._id}`}
//                 className="leader-card"
//                 key={leader._id}
//               >
//                 <img
//                   src={`http://localhost:5000/uploads/leaders/${leader.imageUrl}`}
//                   alt={leader.fullName}
//                 />

//                 <div className="leader-info">
//                   <h3>{leader.fullName}</h3>
//                   <p className="position">{leader.position}</p>

//                   {leader.bio && (
//                     <p className="leader-bio">
//                       {leader.bio.slice(0, 90)}…
//                     </p>
//                   )}
//                 </div>
//               </Link>
//             ))}
//           </div>
//         </section>
//       ))}
//     </div>
//   );
// };

// export default Leaders;




// import { useEffect, useState } from "react";
// import { getPublicLeaders } from "../../api/publicApi";
// import { Link } from "react-router-dom";
// import "./Leader.css";

// const Leaders = () => {
//   const [groups, setGroups] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchLeaders = async () => {
//       try {
//         const res = await getPublicLeaders();
//         const leaders = Array.isArray(res.data) ? res.data : [];

//         const grouped = {};

//         leaders.forEach((leader) => {
//           if (!leader.tenure) return;

//           const key = leader.tenure._id;

//           if (!grouped[key]) {
//             grouped[key] = {
//               tenure: leader.tenure,
//               leaders: [],
//             };
//           }

//           grouped[key].leaders.push(leader);
//         });

//         setGroups(Object.values(grouped));
//       } catch {
//         setGroups([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchLeaders();
//   }, []);

//   if (loading) {
//     return <p className="page-loading">Loading leadership history…</p>;
//   }

//   return (
//     <div className="leaders-page">
//       <header className="leaders-header">
//         <h1>Leadership History</h1>
//         <p>Past and present leadership of Ibiono Ibom LGA</p>
//       </header>

//       {groups.length === 0 && (
//         <p className="empty-state">No leaders published yet.</p>
//       )}

// {/* 
//       {groups.map((group) => (
//         <section
//           className="tenure-section"
//           key={group.tenure._id}
//         >
//           <h2 className="tenure-title">
//               Tenure:{" "}
//                 {group.tenure?.startYear && group.tenure?.endYear
//             ? `${group.tenure.startYear} – ${group.tenure.endYear}`
//               : "Date not available"}
//           </h2>


//           <div className="leaders-grid">
//             {group.leaders.map((leader) => (
//               <div className="leader-card" key={leader._id}>
//                 <img
//                   src={`http://localhost:5000/uploads/leaders/${leader.imageUrl}`}
//                   alt={leader.fullName}
//                 />

//                 <div className="leader-info">
//                   <h3>{leader.fullName}</h3>
//                   <p className="position">{leader.position}</p>

//                   {leader.bio && (
//                     <p className="leader-bio">
//                       {leader.bio.slice(0, 90)}…
//                     </p>
//                   )}

//                   <Link
//                     to={`/leaders/${leader._id}`}
//                     className="details-link"
//                   >
//                     View Profile →
//                   </Link>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </section>
//       ))} */}

//       {groups.map((group) => (
//   <section
//     className="tenure-section"
//     key={group.tenure._id}
//   >
//     <h2 className="tenure-title">
//       Tenure:{" "}
//       {group.tenure?.startYear && group.tenure?.endYear
//         ? `${group.tenure.startYear} – ${group.tenure.endYear}`
//         : "Date not available"}
//     </h2>

//     <div className="leaders-grid">
//       {group.leaders.map((leader) => (
//         <article className="leader-card" key={leader._id}>
//           <img
//             src={`http://localhost:5000/uploads/leaders/${leader.imageUrl}`}
//             alt={leader.fullName}
//           />

//           <div className="leader-info">
//             <h3>{leader.fullName}</h3>
//             <p className="position">{leader.position}</p>

//             {leader.bio && (
//               <p className="leader-bio">
//                 {leader.bio.slice(0, 90)}…
//               </p>
//             )}

//             <Link
//               to={`/leaders/${leader._id}`}
//               className="details-link"
//             >
//               View Profile →
//             </Link>
//           </div>
//         </article>
//       ))}
//     </div>
//   </section>
// ))}

//     </div>
//   );
// };

// export default Leaders;




// import { useEffect, useState } from "react";
// import { getPublicLeaders } from "../../api/publicApi";
// import { Link } from "react-router-dom";
// import "./Leader.css";

// const resolveImage = (img) => {
//   if (!img) return null;
//   if (img.startsWith("http")) return img;
//   return `http://localhost:5000/uploads/leaders/${img.replace(/\\/g, "/")}`;
// };

// const Leaders = () => {
//   const [groups, setGroups] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchLeaders = async () => {
//       try {
//         const res = await getPublicLeaders();
//         const leaders = Array.isArray(res.data) ? res.data : [];

//         const grouped = {};

//         leaders.forEach((leader) => {
//           if (!leader.tenure) return;

//           const key = leader.tenure._id;

//           if (!grouped[key]) {
//             grouped[key] = {
//               tenure: leader.tenure,
//               leaders: [],
//             };
//           }

//           grouped[key].leaders.push(leader);
//         });

//         setGroups(Object.values(grouped));
//       } catch {
//         setGroups([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchLeaders();
//   }, []);

//   if (loading) {
//     return <p className="page-loading">Loading leadership history…</p>;
//   }

//   return (
//     <div className="leaders-page">
//       <header className="leaders-header">
//         <h1>Leadership History</h1>
//         <p>Past and present leaders of Ibiono Ibom LGA</p>
//       </header>

//       {groups.length === 0 && (
//         <p className="empty-state">No leaders published yet.</p>
//       )}

//       {groups.map((group) => (
//         <section className="tenure-section" key={group.tenure._id}>
//           <h2 className="tenure-title">
//             Tenure: {group.tenure.startYear} – {group.tenure.endYear}
//           </h2>

//           <div className="leaders-grid">
//             {group.leaders.map((leader) => (
//               <Link
//                 to={`/leaders/${leader._id}`}
//                 className="leader-card"
//                 key={leader._id}
//               >
//                 {leader.imageUrl && (
//                   <img
//                     src={resolveImage(leader.imageUrl)}
//                     alt={leader.fullName}
//                   />
//                 )}

//                 <div className="leader-info">
//                   <h3>{leader.fullName}</h3>
//                   <p className="position">{leader.position}</p>

//                   {leader.bio && (
//                     <p className="leader-bio">
//                       {leader.bio.slice(0, 100)}…
//                     </p>
//                   )}
//                 </div>
//               </Link>
//             ))}
//           </div>
//         </section>
//       ))}
//     </div>
//   );
// };

// export default Leaders;






// import { useEffect, useState } from "react";
// import { getPublicLeaders } from "../../api/publicApi";
// import "./Leader.css";
// import { Link } from "react-router-dom";

// const Leaders = () => {
//   const [groups, setGroups] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchLeaders = async () => {
//       try {
//         const res = await getPublicLeaders();
//         const leaders = Array.isArray(res.data) ? res.data : [];

//         // 🔥 GROUP BY TENURE
//         const grouped = {};

// leaders.forEach((leader) => {
//   if (!leader.tenure) return;

//   const tenureKey = leader.tenure._id;

//   if (!grouped[tenureKey]) {
//     grouped[tenureKey] = {
//       tenure: leader.tenure,
//       leaders: [],
//     };
//   }

//   grouped[tenureKey].leaders.push(leader);
// });

// setGroups(Object.values(grouped));

//         // // const grouped = {};

//         // // leaders.forEach((leader) => {
//         // //   const tenureKey = leader.tenure?._id || "unknown";

//         // //   if (!grouped[tenureKey]) {
//         // //     grouped[tenureKey] = {
//         // //       tenure: leader.tenure,
//         // //       leaders: [],
//         // //     };
//         // //   }

//         // //   grouped[tenureKey].leaders.push(leader);
//         // // });

//         // setGroups(Object.values(grouped));

//       } catch (err) {
//         console.error("Failed to load leaders",err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchLeaders();
//   }, []);

//   if (loading) {
//     return <p className="page-loading">Loading leadership history…</p>;
//   }

//   return (
    
//     <div className="leaders-page">
//       <header className="leaders-header">
//         <h1>Leadership History</h1>
//         <p>
//           Past and present leadership of Ibiono Ibom Local Government Area
//         </p>
//       </header>

//       {groups.length === 0 && (
//         <p className="empty-state">No leaders published yet.</p>
//       )}

//       {groups.map((group, index) => (
//         <div className="tenure-section" key={index}>
         
//           <h2 className="tenure-title">
//               Tenure:{" "}
//                 {group.tenure?.startYear && group.tenure?.endYear
//                ? `${group.tenure.startYear} – ${group.tenure.endYear}`
//                : "Date not available"}
//               </h2>


//           <div className="leaders-grid">
//             {group.leaders.map((leader) => (
//               <div className="leader-card" key={leader._id}>
//         <Link
//          to={`/leaders/${leader._id}`}
//          className="leader-card"
//         >
//          <img
//             src={`http://localhost:5000/uploads/leaders/${leader.imageUrl}`}
//            alt={leader.fullName}
//          />

//         <h3 className="leader-name">{leader.fullName}</h3>
//         <p className="position">{leader.position}</p>

//         {leader.bio && (
//             <p className="leader-bio">
//           {leader.bio.slice(0, 90)}…
//              </p>
//           )}
//           </Link>
//               </div>
//             ))}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Leaders;





// import { useEffect, useState } from "react";
// import { getLeadersGroupedByTenure } from "../../api/publicApi";
// import { Link } from "react-router-dom";
// import "./Leader.css";

// const Leaders = () => {
//   const [groups, setGroups] = useState([]);

//   useEffect(() => {
//     const fetchLeaders = async () => {
//       try {
//         const res = await getLeadersGroupedByTenure();
//         setGroups(Array.isArray(res.data) ? res.data : []);
//       } catch (err) {
//         console.error("Failed to load leaders");
//       }
//     };

//     fetchLeaders();
//   }, []);

//   return (
//     <div className="leaders-page">
//       <h2>Leadership History</h2>

//       {groups.length === 0 && <p>No leaders published yet.</p>}

//       {groups.map((group, index) => (
//         <div className="tenure-section" key={index}>
//           <h3 className="tenure-title">
//             Tenure: {group.tenure.startYear} – {group.tenure.endYear}
//           </h3>

//           <div className="leaders-grid">
            
//             {group.leaders.map((leader) => (
//   <Link
//     key={leader._id}
//     to={`/leaders/${leader._id}`}
//     className="leader-link"
//   >
//     <div className="leader-card">
//       <img
//         src={`http://localhost:5000/uploads/leaders/${leader.imageUrl}`}
//         alt={leader.fullName}
//       />
//       <h4>{leader.fullName}</h4>
//       <p>{leader.position}</p>
//     </div>
//   </Link>
// ))}

//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Leaders;




