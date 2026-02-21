import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} Local Government Area</p>
      <p>Rt. Hon. Obong Asuakak Umoh</p>
    </footer>
  );
};

export default Footer;






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
