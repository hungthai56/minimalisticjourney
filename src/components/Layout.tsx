
import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { PageTransition } from "./PageTransition";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24">
        <PageTransition>{children}</PageTransition>
      </main>
      <footer className="py-8 mt-24 border-t border-border">
        <div className="container max-w-5xl mx-auto px-6 text-center text-muted-foreground">
          <p>© {new Date().getFullYear()} Personal Website. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};
