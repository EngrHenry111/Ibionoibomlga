import { useState, useEffect } from "react";
import {
  getAllTenures,
  createTenure,
  deleteTenure,
} from "../../api/adminApi";
import AdminLayout from "../../components/Admin/AdminLayout";
import "./tenureAdmin.css";

const TenureAdmin = () => {
  const [tenures, setTenures] = useState([]);
  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchTenures = async () => {
    try {
      const res = await getAllTenures();
      setTenures(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Failed to fetch tenures", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    if (!startYear || !endYear) {
      alert("Both start and end year are required");
      return;
    }

    if (Number(endYear) <= Number(startYear)) {
      alert("End year must be greater than start year");
      return;
    }

    try {
      await createTenure({ startYear, endYear });
      setStartYear("");
      setEndYear("");
      fetchTenures();
    } catch (err) {
      alert("Failed to create tenure",err);
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Deleting tenure may affect assigned leaders. Continue?"
    );
    if (!confirm) return;

    try {
      await deleteTenure(id);
      setTenures((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      alert("Failed to delete tenure",err);
    }
  };

  useEffect(() => {
    fetchTenures();
  }, []);

  return (
    <AdminLayout>
      <div className="tenure-admin">
        <h2>Tenure Management</h2>

        {/* CREATE FORM */}
        <form onSubmit={handleCreate} className="tenure-form">
          <input
            type="number"
            placeholder="Start Year"
            value={startYear}
            onChange={(e) => setStartYear(e.target.value)}
          />

          <input
            type="number"
            placeholder="End Year"
            value={endYear}
            onChange={(e) => setEndYear(e.target.value)}
          />

          <button type="submit">Add Tenure</button>
        </form>

        {/* TABLE */}
        {loading ? (
          <p>Loading tenures...</p>
        ) : tenures.length === 0 ? (
          <div className="empty-state">
            No tenure created yet.
          </div>
        ) : (
          <div className="table-wrapper">
            <table className="tenure-table">
              <thead>
                <tr>
                  <th>Start Year</th>
                  <th>End Year</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tenures.map((t) => (
                  <tr key={t._id}>
                    <td>{t.startYear}</td>
                    <td>{t.endYear}</td>
                    <td>
                      <button
                        className="danger"
                        onClick={() => handleDelete(t._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default TenureAdmin;
