
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, XCircle, Clock, CalendarRange } from "lucide-react";

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

interface RequestCardProps {
  request: Request;
  onApprove: (id: number) => void;
  onReject: (id: number) => void;
}

export const RequestCard = ({ request, onApprove, onReject }: RequestCardProps) => {
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
