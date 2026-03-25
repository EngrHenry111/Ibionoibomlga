import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../../components/Admin/AdminLayout";
import "./adminDiaspora.css"

const API = "https://ibionoibom-2.onrender.com/api";

const AdminDiaspora = () => {

  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [search, setSearch] = useState("");
  const [interestFilter, setInterestFilter] = useState("all");
  const [countryFilter, setCountryFilter] = useState("all");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* ================= FETCH ================= */
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(`${API}/diaspora`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const result = res.data || [];

      setData(result);
      setFiltered(result);

    } catch (err) {
      console.error(err);
      setError("Failed to load diaspora data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  /* ================= FILTER ================= */
  useEffect(() => {
    let temp = [...data];

    if (search) {
      temp = temp.filter((item) =>
        item.name?.toLowerCase().includes(search.toLowerCase()) ||
        item.email?.toLowerCase().includes(search.toLowerCase()) ||
        item.country?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (interestFilter !== "all") {
      temp = temp.filter((item) => item.interest === interestFilter);
    }

    if (countryFilter !== "all") {
      temp = temp.filter((item) => item.country === countryFilter);
    }

    setFiltered(temp);

  }, [search, interestFilter, countryFilter, data]);

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this record?")) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(`${API}/diaspora/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      fetchData();

    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  /* ================= EXPORT CSV ================= */
  const exportCSV = () => {
    if (data.length === 0) return alert("No data to export");

    const rows = data.map(item => [
      item.name,
      item.email,
      item.country,
      item.profession,
      item.interest
    ]);

    let csvContent = "Name,Email,Country,Profession,Interest\n";

    rows.forEach(row => {
      csvContent += row.join(",") + "\n";
    });

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "diaspora.csv";
    a.click();
  };

  /* ================= ANALYTICS ================= */
  const total = data.length;

  const interestStats = data.reduce((acc, item) => {
    acc[item.interest] = (acc[item.interest] || 0) + 1;
    return acc;
  }, {});

  const countries = [...new Set(data.map(d => d.country).filter(Boolean))];

  /* ================= STATES ================= */
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <AdminLayout>
      <div className="admin-page">

        <h2>🌍 Diaspora Dashboard</h2>

        {/* ================= ANALYTICS ================= */}
        <div className="stats">

          <h3>Total Diaspora: {total}</h3>

          <div>
            {Object.entries(interestStats).map(([key, val]) => (
              <p key={key}>
                <strong>{key}:</strong> {val}
              </p>
            ))}
          </div>

        </div>

        {/* ================= CONTROLS ================= */}
        <div className="admin-controls">

          <input
            type="text"
            placeholder="Search name, email, country..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={interestFilter}
            onChange={(e) => setInterestFilter(e.target.value)}
          >
            <option value="all">All Interests</option>
            <option value="Investment">Investment</option>
            <option value="Education">Education</option>
            <option value="Health">Health</option>
            <option value="Agriculture">Agriculture</option>
            <option value="Mentorship">Mentorship</option>
            <option value="Tourism">Tourism</option>
          </select>

          <select
            value={countryFilter}
            onChange={(e) => setCountryFilter(e.target.value)}
          >
            <option value="all">All Countries</option>
            {countries.map((c, i) => (
              <option key={i} value={c}>{c}</option>
            ))}
          </select>

          <button onClick={exportCSV}>
            Export CSV
          </button>

        </div>

        {/* ================= DATA ================= */}
        {filtered.length === 0 && <p>No records found</p>}

        <div className="admin-grid">

          {filtered.map((item) => (
            <div className="admin-card" key={item._id}>

              <h3>{item.name}</h3>

              <p><strong>Email:</strong> {item.email}</p>
              <p><strong>Country:</strong> {item.country}</p>
              <p><strong>Profession:</strong> {item.profession}</p>
              <p><strong>Interest:</strong> {item.interest}</p>

              {item.phone && (
                <p><strong>Phone:</strong> {item.phone}</p>
              )}

              {item.message && (
                <p><strong>Message:</strong> {item.message}</p>
              )}

              {/* ================= ACTIONS ================= */}
              <div className="admin-actions">

                <a href={`mailto:${item.email}`}>
                 <button
            onClick={() =>
                window.open(
                `https://mail.google.com/mail/?view=cm&to=${item.email}&su=Diaspora Contact&body=Hello ${item.name}`,
                "_blank"
                )
            }
            >
            Contact
            </button>
        </a>

                <button
                  className="delete-btn"
                  onClick={() => handleDelete(item._id)}
                >
                  Delete
                </button>

              </div>

            </div>
          ))}

        </div>

      </div>
    </AdminLayout>
  );
};

export default AdminDiaspora;


// import { useEffect, useState } from "react";
// import axios from "axios";
// import AdminLayout from "../../components/Admin/AdminLayout";
// import "./adminDiaspora.css"

// const API = "https://ibionoibom-2.onrender.com/api";

// const AdminDiaspora = () => {

//   const [data, setData] = useState([]);
//   const [filtered, setFiltered] = useState([]);

//   const [search, setSearch] = useState("");
//   const [interestFilter, setInterestFilter] = useState("all");
//   const [countryFilter, setCountryFilter] = useState("all");

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   /* ================= FETCH ================= */
//   const fetchData = async () => {
//     try {
//       const token = localStorage.getItem("token");

//       const res = await axios.get(`${API}/diaspora`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });

//       setData(res.data || []);
//       setFiltered(res.data || []);

//     } catch (err) {
//       console.error(err);
//       setError("Failed to load diaspora data");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   /* ================= FILTER ================= */
//   useEffect(() => {
//     let temp = [...data];

//     // search
//     if (search) {
//       temp = temp.filter((item) =>
//         item.name?.toLowerCase().includes(search.toLowerCase()) ||
//         item.email?.toLowerCase().includes(search.toLowerCase()) ||
//         item.country?.toLowerCase().includes(search.toLowerCase())
//       );
//     }

//     // interest filter
//     if (interestFilter !== "all") {
//       temp = temp.filter((item) => item.interest === interestFilter);
//     }

//     // country filter
//     if (countryFilter !== "all") {
//       temp = temp.filter((item) => item.country === countryFilter);
//     }

//     setFiltered(temp);

//   }, [search, interestFilter, countryFilter, data]);

//   /* ================= DELETE ================= */
//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this record?")) return;

//     try {
//       const token = localStorage.getItem("token");

//       await axios.delete(`${API}/diaspora/${id}`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });

//       fetchData();

//     } catch (err) {
//       console.error(err);
//       alert("Delete failed");
//     }
//   };

//   /* ================= STATES ================= */
//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;

//   /* ================= UNIQUE COUNTRIES ================= */
//   const countries = [...new Set(data.map(d => d.country).filter(Boolean))];

//   return (
//     <AdminLayout>
//       <div className="admin-page">

//         <h2>🌍 Diaspora Dashboard</h2>

//         {/* ================= CONTROLS ================= */}
//         <div className="admin-controls">

//           <input
//             type="text"
//             placeholder="Search name, email, country..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />

//           <select
//             value={interestFilter}
//             onChange={(e) => setInterestFilter(e.target.value)}
//           >
//             <option value="all">All Interests</option>
//             <option value="Investment">Investment</option>
//             <option value="Education">Education</option>
//             <option value="Health">Health</option>
//             <option value="Agriculture">Agriculture</option>
//             <option value="Mentorship">Mentorship</option>
//             <option value="Tourism">Tourism</option>
//           </select>

//           <select
//             value={countryFilter}
//             onChange={(e) => setCountryFilter(e.target.value)}
//           >
//             <option value="all">All Countries</option>
//             {countries.map((c, i) => (
//               <option key={i} value={c}>{c}</option>
//             ))}
//           </select>

//         </div>

//         {/* ================= DATA ================= */}
//         {filtered.length === 0 && <p>No records found</p>}

//         <div className="admin-grid">

//           {filtered.map((item) => (
//             <div className="admin-card" key={item._id}>

//               <h3>{item.name}</h3>

//               <p><strong>Email:</strong> {item.email}</p>
//               <p><strong>Country:</strong> {item.country}</p>
//               <p><strong>Profession:</strong> {item.profession}</p>
//               <p><strong>Interest:</strong> {item.interest}</p>

//               {item.phone && (
//                 <p><strong>Phone:</strong> {item.phone}</p>
//               )}

//               {item.message && (
//                 <p><strong>Message:</strong> {item.message}</p>
//               )}

//               <div className="admin-actions">

//                 <button
//                   className="delete-btn"
//                   onClick={() => handleDelete(item._id)}
//                 >
//                   Delete
//                 </button>

//               </div>

//             </div>
//           ))}

//         </div>

//       </div>
//     </AdminLayout>
//   );
// };

// export default AdminDiaspora;