import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../../components/Admin/AdminLayout";
import "./AdminSchools.css";

const API = "https://ibionoibom-2.onrender.com/api";

const AdminSchools = () => {

  const [schools, setSchools] = useState([]);
  const [form, setForm] = useState({
    name: "",
    location: "",
    type: ""
  });

  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  /* ================= FETCH ================= */
  const fetchSchools = async () => {
    try {
      const res = await axios.get(`${API}/schools`);
      setSchools(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    fetchSchools();
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
        // UPDATE
        await axios.put(`${API}/schools/${editingId}`, form, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        // CREATE
        await axios.post(`${API}/schools`, form, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }

      setForm({ name: "", location: "", type: "" });
      setEditingId(null);
      fetchSchools();

    } catch (err) {
      console.error(err);
      alert("Operation failed");
    } finally {
      setLoading(false);
    }
  };

  /* ================= EDIT ================= */
  const handleEdit = (school) => {
    setForm({
      name: school.name,
      location: school.location,
      type: school.type
    });
    setEditingId(school._id);
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this school?")) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(`${API}/schools/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      fetchSchools();

    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  return (
    <AdminLayout>
      <div className="admin-schools">

        <h2>🏫 School Management</h2>

        {/* ================= FORM ================= */}
        <form onSubmit={handleSubmit} className="school-form">

          <input
            name="name"
            placeholder="School Name"
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

          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            required
          >
            <option value="">Select Type</option>
            <option value="Primary">Primary</option>
            <option value="Secondary">Secondary</option>
            <option value="Tertiary">Tertiary</option>
          </select>

          <button type="submit">
            {loading
              ? "Processing..."
              : editingId
              ? "Update School"
              : "Add School"}
          </button>

        </form>

        {/* ================= LOADING ================= */}
        {pageLoading && <p className="loading">Loading schools...</p>}

        {/* ================= EMPTY ================= */}
        {!pageLoading && schools.length === 0 && (
          <p className="empty">No schools added yet</p>
        )}

        {/* ================= LIST ================= */}
        <div className="school-list">

          {schools.map((school) => (
            <div className="school-item" key={school._id}>

              <div className="school-info">
                <h4>{school.name}</h4>
                <p>{school.location}</p>
                <span className="type">{school.type}</span>
              </div>

              <div className="actions">

                <button
                  className="edit-btn"
                  onClick={() => handleEdit(school)}
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => handleDelete(school._id)}
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

export default AdminSchools;