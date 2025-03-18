
import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { MobileNav, ResponsiveSidebar } from "./Sidebar";
import { PageTransition } from "./PageTransition";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

export const Layout = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col w-full">
        <Navbar>
          <MobileNav />
        </Navbar>
        <div className="flex flex-grow">
          <ResponsiveSidebar />
          <SidebarInset className="pt-16 md:pt-20 px-4 md:px-6 lg:px-8 overflow-auto">
            <div className="max-w-6xl mx-auto w-full">
              <PageTransition>
                <Outlet />
              </PageTransition>
            </div>
            <footer className="py-6 mt-10 border-t border-border">
              <div className="container max-w-7xl mx-auto px-4 text-center text-muted-foreground">
                <p>© {new Date().getFullYear()} Hệ thống Quản lý Nhân sự. Bản quyền được bảo lưu.</p>
              </div>
            </footer>
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  );
};
