import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Overlay (mobile only) */}
      {isOpen && <div className="sidebar-overlay" onClick={onClose} />}

      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <h2 className="sidebar-title">LGA Admin</h2>

          {/* Close button (mobile only) */}
          <button className="sidebar-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <nav className="sidebar-nav">
          <NavLink to="/admin/dashboard" onClick={onClose}>
            Dashboard
          </NavLink>
          <NavLink to="/admin/leaders" onClick={onClose}>
            Leaders
          </NavLink>
          <NavLink to="/admin/news" onClick={onClose}>
            News
          </NavLink>
          <NavLink to="/admin/departments" onClick={onClose}>
            Departments
          </NavLink>
          <NavLink to="/admin/tenures" onClick={onClose}>
            Tenure
          </NavLink>

          <NavLink to="/admin/bursary" onClick={onClose}>
            Bursary
          </NavLink>

          <NavLink to="/admin/bursary/stats">
           Bursary Stats
          </NavLink>

          <NavLink to="/admin/agriculture">
           Agriculture
          </NavLink>

          <NavLink to="/schools">
            All Schools
          </NavLink>

          <NavLink to="/admin/economic">
            Economic
          </NavLink>

           <NavLink to="/admin/health">
            Health
          </NavLink>

          <NavLink to="/admin/tourism">
            Tourism
          </NavLink>

           <NavLink to="/admin/culture">
            Culture
          </NavLink>

          <NavLink to="/admin/history">
            History
          </NavLink>

          

          <NavLink to="/admin/security">
            Security
          </NavLink>

          <NavLink to="/admin/diaspora">
            Diaspora
          </NavLink>

          <NavLink to="/admin/bmt">
BMT          </NavLink>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;






// import { NavLink } from "react-router-dom";
// import "./Sidebar.css";

// const Sidebar = () => {
//   return (
//     <aside className="sidebar">
//       <h2 className="sidebar-title">LGA Admin</h2>

//       <nav>
//         <NavLink to="/admin/dashboard">Dashboard</NavLink>
//         <NavLink to="/admin/leaders">Leaders</NavLink>
//         <NavLink to="/admin/news">News</NavLink>
//         <NavLink to="/admin/departments">Departments</NavLink>
//         <NavLink to="/admin/tenures">Tenure</NavLink>
//         <NavLink to="/news/:id">NewsDetails</NavLink>
        

//       </nav>
//     </aside>
//   );
// };

// export default Sidebar;
