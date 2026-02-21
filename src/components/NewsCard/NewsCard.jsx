import "./NewsCard.css";

const NewsCard = ({ news }) => {
  return (
    <div className="news-card">
      {news.images && (
        <img
          src={`http://localhost:5000${news.images}`}
          alt={news.title}
        />
      )}
      <h3>{news.title}</h3>
      
      <p>{news.content.slice(0, 120)}...</p>
    </div>
  );
};

export default NewsCard;
