import { useState } from "react";
import { 
  Card, 
  CardContent,
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { 
  CheckCircle2, 
  XCircle, 
  Clock, 
  PlusCircle,
  CalendarRange,
  ExternalLink,
  ArrowLeftRight
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface Request {
  id: number;
  employeeName: string;
  type: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

const initialRequestsData: Request[] = [
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

const RequestCard = ({ 
  request, 
  onApprove, 
  onReject 
}: { 
  request: Request; 
  onApprove: (id: number) => void; 
  onReject: (id: number) => void;
}) => {
  return (
    <Card className="overflow-hidden">
      <div className={cn(
        "h-2",
        request.status === "pending" ? "bg-yellow-500" :
        request.status === "approved" ? "bg-green-500" : "bg-red-500"
      )} />
      <CardContent className="pt-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-semibold">{request.employeeName}</h3>
            <p className="text-sm text-muted-foreground">{request.type}</p>
          </div>
          <div className={cn(
            "px-2 py-1 text-xs rounded-full flex items-center",
            request.status === "pending" ? "bg-yellow-100 text-yellow-800" :
            request.status === "approved" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          )}>
            {request.status === "pending" && <Clock className="h-3 w-3 mr-1" />}
            {request.status === "approved" && <CheckCircle2 className="h-3 w-3 mr-1" />}
            {request.status === "rejected" && <XCircle className="h-3 w-3 mr-1" />}
            {request.status === "pending" ? "Đang chờ" :
             request.status === "approved" ? "Đã duyệt" : "Từ chối"}
          </div>
        </div>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm">
            <CalendarRange className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>
              {request.startDate} {request.endDate !== request.startDate ? `→ ${request.endDate}` : ""}
            </span>
          </div>
          <div className="border-l-2 pl-4 py-1 text-sm">
            {request.reason}
          </div>
        </div>
        
        <div className="flex justify-between pt-4 border-t">
          <span className="text-xs text-muted-foreground">Tạo lúc: {request.createdAt}</span>
          {request.status === "pending" && (
            <div className="flex space-x-2">
              <Button 
                size="sm" 
                variant="outline" 
                className="h-8"
                onClick={() => onReject(request.id)}
              >
                <XCircle className="h-3 w-3 mr-1" />
                Từ chối
              </Button>
              <Button 
                size="sm" 
                className="h-8"
                onClick={() => onApprove(request.id)}
              >
                <CheckCircle2 className="h-3 w-3 mr-1" />
                Duyệt
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const Requests = () => {
  const [tab, setTab] = useState("all");
  const [openNewRequestDialog, setOpenNewRequestDialog] = useState(false);
  const [requestsData, setRequestsData] = useState<Request[]>(initialRequestsData);
  const { toast } = useToast();
  
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
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="request-type">Loại yêu cầu</Label>
                <Select defaultValue="leave">
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn loại yêu cầu" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="leave">Nghỉ phép</SelectItem>
                    <SelectItem value="out">Ra ngoài</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="start-date">Ngày bắt đầu</Label>
                  <Input id="start-date" type="date" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="end-date">Ngày kết thúc</Label>
                  <Input id="end-date" type="date" />
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="reason">Lý do</Label>
                <Textarea id="reason" placeholder="Nhập lý do..." />
              </div>
            </div>
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setOpenNewRequestDialog(false)}
              >
                Hủy
              </Button>
              <Button 
                onClick={() => setOpenNewRequestDialog(false)}
              >
                Gửi yêu cầu
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <Tabs defaultValue="all" value={tab} onValueChange={setTab}>
        <div className="flex items-center justify-between mb-6">
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
          
          <Button variant="outline" size="sm">
            <ExternalLink className="h-4 w-4 mr-2" />
            Xuất báo cáo
          </Button>
        </div>
        
        <TabsContent value="all" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredRequests.length > 0 ? (
              filteredRequests.map(request => (
                <RequestCard 
                  key={request.id} 
                  request={request} 
                  onApprove={handleApproveRequest}
                  onReject={handleRejectRequest}
                />
              ))
            ) : (
              <Card className="col-span-full">
                <CardContent className="pt-6 flex flex-col items-center justify-center py-10">
                  <div className="rounded-full bg-muted h-12 w-12 flex items-center justify-center mb-4">
                    <Clock className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <p className="text-lg font-medium">Không có yêu cầu nào</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Tất cả các yêu cầu sẽ hiển thị ở đây
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="pending" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredRequests.length > 0 ? (
              filteredRequests.map(request => (
                <RequestCard 
                  key={request.id} 
                  request={request} 
                  onApprove={handleApproveRequest}
                  onReject={handleRejectRequest}
                />
              ))
            ) : (
              <Card className="col-span-full">
                <CardContent className="pt-6 flex flex-col items-center justify-center py-10">
                  <div className="rounded-full bg-muted h-12 w-12 flex items-center justify-center mb-4">
                    <Clock className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <p className="text-lg font-medium">Không có yêu cầu nào đang chờ duyệt</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Tất cả các yêu cầu đang chờ duyệt sẽ hiển thị ở đây
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="approved" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredRequests.length > 0 ? (
              filteredRequests.map(request => (
                <RequestCard 
                  key={request.id} 
                  request={request}
                  onApprove={handleApproveRequest}
                  onReject={handleRejectRequest} 
                />
              ))
            ) : (
              <Card className="col-span-full">
                <CardContent className="pt-6 flex flex-col items-center justify-center py-10">
                  <div className="rounded-full bg-muted h-12 w-12 flex items-center justify-center mb-4">
                    <CheckCircle2 className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <p className="text-lg font-medium">Không có yêu cầu nào đã được duyệt</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Tất cả các yêu cầu đã được duyệt sẽ hiển thị ở đây
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="rejected" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredRequests.length > 0 ? (
              filteredRequests.map(request => (
                <RequestCard 
                  key={request.id} 
                  request={request}
                  onApprove={handleApproveRequest}
                  onReject={handleRejectRequest} 
                />
              ))
            ) : (
              <Card className="col-span-full">
                <CardContent className="pt-6 flex flex-col items-center justify-center py-10">
                  <div className="rounded-full bg-muted h-12 w-12 flex items-center justify-center mb-4">
                    <XCircle className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <p className="text-lg font-medium">Không có yêu cầu nào bị từ chối</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Tất cả các yêu cầu bị từ chối sẽ hiển thị ở đây
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Requests;
