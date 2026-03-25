import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../../components/Admin/AdminLayout";
import "./adminEconomic.css";

const API = "https://ibionoibom-2.onrender.com/api";

const AdminEconomic = () => {

  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    type: "",
    location: ""
  });

  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  /* ================= FETCH ================= */
  const fetchItems = async () => {
    try {
      const res = await axios.get(`${API}/economic`);
      setItems(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  /* ================= INPUT ================= */
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  /* ================= ADD / UPDATE ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.description || !form.type) {
      alert("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      if (editingId) {
        await axios.put(`${API}/economic/${editingId}`, form, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post(`${API}/economic`, form, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }

      setForm({
        title: "",
        description: "",
        type: "",
        location: ""
      });

      setEditingId(null);
      fetchItems();

    } catch (err) {
      console.error("ERROR:", err.response?.data);
      alert(err.response?.data?.message || "Operation failed");
    } finally {
      setLoading(false);
    }
  };

  /* ================= EDIT ================= */
  const handleEdit = (item) => {
    setForm({
      title: item.title,
      description: item.description,
      type: item.type,
      location: item.location || ""
    });
    setEditingId(item._id);
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this record?")) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(`${API}/economic/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      fetchItems();

    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  return (
    <AdminLayout>
      <div className="admin-economic">

        <h2>💼 Economic Potentials Management</h2>

        {/* ================= FORM ================= */}
        <form onSubmit={handleSubmit} className="econ-form">

          <input
            name="title"
            placeholder="Opportunity Title"
            value={form.title}
            onChange={handleChange}
            required
          />

          <input
            name="location"
            placeholder="Location (Optional)"
            value={form.location}
            onChange={handleChange}
          />

          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            required
          >
            <option value="">Select Sector</option>
            <option value="Agriculture">Agriculture</option>
            <option value="Trade">Trade & Commerce</option>
            <option value="Resources">Natural Resources</option>
            <option value="SME">SMEs</option>
          </select>

          <textarea
            name="description"
            placeholder="Detailed description..."
            value={form.description}
            onChange={handleChange}
            rows="4"
            required
          />

          <button type="submit">
            {loading
              ? "Processing..."
              : editingId
              ? "Update Opportunity"
              : "Add Opportunity"}
          </button>

        </form>

        {/* ================= LIST ================= */}
        <div className="econ-list">

          {items.map((item) => (
            <div className="econ-item" key={item._id}>

              <div>
                <h4>{item.title}</h4>
                <p className="desc">{item.description}</p>
                <span>{item.type}</span>
                {item.location && <p>{item.location}</p>}
              </div>

              <div className="actions">
                <button
                  className="edit-btn"
                  onClick={() => handleEdit(item)}
                >
                  Edit
                </button>

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

export default AdminEconomic;