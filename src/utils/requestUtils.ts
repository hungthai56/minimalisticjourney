
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { Request } from "@/types/request";

export const createNewRequest = (
  requestData: {
    employeeName: string;
    type: string;
    startDate: string;
    endDate: string;
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
    reason: requestData.reason,
    status: "pending",
    createdAt: formattedDate
  };
};

export const exportRequestsToExcel = (requests: Request[], fileName: string = "requests-report") => {
  // Transform data for Excel
  const data = requests.map(request => ({
    'ID': request.id,
    'Nhân viên': request.employeeName,
    'Loại yêu cầu': request.type,
    'Ngày bắt đầu': request.startDate,
    'Ngày kết thúc': request.endDate,
    'Lý do': request.reason,
    'Trạng thái': request.status === "pending" ? "Đang chờ" : 
                  request.status === "approved" ? "Đã duyệt" : "Từ chối",
    'Ngày tạo': request.createdAt,
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
    { wch: 30 }, // Lý do
    { wch: 15 }, // Trạng thái
    { wch: 15 }, // Ngày tạo
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
