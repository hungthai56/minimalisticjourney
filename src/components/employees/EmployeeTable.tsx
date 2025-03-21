
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
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Edit, Trash2, FileText, Clock, Calendar, CalendarDays } from "lucide-react";
import { Employee } from "@/types/employee";
import { EditEmployeeDialog } from "@/components/EditEmployeeDialog";
import { EmployeeDetailsDialog } from "@/components/EmployeeDetailsDialog";
import { EmployeeFormData } from "@/components/AddEmployeeDialog";
import { EditLeaveDaysDialog } from "./EditLeaveDaysDialog";

type EmployeeTableProps = {
  employees: Employee[];
  onUpdateEmployee: (id: number, employee: EmployeeFormData) => void;
  onDeleteEmployee: (id: number) => void;
  onUpdateLeaveDays: (id: number, leaveDays: number) => void;
};

export const EmployeeTable = ({ 
  employees, 
  onUpdateEmployee, 
  onDeleteEmployee,
  onUpdateLeaveDays
}: EmployeeTableProps) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Họ và tên</TableHead>
            <TableHead>Vị trí</TableHead>
            <TableHead>Phòng ban</TableHead>
            <TableHead className="hidden md:table-cell">Ngày vào làm</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead className="hidden lg:table-cell">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                Phép còn
              </div>
            </TableHead>
            <TableHead className="hidden lg:table-cell">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                Giờ làm
              </div>
            </TableHead>
            <TableHead className="text-right">Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.length > 0 ? (
            employees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell className="font-medium">{employee.name}</TableCell>
                <TableCell>{employee.position}</TableCell>
                <TableCell>{employee.department}</TableCell>
                <TableCell className="hidden md:table-cell">{employee.joinDate}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    employee.status === "Đang làm việc" 
                      ? "bg-green-100 text-green-800" 
                      : "bg-red-100 text-red-800"
                  }`}>
                    {employee.status}
                  </span>
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  <span className={`font-medium ${
                    (employee.remainingLeaveDays || 0) > 0 
                      ? "text-blue-600" 
                      : "text-gray-500"
                  }`}>
                    {employee.remainingLeaveDays || 0} ngày
                  </span>
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  {employee.status === "Đang làm việc" ? (
                    <span className="text-sm">
                      {employee.entryTime} - {employee.exitTime}
                    </span>
                  ) : (
                    <span className="text-sm text-gray-500">-</span>
                  )}
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
                      <DropdownMenuItem asChild>
                        <EmployeeDetailsDialog 
                          employee={employee}
                          trigger={
                            <div className="flex items-center w-full cursor-default">
                              <FileText className="h-4 w-4 mr-2" />
                              Chi tiết
                            </div>
                          }
                        />
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <EditEmployeeDialog 
                          employee={employee} 
                          onUpdateEmployee={onUpdateEmployee}
                          trigger={
                            <div className="flex items-center w-full cursor-default">
                              <Edit className="h-4 w-4 mr-2" />
                              Chỉnh sửa
                            </div>
                          }
                        />
                      </DropdownMenuItem>
                      {employee.status === "Đang làm việc" && (
                        <DropdownMenuItem asChild>
                          <EditLeaveDaysDialog
                            employee={employee}
                            onUpdateLeaveDays={onUpdateLeaveDays}
                            trigger={
                              <div className="flex items-center w-full cursor-default">
                                <CalendarDays className="h-4 w-4 mr-2" />
                                Cập nhật ngày phép
                              </div>
                            }
                          />
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem 
                        className="text-destructive"
                        onClick={() => onDeleteEmployee(employee.id)}
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
              <TableCell colSpan={8} className="text-center py-6 text-muted-foreground">
                Không tìm thấy nhân viên nào
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
