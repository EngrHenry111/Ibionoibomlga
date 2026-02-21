import AdminLayout from "../../../components/Admin/AdminLayout";
import "./Admin.css";

const DepartmentsAdmin = () => {
  return (
    <AdminLayout>
      <div className="admin-page">
        <h2>Departments Management</h2>
        <p>
          Create and manage departments, assign heads of departments, and update
          department information.
        </p>

        {/* Later: Add Department Form + Table */}
        <div className="admin-placeholder">
          Department management UI coming next.
        </div>
      </div>
    </AdminLayout>
  );
};

export default DepartmentsAdmin;
