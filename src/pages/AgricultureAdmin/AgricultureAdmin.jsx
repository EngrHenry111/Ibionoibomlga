import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../../components/Admin/AdminLayout";
import "./agricultureAdmin.css";

const API = "https://ibionoibom-2.onrender.com/api";

const AdminAgriculture = () => {

  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    name: "",
    location: "",
    type: ""
  });

  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  /* ================= FETCH ================= */
  const fetchItems = async () => {
    try {
      const res = await axios.get(`${API}/agriculture`);
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

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      if (editingId) {
        await axios.put(`${API}/agriculture/${editingId}`, form, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post(`${API}/agriculture`, form, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }

      setForm({ name: "", location: "", type: "" });
      setEditingId(null);
      fetchItems();

    } catch (err) {
      console.error(err);
      alert("Operation failed");
    } finally {
      setLoading(false);
    }
  };

  /* ================= EDIT ================= */
  const handleEdit = (item) => {
    setForm({
      name: item.name,
      location: item.location,
      type: item.type
    });
    setEditingId(item._id);
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this record?")) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(`${API}/agriculture/${id}`, {
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
      <div className="admin-agriculture">

        <h2>🌾 Agriculture Management</h2>

        {/* ================= FORM ================= */}
        <form onSubmit={handleSubmit} className="agri-form">

          <input
            name="name"
            placeholder="Farm / Market Name"
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
            <option value="">Select Category</option>
            <option value="Crop">Crop Farming</option>
            <option value="Livestock">Livestock</option>
            <option value="Market">Agro Market</option>
          </select>

          <button type="submit">
            {loading
              ? "Processing..."
              : editingId
              ? "Update Record"
              : "Add Record"}
          </button>

        </form>

        {/* ================= LIST ================= */}
        <div className="agri-list">

          {items.map((item) => (
            <div className="agri-item" key={item._id}>

              <div>
                <h4>{item.name}</h4>
                <p>{item.location}</p>
                <span>{item.type}</span>
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

export default AdminAgriculture;