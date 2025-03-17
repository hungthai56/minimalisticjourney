
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
import { createEmployee, updateEmployee, filterEmployees } from "@/utils/employeeUtils";

const Employees = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [employeeData, setEmployeeData] = useState<Employee[]>(initialEmployeeData);
  const { toast } = useToast();
  
  const filteredEmployees = filterEmployees(employeeData, searchTerm);

  const handleAddEmployee = (newEmployee: EmployeeFormData) => {
    const employee = createEmployee(newEmployee, employeeData);
    setEmployeeData(prev => [...prev, employee]);
  };

  const handleUpdateEmployee = (id: number, updatedEmployee: EmployeeFormData) => {
    setEmployeeData(prev => updateEmployee(prev, id, updatedEmployee));
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
          <EmployeeSearch 
            searchTerm={searchTerm} 
            onSearchChange={setSearchTerm} 
          />
          
          <EmployeeTable 
            employees={filteredEmployees}
            onUpdateEmployee={handleUpdateEmployee}
            onDeleteEmployee={handleDeleteEmployee}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Employees;
