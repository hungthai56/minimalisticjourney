
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Briefcase, 
  Clock, 
  FilePlus, 
  Home, 
  Menu, 
  Users, 
  UserPlus,
  PanelLeft
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger 
} from "@/components/ui/sheet";
import { LogoutButton } from "./LogoutButton";
import { usePermissions } from "@/hooks/use-permissions";
import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export const MainNav = () => {
  const location = useLocation();
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
    <SidebarMenu>
      {filteredItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <SidebarMenuButton 
            asChild 
            isActive={location.pathname === item.href}
            tooltip={item.title}
          >
            <Link to={item.href}>
              {item.icon}
              <span>{item.title}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
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
      <SheetContent side="left" className="flex flex-col pr-0 w-72 p-0">
        <div className="flex h-16 items-center px-4 border-b">
          <Link to="/" className="flex items-center space-x-2">
            <Clock className="h-6 w-6" />
            <span className="text-lg font-bold">HR Management</span>
          </Link>
        </div>
        <ScrollArea className="flex-1 py-4 px-4">
          <MainNav />
        </ScrollArea>
        <div className="mt-auto flex items-center justify-between p-4 border-t">
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
  const isMobile = useIsMobile();

  if (isMobile) {
    return null;
  }

  return (
    <ShadcnSidebar className="hidden md:flex border-r">
      <SidebarHeader className="flex h-16 items-center px-4">
        <Link to="/" className="flex items-center space-x-2">
          <Clock className="h-6 w-6" />
          <span className="text-lg font-bold">HR Management</span>
        </Link>
      </SidebarHeader>
      <SidebarContent className="px-4">
        <MainNav />
      </SidebarContent>
      <SidebarFooter className="flex items-center justify-between p-4 mt-auto">
        <div className="text-xs text-muted-foreground">
          Phiên bản 1.0.0
        </div>
        <LogoutButton />
      </SidebarFooter>
    </ShadcnSidebar>
  );
};

export const ResponsiveSidebar = () => {
  return (
    <SidebarProvider defaultOpen={true}>
      <Sidebar />
    </SidebarProvider>
  );
};
