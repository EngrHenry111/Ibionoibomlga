// import "./Topbar.css";

// const Topbar = ({ onMenuClick }) => {
//   return (
//     <header className="topbar">
//       <button className="menu-btn" onClick={onMenuClick}>
//         ☰
//       </button>

//       <h1 className="topbar-title">Admin Dashboard</h1>
//     </header>
//   );
// };

// export default Topbar;




import { useNavigate } from "react-router-dom";
import "./Topbar.css";


const Topbar = ({ onMenuClick }) => {
 const navigate = useNavigate();

    const logout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
  };
  return (
    <header className="topbar">
      <button className="menu-btn" onClick={onMenuClick}>
        ☰
      </button>
      <h1>Admin Dashboard</h1>
      <button onClick={logout}>Logout</button>
    </header>
  );
};

export default Topbar;



// import { useNavigate } from "react-router-dom";
// import "./Topbar.css";

// const Topbar = () => {
//   const navigate = useNavigate();

  
  // const logout = () => {
  //   localStorage.removeItem("token");
  //   navigate("/admin/login");
  // };

//   return (
//     <div className="topbar">
//       <span>Admin Dashboard</span>
//       <button onClick={logout}>Logout</button>
//     </div>
//   );
// };

// export default Topbar;
