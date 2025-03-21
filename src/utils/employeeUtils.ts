
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
    status: "Đang làm việc",
    remainingLeaveDays: 12, // Mặc định 12 ngày phép cho nhân viên mới
    entryTime: "08:00",
    exitTime: "17:30"
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

export const updateEmployeeLeaveDays = (
  employees: Employee[],
  id: number,
  leaveDays: number
): Employee[] => {
  return employees.map(employee =>
    employee.id === id
      ? {
          ...employee,
          remainingLeaveDays: leaveDays
        }
      : employee
  );
};

export const filterEmployees = (
  employees: Employee[], 
  searchTerm: string,
  statusFilter: string
): Employee[] => {
  return employees.filter(employee => {
    const matchesSearch = 
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = 
      statusFilter === "all" ? true : 
      statusFilter === "active" ? employee.status === "Đang làm việc" :
      statusFilter === "inactive" ? employee.status === "Nghỉ việc" : true;
    
    return matchesSearch && matchesStatus;
  });
};

export const paginateEmployees = (
  employees: Employee[],
  currentPage: number,
  itemsPerPage: number
): Employee[] => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  return employees.slice(startIndex, startIndex + itemsPerPage);
};
