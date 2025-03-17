
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Employee } from "@/types/employee";
import { CalendarDays } from "lucide-react";

interface EditLeaveDaysDialogProps {
  employee: Employee;
  onUpdateLeaveDays: (employeeId: number, leaveDays: number) => void;
  trigger: React.ReactNode;
}

export const EditLeaveDaysDialog = ({ 
  employee, 
  onUpdateLeaveDays, 
  trigger 
}: EditLeaveDaysDialogProps) => {
  const [open, setOpen] = useState(false);
  const [leaveDays, setLeaveDays] = useState(employee.remainingLeaveDays || 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateLeaveDays(employee.id, leaveDays);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Cập nhật số ngày phép</DialogTitle>
          <DialogDescription>
            Chỉnh sửa số ngày phép còn lại của nhân viên {employee.name}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="flex items-center gap-4">
              <CalendarDays className="h-10 w-10 text-blue-500" />
              <div>
                <p className="font-medium">{employee.name}</p>
                <p className="text-sm text-muted-foreground">{employee.position}, {employee.department}</p>
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="leave-days">Số ngày phép còn lại</Label>
              <Input
                id="leave-days"
                type="number"
                min="0"
                max="30"
                value={leaveDays}
                onChange={(e) => setLeaveDays(Number(e.target.value))}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Lưu thay đổi</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
