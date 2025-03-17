
export interface Request {
  id: number;
  employeeName: string;
  type: string;
  startDate: string;
  endDate: string;
  startTime?: string; // Thêm giờ bắt đầu
  endTime?: string;   // Thêm giờ kết thúc
  reason: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
  actionTime?: string; // Thời gian duyệt hoặc từ chối
  actionBy?: string;   // Người duyệt hoặc từ chối
}

export const initialRequestsData: Request[] = [
  { 
    id: 1, 
    employeeName: "Nguyễn Văn A", 
    type: "Nghỉ phép", 
    startDate: "15/05/2023", 
    endDate: "18/05/2023", 
    startTime: "08:00",
    endTime: "17:30",
    reason: "Nghỉ phép thường niên", 
    status: "pending", 
    createdAt: "10/05/2023" 
  },
  { 
    id: 2, 
    employeeName: "Trần Thị B", 
    type: "Ra ngoài", 
    startDate: "12/05/2023", 
    endDate: "12/05/2023", 
    startTime: "10:00",
    endTime: "12:00",
    reason: "Gặp khách hàng", 
    status: "approved", 
    createdAt: "11/05/2023",
    actionTime: "11/05/2023 15:45",
    actionBy: "Nguyễn Văn A"
  },
  { 
    id: 3, 
    employeeName: "Lê Văn C", 
    type: "Nghỉ phép", 
    startDate: "22/05/2023", 
    endDate: "26/05/2023", 
    startTime: "08:00",
    endTime: "17:30",
    reason: "Việc gia đình", 
    status: "pending", 
    createdAt: "12/05/2023" 
  },
  { 
    id: 4, 
    employeeName: "Phạm Thị D", 
    type: "Ra ngoài", 
    startDate: "13/05/2023", 
    endDate: "13/05/2023", 
    startTime: "13:30",
    endTime: "16:00",
    reason: "Họp khách hàng", 
    status: "rejected", 
    createdAt: "12/05/2023",
    actionTime: "12/05/2023 17:20",
    actionBy: "Nguyễn Văn A"
  },
  { 
    id: 5, 
    employeeName: "Hoàng Văn E", 
    type: "Nghỉ phép", 
    startDate: "17/05/2023", 
    endDate: "19/05/2023", 
    startTime: "08:00",
    endTime: "17:30",
    reason: "Chăm con ốm", 
    status: "approved", 
    createdAt: "14/05/2023",
    actionTime: "15/05/2023 09:15",
    actionBy: "Nguyễn Văn A" 
  },
];
