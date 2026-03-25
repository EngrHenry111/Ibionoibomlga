import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./studentDashboard.css";

const API = "https://ibionoibom-2.onrender.com/api";

const StudentDashboard = () => {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  /* ================= AUTH CHECK ================= */
  useEffect(() => {
    const token = localStorage.getItem("studentToken");

    if (!token) {
      navigate("/bursary");
    }
  }, [navigate]);

  /* ================= FETCH DATA ================= */
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const token = localStorage.getItem("studentToken");

        const res = await axios.get(`${API}/bursary/my`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setApps(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error(err);

        if (err.response?.status === 401) {
          localStorage.removeItem("studentToken");
          navigate("/bursary");
        }

        setError("Failed to load applications");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [navigate]);

  /* ================= LOGOUT ================= */
  const handleLogout = () => {
    localStorage.removeItem("studentToken");
    navigate("/bursary");
  };

  /* ================= STATES ================= */

  if (loading) {
    return <p className="page-loading">Loading dashboard…</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  /* ================= UI ================= */

  return (
    <div className="dashboard">

      {/* HEADER */}
      <div className="dashboard-header">
        <h2>My Bursary Dashboard</h2>

        <div className="dashboard-actions">
          <button onClick={() => navigate("/bursary/apply")}>
            Apply
          </button>

          <button className="logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {/* EMPTY STATE */}
      {apps.length === 0 && (
        <p className="empty-state">
          No applications yet. Click "Apply" to start.
        </p>
      )}

      {/* APPLICATION LIST */}
      <div className="applications-grid">
        {apps.map((app) => (
          <div className="app-card" key={app._id}>

            <h3>{app.fullName}</h3>

            <p>
              <strong>Status:</strong>{" "}
              <span className={`status ${app.status}`}>
                {app.status}
              </span>
            </p>

            <p>
              <strong>Tracking ID:</strong> {app.trackingId}
            </p>

            <p>
              <strong>Institution:</strong> {app.institution}
            </p>

            <p>
              <strong>Bank:</strong> {app.bankName}
            </p>

            <p>
              <strong>Account:</strong> {app.accountNumber}
            </p>

            {/* ✅ DOWNLOAD LETTER */}
            {app.status === "approved" && (
              <a
                href={`${API}/bursary/letter/${app._id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="download-btn"
              >
                Download Approval Letter
              </a>
            )}

            {/* ⏳ PENDING */}
            {app.status === "pending" && (
              <p className="pending">Application under review</p>
            )}

            {/* ❌ REJECTED */}
            {app.status === "rejected" && (
              <p className="rejected">Application rejected</p>
            )}

          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentDashboard;


// import { useEffect, useState } from "react";
// import axios from "axios";
// import "./studentDashboard.css";

// const API_BASE = "https://ibionoibom-2.onrender.com/api";

// const StudentDashboard = () => {
//   const [apps, setApps] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   /* ================= FETCH APPLICATIONS ================= */
//   useEffect(() => {
//     const fetchApplications = async () => {
//       try {
//         const token = localStorage.getItem("studentToken");

//         if (!token) {
//           setError("Please login to view your applications");
//           setLoading(false);
//           return;
//         }

//         const res = await axios.get(`${API_BASE}/bursary/my`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         // ✅ Ensure array safety
//         setApps(Array.isArray(res.data) ? res.data : []);
//       } catch (err) {
//         console.error("Failed to fetch applications:", err);
//         setError("Failed to load your applications");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchApplications();
//   }, []);

//   /* ================= STATES ================= */

//   if (loading) {
//     return <p className="page-loading">Loading your applications…</p>;
//   }

//   if (error) {
//     return <p className="error-message">{error}</p>;
//   }

//   if (apps.length === 0) {
//     return (
//       <div className="dashboard">
//         <h2>My Bursary Applications</h2>
//         <p>No applications found.</p>
//       </div>
//     );
//   }

//   /* ================= UI ================= */

//   return (
//     <div className="dashboard">
//       <h2>My Bursary Applications</h2>

//       <div className="applications-grid">
//         {apps.map((app) => (
//           <div className="app-card" key={app._id}>
//             <h3>{app.fullName}</h3>

//             <p>
//               <strong>Status:</strong>{" "}
//               <span className={`status ${app.status}`}>
//                 {app.status}
//               </span>
//             </p>

//             <p>
//               <strong>Tracking ID:</strong> {app.trackingId}
//             </p>

//             <p>
//               <strong>Institution:</strong> {app.institution}
//             </p>

//             <p>
//               <strong>Bank:</strong> {app.bankName}
//             </p>

//             <p>
//               <strong>Account:</strong> {app.accountNumber}
//             </p>

//             {/* ✅ DOWNLOAD BUTTON ONLY IF APPROVED */}
//             {app.status === "approved" && (
//               <a
//                 href={`${API_BASE}/bursary/letter/${app._id}`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="download-btn"
//               >
//                 Download Approval Letter
//               </a>
//             )}

//             {/* ❌ NOT APPROVED MESSAGE */}
//             {app.status !== "approved" && (
//               <p className="pending-text">
//                 Approval pending...
//               </p>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default StudentDashboard;