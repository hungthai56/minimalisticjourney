
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  ChevronLeft, 
  ChevronRight, 
  Users, 
  ClipboardList, 
  LogOut, 
  Home,
  UserCog
} from "lucide-react";

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };
  
  const menuItems = [
    { path: "/", label: "Trang chủ", icon: Home },
    { path: "/employees", label: "Nhân sự", icon: Users },
    { path: "/requests", label: "Yêu cầu ra/vào", icon: ClipboardList },
    { path: "/profile", label: "Thông tin cá nhân", icon: UserCog },
  ];
  
  return (
    <aside 
      className={`bg-card text-card-foreground border-r border-border transition-all duration-300 ${
        collapsed ? "w-[70px]" : "w-64"
      } fixed left-0 top-[72px] h-[calc(100vh-72px)] z-40 pb-4`}
    >
      <div className="flex flex-col h-full">
        <div className="flex justify-end p-2">
          <button 
            onClick={toggleSidebar} 
            className="p-1 rounded-full hover:bg-accent"
            aria-label={collapsed ? "Mở rộng" : "Thu gọn"}
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>
        
        <nav className="flex-1 mt-4">
          <ul className="space-y-1 px-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center px-4 py-3 rounded-md transition-colors ${
                    location.pathname === item.path
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-accent"
                  }`}
                >
                  <item.icon size={20} />
                  {!collapsed && <span className="ml-3">{item.label}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="mt-auto px-2">
          <Link
            to="/logout"
            className="flex items-center px-4 py-3 text-destructive hover:bg-destructive/10 rounded-md transition-colors"
          >
            <LogOut size={20} />
            {!collapsed && <span className="ml-3">Đăng xuất</span>}
          </Link>
        </div>
      </div>
    </aside>
  );
};
