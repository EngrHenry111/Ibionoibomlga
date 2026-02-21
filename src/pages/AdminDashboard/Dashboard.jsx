import { useEffect, useState } from "react";
import { getDashboardStats } from "../../api/adminApi";
import AdminLayout from "../../components/Admin/AdminLayout";
import "./Dashboard.css";

const Dashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await getDashboardStats();
        setStats(res.data);
      } catch (error) {
        console.error("Failed to load stats");
      }
    };

    fetchStats();
  }, []);

  if (!stats) {
    return (
      <AdminLayout>
        <div className="loading-state">Loading dashboard...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="dashboard">
        <h2>Dashboard Overview</h2>

        <div className="stats-grid">

          <div className="stat-card">
            <h3>Total News</h3>
            <p>{stats.totalNews}</p>
            <span>{stats.publishedNews} Published</span>
          </div>

          <div className="stat-card">
            <h3>Total Leaders</h3>
            <p>{stats.totalLeaders}</p>
            <span>{stats.publishedLeaders} Published</span>
          </div>

          <div className="stat-card">
            <h3>Total Departments</h3>
            <p>{stats.totalDepartments}</p>
            <span>{stats.publishedDepartments} Published</span>
          </div>

        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
