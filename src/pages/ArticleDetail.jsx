import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import "./ArticleDetail.css";

export default function ArticleDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  // 判断是不是自己的文章（用于显示编辑/删除）
  const currentUser = JSON.parse(localStorage.getItem("user") || "null");
  const isOwner =
    article && currentUser && article.author?.id === currentUser.id;

  useEffect(() => {
    api
      .get(`/articles/${id}`)
      .then((res) => setArticle(res.data?.data ?? res.data))
      .catch(() => setArticle(null))
      .finally(() => setLoading(false));
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("确定删除这篇文章吗？")) return;
    try {
      await api.delete(`/articles/${id}`);
      navigate("/");
    } catch {
      alert("删除失败");
    }
  };

  if (loading) return <div className="container">加载中…</div>;
  if (!article) return <div className="container">文章不存在</div>;

  return (
    <div className="container">
      <article className="detail">
        <Link to="/" className="detail-back">
          ← 返回列表
        </Link>

        <h1 className="detail-title">{article.title}</h1>

        <div className="detail-meta">
          <span>{article.author?.username ?? article.author ?? "匿名"}</span>
          <span>·</span>
          <span>{article.created_at?.slice(0, 10)}</span>
        </div>

        {isOwner && (
          <div className="detail-actions">
            <Link
              to={`/article/edit/${article.id}`}
              className="btn btn-ghost"
            >
              编辑
            </Link>
            <button className="btn btn-danger" onClick={handleDelete}>
              删除
            </button>
          </div>
        )}

        <div className="detail-content">{article.content}</div>
      </article>
    </div>
  );
}