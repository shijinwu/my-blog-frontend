import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import api from './api/axios';
import Login from './pages/Login';
import { BrowserRouter, Routes, Route,Outlet } from 'react-router-dom';
import Register from './pages/Register';
import ArticleList from './pages/ArticleList';
import ArticleDetail from './pages/ArticleDetail';
import ArticleEdit from './pages/ArticleEdit';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from "./components/Navbar";


  function MainLayout() {
  return (
    <>
      <Navbar />
      <Outlet />   {/* 子页面渲染在这里 */}
    </>
  );
}


function App() {

   const [status, setStatus] = useState('检查中...');
 
     useEffect(() => {
        let cancelled = false;
        
        api.get('/auth/me')
            .then(data => {
                if (!cancelled) setStatus('后端连接正常');
            })
            .catch(err => {
                if (!cancelled) setStatus('请求结果：' + (err.response?.status || err.message));
            });

        return () => { cancelled = true; };
     }, []);
  
  

  
  return (
    <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
          <Route element={<MainLayout />}>
                <Route path="/" element={<ArticleList />} />
                <Route path="/article/:id" element={<ArticleDetail />} />
                <Route path="/article/edit" element={<ProtectedRoute>
            <ArticleEdit />
        </ProtectedRoute>} />
        <Route 
    path="/article/edit/:id" 
    element={
        <ProtectedRoute>
            <ArticleEdit />
        </ProtectedRoute>
    } 
          />
          </Route>
      </Routes>
      
        </BrowserRouter>
    )
}

export default App
