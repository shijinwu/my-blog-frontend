import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import "./ArticleList.css";

export default function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/articles")
      .then((res) => {
        // 兼容后端直接返回数组或 { data: [...] } 两种格式
        setArticles(res.data?.data ?? res.data ?? []);
      })
      .catch(() => setArticles([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="container">加载中…</div>;

  if (articles.length === 0) {
    return (
      <div className="container">
        <div className="empty">
          <p>还没有文章</p>
          <Link to="/article/edit" className="btn btn-primary">
            写第一篇
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="list-header">
        <h1>全部文章</h1>
        <span className="list-count">共 {articles.length} 篇</span>
      </div>

      <div className="article-list">
        {articles.map((a) => (
          <Link to={`/article/${a.id}`} key={a.id} className="article-card">
            <h2 className="article-card-title">{a.title}</h2>
            {a.content && (
              <p className="article-card-excerpt">
                {a.content.slice(0, 80)}
                {a.content.length > 80 ? "…" : ""}
              </p>
            )}
            <div className="article-card-meta">
              <span>{a.author?.username ?? a.author ?? "匿名"}</span>
              <span>{a.created_at?.slice(0, 10)}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}