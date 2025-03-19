import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { Request } from "@/types/request";

export const createNewRequest = (
  requestData: {
    employeeName: string;
    type: string;
    startDate: string;
    endDate: string;
    startTime?: string;
    endTime?: string;
    reason: string;
  }, 
  existingRequests: Request[]
): Request => {
  const today = new Date();
  const formattedDate = `${today.getDate().toString().padStart(2, '0')}/${(today.getMonth() + 1).toString().padStart(2, '0')}/${today.getFullYear()}`;
  
  return {
    id: existingRequests.length > 0 ? Math.max(...existingRequests.map(r => r.id)) + 1 : 1,
    employeeName: requestData.employeeName,
    type: requestData.type,
    startDate: requestData.startDate,
    endDate: requestData.endDate,
    startTime: requestData.startTime,
    endTime: requestData.endTime,
    reason: requestData.reason,
    status: "pending",
    createdAt: formattedDate
  };
};

// Convert date string format from DD/MM/YYYY to Date object
export const parseDisplayDate = (displayDate: string): Date => {
  const [day, month, year] = displayDate.split('/').map(Number);
  return new Date(year, month - 1, day);
};

export const exportRequestsToExcel = (
  requests: Request[], 
  fileName: string = "requests-report",
  dateFrom?: string,
  dateTo?: string
) => {
  // Filter by date range if provided
  let filteredRequests = [...requests];
  
  if (dateFrom || dateTo) {
    filteredRequests = requests.filter(request => {
      const requestDate = parseDisplayDate(request.createdAt);
      
      if (dateFrom && dateTo) {
        const fromDate = parseDisplayDate(dateFrom);
        const toDate = parseDisplayDate(dateTo);
        return requestDate >= fromDate && requestDate <= toDate;
      } else if (dateFrom) {
        const fromDate = parseDisplayDate(dateFrom);
        return requestDate >= fromDate;
      } else if (dateTo) {
        const toDate = parseDisplayDate(dateTo);
        return requestDate <= toDate;
      }
      
      return true;
    });
  }

  // Transform data for Excel
  const data = filteredRequests.map(request => ({
    'ID': request.id,
    'Nhân viên': request.employeeName,
    'Loại yêu cầu': request.type,
    'Ngày bắt đầu': request.startDate,
    'Ngày kết thúc': request.endDate,
    'Giờ bắt đầu': request.startTime || '',
    'Giờ kết thúc': request.endTime || '',
    'Lý do': request.reason,
    'Trạng thái': request.status === "pending" ? "Đang chờ" : 
                  request.status === "approved" ? "Đã duyệt" : "Từ chối",
    'Ngày tạo': request.createdAt,
    'Thời gian duyệt/từ chối': request.actionTime || '',
    'Người duyệt/từ chối': request.actionBy || '',
  }));

  // Create a worksheet
  const worksheet = XLSX.utils.json_to_sheet(data);
  
  // Fix column widths
  const columnWidths = [
    { wch: 5 }, // ID
    { wch: 20 }, // Nhân viên
    { wch: 15 }, // Loại yêu cầu
    { wch: 15 }, // Ngày bắt đầu
    { wch: 15 }, // Ngày kết thúc
    { wch: 15 }, // Giờ bắt đầu
    { wch: 15 }, // Giờ kết thúc
    { wch: 30 }, // Lý do
    { wch: 15 }, // Trạng thái
    { wch: 15 }, // Ngày tạo
    { wch: 20 }, // Thời gian duyệt/từ chối
    { wch: 20 }, // Người duyệt/từ chối
  ];
  worksheet['!cols'] = columnWidths;

  // Create a workbook
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Yêu cầu');

  // Generate an XLSX file
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const data_blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
  
  // Save the file
  saveAs(data_blob, `${fileName}.xlsx`);
};

// Delete a request by ID
export const deleteRequest = (id: number, requests: Request[]): Request[] => {
  return requests.filter(request => request.id !== id);
};
