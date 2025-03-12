
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import { Bell, Menu, X } from "lucide-react";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || mobileMenuOpen
          ? "py-3 backdrop-blur-md bg-background/90 shadow-sm"
          : "py-4 bg-background"
      }`}
    >
      <div className="container max-w-full mx-auto px-6 flex items-center justify-between">
        <Link 
          to="/" 
          className="text-xl font-medium tracking-tight hover:opacity-80 transition-opacity duration-200"
          aria-label="Home"
        >
          Quản lý Nhân sự
        </Link>

        <div className="flex items-center space-x-4">
          <button className="relative p-2 rounded-full hover:bg-accent transition-colors">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
          </button>
          
          <ThemeToggle />
          
          <div className="hidden md:flex items-center space-x-2">
            <div className="text-sm text-right">
              <p className="font-medium">Nguyễn Văn A</p>
              <p className="text-xs text-muted-foreground">Admin</p>
            </div>
            <div className="h-9 w-9 rounded-full bg-primary/10 text-primary flex items-center justify-center font-medium">
              NA
            </div>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-foreground md:hidden"
            aria-label={mobileMenuOpen ? "Đóng menu" : "Mở menu"}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
