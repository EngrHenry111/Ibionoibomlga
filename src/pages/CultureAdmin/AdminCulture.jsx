import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../../components/Admin/AdminLayout";
import "./adminCulture.css";

const API = "https://ibionoibom-2.onrender.com/api";

const AdminCulture = () => {

  const [items, setItems] = useState([]);

  const [form, setForm] = useState({
    name: "",
    description: "",
    type: "",
    location: ""
  });

  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  /* ================= FETCH ================= */
  const fetchItems = async () => {
    try {
      const res = await axios.get(`${API}/culture`);
      setItems(res.data || []);
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

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.description || !form.type) {
      alert("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      if (editingId) {
        await axios.put(`${API}/culture/${editingId}`, form, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post(`${API}/culture`, form, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }

      setForm({
        name: "",
        description: "",
        type: "",
        location: ""
      });

      setEditingId(null);
      fetchItems();

    } catch (err) {
      console.error(err.response?.data);
      alert(err.response?.data?.message || "Operation failed");
    } finally {
      setLoading(false);
    }
  };

  /* ================= EDIT ================= */
  const handleEdit = (item) => {
    setForm({
      name: item.name,
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

      await axios.delete(`${API}/culture/${id}`, {
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
      <div className="admin-culture">

        <h2>🎭 Cultural Festival Management</h2>

        {/* ================= FORM ================= */}
        <form onSubmit={handleSubmit} className="culture-form">

          <input
            name="name"
            placeholder="Festival / Group Name"
            value={form.name}
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
            <option value="">Select Category</option>
            <option value="Traditional">Traditional Festival</option>
            <option value="Religious">Religious Festival</option>
            <option value="Social">Social Cultural Group</option>
          </select>

          <textarea
            name="description"
            placeholder="Describe the festival, activities, history..."
            value={form.description}
            onChange={handleChange}
            rows="4"
            required
          />

          <button type="submit">
            {loading
              ? "Processing..."
              : editingId
              ? "Update"
              : "Add Festival"}
          </button>

        </form>

        {/* ================= LIST ================= */}
        <div className="culture-list">

          {items.map((item) => (
            <div className="culture-item" key={item._id}>

              <div>
                <h4>{item.name}</h4>
                <p className="desc">{item.description}</p>
                <span className="type">{item.type}</span>
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

export default AdminCulture;