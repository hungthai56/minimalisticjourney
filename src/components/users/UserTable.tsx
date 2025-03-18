
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, UserPlus } from "lucide-react";
import { User } from "@/types/user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { EditUserDialog } from "./EditUserDialog";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";

interface UserTableProps {
  users: User[];
  onUpdateUser: (id: number, updatedUser: {
    username: string;
    name: string;
    role: "admin" | "user";
  }) => void;
  onDeleteUser: (id: number) => void;
  onAddUser: () => void;
}

export const UserTable = ({ users, onUpdateUser, onDeleteUser, onAddUser }: UserTableProps) => {
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deletingUserId, setDeletingUserId] = useState<number | null>(null);

  const handleEditClick = (user: User) => {
    setEditingUser(user);
  };

  const handleDeleteClick = (userId: number) => {
    setDeletingUserId(userId);
  };

  const handleEditClose = () => {
    setEditingUser(null);
  };

  const handleDeleteClose = () => {
    setDeletingUserId(null);
  };

  const handleConfirmDelete = () => {
    if (deletingUserId) {
      onDeleteUser(deletingUserId);
      setDeletingUserId(null);
    }
  };

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Button onClick={onAddUser} className="flex items-center gap-2">
          <UserPlus className="h-4 w-4" />
          Thêm tài khoản
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">ID</TableHead>
              <TableHead className="w-[250px]">Người dùng</TableHead>
              <TableHead>Tên đăng nhập</TableHead>
              <TableHead>Vai trò</TableHead>
              <TableHead className="text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center h-24 text-muted-foreground">
                  Không có dữ liệu người dùng
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                        <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div>{user.name}</div>
                    </div>
                  </TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>
                    <Badge variant={user.role === "admin" ? "default" : "secondary"}>
                      {user.role === "admin" ? "Quản trị viên" : "Người dùng"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleEditClick(user)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="text-destructive hover:bg-destructive/10 hover:text-destructive hover:border-destructive"
                        onClick={() => handleDeleteClick(user.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {editingUser && (
        <EditUserDialog
          user={editingUser}
          open={!!editingUser}
          onClose={handleEditClose}
          onSave={(updatedUser) => {
            onUpdateUser(editingUser.id, updatedUser);
            handleEditClose();
          }}
        />
      )}

      <ConfirmDialog
        open={!!deletingUserId}
        onClose={handleDeleteClose}
        onConfirm={handleConfirmDelete}
        title="Xác nhận xóa tài khoản"
        description="Bạn có chắc chắn muốn xóa tài khoản này? Hành động này không thể hoàn tác."
        confirmText="Xóa"
        cancelText="Hủy"
      />
    </div>
  );
};
