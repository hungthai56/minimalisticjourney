
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Briefcase, Clock, FilePlus, Home, Menu, Users, UserPlus } from "lucide-react";
import { useMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { LogoutButton } from "./LogoutButton";
import { usePermissions } from "@/hooks/use-permissions";

export const MainNav = () => {
  const location = useLocation();
  const { isMobile } = useMobile();
  const { isAdmin } = usePermissions();
  
  // Sidebar navigation items
  const items = [
    {
      title: "Tổng quan",
      href: "/",
      icon: <Home className="h-5 w-5" />,
      authRequired: false, // Tất cả đều thấy được
    },
    {
      title: "Nhân sự",
      href: "/employees",
      icon: <Users className="h-5 w-5" />,
      authRequired: true, // Chỉ admin thấy được
    },
    {
      title: "Yêu cầu",
      href: "/requests",
      icon: <FilePlus className="h-5 w-5" />,
      authRequired: false, // Tất cả đều thấy được
    },
    {
      title: "Tài khoản",
      href: "/users",
      icon: <UserPlus className="h-5 w-5" />,
      authRequired: true, // Chỉ admin thấy được
    },
    {
      title: "Thông tin cá nhân",
      href: "/profile",
      icon: <Briefcase className="h-5 w-5" />,
      authRequired: false, // Tất cả đều thấy được
    }
  ];
  
  // Filter items based on user role
  const filteredItems = items.filter(item => 
    !item.authRequired || (item.authRequired && isAdmin())
  );

  return (
    <nav className="flex gap-2 flex-col">
      {filteredItems.map((item) => (
        <Link
          key={item.href}
          to={item.href}
          className={cn(
            "flex items-center gap-x-2 text-muted-foreground font-medium p-2 rounded-md hover:text-foreground hover:bg-secondary transition-colors",
            location.pathname === item.href && "bg-secondary text-foreground"
          )}
        >
          {item.icon}
          <span>{item.title}</span>
        </Link>
      ))}
    </nav>
  );
};

export const MobileNav = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="md:hidden"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col pr-0">
        <MainNav />
        <div className="mt-auto flex items-center justify-between p-2">
          <div className="text-xs text-muted-foreground">
            Phiên bản 1.0.0
          </div>
          <LogoutButton />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export const Sidebar = () => {
  const { isMobile } = useMobile();

  if (isMobile) {
    return null;
  }

  return (
    <div className="hidden md:flex h-screen w-64 flex-col overflow-hidden border-r bg-background px-3 py-4">
      <Link to="/" className="flex h-9 items-center space-x-2 px-2">
        <Clock className="h-6 w-6" />
        <span className="text-lg font-bold">HR Management</span>
      </Link>
      <ScrollArea className="flex-1 py-4">
        <MainNav />
      </ScrollArea>
      <div className="flex items-center justify-between p-2 mt-auto">
        <div className="text-xs text-muted-foreground">
          Phiên bản 1.0.0
        </div>
        <LogoutButton />
      </div>
    </div>
  );
};
