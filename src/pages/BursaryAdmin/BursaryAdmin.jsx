import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../../components/Admin/AdminLayout";
import "./bursaryAdmin.css";

const API = "https://ibionoibom-2.onrender.com/api";

const BursaryAdmin = () => {
  const [apps, setApps] = useState([]);
  const [filteredApps, setFilteredApps] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  /* ================= FILE RENDER FUNCTION ================= */
const renderFile = (file) => {
  if (!file) return <p>No document uploaded</p>;

  return (
    <img
      src={file}
      alt="document"
      style={{
        width: "100%",
        borderRadius: "8px",
        cursor: "pointer",
      }}
      onClick={() => {
        setPreviewImage(file);
        setZoom(1);
      }}
    />
  );
};

/* ================= FETCH ================= */
  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem("token");

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

  /* ================= UPDATE STATUS ================= */
  const updateStatus = async (id, status) => {
    const confirmAction = window.confirm(
      `Are you sure you want to ${status} this application?`
    );

    if (!confirmAction) return;

    try {
      const token = localStorage.getItem("token");

      await axios.patch(
        `${API}/bursary/${id}/status`,
        { status },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      fetchApplications();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to update status");
    }
  };

  /* ================= STATES ================= */
  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  /* ================= UI ================= */
  return (
    <AdminLayout>
      <div className="bursary-admin">

        <h2>Bursary Admin Dashboard</h2>

        {/* CONTROLS */}
        <div className="admin-controls">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
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

              {/* BANK DETAILS */}
              <p><strong>Bank Name:</strong> {app.bankName}</p>
              <p><strong>Account Number:</strong> {app.accountNumber}</p>

              <p><strong>BVN:</strong> {app.bvn}</p>
              <p><strong>NIN:</strong> {app.nin}</p>

              {/* ================= DOCUMENTS ================= */}
              <div className="documents">
                <h4>📂 Documents</h4>

                {!app.passport &&
                  !app.admissionLetter &&
                  !app.studentID &&
                  !app.lgaCertificate && (
                    <p className="no-doc">No documents uploaded</p>
                  )}

                <div className="doc-item">
                  <p>Passport</p>
                  {renderFile(app.passport)}
                </div>

                <div className="doc-item">
                  <p>Admission Letter</p>
                  {renderFile(app.admissionLetter)}
                </div>

                <div className="doc-item">
                  <p>Student ID</p>
                  {renderFile(app.studentID)}
                </div>

                <div className="doc-item">
                  <p>LGA Certificate</p>
                  {renderFile(app.lgaCertificate)}
                </div>
              </div>

              {/* STATUS */}
              <p><strong>Status:</strong> {app.status}</p>

              <p className="warning">
                ⚠️ Please review documents before approving
              </p>

              {/* ACTIONS */}
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

              {/* VERIFICATION */}
              <p>
                <strong>Verification:</strong>{" "}
                <span className={app.verificationStatus}>
                  {app.verificationStatus}
                </span>
              </p>

              <p>
                <a
                  href={`/verify/${app.verificationCode}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  🔍 Verify Record
                </a>
              </p>

              {app.fraudFlag && (
                <p className="fraud-warning">
                  ⚠️ Possible Fraud Detected
                </p>
              )}
            </div>
          ))}
        </div>

        {/* ================= IMAGE MODAL ================= */}
        {previewImage && (
          <div className="modal-overlay">
            <div className="modal-content">
              <button
                className="close-btn"
                onClick={() => setPreviewImage(null)}
              >
                ✖
              </button>

              <img
                src={previewImage}
                alt="preview"
                style={{ transform: `scale(${zoom})` }}
              />

              <div className="zoom-controls">
                <button onClick={() => setZoom(zoom + 0.2)}>+</button>
                <button onClick={() => setZoom(zoom - 0.2)}>-</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default BursaryAdmin;