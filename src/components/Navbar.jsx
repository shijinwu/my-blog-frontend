import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-logo">
          📝 My Blog
        </Link>
        <div className="navbar-links">
          <Link to="/">首页</Link>
          {token ? (
            <>
              <Link to="/article/edit" className="btn btn-primary btn-sm">
                写文章
              </Link>
              <button className="btn btn-ghost btn-sm" onClick={handleLogout}>
                退出
              </button>
            </>
          ) : (
            <>
              <Link to="/login">登录</Link>
              <Link to="/register" className="btn btn-primary btn-sm">
                注册
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}