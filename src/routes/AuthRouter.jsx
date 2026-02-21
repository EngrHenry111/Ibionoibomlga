import { Routes, Route } from "react-router-dom";

/* Public Pages */
import Home from "../pages/Home/Home";
import News from "../pages/News/News";
import Leaders from "../pages/Leaders/Leader";
import Departments from "../pages/Department/Department.jsx";

/* Admin Pages */
import CreateAdmin from "../pages/Admin/register/Register.jsx"
import Login from "../pages/Admin/login/Login";
import Dashboard from "../pages/AdminDashboard/Dashboard.jsx";
import LeadersAdmin from "../pages/leadersAdmin/leadersAdmin.jsx";
import NewsAdmin from "../pages/NewsAdmin/NewsAdmin.jsx";
import CreateNews from "../pages/CreateNews/CreateNews.jsx";
import EditNews from "../pages/EditNews/EditNews.jsx";
import DepartmentsAdmin from "../pages/departmentAdmin/departmentAdmin.jsx";
import NewsDetails from "../pages/NewsDetails/NewsDetails.jsx";
import TenureAdmin from "../pages/tenureAdmin/tenureAdmin.jsx";
import CreateLeader from "../pages/CreateLeader/CreateLeader.jsx";
import EditLeader from "../pages/EditLeader/EditLeader.jsx";
import LeaderDetails from "../pages/LeaderDetails/LeaderDetails.jsx";
/* Protection */
import ProtectedRoute from "./ProtectedRoute";

const AppRouter = () => {
  return (
    <Routes>
      
      {/* PUBLIC */}
      <Route path="/" element={<Home />} />
      <Route path="/news" element={<News />} />
      <Route path="/leaders" element={<Leaders />} />
      <Route path="/departments" element={<Departments />} />

      {/* ADMIN AUTH */}
      <Route
  path="/admin/create-admin"
  element={
    <ProtectedRoute roles={["super_admin"]}>
      <CreateAdmin />
    </ProtectedRoute>
  }
/>
      <Route path="/admin/login" element={<Login />} />

      {/* ADMIN PROTECTED */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/leaders"
        element={
          <ProtectedRoute>
            <LeadersAdmin />
          </ProtectedRoute>
        }
      />

      <Route
  path="/admin/leaders/create"
  element={
    <ProtectedRoute>
      <CreateLeader />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/leaders/edit/:id"
  element={
    <ProtectedRoute>
      <EditLeader />
    </ProtectedRoute>
  }
/>

{/* <Route
  path="/leaders/:id"
  element={
    <ProtectedRoute>
      <LeaderDetails />
    </ProtectedRoute>
  }
/> */}

<Route path="/leaders/:id" element={<LeaderDetails />} />



      {/* ✅ NEWS ADMIN ROUTES */}
      {/* NEWS ADMIN */}
<Route
  path="/admin/news"
  element={
    <ProtectedRoute>
      <NewsAdmin />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/news/create"
  element={
    <ProtectedRoute>
      <CreateNews />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/news/edit/:id"
  element={
    <ProtectedRoute>
      <EditNews />
    </ProtectedRoute>
  }
/>

      <Route
        path="/admin/departments"
        element={
          <ProtectedRoute>
            <DepartmentsAdmin />
          </ProtectedRoute>
        }
      />
/** PUBLIC NEWS */

{/* <Route
        path="/news/:id"
        element={
          <ProtectedRoute>
            <NewsDetails />
          </ProtectedRoute>
        }
      /> */}
      <Route path="/news/:id" element={<NewsDetails />} />



      <Route
  path="/admin/tenures"
  element={
    <ProtectedRoute>
      <TenureAdmin />
    </ProtectedRoute>
  }
/>
    </Routes>
  );
};

export default AppRouter;



