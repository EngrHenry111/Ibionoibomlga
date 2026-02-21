import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import "./AdminLayout.css";

const AdminLayout = ({ children }) => {
  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-main">
        <Topbar />
        <div className="admin-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;



// import { useState } from "react";
// import Sidebar from "./Sidebar";
// import Topbar from "./Topbar";
// import "./AdminLayout.css";

// const AdminLayout = ({ children }) => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   return (
//     <div className="admin-layout">
//       <Sidebar
//         isOpen={sidebarOpen}
//         onClose={() => setSidebarOpen(false)}
//       />

//       <div className="admin-main">
//         <Topbar onMenuClick={() => setSidebarOpen(true)} />
//         <div className="admin-content">{children}</div>
//       </div>
//     </div>
//   );
// };

// export default AdminLayout;





// import Sidebar from "./Sidebar";
// import Topbar from "./Topbar";
// import "./AdminLayout.css";

// const AdminLayout = ({ children }) => {
//   return (
//     <div className="admin-layout">
//       <Sidebar />
//       <div className="admin-main">
//         <Topbar />
//         <main className="admin-content">{children}</main>
//       </div>
//     </div>
//   );
// };

// export default AdminLayout;
