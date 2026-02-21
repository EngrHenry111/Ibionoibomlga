import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getNewsById,
  updateNews,
} from "../../api/adminApi";

import AdminLayout from "../../components/Admin/AdminLayout";
import "./EditNews.css";

const EditNews = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await getNewsById(id);
        setTitle(res.data.title);
        setContent(res.data.content);
        setExistingImages(res.data.images || []);
      } catch (err) {
        console.error("Failed to load news", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [id]);

  const handleRemoveImage = (img) => {
    setExistingImages(existingImages.filter((i) => i !== img));
  };

  const handleNewImages = (e) => {
    setNewImages(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);

    existingImages.forEach((img) =>
      formData.append("existingImages", img)
    );

    newImages.forEach((img) =>
      formData.append("images", img)
    );

    try {
      await updateNews(id, formData);
      alert("News updated successfully");
      navigate("/admin/news");
    } catch (err) {
      console.error(err);
      alert("Failed to update news");
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <p>Loading...</p>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="edit-news">
        <h2>Edit News</h2>

        <form onSubmit={handleSubmit}>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            required
          />

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Content"
            required
          />

          <div className="image-section">
            <h4>Existing Images</h4>
            <div className="image-grid">
              {existingImages.map((img) => (
                <div key={img} className="image-box">
                  <img
                    src={`http://localhost:5000/uploads/news/${img}`}
                    alt=""
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(img)}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          <input
            type="file"
            multiple
            onChange={handleNewImages}
          />

          <button type="submit">Update News</button>
        </form>
      </div>
    </AdminLayout>
  );
};

export default EditNews;
