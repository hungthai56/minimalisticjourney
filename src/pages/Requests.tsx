
import { useState } from "react";
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
  XCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { createNewRequest, exportRequestsToExcel } from "@/utils/requestUtils";
import { Request, initialRequestsData } from "@/types/request";
import { NewRequestForm } from "@/components/requests/NewRequestForm";
import { RequestList } from "@/components/requests/RequestList";

const Requests = () => {
  const [tab, setTab] = useState<"all" | "pending" | "approved" | "rejected">("all");
  const [openNewRequestDialog, setOpenNewRequestDialog] = useState(false);
  const [requestsData, setRequestsData] = useState<Request[]>(initialRequestsData);
  const { toast } = useToast();
  
  // Submit new request
  const handleSubmitRequest = () => {
    // Format dates to DD/MM/YYYY
    const formatDisplayDate = (dateString: string) => {
      const [year, month, day] = dateString.split('-');
      return `${day}/${month}/${year}`;
    };
    
    const formattedRequest = {
      employeeName: "Nguyễn Văn A", // Default employee
      type: "leave" === "leave" ? "Nghỉ phép" : "Ra ngoài",
      startDate: formatDisplayDate(new Date().toISOString().split('T')[0]),
      endDate: formatDisplayDate(new Date().toISOString().split('T')[0]),
      reason: "Nghỉ phép thường niên"
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
  
  const filteredRequests = requestsData.filter(request => {
    if (tab === "all") return true;
    if (tab === "pending") return request.status === "pending";
    if (tab === "approved") return request.status === "approved";
    if (tab === "rejected") return request.status === "rejected";
    return true;
  });

  const handleApproveRequest = (id: number) => {
    setRequestsData(prev => 
      prev.map(request => 
        request.id === id 
          ? { ...request, status: "approved" } 
          : request
      )
    );
    toast({
      title: "Đã duyệt yêu cầu",
      description: "Yêu cầu đã được duyệt thành công.",
    });
  };

  const handleRejectRequest = (id: number) => {
    setRequestsData(prev => 
      prev.map(request => 
        request.id === id 
          ? { ...request, status: "rejected" } 
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
            <NewRequestForm onSubmit={handleSubmitRequest} />
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
          
          <Button variant="outline" size="sm" onClick={handleExportReport}>
            <FileDown className="h-4 w-4 mr-2" />
            Xuất báo cáo
          </Button>
        </div>
        
        <TabsContent value="all" className="mt-0">
          <RequestList 
            requests={filteredRequests}
            tabType="all"
            onApprove={handleApproveRequest}
            onReject={handleRejectRequest}
          />
        </TabsContent>
        
        <TabsContent value="pending" className="mt-0">
          <RequestList 
            requests={filteredRequests}
            tabType="pending"
            onApprove={handleApproveRequest}
            onReject={handleRejectRequest}
          />
        </TabsContent>
        
        <TabsContent value="approved" className="mt-0">
          <RequestList 
            requests={filteredRequests}
            tabType="approved"
            onApprove={handleApproveRequest}
            onReject={handleRejectRequest}
          />
        </TabsContent>
        
        <TabsContent value="rejected" className="mt-0">
          <RequestList 
            requests={filteredRequests}
            tabType="rejected"
            onApprove={handleApproveRequest}
            onReject={handleRejectRequest}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Requests;
