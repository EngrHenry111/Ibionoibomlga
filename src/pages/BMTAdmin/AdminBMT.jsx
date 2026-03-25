import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../../components/Admin/AdminLayout";

const API = "https://ibionoibom-2.onrender.com/api";

const AdminBMT = () => {

  const [items, setItems] = useState([]);

  const [form, setForm] = useState({
    title: "",
    content: "",
    category: "",
    priority: "normal",
    isPinned: false,
    isPublished: true,
    expiryDate: ""
  });

  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  /* ================= FETCH ================= */
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(`${API}/bmt/admin`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setItems(res.data || []);

    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  /* ================= INPUT ================= */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value
    });
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.content || !form.category) {
      alert("Please fill required fields");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      if (editingId) {
        await axios.put(`${API}/bmt/${editingId}`, form, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post(`${API}/bmt`, form, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }

      setForm({
        title: "",
        content: "",
        category: "",
        priority: "normal",
        isPinned: false,
        isPublished: true,
        expiryDate: ""
      });

      setEditingId(null);
      fetchData();

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
      title: item.title,
      content: item.content,
      category: item.category,
      priority: item.priority,
      isPinned: item.isPinned,
      isPublished: item.isPublished,
      expiryDate: item.expiryDate ? item.expiryDate.split("T")[0] : ""
    });

    setEditingId(item._id);
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this announcement?")) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(`${API}/bmt/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      fetchData();

    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  return (
    <AdminLayout>
      <div className="admin-page">

        <h2>📢 BMT Gong Management</h2>

        {/* ================= FORM ================= */}
        <form onSubmit={handleSubmit} className="admin-form">

          <input
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            required
          />

          <textarea
            name="content"
            placeholder="Write announcement... (Press ENTER for paragraphs)"
            value={form.content}
            onChange={handleChange}
            rows="5"
            required
          />

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            <option value="Government">Government</option>
            <option value="Alert">Alert</option>
            <option value="Event">Event</option>
            <option value="Opportunity">Opportunity</option>
            <option value="Emergency">Emergency</option>
          </select>

          <select
            name="priority"
            value={form.priority}
            onChange={handleChange}
          >
            <option value="normal">Normal</option>
            <option value="urgent">Urgent</option>
          </select>

          {/* CHECKBOXES */}
          <label>
            <input
              type="checkbox"
              name="isPinned"
              checked={form.isPinned}
              onChange={handleChange}
            />
            Pin Announcement
          </label>

          <label>
            <input
              type="checkbox"
              name="isPublished"
              checked={form.isPublished}
              onChange={handleChange}
            />
            Publish
          </label>

          <input
            type="date"
            name="expiryDate"
            value={form.expiryDate}
            onChange={handleChange}
          />

          <button type="submit">
            {loading
              ? "Saving..."
              : editingId
              ? "Update Announcement"
              : "Create Announcement"}
          </button>

        </form>

        {/* ================= LIST ================= */}
        <div className="admin-grid">

          {items.map((item) => (
            <div className="admin-card" key={item._id}>

              <h3>{item.title}</h3>

              <p><strong>Category:</strong> {item.category}</p>
              <p><strong>Priority:</strong> {item.priority}</p>

              {item.isPinned && <p>📌 Pinned</p>}
              {!item.isPublished && <p>🚫 Unpublished</p>}

              {item.expiryDate && (
                <p>Expires: {item.expiryDate.split("T")[0]}</p>
              )}

              <p>{item.content.slice(0, 100)}...</p>

              <div className="admin-actions">

                <button onClick={() => handleEdit(item)}>
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

export default AdminBMT;