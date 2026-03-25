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
        console.error("Failed to load stats", error);
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
        <div>
          <p>{stats.totalNews}</p>
          <h3>Total News</h3>
        </div>

        <div>
          <p>{stats.publishedNews}</p>
          <span>Published</span>
        </div>
      </div>

      

         <div className="stat-card">
        <div>
          <p>{stats.totalLeaders}</p>
          <h3>Total Leaders</h3>
        </div>

        <div>
          <p>{stats.publishedLeaders}</p>
          <span>Published</span>
        </div>
      </div>

          <div className="stat-card">
        <div>
          <p>{stats.totalDepartments}</p>
          <h3>Total Departments</h3>
        </div>

        <div>
          <p>{stats.publishedDepartments}</p>
          <span>Published</span>
        </div>
      </div>

        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
