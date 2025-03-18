
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AddUserDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (newUser: {
    username: string;
    password: string;
    name: string;
    role: "admin" | "user";
  }) => void;
}

export const AddUserDialog = ({ open, onClose, onSave }: AddUserDialogProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState<"admin" | "user">("user");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setPasswordError("Mật khẩu không khớp");
      return;
    }
    
    onSave({
      username,
      password,
      name,
      role
    });
    
    // Reset form
    setUsername("");
    setPassword("");
    setConfirmPassword("");
    setName("");
    setRole("user");
    setPasswordError("");
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Thêm tài khoản mới</DialogTitle>
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
              <Label htmlFor="password" className="text-right">
                Mật khẩu
              </Label>
              <Input
                id="password"
                type="password"
                className="col-span-3"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError("");
                }}
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="confirmPassword" className="text-right">
                Nhập lại mật khẩu
              </Label>
              <div className="col-span-3">
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setPasswordError("");
                  }}
                  required
                  className={passwordError ? "border-destructive" : ""}
                />
                {passwordError && (
                  <p className="text-destructive text-sm mt-1">{passwordError}</p>
                )}
              </div>
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
            <Button type="submit">Thêm mới</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
