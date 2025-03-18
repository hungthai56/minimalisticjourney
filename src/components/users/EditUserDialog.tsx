
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User } from "@/types/user";

interface EditUserDialogProps {
  user: User;
  open: boolean;
  onClose: () => void;
  onSave: (updatedUser: {
    username: string;
    name: string;
    role: "admin" | "user";
  }) => void;
}

export const EditUserDialog = ({ user, open, onClose, onSave }: EditUserDialogProps) => {
  const [username, setUsername] = useState(user.username);
  const [name, setName] = useState(user.name);
  const [role, setRole] = useState<"admin" | "user">(user.role);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      username,
      name,
      role
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Chỉnh sửa thông tin tài khoản</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Họ và tên
              </Label>
              <Input
                id="name"
                className="col-span-3"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Tên đăng nhập
              </Label>
              <Input
                id="username"
                className="col-span-3"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">
                Vai trò
              </Label>
              <Select
                value={role}
                onValueChange={(value: "admin" | "user") => setRole(value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Chọn vai trò" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Quản trị viên</SelectItem>
                  <SelectItem value="user">Người dùng</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Hủy
            </Button>
            <Button type="submit">Lưu thay đổi</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
