
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FileText, Calendar, Phone, Mail, Building, User } from "lucide-react";

interface Employee {
  id: number;
  name: string;
  position: string;
  department: string;
  joinDate: string;
  status: string;
}

type EmployeeDetailsDialogProps = {
  employee: Employee;
  trigger?: React.ReactNode;
};

export const EmployeeDetailsDialog = ({ 
  employee, 
  trigger 
}: EmployeeDetailsDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
            <FileText className="h-4 w-4" />
            <span className="sr-only">Xem chi tiết nhân viên</span>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Thông tin chi tiết nhân viên</DialogTitle>
          <DialogDescription>
            Thông tin chi tiết của nhân viên {employee.name}
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4 space-y-4">
          <div className="flex items-center">
            <div className="h-20 w-20 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xl font-medium mr-6">
              {employee.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2)}
            </div>
            <div>
              <h3 className="text-lg font-semibold">{employee.name}</h3>
              <p className="text-muted-foreground">{employee.position}</p>
              <div className={`px-2 py-1 text-xs rounded-full inline-flex items-center mt-2 ${
                employee.status === "Đang làm việc" 
                  ? "bg-green-100 text-green-800" 
                  : "bg-red-100 text-red-800"
              }`}>
                {employee.status}
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div className="grid gap-3">
            <div className="flex items-center">
              <Building className="h-4 w-4 mr-3 text-muted-foreground" />
              <span className="text-muted-foreground">Phòng ban:</span>
              <span className="ml-2 font-medium">{employee.department}</span>
            </div>
            
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-3 text-muted-foreground" />
              <span className="text-muted-foreground">Ngày vào làm:</span>
              <span className="ml-2 font-medium">{employee.joinDate}</span>
            </div>
            
            <div className="flex items-center">
              <Mail className="h-4 w-4 mr-3 text-muted-foreground" />
              <span className="text-muted-foreground">Email:</span>
              <span className="ml-2 font-medium">{employee.name.toLowerCase().replace(/ /g, '.')}@company.com</span>
            </div>
            
            <div className="flex items-center">
              <Phone className="h-4 w-4 mr-3 text-muted-foreground" />
              <span className="text-muted-foreground">Số điện thoại:</span>
              <span className="ml-2 font-medium">0987 xxx xxx</span>
            </div>
            
            <div className="flex items-center">
              <User className="h-4 w-4 mr-3 text-muted-foreground" />
              <span className="text-muted-foreground">Mã nhân viên:</span>
              <span className="ml-2 font-medium">EMP{employee.id.toString().padStart(3, '0')}</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
