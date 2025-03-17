
export interface Request {
  id: number;
  employeeName: string;
  type: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

export const initialRequestsData: Request[] = [
  { 
    id: 1, 
    employeeName: "Nguyễn Văn A", 
    type: "Nghỉ phép", 
    startDate: "15/05/2023", 
    endDate: "18/05/2023", 
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
    reason: "Gặp khách hàng", 
    status: "approved", 
    createdAt: "11/05/2023" 
  },
  { 
    id: 3, 
    employeeName: "Lê Văn C", 
    type: "Nghỉ phép", 
    startDate: "22/05/2023", 
    endDate: "26/05/2023", 
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
    reason: "Họp khách hàng", 
    status: "rejected", 
    createdAt: "12/05/2023" 
  },
  { 
    id: 5, 
    employeeName: "Hoàng Văn E", 
    type: "Nghỉ phép", 
    startDate: "17/05/2023", 
    endDate: "19/05/2023", 
    reason: "Chăm con ốm", 
    status: "approved", 
    createdAt: "14/05/2023" 
  },
];
