import { useEffect, useState } from "react";
import BursaryApply from "../BursaryApply/BursaryApply";
import BursaryAuth from "../BursaryAuth/BursaryAuth";
// import { Helmet } from "react-helmet-async";
import "./bursary.css"
const Bursary = () => {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("student");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <>

    <div>

      {!user ? (
        <BursaryAuth setUser={setUser} />
      ) : (
        <BursaryApply />
      )}

    </div></>
  );
};

export default Bursary;