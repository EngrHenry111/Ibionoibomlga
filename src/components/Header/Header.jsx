import { Link } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Header.css";
import logo from "../../assets/images/ibionologo.png";   // adjust path if needed

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
          <Link to="/education">Education</Link>
           <Link to="/agriculture">Agriculture</Link>
          
           <Link to="/bursary">Bursary</Link>
           <Link to="/health">Health</Link>
           <Link to="/tourism">Tourism</Link>
           <Link to="/economic">Economic</Link>
           <Link to="/culture">Culture</Link>
           <Link to="/history">History</Link>
           <Link to="/security">Security</Link>
           <Link to="/diaspora">Diaspora</Link>
           <Link to="/feedback">Feedback</Link>
           <Link to="/bmt">BMT</Link>
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
        <Link to="/history" onClick={() => setOpen(false)}>History</Link>
        <Link to="/news" onClick={() => setOpen(false)}>News</Link>
        <Link to="/leaders" onClick={() => setOpen(false)}>Leadership</Link>
        <Link to="/agriculture" onClick={() => setOpen(false)}>Agriculture</Link>
        <Link to="/education" onClick={() => setOpen(false)}>Education</Link>
        <Link to="/bursary" onClick={() => setOpen(false)}>Bursary</Link>
        <Link to="/health" onClick={() => setOpen(false)}>Health</Link>
        <Link to="/tourism" onClick={() => setOpen(false)}>Tourism</Link>
        <Link to="/economic" onClick={() => setOpen(false)}>Economic</Link>
        <Link to="/security" onClick={() => setOpen(false)}>Security</Link>
        <Link to="/culture" onClick={() => setOpen(false)}>Culture</Link>
        <Link to="/departments" onClick={() => setOpen(false)}>Departments</Link>
        <Link to="/diaspora" onClick={() => setOpen(false)}>Diaspora</Link>
        <Link to="/feedback" onClick={() => setOpen(false)}>Feedback</Link>
        <Link to="/bmt" onClick={() => setOpen(false)}>BMT</Link>




        
      </div>
    </>
  );
};

export default Header;