
// Kiểu dữ liệu cho nhân viên
export interface Employee {
  id: number;
  name: string;
  position: string;
  department: string;
  joinDate: string;
  status: string;
  remainingLeaveDays?: number;
  entryTime?: string;
  exitTime?: string;
}

// Dữ liệu mẫu
export const initialEmployeeData: Employee[] = [
  { 
    id: 1, 
    name: "Nguyễn Văn A", 
    position: "Giám đốc", 
    department: "Ban giám đốc", 
    joinDate: "01/01/2020", 
    status: "Đang làm việc",
    remainingLeaveDays: 15,
    entryTime: "08:00", 
    exitTime: "17:30"
  },
  { 
    id: 2, 
    name: "Trần Thị B", 
    position: "Trưởng phòng", 
    department: "Kế toán", 
    joinDate: "15/03/2020", 
    status: "Đang làm việc",
    remainingLeaveDays: 12,
    entryTime: "08:15", 
    exitTime: "17:45"
  },
  { 
    id: 3, 
    name: "Lê Văn C", 
    position: "Nhân viên", 
    department: "Kỹ thuật", 
    joinDate: "10/05/2021", 
    status: "Đang làm việc",
    remainingLeaveDays: 10,
    entryTime: "08:30", 
    exitTime: "17:30"
  },
  { 
    id: 4, 
    name: "Phạm Thị D", 
    position: "Nhân viên", 
    department: "Nhân sự", 
    joinDate: "22/07/2021", 
    status: "Đang làm việc",
    remainingLeaveDays: 8,
    entryTime: "08:10", 
    exitTime: "17:00"
  },
  { 
    id: 5, 
    name: "Hoàng Văn E", 
    position: "Nhân viên", 
    department: "Kinh doanh", 
    joinDate: "30/09/2021", 
    status: "Nghỉ việc",
    remainingLeaveDays: 0,
    entryTime: "00:00", 
    exitTime: "00:00"
  },
  { 
    id: 6, 
    name: "Ngô Thị F", 
    position: "Nhân viên", 
    department: "Kỹ thuật", 
    joinDate: "05/02/2022", 
    status: "Đang làm việc",
    remainingLeaveDays: 9,
    entryTime: "08:05", 
    exitTime: "17:15"
  },
  { 
    id: 7, 
    name: "Vũ Văn G", 
    position: "Nhân viên", 
    department: "Kinh doanh", 
    joinDate: "18/04/2022", 
    status: "Đang làm việc",
    remainingLeaveDays: 11,
    entryTime: "08:00", 
    exitTime: "17:30"
  },
  { 
    id: 8, 
    name: "Đặng Thị H", 
    position: "Nhân viên", 
    department: "Kế toán", 
    joinDate: "09/08/2022", 
    status: "Đang làm việc",
    remainingLeaveDays: 7,
    entryTime: "08:20", 
    exitTime: "18:00"
  },
  { 
    id: 9, 
    name: "Bùi Văn I", 
    position: "Nhân viên", 
    department: "Kỹ thuật", 
    joinDate: "15/10/2022", 
    status: "Đang làm việc",
    remainingLeaveDays: 10,
    entryTime: "08:00", 
    exitTime: "17:30"
  },
  { 
    id: 10, 
    name: "Trương Thị J", 
    position: "Nhân viên", 
    department: "Kinh doanh", 
    joinDate: "07/01/2023", 
    status: "Đang làm việc",
    remainingLeaveDays: 12,
    entryTime: "08:00", 
    exitTime: "17:30"
  }
];
