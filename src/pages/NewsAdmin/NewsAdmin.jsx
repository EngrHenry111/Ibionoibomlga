import { useEffect, useState } from "react";
import {
  getAllNews,
  deleteNews,
  updateNewsStatus,
} from "../../api/adminApi";
import AdminLayout from "../../components/Admin/AdminLayout";
import "./Admin.css";
import { useNavigate } from "react-router-dom";

const NewsAdmin = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const admin = JSON.parse(localStorage.getItem("admin"));


  const fetchNews = async () => {
    try {
      const res = await getAllNews();
      setNews(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Failed to load news", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this news?")) return;
    await deleteNews(id);
    setNews((prev) => prev.filter((n) => n._id !== id));
  };

const handleStatusToggle = async (id, currentStatus) => {
  const newStatus =
    currentStatus === "published" ? "draft" : "published";

  try {
    await updateNewsStatus(id, newStatus);
    fetchNews();
  } catch (err) {
    console.error("Failed to update status", err);
    alert("Failed to update status");
  }
};


  useEffect(() => {
    fetchNews();
  }, []);

  if (loading) {
    return (
      <AdminLayout>
        <div className="loading-state">Loading news…</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="news-admin">
        <div className="news-header">
          <h2>News Management</h2>
          <button
            className="create-btn"
            onClick={() => navigate("/admin/news/create")}
          >
            + Create News
          </button>
        </div>

        {news.length === 0 && (
          <p className="empty-state">
            No news has been published yet.
          </p>
        )}

        <div className="news-grid">
          {news.map((item) => (
            <div className="news-card" key={item._id}>
              <h3>{item.title}</h3>
              <p>{item.content?.slice(0, 120)}...</p>

              <div className="news-gallery">
                {item.images?.map((img, i) => (
                  <img
                    key={i}
                    src={`http://localhost:5000/uploads/news/${img}`}
                    alt="news"
                  />
                ))}
              </div>

              <div className="news-actions">
                <button
                  onClick={() =>
                    navigate(`/admin/news/edit/${item._id}`)
                  }
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    handleStatusToggle(item._id, item.status)
                  }
                >
                  {item.status === "published"
                    ? "Unpublish"
                    : "Publish"}
                </button>

                <span className={`status ${item.status}`}>
                  {item.status.toUpperCase()}
                </span>


                <button
                  className="danger"
                  onClick={() => handleDelete(item._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default NewsAdmin;




// import { useEffect, useState } from "react";
// import { getAllNews, deleteNews, updateNewsStatus,} from "../../api/adminApi";
// import AdminLayout from "../../components/Admin/AdminLayout"
// import "./Admin.css";
// import { useNavigate } from "react-router-dom";

// const NewsAdmin = () => {
//   const [news, setNews] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate()

//   const fetchNews = async () => {
//     try {
//       const res = await getAllNews();
//       setNews(Array.isArray(res.data) ? res.data : []);
//     } catch (err) {
//       console.error("Failed to load news", err);
//     } finally {
//       setLoading(false);
//     }
//   };

// const handleDelete = async (id) => {
//   const confirm = window.confirm(
//     "Are you sure you want to delete this news?"
//   );

//   if (!confirm) return;

//   try {
//     await deleteNews(id);
//     setNews((prev) => prev.filter((n) => n._id !== id));
//   } catch (err) {
//     alert("Failed to delete news");
//   }
// };


// const handleStatusToggle = async (id, currentStatus) => {
//   const newStatus = currentStatus === "published" ? "draft" : "published";
//   try {
//     await updateNewsStatus(id, newStatus);
//     fetchNews(); // Refresh list
//   } catch (err) {
//     console.error("Failed to update status", err);
//   }
// };


  
//   useEffect(() => {
//     fetchNews();
//   }, []);

//   if (loading) {
//   return (
//     <AdminLayout>
//       <div className="loading-state">Loading news…</div>
//     </AdminLayout>
//   );
// }


//   return (
//   <AdminLayout>
//     <div className="news-admin">
//       <div className="news-header">
//   <h2>News Management</h2>

//   <button
//     className="create-btn"
//     onClick={() => navigate("/admin/news/create")}
//   >
//     + Create News
//   </button>
//     </div>

//       {news.length === 0 && (
//         <div className="empty-state">
//           <p>No news has been published yet.</p>
//         </div>
//       )}

//       <div className="news-grid">
//         {news.map((item) => (
//           <div className="news-card" key={item._id}>
//             <h3>{item.title}</h3>
//             <p>{item.content?.slice(0, 120)}...</p>

//             <div className="news-gallery">
//               {item.images?.map((img, i) => (
//                 <img
//                   key={i}
//                   src={`http://localhost:5000/uploads/news/${img}`}
//                   alt="news"
//                 />
//               ))}
//             </div>

//     <div className="news-actions">
//   <button>Edit</button>

//   <button
//     onClick={() => handleStatusToggle(item._id, item.status)}
//   >
//     {item.status === "published" ? "Unpublish" : "Publish"}
//   </button>

//   <button
//     className="danger"
//     onClick={() => handleDelete(item._id)}
//   >
//     Delete
//   </button>
// </div>

//     <button
//     onClick={() => navigate(`/admin/news/edit/${item._id}`)}>
//      Edit
//   </button>

//   <button
//   className="delete-btn"
//   onClick={() => handleDelete(item._id)}>
//   Delete
//   </button>

//           </div>
        
//         ))}
//       </div>
//     </div>
//   </AdminLayout>
// );


// };

// export default NewsAdmin;

