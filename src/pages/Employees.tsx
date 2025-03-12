
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Search, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  FileText,
  Filter 
} from "lucide-react";
import { AddEmployeeDialog, EmployeeFormData } from "@/components/AddEmployeeDialog";
import { EditEmployeeDialog } from "@/components/EditEmployeeDialog";
import { useToast } from "@/hooks/use-toast";

// Kiểu dữ liệu cho nhân viên
interface Employee {
  id: number;
  name: string;
  position: string;
  department: string;
  joinDate: string;
  status: string;
}

// Dữ liệu mẫu
const initialEmployeeData: Employee[] = [
  { id: 1, name: "Nguyễn Văn A", position: "Giám đốc", department: "Ban giám đốc", joinDate: "01/01/2020", status: "Đang làm việc" },
  { id: 2, name: "Trần Thị B", position: "Trưởng phòng", department: "Kế toán", joinDate: "15/03/2020", status: "Đang làm việc" },
  { id: 3, name: "Lê Văn C", position: "Nhân viên", department: "Kỹ thuật", joinDate: "10/05/2021", status: "Đang làm việc" },
  { id: 4, name: "Phạm Thị D", position: "Nhân viên", department: "Nhân sự", joinDate: "22/07/2021", status: "Đang làm việc" },
  { id: 5, name: "Hoàng Văn E", position: "Nhân viên", department: "Kinh doanh", joinDate: "30/09/2021", status: "Nghỉ việc" },
  { id: 6, name: "Ngô Thị F", position: "Nhân viên", department: "Kỹ thuật", joinDate: "05/02/2022", status: "Đang làm việc" },
  { id: 7, name: "Vũ Văn G", position: "Nhân viên", department: "Kinh doanh", joinDate: "18/04/2022", status: "Đang làm việc" },
  { id: 8, name: "Đặng Thị H", position: "Nhân viên", department: "Kế toán", joinDate: "09/08/2022", status: "Đang làm việc" },
];

const Employees = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [employeeData, setEmployeeData] = useState<Employee[]>(initialEmployeeData);
  const { toast } = useToast();
  
  const filteredEmployees = employeeData.filter(employee => 
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddEmployee = (newEmployee: EmployeeFormData) => {
    const today = new Date();
    const formattedDate = `${today.getDate().toString().padStart(2, '0')}/${(today.getMonth() + 1).toString().padStart(2, '0')}/${today.getFullYear()}`;
    
    const employee: Employee = {
      id: employeeData.length > 0 ? Math.max(...employeeData.map(e => e.id)) + 1 : 1,
      name: newEmployee.name,
      position: newEmployee.position,
      department: newEmployee.department,
      joinDate: formattedDate,
      status: "Đang làm việc"
    };
    
    setEmployeeData(prev => [...prev, employee]);
  };

  const handleUpdateEmployee = (id: number, updatedEmployee: EmployeeFormData) => {
    setEmployeeData(prev => 
      prev.map(employee => 
        employee.id === id 
          ? { 
              ...employee, 
              name: updatedEmployee.name,
              position: updatedEmployee.position,
              department: updatedEmployee.department
            } 
          : employee
      )
    );
  };

  const handleDeleteEmployee = (id: number) => {
    setEmployeeData(prev => prev.filter(employee => employee.id !== id));
    toast({
      title: "Xóa nhân viên thành công",
      description: "Đã xóa nhân viên khỏi hệ thống"
    });
  };

  return (
    <div className="container max-w-7xl mx-auto mt-8">
      <h1 className="text-3xl font-semibold mb-6">Quản lý nhân sự</h1>
      
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Danh sách nhân viên</CardTitle>
              <CardDescription>
                Quản lý thông tin của tất cả nhân viên trong công ty
              </CardDescription>
            </div>
            <AddEmployeeDialog onAddEmployee={handleAddEmployee} />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                placeholder="Tìm kiếm nhân viên..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" className="w-full md:w-auto">
              <Filter className="h-4 w-4 mr-2" />
              Lọc
            </Button>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Họ và tên</TableHead>
                  <TableHead>Vị trí</TableHead>
                  <TableHead>Phòng ban</TableHead>
                  <TableHead>Ngày vào làm</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEmployees.length > 0 ? (
                  filteredEmployees.map((employee) => (
                    <TableRow key={employee.id}>
                      <TableCell className="font-medium">{employee.name}</TableCell>
                      <TableCell>{employee.position}</TableCell>
                      <TableCell>{employee.department}</TableCell>
                      <TableCell>{employee.joinDate}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          employee.status === "Đang làm việc" 
                            ? "bg-green-100 text-green-800" 
                            : "bg-red-100 text-red-800"
                        }`}>
                          {employee.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Mở menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <FileText className="h-4 w-4 mr-2" />
                              Chi tiết
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <EditEmployeeDialog 
                                employee={employee} 
                                onUpdateEmployee={handleUpdateEmployee}
                                trigger={
                                  <div className="flex items-center w-full cursor-default">
                                    <Edit className="h-4 w-4 mr-2" />
                                    Chỉnh sửa
                                  </div>
                                }
                              />
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="text-destructive"
                              onClick={() => handleDeleteEmployee(employee.id)}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Xóa
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                      Không tìm thấy nhân viên nào
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Employees;
