
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UserTable } from "@/components/users/UserTable";
import { AddUserDialog } from "@/components/users/AddUserDialog";
import { useToast } from "@/hooks/use-toast";
import { User, initialUsersData } from "@/types/user";
import { usePermissions } from "@/hooks/use-permissions";

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const { toast } = useToast();
  const { isAdmin } = usePermissions();

  // Load users from localStorage
  useEffect(() => {
    const storedUsers = localStorage.getItem("users");
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    } else {
      setUsers(initialUsersData);
    }
  }, []);

  // Check if user is admin, if not redirect
  useEffect(() => {
    if (!isAdmin()) {
      toast({
        variant: "destructive",
        title: "Không có quyền truy cập",
        description: "Bạn không có quyền truy cập trang này",
      });
      // Redirect to dashboard after showing toast
      setTimeout(() => {
        window.location.href = "/";
      }, 1500);
    }
  }, [isAdmin, toast]);

  const handleUpdateUser = (
    id: number,
    updatedUser: {
      username: string;
      name: string;
      role: "admin" | "user";
    }
  ) => {
    const updatedUsers = users.map((user) =>
      user.id === id
        ? {
            ...user,
            username: updatedUser.username,
            name: updatedUser.name,
            role: updatedUser.role,
          }
        : user
    );
    
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    
    toast({
      title: "Cập nhật thành công",
      description: "Thông tin tài khoản đã được cập nhật",
    });
  };

  const handleDeleteUser = (id: number) => {
    // Don't allow deleting the last admin
    const admins = users.filter(user => user.role === "admin");
    const userToDelete = users.find(user => user.id === id);
    
    if (userToDelete?.role === "admin" && admins.length <= 1) {
      toast({
        variant: "destructive",
        title: "Không thể xóa",
        description: "Không thể xóa tài khoản quản trị viên cuối cùng",
      });
      return;
    }
    
    // Proceed with deletion
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    
    toast({
      title: "Xóa tài khoản thành công",
      description: "Tài khoản đã được xóa khỏi hệ thống",
    });
  };

  const handleAddUser = (newUser: {
    username: string;
    password: string;
    name: string;
    role: "admin" | "user";
  }) => {
    // Check if username already exists
    if (users.some((user) => user.username === newUser.username)) {
      toast({
        variant: "destructive",
        title: "Lỗi",
        description: "Tên đăng nhập đã tồn tại",
      });
      return;
    }
    
    // Create new user with ID
    const newUserWithId: User = {
      id: users.length > 0 ? Math.max(...users.map((user) => user.id)) + 1 : 1,
      username: newUser.username,
      password: newUser.password,
      name: newUser.name,
      role: newUser.role,
      avatar: "/placeholder.svg",
    };
    
    // Update state and localStorage
    const updatedUsers = [...users, newUserWithId];
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    
    toast({
      title: "Thêm tài khoản thành công",
      description: `Đã thêm tài khoản cho ${newUser.name}`,
    });
    
    setIsAddUserOpen(false);
  };

  return (
    <div className="container max-w-7xl mx-auto mt-8">
      <h1 className="text-3xl font-semibold mb-6">Quản lý tài khoản</h1>

      <Card>
        <CardHeader>
          <CardTitle>Danh sách tài khoản</CardTitle>
          <CardDescription>
            Quản lý các tài khoản đăng nhập hệ thống
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UserTable
            users={users}
            onUpdateUser={handleUpdateUser}
            onDeleteUser={handleDeleteUser}
            onAddUser={() => setIsAddUserOpen(true)}
          />
        </CardContent>
      </Card>

      <AddUserDialog
        open={isAddUserOpen}
        onClose={() => setIsAddUserOpen(false)}
        onSave={handleAddUser}
      />
    </div>
  );
};

export default UserManagement;
