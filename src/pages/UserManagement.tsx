
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserTable } from "@/components/users/UserTable";
import { AddUserDialog } from "@/components/users/AddUserDialog";
import { useToast } from "@/hooks/use-toast";
import { User } from "@/types/user";
import { getUsers, createUser, updateUser, deleteUser } from "@/services/userService";

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const data = await getUsers();
        setUsers(data);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Lỗi",
          description: "Không thể tải danh sách người dùng",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [toast]);

  const handleAddUser = async (newUser: {
    username: string;
    password: string;
    name: string;
    role: "admin" | "user";
  }) => {
    try {
      const user = await createUser({
        username: newUser.username,
        name: newUser.name,
        role: newUser.role,
        email: `${newUser.username}@example.com`,
      });
      
      setUsers((prev) => [...prev, user]);
      
      toast({
        title: "Thành công",
        description: `Đã thêm tài khoản ${newUser.username}`,
      });
      
      setIsAddUserOpen(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Lỗi",
        description: "Không thể thêm tài khoản",
      });
    }
  };

  const handleUpdateUser = async (id: number, updatedUser: {
    username: string;
    name: string;
    role: "admin" | "user";
  }) => {
    try {
      await updateUser(id, updatedUser);
      
      setUsers((prev) =>
        prev.map((user) => (user.id === id ? { ...user, ...updatedUser } : user))
      );
      
      toast({
        title: "Thành công",
        description: "Đã cập nhật thông tin tài khoản",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Lỗi",
        description: "Không thể cập nhật tài khoản",
      });
    }
  };

  const handleDeleteUser = async (id: number) => {
    try {
      await deleteUser(id);
      
      setUsers((prev) => prev.filter((user) => user.id !== id));
      
      toast({
        title: "Thành công",
        description: "Đã xóa tài khoản",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Lỗi",
        description: "Không thể xóa tài khoản",
      });
    }
  };

  const handleOpenAddUserDialog = () => {
    setIsAddUserOpen(true);
  };

  const handleCloseAddUserDialog = () => {
    setIsAddUserOpen(false);
  };

  return (
    <div className="container max-w-7xl mx-auto mt-8">
      <h1 className="text-3xl font-semibold mb-6">Quản lý tài khoản</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Danh sách tài khoản</CardTitle>
          <CardDescription>
            Quản lý tất cả các tài khoản người dùng trong hệ thống
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-10">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
            </div>
          ) : (
            <UserTable
              users={users}
              onUpdateUser={handleUpdateUser}
              onDeleteUser={handleDeleteUser}
              onAddUser={handleOpenAddUserDialog}
            />
          )}
          
          <AddUserDialog
            open={isAddUserOpen}
            onClose={handleCloseAddUserDialog}
            onSave={handleAddUser}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default UserManagement;
