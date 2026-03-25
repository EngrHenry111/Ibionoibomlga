import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../../components/Admin/AdminLayout";
import "./AdminHealth";

const API = "https://ibionoibom-2.onrender.com/api";

const AdminHealth = () => {

  const [centers, setCenters] = useState([]);
  const [form, setForm] = useState({
    name: "",
    location: "",
    type: "",
    phone: ""
  });

  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  /* ================= FETCH ================= */
  const fetchCenters = async () => {
    try {
      const res = await axios.get(`${API}/health`);
      setCenters(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCenters();
  }, []);

  /* ================= HANDLE INPUT ================= */
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  /* ================= ADD / UPDATE ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      if (editingId) {
        await axios.put(`${API}/health/${editingId}`, form, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post(`${API}/health`, form, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }

      setForm({ name: "", location: "", type: "", phone: "" });
      setEditingId(null);
      fetchCenters();

    } catch (err) {
      console.error(err);
      alert("Operation failed");
    } finally {
      setLoading(false);
    }
  };

  /* ================= EDIT ================= */
  const handleEdit = (c) => {
    setForm({
      name: c.name,
      location: c.location,
      type: c.type,
      phone: c.phone
    });
    setEditingId(c._id);
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this health center?")) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(`${API}/health/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      fetchCenters();

    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  return (
    <AdminLayout>
      <div className="admin-health">

        <h2>🏥 Health Center Management</h2>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="health-form">

          <input
            name="name"
            placeholder="Health Center Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            name="location"
            placeholder="Location"
            value={form.location}
            onChange={handleChange}
            required
          />

          <input
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
          />

          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            required
          >
            <option value="">Select Type</option>
            <option value="Primary">Primary Health Centre</option>
            <option value="General">General Hospital</option>
            <option value="Private">Private Clinic</option>
          </select>

          <button type="submit">
            {loading
              ? "Processing..."
              : editingId
              ? "Update Center"
              : "Add Center"}
          </button>

        </form>

        {/* LIST */}
        <div className="health-list">

          {centers.map((c) => (
            <div className="health-item" key={c._id}>

              <div>
                <h4>{c.name}</h4>
                <p>{c.location}</p>
                <span>{c.type}</span>
                <p>{c.phone}</p>
              </div>

              <div className="actions">
                <button
                  className="edit-btn"
                  onClick={() => handleEdit(c)}
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => handleDelete(c._id)}
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

export default AdminHealth;
