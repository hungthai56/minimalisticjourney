
// Kiểu dữ liệu cho nhân viên
export interface Employee {
  id: number;
  name: string;
  position: string;
  department: string;
  joinDate: string;
  status: string;
}

// Dữ liệu mẫu
export const initialEmployeeData: Employee[] = [
  { id: 1, name: "Nguyễn Văn A", position: "Giám đốc", department: "Ban giám đốc", joinDate: "01/01/2020", status: "Đang làm việc" },
  { id: 2, name: "Trần Thị B", position: "Trưởng phòng", department: "Kế toán", joinDate: "15/03/2020", status: "Đang làm việc" },
  { id: 3, name: "Lê Văn C", position: "Nhân viên", department: "Kỹ thuật", joinDate: "10/05/2021", status: "Đang làm việc" },
  { id: 4, name: "Phạm Thị D", position: "Nhân viên", department: "Nhân sự", joinDate: "22/07/2021", status: "Đang làm việc" },
  { id: 5, name: "Hoàng Văn E", position: "Nhân viên", department: "Kinh doanh", joinDate: "30/09/2021", status: "Nghỉ việc" },
  { id: 6, name: "Ngô Thị F", position: "Nhân viên", department: "Kỹ thuật", joinDate: "05/02/2022", status: "Đang làm việc" },
  { id: 7, name: "Vũ Văn G", position: "Nhân viên", department: "Kinh doanh", joinDate: "18/04/2022", status: "Đang làm việc" },
  { id: 8, name: "Đặng Thị H", position: "Nhân viên", department: "Kế toán", joinDate: "09/08/2022", status: "Đang làm việc" },
];
