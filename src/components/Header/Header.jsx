import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <h2 className="logo">Ibiono Ibom Local Government Portal</h2>

      <nav>
        <Link to="/">Home</Link>
        <Link to="/news">News</Link>
        <Link to="/leaders">Leadership</Link>
        <Link to="/departments">Departments</Link>
      </nav>
    </header>
  );
};

export default Header;




// import { Link, NavLink } from "react-router-dom";
// import "./Header.css";

// const Header = () => {
//   return (
    
//     <header className="header">
//       <Link to="/" className="logo">
//         LG Platform
//       </Link>

//       <nav>
//         <NavLink to="/" end>Home</NavLink>
//         <NavLink to="/leaders">Leaders</NavLink>
//         <NavLink to="/tenures">Tenures</NavLink>
//         <NavLink to="/departments">Departments</NavLink>
//         <NavLink to="/news">News</NavLink>
//         <NavLink to="/admin/login" className="admin-link">
//           Admin
//         </NavLink>
//       </nav>
//     </header>
//   );
// };

// export default Header;







// import React from "react";
// import { Link } from "react-router-dom";
// import "./Header.css";

// const Header = () => (
//   <header className="header">
//     <div className="container header-container">
//       <h1>LGA Management Platform</h1>
//       <nav>
//         <Link to="/">Home</Link>
//         <Link to="/leaders">Leaders</Link>
//         <Link to="/news">News</Link>
//         <Link to="/departments">Departments</Link>
//       </nav>
//     </div>
//   </header>
// );

// export default Header;
