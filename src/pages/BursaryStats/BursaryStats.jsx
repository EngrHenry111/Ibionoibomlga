import { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import AdminLayout from "../../components/Admin/AdminLayout";
import "./bursaryStats.css"
import { MdHeight } from "react-icons/md";

const API = "https://ibionoibom-2.onrender.com/api";

const BursaryStats = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(`${API}/bursary/stats`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setStats(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStats();
  }, []);

  if (!stats) return <p>Loading...</p>;

  // 🔥 Transform data for chart
  const chartData = [
    { name: "Total", value: stats.total },
    { name: "Approved", value: stats.approved },
    { name: "Pending", value: stats.pending },
    { name: "Rejected", value: stats.rejected },
  ];

  return (
     <AdminLayout>
    <div className="stats-page">
      <h2>📊 Bursary Analytics</h2>

      {/* SUMMARY CARDS */}
      <div className="stats-grid">
        <div>Total: {stats.total}</div>
        <div>Approved: {stats.approved}</div>
        <div>Pending: {stats.pending}</div>
        <div>Rejected: {stats.rejected}</div>
      </div>

      {/* 🔥 BAR CHART */}
     <div className="chart-container">
            <ResponsiveContainer width="100%" height={400}>          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
   </AdminLayout>
  );
};

export default BursaryStats;


// import { useEffect, useState } from "react";
// import axios from "axios";
// import "./bursaryStats.css";

// const API = "https://ibionoibom-2.onrender.com/api";

// const BursaryStats = () => {
//   const [stats, setStats] = useState({
//     total: 0,
//     approved: 0,
//     pending: 0,
//     rejected: 0,
//   });

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   /* ================= FETCH DATA ================= */
//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const token = localStorage.getItem("adminToken");

//         const res = await axios.get(`${API}/bursary`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         const data = Array.isArray(res.data) ? res.data : [];

//         // 🔢 Calculate stats
//         const total = data.length;
//         const approved = data.filter(a => a.status === "approved").length;
//         const pending = data.filter(a => a.status === "pending").length;
//         const rejected = data.filter(a => a.status === "rejected").length;

//         setStats({ total, approved, pending, rejected });

//       } catch (err) {
//         console.error(err);
//         setError("Failed to load stats");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStats();
//   }, []);

//   /* ================= STATES ================= */

//   if (loading) return <p className="page-loading">Loading stats…</p>;
//   if (error) return <p className="error">{error}</p>;

//   /* ================= UI ================= */

//   return (
//     <div className="stats-page">

//       <h2>Bursary Analytics Dashboard</h2>

//       <div className="stats-grid">

//         <div className="stat-card total">
//           <h3>Total Applications</h3>
//           <p>{stats.total}</p>
//         </div>

//         <div className="stat-card approved">
//           <h3>Approved</h3>
//           <p>{stats.approved}</p>
//         </div>

//         <div className="stat-card pending">
//           <h3>Pending</h3>
//           <p>{stats.pending}</p>
//         </div>

//         <div className="stat-card rejected">
//           <h3>Rejected</h3>
//           <p>{stats.rejected}</p>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default BursaryStats;