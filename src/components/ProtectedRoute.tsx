
import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";

// Trong thực tế, bạn sẽ muốn sử dụng một state manager như Redux 
// hoặc một hook xác thực chuyên biệt
const ProtectedRoute = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  
  useEffect(() => {
    // Kiểm tra xác thực từ localStorage
    const checkAuth = () => {
      const user = localStorage.getItem("user");
      setIsAuthenticated(!!user);
    };
    
    checkAuth();
  }, []);
  
  const handleLogout = () => {
    localStorage.removeItem("user");
    toast({
      title: "Đăng xuất thành công",
      description: "Bạn đã đăng xuất khỏi hệ thống"
    });
    navigate("/login");
  };

  // Export the logout function for use in other components
  (window as any).handleLogout = handleLogout;
  
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
