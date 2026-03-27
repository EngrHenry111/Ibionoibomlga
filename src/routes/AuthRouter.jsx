// import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

/* Public Pages */
import Home from "../pages/Home/Home";
import News from "../pages/News/News";
import Leaders from "../pages/Leaders/Leader";
import Departments from "../pages/Department/Department.jsx";
import Archive from "../pages/archive/Archive.jsx";

/* Admin Pages */
// import CreateAdmin from "../pages/Admin/register/Register.jsx"
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

// bursary
import BursaryAuth from "../pages/BursaryAuth/BursaryAuth.jsx";
import StudentDashboard from "../pages/BursaryStudentDashbord/StudentDashbord.jsx";
import ForgotPassword from "../pages/BursaryForgotPassword/ForgotPassword.jsx";
import ResetPassword from "../pages/BursaryResetPassword/ResetPassword.jsx";
import Verify from "../pages/BursaryVerify/Verify.jsx";
import BursaryApply from "../pages/BursaryApply/BursaryApply.jsx";
import BursaryAdmin from "../pages/BursaryAdmin/BursaryAdmin.jsx";
import BursaryStats from "../pages/BursaryStats/BursaryStats.jsx";
import VerifySearch from "../pages/BursaryVerifySearch/VerifySearch.jsx";



// EDUCATION
import Education from "../pages/Education/Education.jsx";
import AdminSchools from "../pages/EducationAdmin/AdminSchools.jsx";

/* HEALTH */
import Health from "../pages/Health/Health.jsx";
import AdminHealth from "../pages/HealthAdmin/AdminHealth.jsx";

/* SECURITY */
import Security from "../pages/Security/Security.jsx";
import AdminSecurity from "../pages/SecurityAdmin/AdminSecurity.jsx";

/*===========Agriculture============ */
import Agriculture from "../pages/Agriculture/Agriculture.jsx";
import AdminAgriculture from "../pages/AgricultureAdmin/AgricultureAdmin.jsx";

/*=============TOURISM================== */
import Tourism from "../pages/Tourism/Tourism.jsx";
import AdminTourism from "../pages/TourismAdmin/AdminTourism.jsx";

/*==================Economic=================== */
import Economic from "../pages/Economic/Economic.jsx";
import AdminEconomic from "../pages/EconomicAdmin/AdminEconomic.jsx";

/*================CULTURE================== */
import Culture from "../pages/Culture/Culture.jsx";
import AdminCulture from "../pages/CultureAdmin/AdminCulture.jsx";


/*==================HISTORY================ */
import History from "../pages/History/History.jsx";
import AdminHistory from "../pages/HistoryAdmin/AdminHIstory.jsx";


/*===================Diaspora=============== */
import Diaspora from "../pages/Diaspora/Diaspora.jsx";
import AdminDiaspora from "../pages/DiasporaAdmin/AdminDiaspora.jsx";


/*=====================FEEDBACK================ */
import Feedback from "../pages/Feedback/Feedback.jsx";


/*=================DIOSPORA================= */
import AdminBMT from "../pages/BMTAdmin/AdminBMT.jsx";
import BMT from "../pages/BMT/BMT.jsx";

/*=================DIOSPORA================= */
import Location from "../pages/Location/Location.jsx";


/* Protection */
import ProtectedRoute from "./ProtectedRoute";

// import BursaryAuth from "../pages/BursaryAuth/BursaryAuth.jsx";

const AppRouter = () => {
  
  return (
    <Routes>
      
      {/* PUBLIC */}
      <Route path="/" element={<Home />} />
      <Route path="/news" element={<News />} />
      <Route path="/leaders" element={<Leaders />} />
      <Route path="/departments" element={<Departments />} />
      <Route path="/archive" element={<Archive />} />

      {/* ADMIN AUTH */}
       {/* <Route
  path="/admin/register"
  element={
    <ProtectedRoute>
      <CreateAdmin />
    </ProtectedRoute>
  }
   /> */}
      {/* <Route
  path="/admin/create-admin"
  element={
    <ProtectedRoute roles={["super_admin"]}>
      <CreateAdmin />
    </ProtectedRoute>
  }
/> */}
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


{/* bursary */}

<Route path="/bursary" element={<BursaryAuth />} />
<Route path="/bursary/dashboard" element={<StudentDashboard />} />
<Route path="/bursary/apply" element={<BursaryApply />} />
<Route path="/bursary/forgot-password" element={<ForgotPassword />} />
<Route path="/bursary/reset-password/:token" element={<ResetPassword />} />
<Route path="/verify/:code" element={<Verify />} />
<Route path="/verify-search" element={<VerifySearch />} />
<Route
      path="/admin/bursary"
      element={<ProtectedRoute><BursaryAdmin/></ProtectedRoute>}
      />

      <Route
        path="/admin/bursary/stats"
        element={ <ProtectedRoute> <BursaryStats /> </ProtectedRoute>}
      />

  
  {/* EDUCATION */}
<Route path="/education" element={<Education />} />
<Route
      path="schools"
      element={<ProtectedRoute><AdminSchools /></ProtectedRoute>}
      />

  {/* HEALTH */}
<Route path="/health" element={<Health/>} />
 <Route
        path="/admin/health"
        element={ <ProtectedRoute> <AdminHealth /> </ProtectedRoute>}
      />

<Route path="/security" element={<Security/>} />
<Route
  path="/admin/security"
  element={<ProtectedRoute><AdminSecurity /></ProtectedRoute>
  }
  />


<Route path="/agriculture" element={<Agriculture/>} />
<Route
  path="/admin/agriculture"
  element={<ProtectedRoute><AdminAgriculture/></ProtectedRoute>}
/>


/*==========TOURISM=============== */
<Route path="/tourism" element={<Tourism/>} />
<Route
  path="/admin/tourism"element={<ProtectedRoute><AdminTourism/></ProtectedRoute>
  }
/>


/*========================ECONOMIC===================== */
<Route path="/economic" element={<Economic/>} />
<Route
  path="/admin/economic"element={<ProtectedRoute><AdminEconomic/></ProtectedRoute>
  }
/>


/*=================CULTURE================= */
<Route path="/culture" element={<Culture/>} />
<Route
  path="/admin/culture"
  element={<ProtectedRoute><AdminCulture/></ProtectedRoute>}
/>



/*=================HISTORY================= */
<Route path="/history" element={<History/>} />
<Route
  path="/admin/history"
  element={<ProtectedRoute><AdminHistory/></ProtectedRoute>}
/>


/*=================DIOSPORA================= */
<Route path="/diaspora" element={<Diaspora/>} />
<Route
  path="/admin/diaspora"
  element={<ProtectedRoute><AdminDiaspora/></ProtectedRoute>}
/>


/*=================DIOSPORA================= */
<Route path="/feedback" element={<Feedback/>} />


/*=================BMT GONG================= */
<Route path="/bmt" element={<BMT/>} />
<Route
  path="/admin/bmt"
  element={<ProtectedRoute><AdminBMT/></ProtectedRoute>}
/>


*=================BMT GONG================= */
<Route path="/location" element={<Location/>} />

    </Routes>
  );
};

export default AppRouter;



