import { useState } from "react";
import "./NewsForm.css";

const NewsForm = ({ initialData = {}, onSubmit, loading }) => {
  const [title, setTitle] = useState(initialData.title || "");
  const [content, setContent] = useState(initialData.content || "");
  const [images, setImages] = useState([]);

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !content) {
      alert("Title and content are required");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    images.forEach((img) => formData.append("images", img));

    onSubmit(formData);
  };

  return (
    <form className="news-form" onSubmit={handleSubmit}>
      <h2>{initialData._id ? "Edit News" : "Create News"}</h2>

      <label>Title</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <label>Content</label>
      <textarea
        rows="6"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <label>Images</label>
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleImageChange}
      />

      <button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Publish"}
      </button>
    </form>
  );
};

export default NewsForm;
