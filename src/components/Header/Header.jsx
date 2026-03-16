import { Link } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Header.css";
import logo from "../../assets/ibiono logo.jpg";   // adjust path if needed

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="header">

        {/* LOGO + TITLE */}
        <div className="logo-section">
          <img src={logo} alt="Ibiono Ibom Logo" className="logo-img" />
          <h2 className="logo-text">Ibiono Ibom Local Government Portal</h2>
        </div>

        {/* DESKTOP NAV */}
        <nav className="nav-desktop">
          <Link to="/">Home</Link>
          <Link to="/news">News</Link>
          <Link to="/leaders">Leadership</Link>
          <Link to="/departments">Departments</Link>
        </nav>

        {/* HAMBURGER */}
        <div className="hamburger" onClick={() => setOpen(!open)}>
          {open ? <FaTimes /> : <FaBars />}
        </div>
      </header>

      {/* MOBILE SIDEBAR */}
      <div className={open ? "mobile-menu open" : "mobile-menu"}>
        <Link to="/" onClick={() => setOpen(false)}>Home</Link>
        <Link to="/news" onClick={() => setOpen(false)}>News</Link>
        <Link to="/leaders" onClick={() => setOpen(false)}>Leadership</Link>
        <Link to="/departments" onClick={() => setOpen(false)}>Departments</Link>
      </div>
    </>
  );
};

export default Header;