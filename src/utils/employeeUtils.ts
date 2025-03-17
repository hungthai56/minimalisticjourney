
import { Employee } from "@/types/employee";
import { EmployeeFormData } from "@/components/AddEmployeeDialog";

export const formatDate = (): string => {
  const today = new Date();
  return `${today.getDate().toString().padStart(2, '0')}/${(today.getMonth() + 1).toString().padStart(2, '0')}/${today.getFullYear()}`;
};

export const createEmployee = (
  employeeData: EmployeeFormData, 
  existingEmployees: Employee[]
): Employee => {
  return {
    id: existingEmployees.length > 0 ? Math.max(...existingEmployees.map(e => e.id)) + 1 : 1,
    name: employeeData.name,
    position: employeeData.position,
    department: employeeData.department,
    joinDate: formatDate(),
    status: "Đang làm việc"
  };
};

export const updateEmployee = (
  employees: Employee[],
  id: number, 
  updatedEmployee: EmployeeFormData
): Employee[] => {
  return employees.map(employee => 
    employee.id === id 
      ? { 
          ...employee, 
          name: updatedEmployee.name,
          position: updatedEmployee.position,
          department: updatedEmployee.department
        } 
      : employee
  );
};

export const filterEmployees = (
  employees: Employee[], 
  searchTerm: string
): Employee[] => {
  return employees.filter(employee => 
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchTerm.toLowerCase())
  );
};
