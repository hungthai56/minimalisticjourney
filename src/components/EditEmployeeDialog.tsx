
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Pencil } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { EmployeeFormData } from "./AddEmployeeDialog";

interface Employee {
  id: number;
  name: string;
  position: string;
  department: string;
  joinDate: string;
  status: string;
}

type EditEmployeeDialogProps = {
  employee: Employee;
  onUpdateEmployee: (id: number, employee: EmployeeFormData) => void;
  trigger?: React.ReactNode;
};

export const EditEmployeeDialog = ({ 
  employee, 
  onUpdateEmployee,
  trigger
}: EditEmployeeDialogProps) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<EmployeeFormData>({
    name: "",
    position: "",
    department: "",
  });
  const { toast } = useToast();

  // Set form data when employee changes or dialog opens
  useEffect(() => {
    if (employee) {
      setFormData({
        name: employee.name,
        position: employee.position,
        department: employee.department,
      });
    }
  }, [employee, open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string, field: keyof EmployeeFormData) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.position || !formData.department) {
      toast({
        variant: "destructive",
        title: "Thiếu thông tin",
        description: "Vui lòng điền đầy đủ thông tin nhân viên",
      });
      return;
    }

    // Update employee
    onUpdateEmployee(employee.id, formData);
    
    // Show success message
    toast({
      title: "Cập nhật nhân viên thành công",
      description: `Đã cập nhật thông tin nhân viên ${formData.name}`,
    });
    
    // Close dialog
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
            <Pencil className="h-4 w-4" />
            <span className="sr-only">Chỉnh sửa nhân viên</span>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Chỉnh sửa thông tin nhân viên</DialogTitle>
            <DialogDescription>
              Cập nhật thông tin của nhân viên trong biểu mẫu dưới đây.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Họ và tên
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="col-span-3"
                placeholder="Nguyễn Văn A"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="position" className="text-right">
                Vị trí
              </Label>
              <Select 
                value={formData.position} 
                onValueChange={(value) => handleSelectChange(value, "position")}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Chọn vị trí" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Giám đốc">Giám đốc</SelectItem>
                  <SelectItem value="Trưởng phòng">Trưởng phòng</SelectItem>
                  <SelectItem value="Nhân viên">Nhân viên</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="department" className="text-right">
                Phòng ban
              </Label>
              <Select 
                value={formData.department} 
                onValueChange={(value) => handleSelectChange(value, "department")}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Chọn phòng ban" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Ban giám đốc">Ban giám đốc</SelectItem>
                  <SelectItem value="Kế toán">Kế toán</SelectItem>
                  <SelectItem value="Kỹ thuật">Kỹ thuật</SelectItem>
                  <SelectItem value="Kinh doanh">Kinh doanh</SelectItem>
                  <SelectItem value="Nhân sự">Nhân sự</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Cập nhật</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
