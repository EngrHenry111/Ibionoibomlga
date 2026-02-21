import { useEffect, useState } from "react";
import { getPublicDepartments } from "../../api/publicApi";
import "./Department.css";

const Departments = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true)

  // useEffect(() => {
  //   const fetchDepartments = async () => {
  //     try {
  //       const res = await getPublicDepartments();
  //       setDepartments(res.data);
  //     } catch (error) {
  //       console.error("Failed to load departments");
  //     }
  //   };

  //   fetchDepartments();
  // }, []);

  useEffect(() => {
  const fetchDepartments = async () => {
    try {
      const res = await getPublicDepartments();
      setDepartments(
        Array.isArray(res.data)
          ? res.data
          : res.data.departments || []
      );
    } catch (error) {
      console.error("Failed to load departments", error);
      setDepartments([]);
    } finally{
      setLoading(false);
    }
  };

  fetchDepartments();
}, []);


if (loading) {
  return <p className="page-loading fade-in">Department Page Loading…</p>;
}
  return (
    <div className="departments-page">
      <h2>Departments</h2>

      {departments.length === 0 && (
        <p>No departments available.</p>
      )}

      <div className="department-grid">

        {departments.map((dept) => (
          <div className="department-card" key={dept._id}>
            <h3>{dept.name}</h3>
            <p>{dept.description}</p>
            {dept.head && (
              <div className="dept-head">
                <strong>Head:</strong> {dept.head}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Departments;
