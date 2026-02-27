import "./Footer.css";
import { FaLinkedin, FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} Local Government Area</p>
      <p>Rt. Hon. Obong Asuakak Umoh</p>

      {/* Social Media Links */}
      <div className="footer-socials">
        <a
          href="https://www.linkedin.com/in/YOUR_LINKEDIN_USERNAME"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          <FaLinkedin />
        </a>

        <a
          href="https://www.facebook.com/YOUR_FACEBOOK_USERNAME"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
        >
          <FaFacebook />
        </a>

        <a
          href="https://www.instagram.com/YOUR_INSTAGRAM_USERNAME"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
        >
          <FaInstagram />
        </a>

        <a
          href="https://wa.me/234XXXXXXXXXX"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
        >
          <FaWhatsapp />
        </a>
      </div>
    </footer>
  );
};

export default Footer;




// import "./Footer.css";

// const Footer = () => {
//   return (
//     <footer className="footer">
//       <p>© {new Date().getFullYear()} Local Government Area</p>
//       <p>Rt. Hon. Obong Asuakak Umoh</p>
//     </footer>
//   );
// };

// export default Footer;






// import React from "react";
// import "./Footer.css";

// const Footer = () => (
//   <footer className="footer">
//     <div className="container">
//       &copy; {new Date().getFullYear()} LGA Management Platform. All rights reserved.
//     </div>
//   </footer>
// );

// export default Footer;
