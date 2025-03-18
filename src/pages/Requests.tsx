
import { useState, useEffect } from "react";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { 
  PlusCircle,
  FileDown,
  ArrowLeftRight,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { createNewRequest, exportRequestsToExcel } from "@/utils/requestUtils";
import { Request, initialRequestsData } from "@/types/request";
import { NewRequestForm } from "@/components/requests/NewRequestForm";
import { RequestList } from "@/components/requests/RequestList";
import { usePermissions } from "@/hooks/use-permissions";

const Requests = () => {
  const [tab, setTab] = useState<"all" | "pending" | "approved" | "rejected">("all");
  const [openNewRequestDialog, setOpenNewRequestDialog] = useState(false);
  const [requestsData, setRequestsData] = useState<Request[]>([]);
  const { toast } = useToast();
  const { isAdmin, getCurrentUserName } = usePermissions();
  
  // Load requests from localStorage or use initial data
  useEffect(() => {
    const savedRequests = localStorage.getItem("requests");
    if (savedRequests) {
      setRequestsData(JSON.parse(savedRequests));
    } else {
      // Initialize with default data
      setRequestsData(initialRequestsData);
      localStorage.setItem("requests", JSON.stringify(initialRequestsData));
    }
  }, []);

  // Save requests to localStorage whenever they change
  useEffect(() => {
    if (requestsData.length > 0) {
      localStorage.setItem("requests", JSON.stringify(requestsData));
    }
  }, [requestsData]);
  
  // Submit new request
  const handleSubmitRequest = (formData: any) => {
    // Format dates to DD/MM/YYYY
    const formatDisplayDate = (dateString: string) => {
      const [year, month, day] = dateString.split('-');
      return `${day}/${month}/${year}`;
    };
    
    const formattedRequest = {
      employeeName: getCurrentUserName() || formData.employeeName,
      type: formData.type === "leave" ? "Nghỉ phép" : "Ra ngoài",
      startDate: formatDisplayDate(formData.startDate),
      endDate: formatDisplayDate(formData.endDate),
      startTime: formData.startTime,
      endTime: formData.endTime,
      reason: formData.reason
    };
    
    const createdRequest = createNewRequest(formattedRequest, requestsData);
    setRequestsData(prev => [createdRequest, ...prev]);
    
    setOpenNewRequestDialog(false);
    toast({
      title: "Tạo yêu cầu thành công",
      description: "Yêu cầu của bạn đã được gửi và đang chờ duyệt."
    });
  };
  
  // Export requests to Excel
  const handleExportReport = () => {
    exportRequestsToExcel(filteredRequests, `requests-report-${tab}`);
    toast({
      title: "Xuất báo cáo thành công",
      description: "Báo cáo đã được tải xuống."
    });
  };
  
  // Filter requests based on tab and user role
  const filteredRequests = requestsData.filter(request => {
    // Admin can see all requests
    if (isAdmin()) {
      if (tab === "all") return true;
      if (tab === "pending") return request.status === "pending";
      if (tab === "approved") return request.status === "approved";
      if (tab === "rejected") return request.status === "rejected";
    } else {
      // Regular users can only see their own requests
      const currentUserName = getCurrentUserName();
      if (request.employeeName !== currentUserName) return false;
      
      if (tab === "all") return true;
      if (tab === "pending") return request.status === "pending";
      if (tab === "approved") return request.status === "approved";
      if (tab === "rejected") return request.status === "rejected";
    }
    return true;
  });

  // Lấy ngày giờ hiện tại
  const getCurrentDateTime = () => {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  const handleApproveRequest = (id: number) => {
    // Only admins can approve requests
    if (!isAdmin()) {
      toast({
        title: "Không có quyền",
        description: "Bạn không có quyền duyệt yêu cầu.",
        variant: "destructive"
      });
      return;
    }

    setRequestsData(prev => 
      prev.map(request => 
        request.id === id 
          ? { 
              ...request, 
              status: "approved",
              actionTime: getCurrentDateTime(),
              actionBy: getCurrentUserName() || "Admin" 
            } 
          : request
      )
    );
    toast({
      title: "Đã duyệt yêu cầu",
      description: "Yêu cầu đã được duyệt thành công.",
    });
  };

  const handleRejectRequest = (id: number) => {
    // Only admins can reject requests
    if (!isAdmin()) {
      toast({
        title: "Không có quyền",
        description: "Bạn không có quyền từ chối yêu cầu.",
        variant: "destructive"
      });
      return;
    }

    setRequestsData(prev => 
      prev.map(request => 
        request.id === id 
          ? { 
              ...request, 
              status: "rejected",
              actionTime: getCurrentDateTime(),
              actionBy: getCurrentUserName() || "Admin"
            } 
          : request
      )
    );
    toast({
      title: "Đã từ chối yêu cầu",
      description: "Yêu cầu đã bị từ chối.",
      variant: "destructive",
    });
  };

  return (
    <div className="container max-w-7xl mx-auto mt-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h1 className="text-3xl font-semibold">Quản lý yêu cầu ra/vào</h1>
        <Dialog open={openNewRequestDialog} onOpenChange={setOpenNewRequestDialog}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="h-4 w-4 mr-2" />
              Tạo yêu cầu mới
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Tạo yêu cầu mới</DialogTitle>
              <DialogDescription>
                Điền thông tin để tạo yêu cầu nghỉ phép hoặc ra ngoài
              </DialogDescription>
            </DialogHeader>
            <NewRequestForm 
              onSubmit={handleSubmitRequest} 
              disableEmployeeSelection={!isAdmin()} 
            />
          </DialogContent>
        </Dialog>
      </div>
      
      <Tabs defaultValue="all" value={tab} onValueChange={(value) => setTab(value as any)}>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <TabsList>
            <TabsTrigger value="all" className="flex items-center">
              <ArrowLeftRight className="h-4 w-4 mr-2" />
              Tất cả
            </TabsTrigger>
            <TabsTrigger value="pending" className="flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              Chờ duyệt
            </TabsTrigger>
            <TabsTrigger value="approved" className="flex items-center">
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Đã duyệt
            </TabsTrigger>
            <TabsTrigger value="rejected" className="flex items-center">
              <XCircle className="h-4 w-4 mr-2" />
              Từ chối
            </TabsTrigger>
          </TabsList>
          
          {isAdmin() && (
            <Button variant="outline" size="sm" onClick={handleExportReport}>
              <FileDown className="h-4 w-4 mr-2" />
              Xuất báo cáo
            </Button>
          )}
        </div>
        
        <TabsContent value="all" className="mt-0">
          <RequestList 
            requests={filteredRequests}
            tabType="all"
            onApprove={handleApproveRequest}
            onReject={handleRejectRequest}
            isAdmin={isAdmin()}
          />
        </TabsContent>
        
        <TabsContent value="pending" className="mt-0">
          <RequestList 
            requests={filteredRequests}
            tabType="pending"
            onApprove={handleApproveRequest}
            onReject={handleRejectRequest}
            isAdmin={isAdmin()}
          />
        </TabsContent>
        
        <TabsContent value="approved" className="mt-0">
          <RequestList 
            requests={filteredRequests}
            tabType="approved"
            onApprove={handleApproveRequest}
            onReject={handleRejectRequest}
            isAdmin={isAdmin()}
          />
        </TabsContent>
        
        <TabsContent value="rejected" className="mt-0">
          <RequestList 
            requests={filteredRequests}
            tabType="rejected"
            onApprove={handleApproveRequest}
            onReject={handleRejectRequest}
            isAdmin={isAdmin()}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Requests;
