import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../../components/Admin/AdminLayout";
import "./bursaryAdmin.css";

const API = "https://ibionoibom-2.onrender.com/api";

  const BursaryAdmin = () => {
  const [apps, setApps] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [filteredApps, setFilteredApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  /* ================= FETCH ================= */
  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("[PATCH TOKEN:", token)

      const res = await axios.get(`${API}/bursary`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = Array.isArray(res.data) ? res.data : [];
      setApps(data);
      setFilteredApps(data);

    } catch (err) {
      console.error(err);
      setError("Failed to load applications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  /* ================= FILTER ================= */
  useEffect(() => {
    let temp = [...apps];

    if (filter !== "all") {
      temp = temp.filter((app) => app.status === filter);
    }

    if (search) {
      temp = temp.filter(
        (app) =>
          app.fullName?.toLowerCase().includes(search.toLowerCase()) ||
          app.email?.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredApps(temp);
  }, [search, filter, apps]);

  /* ================= UPDATE ================= */
  const updateStatus = async (id, status) => {
  const confirmAction = window.confirm(
    `Are you sure you want to ${status} this application?`
  );

  if (!confirmAction) return;

  try {
    const token = localStorage.getItem("token");

    console.log("PATCH TOKEN:", token); // 🔥 DEBUG

    if (!token) {
      alert("Admin session expired. Please login again.");
      return;
    }

    await axios.patch(
      `${API}/bursary/${id}/status`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    fetchApplications();

  } catch (err) {
    console.error("PATCH ERROR:", err.response?.data || err.message);

    alert(err.response?.data?.message || "Failed to update status");
  }
};

  /* ================= STATES ================= */
  if (loading) return <p className="page-loading">Loading…</p>;
  if (error) return <p className="error">{error}</p>;

  /* ================= UI ================= */
  return (
  
  <AdminLayout>
    <div className="admin-page">

      <h2>Bursary Admin Dashboard</h2>

      {/* CONTROLS */}
      <div className="admin-controls">

        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="approved">Approved</option>
          <option value="pending">Pending</option>
          <option value="rejected">Rejected</option>
        </select>

      </div>

      {filteredApps.length === 0 && <p>No applications found</p>}

      <div className="admin-grid">
        {filteredApps.map((app) => (

          <div className="admin-card" key={app._id}>

            <h3>{app.fullName}</h3>

            <p><strong>Email:</strong> {app.email}</p>
            <p><strong>Phone:</strong> {app.phone}</p>
            <p><strong>Institution:</strong> {app.institution}</p>
            <p><strong>Course:</strong> {app.course}</p>

            <p><strong>BVN:</strong> {app.bvn}</p>
            <p><strong>NIN:</strong> {app.nin}</p>

            {/* ================= DOCUMENT SECTION (NEW) ================= */}
            <div className="documents">
  <h4>📂 Documents</h4>

  <div className="doc-grid">

    {/* PASSPORT */}
    {app.passport && (
      <div className="doc-item">
        <p>Passport</p>
        {app.passport.endsWith(".pdf") ? (
          <a href={app.passport} target="_blank">View PDF</a>
        ) : (
          <img
            src={app.passport}
            alt="passport"
            onClick={() => {
      setPreviewImage(app.passport);
      setZoom(1);}}
          />
        )}
      </div>
    )}

    {/* ADMISSION LETTER */}
    {app.admissionLetter && (
      <div className="doc-item">
        <p>Admission Letter</p>
        {app.admissionLetter.endsWith(".pdf") ? (
          <a href={app.admissionLetter} target="_blank">View PDF</a>
        ) : (
          <img
            src={app.admissionLetter}
            alt="admission"
            onClick={() => {setPreviewImage(app.admissionLetter);
            setZoom(1);
      }}
            // onClick={() => window.open(app.admissionLetter, "_blank")}
          />
        )}
      </div>
    )}

    {/* STUDENT ID */}
    {app.studentID && (
      <div className="doc-item">
        <p>Student ID</p>
        {app.studentID.endsWith(".pdf") ? (
          <a href={app.studentID} target="_blank">View PDF</a>
        ) : (
          <img
            src={app.studentID}
            alt="student id"
            onClick={() => {setPreviewImage(app.studentID);
            setZoom(1);
      }}
            // onClick={() => window.open(app.studentID, "_blank")}
          />
        )}
      </div>
    )}

    {/* LGA CERTIFICATE */}
    {app.lgaCertificate && (
      <div className="doc-item">
        <p>LGA Certificate</p>
        {app.lgaCertificate.endsWith(".pdf") ? (
          <a href={app.lgaCertificate} target="_blank">View PDF</a>
        ) : (
          <img
            src={app.lgaCertificate}
            alt="lga"
            onClick={() => {setPreviewImage(app.lgaCertificate);
            setZoom(1);
      }}
            // onClick={() => window.open(app.lgaCertificate, "_blank")}
          />
        )}
      </div>
    )}

    </div>
  </div>
            {/* ================= STATUS ================= */}
            <p>
              <strong>Status:</strong>{" "}
              <span className={`status ${app.status}`}>
                {app.status}
              </span>
            </p>

            {/* ⚠️ REVIEW WARNING */}
            <p style={{ color: "orange", fontSize: "13px" }}>
              ⚠️ Please review documents before approving
            </p>

            {/* ================= ACTION BUTTONS ================= */}
            <div className="admin-actions">

              <button
                onClick={() => updateStatus(app._id, "approved")}
                className="approve-btn"
                disabled={app.status === "approved"}
              >
                Approve
              </button>

              <button
                onClick={() => updateStatus(app._id, "rejected")}
                className="reject-btn"
                disabled={app.status === "rejected"}
              >
                Reject
              </button>

            </div>

            {/* ================= VERIFICATION ================= */}
            <p>
              <strong>Verification:</strong>{" "}
              <span className={app.verificationStatus}>
                {app.verificationStatus}
              </span>
            </p>

            {/* 🔗 VERIFY LINK */}
            <p>
              <a
                href={`/verify/${app.verificationCode}`}
                target="_blank"
                style={{ color: "blue" }}
              >
                🔍 Verify Record
              </a>
            </p>

            {/* ⚠️ FRAUD FLAG */}
            {app.fraudFlag && (
              <p className="fraud-warning">
                ⚠️ Possible Fraud Detected
              </p>
            )}

          </div>
        ))}
      </div>

    </div>
    {/* ================= IMAGE PREVIEW MODAL ================= */}
{previewImage && (
  <div className="modal-overlay">

    <div className="modal-content">

      {/* CLOSE BUTTON */}
      <button
        className="close-btn"
        onClick={() => setPreviewImage(null)}
      >
        ✖
      </button>

      {/* IMAGE */}
      <img
        src={previewImage}
        alt="preview"
        style={{ transform: `scale(${zoom})` }}
      />

      {/* ZOOM CONTROLS */}
      <div className="zoom-controls">
        <button onClick={() => setZoom(zoom + 0.2)}>+</button>
        <button onClick={() => setZoom(zoom - 0.2)}>-</button>
      </div>

    </div>

  </div>
)}
  </AdminLayout>
);
};

export default BursaryAdmin;