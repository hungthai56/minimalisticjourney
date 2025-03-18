
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ThemeToggle } from "@/components/ThemeToggle";
import { User, initialUsersData } from "@/types/user";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Initialize users in localStorage if not already set
  useEffect(() => {
    if (!localStorage.getItem("users")) {
      localStorage.setItem("users", JSON.stringify(initialUsersData));
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Get users from localStorage
    const users: User[] = JSON.parse(localStorage.getItem("users") || JSON.stringify(initialUsersData));
    
    // Find matching user
    const user = users.find(user => user.username === username && user.password === password);
    
    setTimeout(() => {
      if (user) {
        // Save logged in user info (excluding password)
        const { password, ...userInfo } = user;
        localStorage.setItem("user", JSON.stringify(userInfo));
        
        toast({
          title: "Đăng nhập thành công",
          description: `Chào mừng ${user.name} trở lại với hệ thống quản lý nhân sự`,
        });
        
        navigate("/");
      } else {
        toast({
          title: "Đăng nhập thất bại",
          description: "Tên đăng nhập hoặc mật khẩu không chính xác",
          variant: "destructive",
        });
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl">Đăng nhập</CardTitle>
          <CardDescription>
            Đăng nhập vào hệ thống quản lý nhân sự
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="username">Tên đăng nhập</Label>
                <Input
                  id="username"
                  placeholder="admin"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Mật khẩu</Label>
                  <a href="#" className="text-sm text-primary hover:underline">
                    Quên mật khẩu?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full mr-2"></div>
                    Đang đăng nhập...
                  </div>
                ) : (
                  "Đăng nhập"
                )}
              </Button>
              <div className="text-center text-sm text-muted-foreground">
                <span>Chưa có tài khoản? </span>
                <Button variant="link" className="p-0" onClick={() => navigate("/register")}>
                  Đăng ký
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="text-center text-sm text-muted-foreground">
          <p className="w-full">
            Sử dụng tên đăng nhập <span className="font-medium">admin</span> và mật khẩu{" "}
            <span className="font-medium">admin</span> để đăng nhập với quyền quản trị.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
