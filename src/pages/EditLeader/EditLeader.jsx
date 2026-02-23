import { useState, useEffect } from "react";
import {
  getLeaderById,
  updateLeader,
} from "../../api/adminApi";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import AdminLayout from "../../components/Admin/AdminLayout";
import "./EditLeader.css";

const EditLeader = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [position, setPosition] = useState("");
  const [bio, setBio] = useState("");
  const [tenure, setTenure] = useState("");
  const [status, setStatus] = useState("draft");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [tenures, setTenures] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH LEADER ================= */

  useEffect(() => {
    const fetchLeader = async () => {
      try {
        const res = await getLeaderById(id);
        const leader = res.data;

        setFullName(leader.fullName);
        setPosition(leader.position);
        setBio(leader.bio || "");
        setTenure(leader.tenure?._id || "");
        setStatus(leader.status);
        setPreview(
          `http://localhost:5000/uploads/leaders/${leader.imageUrl}`
        );
      } catch (err) {
        console.error("Failed to fetch leader", err);
      } finally {
        setLoading(false);
      }
    };

    const fetchTenures = async () => {
      try {
        const res = await axios.get("https://ibionoibom-2.onrender.com/api/tenures/public");
        setTenures(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Failed to fetch tenures", err);
      }
    };

    fetchLeader();
    fetchTenures();
  }, [id]);

  /* ================= HANDLE IMAGE ================= */

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  /* ================= HANDLE UPDATE ================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("fullName", fullName);
      formData.append("position", position);
      formData.append("bio", bio);
      formData.append("tenure", tenure);
      formData.append("status", status);

      if (image) {
        formData.append("image", image);
      }

      await updateLeader(id, formData);

      alert("Leader updated successfully");
      navigate("/admin/leaders");
    } catch (err) {
      console.error(err);
      alert("Failed to update leader");
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <p>Loading leader...</p>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="edit-leader">
        <h2>Edit Leader</h2>

        <form onSubmit={handleSubmit} className="leader-form">
          <div className="form-group">
            <label>Full Name</label>
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Position</label>
            <input
              value={position}
              onChange={(e) => setPosition(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Bio</label>
            <textarea
              rows="4"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Tenure</label>
            <select
              value={tenure}
              onChange={(e) => setTenure(e.target.value)}
            >
              {tenures.map((t) => (
                <option key={t._id} value={t._id}>
                  {t.startYear} – {t.endYear}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>

          <div className="form-group">
            <label>Replace Image</label>
            <input type="file" onChange={handleImageChange} />
          </div>

          {preview && (
            <div className="image-preview">
              <img src={preview} alt="Preview" />
            </div>
          )}

          <button type="submit">Update Leader</button>
        </form>
      </div>
    </AdminLayout>
  );
};

export default EditLeader;
