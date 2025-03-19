
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
  PanelLeft,
  ChevronLeft,
  ChevronRight
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
  SidebarInset,
  SidebarRail,
  useSidebar
} from "@/components/ui/sidebar";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";

export const MainNav = () => {
  const location = useLocation();
  const { isAdmin } = usePermissions();
  
  const items = [
    {
      title: "Tổng quan",
      href: "/",
      icon: <Home className="h-5 w-5" />,
      authRequired: false,
    },
    {
      title: "Nhân sự",
      href: "/employees",
      icon: <Users className="h-5 w-5" />,
      authRequired: true,
    },
    {
      title: "Yêu cầu",
      href: "/requests",
      icon: <FilePlus className="h-5 w-5" />,
      authRequired: false,
    },
    {
      title: "Tài khoản",
      href: "/users",
      icon: <UserPlus className="h-5 w-5" />,
      authRequired: true,
    },
    {
      title: "Thông tin cá nhân",
      href: "/profile",
      icon: <Briefcase className="h-5 w-5" />,
      authRequired: false,
    }
  ];

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
  const { state, toggleSidebar } = useSidebar();
  const isCollapsed = state === "collapsed";

  if (isMobile) {
    return null;
  }

  return (
    <ShadcnSidebar className="hidden md:flex border-r pt-16">
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
        <div className="flex items-center gap-2">
          <LogoutButton />
          <Button 
            variant="outline" 
            size="icon" 
            onClick={toggleSidebar} 
            className="h-8 w-8"
            title={isCollapsed ? "Mở rộng" : "Thu nhỏ"}
          >
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
      </SidebarFooter>
      <SidebarRail />
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
