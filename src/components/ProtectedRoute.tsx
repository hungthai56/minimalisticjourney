
import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

// Trong thực tế, bạn sẽ muốn sử dụng một state manager như Redux 
// hoặc một hook xác thực chuyên biệt
const ProtectedRoute = () => {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  
  useEffect(() => {
    // Kiểm tra xác thực từ localStorage
    const checkAuth = () => {
      const user = localStorage.getItem("user");
      setIsAuthenticated(!!user);
    };
    
    checkAuth();
  }, []);
  
  // Đang kiểm tra xác thực
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }
  
  // Chưa xác thực, chuyển hướng đến trang đăng nhập
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  // Đã xác thực, render các route con
  return <Outlet />;
};

export default ProtectedRoute;
