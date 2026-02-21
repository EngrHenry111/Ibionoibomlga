import { useEffect, useState } from "react";
import {
  createDepartment,
  getAllDepartments,
  deleteDepartment,
  updateDepartmentStatus,
} from "../../api/adminApi";
import AdminLayout from "../../components/Admin/AdminLayout";
import "./departmentAdmin.css";

const DepartmentsAdmin = () => {
  const [departments, setDepartments] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [head, setHead] = useState("");
  const [loading, setLoading] = useState(true);

  /* ================= FETCH ================= */
  const fetchDepartments = async () => {
    try {
      const res = await getAllDepartments();
      setDepartments(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Failed to load departments", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  /* ================= CREATE ================= */
  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      await createDepartment({ name, description, head });

      setName("");
      setDescription("");
      setHead("");

      fetchDepartments();
    } catch (err) {
      alert("Failed to create department",err);
    }
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this department?")) return;

    try {
      await deleteDepartment(id);
      setDepartments((prev) => prev.filter((d) => d._id !== id));
    } catch (err) {
      alert("Failed to delete",err);
    }
  };

  /* ================= STATUS TOGGLE ================= */
  const handleStatusToggle = async (id, currentStatus) => {
    const newStatus =
      currentStatus === "published" ? "draft" : "published";

    try {
      await updateDepartmentStatus(id, newStatus);
      fetchDepartments();
    } catch (err) {
      console.error("Status update failed", err);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="loading-state">Loading departments...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="departments-admin">
        <h2>Departments Management</h2>

        {/* ================= CREATE FORM ================= */}
        <form className="dept-form" onSubmit={handleCreate}>
          <input
            type="text"
            placeholder="Department Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Head of Department"
            value={head}
            onChange={(e) => setHead(e.target.value)}
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <button type="submit">Create Department</button>
        </form>

        {/* ================= TABLE ================= */}
        {departments.length === 0 && (
          <div className="empty-state">
            No departments created yet.
          </div>
        )}

        <div className="dept-table-wrapper">
          <table className="dept-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Head</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {departments.map((dept) => (
                <tr key={dept._id}>
                  <td>{dept.name}</td>
                  <td>{dept.head || "-"}</td>
                  <td>
                    <span
                      className={
                        dept.status === "published"
                          ? "status published"
                          : "status draft"
                      }
                    >
                      {dept.status}
                    </span>
                  </td>

                  <td>
                    <button
                      onClick={() =>
                        handleStatusToggle(dept._id, dept.status)
                      }
                    >
                      {dept.status === "published"
                        ? "Unpublish"
                        : "Publish"}
                    </button>

                    <button
                      className="danger"
                      onClick={() => handleDelete(dept._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default DepartmentsAdmin;
