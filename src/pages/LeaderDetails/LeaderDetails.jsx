import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getPublicLeaderById } from "../../api/publicApi";
// import  useSEO  from "../../hooks/useSEO";
import { useStructuredData } from "../../hooks/useStructureData";
import "./LeaderDetails.css";

const LeaderDetails = () => {
  const { id } = useParams();
  const [leader, setLeader] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

// useSEO({
//   title: `${leader.fullName} | Ibiono Ibom LGA`,
//   description: leader.bio?.slice(0, 150),
//   image: `https://ibionoibom.gov.ng/uploads/leaders/${leader.imageUrl}`,
//   url: `https://ibionoibom.gov.ng/leaders/${leader._id}`,
// });

useStructuredData(
  leader && {
    "@context": "https://schema.org",
    "@type": "Person",
    name: leader.fullName,
    jobTitle: leader.position,
    description: leader.bio,
    image: leader.imageUrl
      ? `https://ibionoibom.gov.ng/uploads/leaders/${leader.imageUrl}`
      : undefined,
    worksFor: {
      "@type": "GovernmentOrganization",
      name: "Ibiono Ibom Local Government Area",
    },
  }
);



  useEffect(() => {
    const fetchLeader = async () => {
      try {
        const res = await getPublicLeaderById(id);
        setLeader(res.data);
      } catch (err) {
        console.error("Failed to load leader details", err);
        setError("Leader not found or unavailable");
      } finally {
        setLoading(false);
      }
    };

    fetchLeader();
  }, [id]);

  if (loading) {
    return <p className="page-loading">Loading leader profile…</p>;
  }

  if (error) {
    return <p className="page-error">{error}</p>;
  }

  if (!leader) {
    return <p className="page-error">Leader not found.</p>;
  }

//    <Breadcrumbs
//   items={[
//     { label: "Home", to: "/" },
//     { label: "Leaders", to: "/leaders" },
//     { label: leader.fullName },
//   ]}
// />


/* ================= IMAGE URL ================= */

const imgSrc = leader.imageUrl?.startsWith("http")
  ? leader.imageUrl
  : `https://ibionoibom-2.onrender.com/uploads/leaders/${leader.imageUrl}`;

  // src={imgSrc} alt={leader.fullName} 

 

  return (
    <div className="leader-details-page">
      {/* Breadcrumbs */}
      <nav className="breadcrumbs">
        <Link to="/">Home</Link>
        <span>›</span>
        <Link to="/leaders">Leaders</Link>
        <span>›</span>
        <span>{leader.fullName}</span>
      </nav>

      <div className="leader-details-card">
        <div className="leader-image">
          
          
          <img
          src={imgSrc} alt={leader.fullName} 
          />
  
        </div>

        <div className="leader-details-info">
          <h1>{leader.fullName}</h1>
          <p className="leader-position">{leader.position}</p>

          {leader.tenure && (
            <p className="leader-tenure">
              <strong>Tenure:</strong>{" "}
              {leader.tenure.startYear} – {leader.tenure.endYear}
            </p>
          )}

          {leader.bio && (
            <div className="leader-bio-full">
              <h3>Biography</h3>
              <p>{leader.bio}</p>
            </div>
          )}

          <div className="leader-actions">
            <Link to="/leaders" className="btn secondary">
              ← Back to Leaders
            </Link>
            <Link to="/" className="btn">
              Go to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderDetails;




// import { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import { getPublicLeaderById } from "../../api/publicApi";
// import "./LeaderDetails.css";

// const LeaderDetails = () => {
//   const { id } = useParams();

//   const [leader, setLeader] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchLeader = async () => {
//       try {
//         if (!id) {
//           setError("Invalid leader link");
//           return;
//         }

//         const res = await getPublicLeaderById(id);
//         setLeader(res.data);
//       } catch (err) {
//         console.error("Failed to load leader", err);
//         setError("Leader not found or unavailable");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchLeader();
//   }, [id]);

//   /* ================= STATES ================= */

//   if (loading) {
//     return <p className="page-loading">Loading leader details…</p>;
//   }

//   if (error) {
//     return <p className="page-error">{error}</p>;
//   }

//   if (!leader) {
//     return <p className="page-error">Leader not found.</p>;
//   }

//   /* ================= UI ================= */

//   return (
//     <div className="leader-details-page">
//       {/* NAVIGATION */}
//       <nav className="leader-nav">
//         <Link to="/">Home</Link>
//         <span> / </span>
//         <Link to="/leaders">Leaders</Link>
//       </nav>

//       <div className="leader-details-card">
//         {/* IMAGE */}
//         <div className="leader-image">
//           <img
//             src={`http://localhost:5000/uploads/leaders/${leader.imageUrl}`}
//             alt={leader.fullName}
//           />
//         </div>

//         {/* INFO */}
//         <div className="leader-info">
//           <h1>{leader.fullName}</h1>

//           {leader.position && (
//             <p className="leader-position">{leader.position}</p>
//           )}

//           {leader.tenure && (
//             <p className="leader-tenure">
//               <strong>Tenure:</strong>{" "}
//               {leader.tenure.startYear} – {leader.tenure.endYear}
//             </p>
//           )}

//           {leader.bio && (
//             <div className="leader-bio">
//               <h3>Biography</h3>
//               <p>{leader.bio}</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LeaderDetails;





// import { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import { getPublicLeaderById } from "../../api/publicApi";
// import "./LeaderDetails.css";

// const resolveImage = (img) => {
//   if (!img) return null;
//   return `http://localhost:5000/uploads/leaders/${img.replace(/\\/g, "/")}`;
// };

// const LeaderDetails = () => {
//   const { id } = useParams();
//   const [leader, setLeader] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchLeader = async () => {
//       try {
//         const res = await getPublicLeaderById(id);
//         setLeader(res.data);
//       } catch {
//         setLeader(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchLeader();
//   }, [id]);

//   if (loading) return <p className="page-loading">Loading leader…</p>;
//   if (!leader) return <p className="error">Leader not found.</p>;

//   return (
//     <div className="leader-details">
//       <nav className="breadcrumbs">
//         <Link to="/">Home</Link> / <Link to="/leaders">Leaders</Link>
//       </nav>

//       <div className="leader-profile">
//         {leader.imageUrl && (
//           <img
//             src={resolveImage(leader.imageUrl)}
//             alt={leader.fullName}
//           />
//         )}

//         <div className="leader-meta">
//           <h1>{leader.fullName}</h1>
//           <p className="position">{leader.position}</p>

//           {leader.tenure && (
//             <p className="tenure">
//               Tenure: {leader.tenure.startYear} –{" "}
//               {leader.tenure.endYear}
//             </p>
//           )}
//         </div>
//       </div>

//       {leader.bio && (
//         <div className="leader-bio-full">
//           <h2>Biography</h2>
//           <p>{leader.bio}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default LeaderDetails;






// import { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import { getPublicLeaderById } from "../../api/publicApi";
// import "./LeaderDetails.css";

// const LeaderDetails = () => {
//   const { id } = useParams();

//   const [leader, setLeader] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchLeader = async () => {
//       try {
//         const res = await getPublicLeaderById(id);
//         setLeader(res.data);
//       } catch (err) {
//         console.error("Failed to load leader details", err);
//         setError("Leader not found");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchLeader();
//   }, [id]);

//   if (loading) {
//     return <p className="page-loading">Loading leader details…</p>;
//   }

//   if (error) {
//     return <p className="page-error">{error}</p>;
//   }

//   if (!leader) return null;

//   return (
//     <div className="leader-details-page">
//       <Link to="/leaders" className="back-link">
//         ← Back to Leadership History
//       </Link>

//       <div className="leader-details-card">
//         <div className="leader-image">
//           <img
//             src={`http://localhost:5000/uploads/leaders/${leader.imageUrl}`}
//             alt={leader.fullName}
//           />
//         </div>

//         <div className="leader-info">
//           <h1>{leader.fullName}</h1>
//           <p className="leader-position">{leader.position}</p>

//           {leader.tenure && (
//             <p className="leader-tenure">
//               Tenure: {leader.tenure.startYear} – {leader.tenure.endYear}
//             </p>
//           )}

        //   {leader.bio && leader.bio.trim().length > 0 && (
        //   <div className="leader-bio-full">
        //     <h3>Biography</h3>
        //     <p>{leader.bio}</p>
        //  </div>
        //   )}

//         </div>
//       </div>
//     </div>
//   );
// };

// export default LeaderDetails;





// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { getPublicLeaderById } from "../../api/publicApi";
// import { useNavigate, Link } from "react-router-dom";
// import "./LeaderDetails.css";

// const LeaderDetails = () => {
//   const { id } = useParams();
//   const [leader, setLeader] = useState(null);
//   const [error, setError] = useState(null)
//   const navigate = useNavigate();
  
//   useEffect(() => {
//   const fetchLeader = async () => {
//     try {
//       const res = await getPublicLeaderById();
//       setLeader(res.data);
//     } catch {
//       setError(true);
//     }
//   };

//   fetchLeader();
// }, [id]);

//   if (!leader) {
//     return <p style={{ padding: 20 }}>Loading leader…</p>;
//   }

  
//   return (
//     <div className="leader-details">
     
//      <nav className="breadcrumb">
//   <Link to="/">Home</Link>
//   <span>›</span>
//   <Link to="/leaders">Leaders</Link>
//   <span>›</span>
//   <span className="current">{leader.fullName}</span>
// </nav>

     
//       <button
//   className="back-btn"
//   onClick={() => navigate("/leaders")}
// >
//   ← Back to Leaders
// </button>

//       <div className="leader-header">
//         <img
//           src={`http://localhost:5000/uploads/leaders/${leader.imageUrl}`}
//           alt={leader.fullName}
//         />

//         <div className="leader-info">
//           <h1>{leader.fullName}</h1>
//           <p className="leader-role">{leader.position}</p>

//           {leader.tenure && (
//             <p className="leader-tenure">
//               Tenure: {leader.tenure.startYear} – {leader.tenure.endYear}
//             </p>
//           )}
//         </div>
//       </div>

//       <div className="leader-bio">
//         <h3>Biography</h3>
//         <p>{leader.bio}</p>
//       </div>
//     </div>
//   );
// };



// export default LeaderDetails;


// import { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import { getPublicLeaderById } from "../../api/publicApi";
// import "./LeaderDetails.css";

// const LeaderDetails = () => {
//   const { id } = useParams();

//   const [leader, setLeader] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchLeader = async () => {
//       try {
//         const res = await getPublicLeaderById(id);
//         setLeader(res.data);
//       } catch (err) {
//         console.error("Failed to load leader details", err);
//         setError("Leader not found");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchLeader();
//   }, [id]);

//   if (loading) return <p className="page-loading">Loading leader…</p>;
//   if (error) return <p className="page-error">{error}</p>;
//   if (!leader) return null;

//   return (
//     <div className="leader-details-page">
//       {/* 🔙 NAVIGATION */}
//       <div className="leader-nav">
//         <Link to="/">Home</Link>
//         <span> / </span>
//         <Link to="/leaders">Leaders</Link>
//       </div>

//       <div className="leader-details-card">
//         {/* IMAGE */}
//         <div className="leader-image">
//           <img
//             src={`http://localhost:5000/uploads/leaders/${leader.imageUrl}`}
//             alt={leader.fullName}
//           />
//         </div>

//         {/* INFO */}
//         <div className="leader-info">
//           <h1>{leader.fullName}</h1>
//           <p className="leader-position">{leader.position}</p>

//           {leader.tenure && (
//             <p className="leader-tenure">
//               Tenure: {leader.tenure.startYear} – {leader.tenure.endYear}
//             </p>
//           )}

//           {leader.bio && leader.bio.trim().length > 0 && (
//             <div className="leader-bio-full">
//               <h3>Biography</h3>
//               <p>{leader.bio}</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LeaderDetails;
