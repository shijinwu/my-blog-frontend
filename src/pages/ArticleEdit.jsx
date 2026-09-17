import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from '../api/axios';
import "./ArticleEdit.css";

export default function ArticleEdit() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState({ title: "", content: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEdit) {
      api.get(`/articles/${id}`).then((res) => {
        setForm({ title: res.data.title, content: res.data.content });
      });
    }
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEdit) {
        await api.put(`/articles/${id}`, form);
      } else {
        await api.post("/articles", form);
      }
      navigate("/");
    } catch (err) {
      alert("保存失败");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="edit-card">
        <h1 className="edit-title">{isEdit ? "编辑文章" : "写文章"}</h1>

        <form onSubmit={handleSubmit} className="edit-form">
          <div className="form-item">
            <label>标题</label>
            <input
              className="input"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="给文章起个标题"
              required
            />
          </div>

          <div className="form-item">
            <label>正文</label>
            <textarea
              className="input textarea"
              name="content"
              value={form.content}
              onChange={handleChange}
              placeholder="开始写点什么…"
              rows={12}
              required
            />
          </div>

          <div className="edit-actions">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => navigate(-1)}
            >
              取消
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? "保存中…" : isEdit ? "保存修改" : "发布"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}