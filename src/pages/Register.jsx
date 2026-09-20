import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import "./Auth.css";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "",email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await api.post("/auth/register", form);
      // 注册成功直接跳登录（或自动登录，看你后端）
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "注册失败，请换个用户名试试");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-brand">📝 My Blog</div>
        <h1 className="auth-title">注册</h1>
        <p className="auth-subtitle">创建账号，开始记录</p>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="auth-error">{error}</div>}

          <div className="form-item">
            <label>用户名</label>
            <input
              className="input"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="取一个用户名"
              required
            />
          </div>
          
          <div className="form-item">
            <label>邮箱</label>
            <input
              className="input"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="请输入邮箱"
              required
            />
          </div>

          <div className="form-item">
            <label>密码</label>
            <input
              className="input"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="设置密码"
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary auth-submit"
            disabled={loading}
          >
            {loading ? "注册中…" : "注册"}
          </button>
        </form>

        <p className="auth-footer">
          已有账号？<Link to="/login">去登录</Link>
        </p>
      </div>
    </div>
  );
}