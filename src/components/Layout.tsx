
import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import { PageTransition } from "./PageTransition";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-grow">
        <Sidebar />
        <main className="flex-grow pt-24 px-4 md:px-6">
          <PageTransition>{children}</PageTransition>
        </main>
      </div>
      <footer className="py-6 mt-10 border-t border-border">
        <div className="container max-w-7xl mx-auto px-6 text-center text-muted-foreground">
          <p>© {new Date().getFullYear()} Hệ thống Quản lý Nhân sự. Bản quyền được bảo lưu.</p>
        </div>
      </footer>
    </div>
  );
};
