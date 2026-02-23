import { useEffect, useState } from "react";
import {
  getAllLeaders,
  deleteLeader,
  updateLeaderStatus,
} from "../../api/adminApi";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../components/Admin/AdminLayout";
import "./leadersAdmin.css";

const LeadersAdmin = () => {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  /* ================= IMAGE HELPER (SAFE) ================= */
  // const getLeaderImage = (imageUrl) => {
  //   if (!imageUrl) return "/placeholder-user.png";

  //   if (imageUrl.startsWith("http")) {
  //     return imageUrl; // Cloudinary / full URL
  //   }

  //   return `https://ibionoibom-2.onrender.com/uploads/leaders/${imageUrl}`;
  // };

  const fetchLeaders = async () => {
    try {
      const res = await getAllLeaders();
      setLeaders(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Failed to fetch leaders", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this leader?");
    if (!confirm) return;

    try {
      await deleteLeader(id);
      setLeaders((prev) => prev.filter((l) => l._id !== id));
    } catch (err) {
      alert("Failed to delete leader", err);
    }
  };

  const handleStatusToggle = async (id, currentStatus) => {
    const newStatus = currentStatus === "published" ? "draft" : "published";

    try {
      await updateLeaderStatus(id, newStatus);
      fetchLeaders();
    } catch (err) {
      console.error("Status update failed", err);
    }
  };

  useEffect(() => {
    fetchLeaders();
  }, []);


  // const imgSrc = leader.imageUrl?.startsWith("http")
  // ? leader.imageUrl
  // : `https://ibionoibom-2.onrender.com/uploads/leaders/${leader.imageUrl}`;
 

  return (
    <AdminLayout>
      <div className="leaders-admin">
        <div className="leaders-header">
          <h2>Leaders Management</h2>
          <button
            className="create-btn"
            onClick={() => navigate("/admin/leaders/create")}
          >
            + Add Leader
          </button>
        </div>

        {loading ? (
          <p>Loading leaders...</p>
        ) : leaders.length === 0 ? (
          <div className="empty-state">
            No leaders added yet.
          </div>
        ) : (
          <div className="table-wrapper">
            <table className="leaders-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Position</th>
                  <th>Tenure</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {leaders.map((leader) => (
                  <tr key={leader._id}>
                    <td>
                      <img
                        src={`https://ibionoibom-2.onrender.com/uploads/leaders/${leader.imageUrl}`}
                        alt={leader.fullName}
                        className="leader-thumb"
                      />
                    </td>
                    <td>{leader.fullName}</td>
                    <td>{leader.position}</td>
                    <td>
                      {leader.tenure?.startYear} – {leader.tenure?.endYear}
                    </td>
                    <td>
                      <span
                        className={
                          leader.status === "published"
                            ? "status published"
                            : "status draft"
                        }
                      >
                        {leader.status}
                      </span>
                    </td>
                    <td className="actions">
                      <button
                        onClick={() =>
                          navigate(`/admin/leaders/edit/${leader._id}`)
                        }
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          handleStatusToggle(leader._id, leader.status)
                        }
                      >
                        {leader.status === "published"
                          ? "Unpublish"
                          : "Publish"}
                      </button>

                      <button
                        className="danger"
                        onClick={() => handleDelete(leader._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default LeadersAdmin;
