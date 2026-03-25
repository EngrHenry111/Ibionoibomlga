import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../../components/Admin/AdminLayout";
import "./adminHistory.css";

const API = "https://ibionoibom-2.onrender.com/api";

const AdminHistory = () => {

  const [items, setItems] = useState([]);

  const [form, setForm] = useState({
    title: "",
    content: "",
    section: "",
    year: ""
  });

  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  /* ================= FETCH ================= */
  const fetchItems = async () => {
    try {
      const res = await axios.get(`${API}/history`);
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

    if (!form.title || !form.content || !form.section) {
      alert("Please fill required fields");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      if (editingId) {
        await axios.put(`${API}/history/${editingId}`, form, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post(`${API}/history`, form, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }

      setForm({
        title: "",
        content: "",
        section: "",
        year: ""
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
      title: item.title || "",
      content: item.content || "",
      section: item.section || "",
      year: item.year || ""
    });

    setEditingId(item._id);
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this history record?")) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(`${API}/history/${id}`, {
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
      <div className="admin-history">

        <h2>🏛️ History Management</h2>

        {/* ================= FORM ================= */}
        <form onSubmit={handleSubmit} className="history-form">

          <input
            name="title"
            placeholder="Title (e.g. Origin of Ibiono Ibom)"
            value={form.title}
            onChange={handleChange}
            required
          />

          <select
            name="section"
            value={form.section}
            onChange={handleChange}
            required
          >
            <option value="">Select Section</option>
            <option value="Origin">Origin</option>
            <option value="Timeline">Timeline</option>
            <option value="Leadership">Leadership</option>
            <option value="Colonial">Colonial</option>
            <option value="Culture">Culture</option>
            <option value="Personalities">Personalities</option>
          </select>

          {/* YEAR (ONLY FOR TIMELINE) */}
          <input
            name="year"
            placeholder="Year (Only for timeline e.g. 1990)"
            value={form.year}
            onChange={handleChange}
          />

          {/* TEXTAREA (IMPORTANT FOR PARAGRAPH) */}
          <textarea
            name="content"
            placeholder="Write history here... (Press ENTER for paragraphs)"
            value={form.content}
            onChange={handleChange}
            rows="6"
            required
          />

          <button type="submit">
            {loading
              ? "Processing..."
              : editingId
              ? "Update History"
              : "Add History"}
          </button>

        </form>

        {/* ================= LIST ================= */}
        <div className="history-list">

          {items.map((item) => (
            <div className="history-item" key={item._id}>

              <div>
                <h4>{item.title}</h4>
                <p className="section">{item.section}</p>
                {item.year && <span>{item.year}</span>}
                <p className="desc">
                  {item.content.slice(0, 100)}...
                </p>
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

export default AdminHistory;