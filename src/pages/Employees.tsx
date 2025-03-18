
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { AddEmployeeDialog, EmployeeFormData } from "@/components/AddEmployeeDialog";
import { useToast } from "@/hooks/use-toast";
import { Employee, initialEmployeeData } from "@/types/employee";
import { EmployeeSearch } from "@/components/employees/EmployeeSearch";
import { EmployeeTable } from "@/components/employees/EmployeeTable";
import { EmployeePagination } from "@/components/employees/EmployeePagination";
import { 
  createEmployee, 
  updateEmployee, 
  filterEmployees, 
  paginateEmployees,
  updateEmployeeLeaveDays 
} from "@/utils/employeeUtils";

const Employees = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [employeeData, setEmployeeData] = useState<Employee[]>(initialEmployeeData);
  const { toast } = useToast();
  
  const itemsPerPage = 5; // Number of employees per page
  
  // Apply filters
  const filteredEmployees = filterEmployees(employeeData, searchTerm, statusFilter);
  
  // Calculate total pages
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  
  // Reset to page 1 when filters change
  if (filteredEmployees.length > 0 && currentPage > totalPages) {
    setCurrentPage(1);
  }
  
  // Paginate the filtered employees
  const paginatedEmployees = paginateEmployees(filteredEmployees, currentPage, itemsPerPage);

  const handleAddEmployee = (newEmployee: EmployeeFormData) => {
    const employee = createEmployee(newEmployee, employeeData);
    setEmployeeData(prev => [...prev, employee]);
    toast({
      title: "Thêm nhân viên thành công",
      description: `Đã thêm ${newEmployee.name} vào hệ thống.`
    });
  };

  const handleUpdateEmployee = (id: number, updatedEmployee: EmployeeFormData) => {
    setEmployeeData(prev => updateEmployee(prev, id, updatedEmployee));
    toast({
      title: "Cập nhật thành công",
      description: "Thông tin nhân viên đã được cập nhật."
    });
  };

  const handleDeleteEmployee = (id: number) => {
    setEmployeeData(prev => prev.filter(employee => employee.id !== id));
    toast({
      title: "Xóa nhân viên thành công",
      description: "Đã xóa nhân viên khỏi hệ thống"
    });
  };

  // New function to handle updating leave days
  const handleUpdateLeaveDays = (id: number, leaveDays: number) => {
    setEmployeeData(prev => updateEmployeeLeaveDays(prev, id, leaveDays));
    toast({
      title: "Cập nhật ngày phép thành công",
      description: "Số ngày phép còn lại đã được cập nhật"
    });
  };

  // Handle filter changes
  const handleStatusFilterChange = (status: string) => {
    setStatusFilter(status);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  // Handle page changes
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
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
          <EmployeeSearch 
            searchTerm={searchTerm} 
            onSearchChange={setSearchTerm}
            statusFilter={statusFilter}
            onStatusFilterChange={handleStatusFilterChange}
          />
          
          <EmployeeTable 
            employees={paginatedEmployees}
            onUpdateEmployee={handleUpdateEmployee}
            onDeleteEmployee={handleDeleteEmployee}
            onUpdateLeaveDays={handleUpdateLeaveDays}
          />
          
          <EmployeePagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Employees;
