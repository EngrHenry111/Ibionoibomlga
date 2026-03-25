import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../../components/Admin/AdminLayout";
import "./adminSecurity.css";

const API = "https://ibionoibom-2.onrender.com/api";

const AdminSecurity = () => {

  const [units, setUnits] = useState([]);
  const [form, setForm] = useState({
    name: "",
    location: "",
    type: "",
    phone: ""
  });

  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  /* ================= FETCH ================= */
  const fetchUnits = async () => {
    try {
      const res = await axios.get(`${API}/security`);
      setUnits(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUnits();
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
        await axios.put(`${API}/security/${editingId}`, form, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post(`${API}/security`, form, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }

      setForm({ name: "", location: "", type: "", phone: "" });
      setEditingId(null);
      fetchUnits();

    } catch (err) {
      console.error(err);
      alert("Operation failed");
    } finally {
      setLoading(false);
    }
  };

  /* ================= EDIT ================= */
  const handleEdit = (unit) => {
    setForm({
      name: unit.name,
      location: unit.location,
      type: unit.type,
      phone: unit.phone
    });
    setEditingId(unit._id);
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this unit?")) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(`${API}/security/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      fetchUnits();

    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  return (
    <AdminLayout>
      <div className="admin-security">

        <h2>🚓 Security Management</h2>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="security-form">

          <input
            name="name"
            placeholder="Unit Name"
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
            <option value="Police">Police Station</option>
            <option value="Civil Defence">Civil Defence</option>
            <option value="Vigilante">Vigilante Group</option>
          </select>

          <button type="submit">
            {loading
              ? "Processing..."
              : editingId
              ? "Update Unit"
              : "Add Unit"}
          </button>

        </form>

        {/* LIST */}
        <div className="security-list">

          {units.map((unit) => (
            <div className="security-item" key={unit._id}>

              <div>
                <h4>{unit.name}</h4>
                <p>{unit.location}</p>
                <span>{unit.type}</span>
                <p>{unit.phone}</p>
              </div>

              <div className="actions">
                <button
                  className="edit-btn"
                  onClick={() => handleEdit(unit)}
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => handleDelete(unit._id)}
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

export default AdminSecurity;