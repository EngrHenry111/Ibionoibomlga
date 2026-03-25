import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../../components/Admin/AdminLayout";
import "./adminTourism.css";

const API = "https://ibionoibom-2.onrender.com/api";

const AdminTourism = () => {

  const [places, setPlaces] = useState([]);
  const [form, setForm] = useState({
    name: "",
    location: "",
    type: "",
    description: ""
  });

  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  /* ================= FETCH ================= */
  const fetchPlaces = async () => {
    try {
      const res = await axios.get(`${API}/tourism`);
      setPlaces(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPlaces();
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
        await axios.put(`${API}/tourism/${editingId}`, form, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post(`${API}/tourism`, form, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }

      setForm({
        name: "",
        location: "",
        type: "",
        description: ""
      });

      setEditingId(null);
      fetchPlaces();

    } catch (err) {
      console.error(err);
      alert("Operation failed");
    } finally {
      setLoading(false);
    }
  };

  /* ================= EDIT ================= */
  const handleEdit = (place) => {
    setForm({
      name: place.name,
      location: place.location,
      type: place.type,
      description: place.description
    });
    setEditingId(place._id);
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this attraction?")) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(`${API}/tourism/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      fetchPlaces();

    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  return (
    <AdminLayout>
      <div className="admin-tourism">

        <h2>🏝️ Tourism Management</h2>

        {/* ================= FORM ================= */}
        <form onSubmit={handleSubmit} className="tour-form">

          <input
            name="name"
            placeholder="Attraction Name"
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
            <option value="Nature">Natural Attraction</option>
            <option value="Culture">Cultural Site</option>
            <option value="Recreation">Recreation Spot</option>
          </select>

          <textarea
            name="description"
            placeholder="Description..."
            value={form.description}
            onChange={handleChange}
            rows="4"
            required
          />

          <button type="submit">
            {loading
              ? "Processing..."
              : editingId
              ? "Update Attraction"
              : "Add Attraction"}
          </button>

        </form>

        {/* ================= LIST ================= */}
        <div className="tour-list">

          {places.map((place) => (
            <div className="tour-item" key={place._id}>

              <div>
                <h4>{place.name}</h4>
                <p>{place.location}</p>
                <span>{place.type}</span>
                <p className="desc">{place.description}</p>
              </div>

              <div className="actions">
                <button
                  className="edit-btn"
                  onClick={() => handleEdit(place)}
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => handleDelete(place._id)}
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

export default AdminTourism;