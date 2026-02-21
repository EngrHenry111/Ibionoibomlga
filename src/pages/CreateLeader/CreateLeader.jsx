import { useState, useEffect } from "react";
import { createLeader } from "../../api/adminApi";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../components/Admin/AdminLayout";
import "./CreateLeader.css";

const CreateLeader = () => {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [position, setPosition] = useState("");
  const [bio, setBio] = useState("");
  const [tenure, setTenure] = useState("");
  const [status, setStatus] = useState("draft");
  const [image, setImage] = useState(null);
  const [tenures, setTenures] = useState([]);
  const [loading, setLoading] = useState(false);

  /* ================= FETCH TENURES ================= */

  useEffect(() => {
    const fetchTenures = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/tenures/public")
;
        setTenures(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Failed to fetch tenures", err);
      }
    };

    fetchTenures();
  }, []);

  /* ================= HANDLE SUBMIT ================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fullName || !position || !tenure) {
      alert("Please fill all required fields");
      return;
    }

    setLoading(true);

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

      await createLeader(formData);

      alert("Leader created successfully");

      navigate("/admin/leaders");
    } catch (err) {
      console.error(err);
      alert("Failed to create leader");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="create-leader">
        <h2>Create Leader</h2>

        <form onSubmit={handleSubmit} className="leader-form">
          <div className="form-group">
            <label>Full Name *</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Position *</label>
            <input
              type="text"
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
            <label>Tenure *</label>
            <select
              value={tenure}
              onChange={(e) => setTenure(e.target.value)}
            >
              <option value="">Select Tenure</option>
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
            <label>Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Leader"}
          </button>
        </form>
      </div>
    </AdminLayout>
  );
};

export default CreateLeader;
