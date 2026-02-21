import { useState } from "react";
import { createNews } from "../../api/adminApi";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../components/Admin/AdminLayout";
import "./CreateNews.css";

const CreateNews = () => {
    const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [preview, setPreview] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleImages = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);

    const previews = files.map((file) => URL.createObjectURL(file));
    setPreview(previews);
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);

    images.forEach((img) => {
      formData.append("images", img);
    });

    await createNews(formData);

    alert("News created successfully");
    navigate("/admin/news"); // ✅ KEY FIX
  } catch (err) {
    console.error(err);
    alert("Failed to create news");
  } finally {
    setLoading(false);
  }
};


  return (
    <AdminLayout>
      <div className="create-news">
        <h2>Create News</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="News title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <textarea
            placeholder="News content"
            rows="6"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />

          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImages}
          />

          {preview.length > 0 && (
            <div className="preview-grid">
              {preview.map((src, i) => (
                <img key={i} src={src} alt="preview" />
              ))}
            </div>
          )}

          <button type="submit" disabled={loading}>
            {loading ? "Publishing..." : "Publish News"}
          </button>
        </form>
      </div>
    </AdminLayout>
  );
};

export default CreateNews;
