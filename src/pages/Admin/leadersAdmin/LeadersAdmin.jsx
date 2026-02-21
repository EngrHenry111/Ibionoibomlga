import AdminLayout from "../../../components/Admin/AdminLayout";
import "./Admin.css";

const LeadersAdmin = () => {
  return (
    <AdminLayout>
      <div className="admin-page">
        <h2>Leaders Management</h2>
        <p>
          From here, you can add new leaders, assign offices, manage tenures,
          and view archived leadership history.
        </p>

        {/* Later: Add Leader Form + Table */}
        <div className="admin-placeholder">
          Leader management UI coming next.
        </div>
      </div>
    </AdminLayout>
  );
};

export default LeadersAdmin;
