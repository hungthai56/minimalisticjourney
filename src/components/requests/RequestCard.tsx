
import { Request } from "@/types/request";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Clock, Calendar, Clock3, AlarmClock } from "lucide-react";

interface RequestCardProps {
  request: Request;
  onApprove: (id: number) => void;
  onReject: (id: number) => void;
  showActions: boolean;
}

export const RequestCard = ({ request, onApprove, onReject, showActions }: RequestCardProps) => {
  const getStatusBadge = () => {
    switch (request.status) {
      case "approved":
        return <Badge className="bg-green-500">Đã duyệt</Badge>;
      case "rejected":
        return <Badge variant="destructive">Từ chối</Badge>;
      case "pending":
      default:
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-300">Chờ duyệt</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <CardTitle className="text-base">{request.employeeName}</CardTitle>
            <CardDescription>{request.type}</CardDescription>
          </div>
          {getStatusBadge()}
        </div>
      </CardHeader>
      <CardContent className="pb-2 text-sm space-y-2">
        <div className="flex items-center">
          <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
          <span>
            <span className="font-medium">Thời gian: </span>
            {request.startDate} {request.startDate !== request.endDate && `- ${request.endDate}`}
          </span>
        </div>
        
        {(request.startTime || request.endTime) && (
          <div className="flex items-center">
            <Clock3 className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>
              <span className="font-medium">Giờ: </span>
              {request.startTime} - {request.endTime}
            </span>
          </div>
        )}
        
        <div className="border-t pt-2">
          <p className="text-sm text-muted-foreground">Lý do: {request.reason}</p>
        </div>
        
        {request.status !== "pending" && request.actionTime && (
          <div className="border-t pt-2 flex flex-col gap-1">
            <div className="flex items-center">
              <AlarmClock className="h-4 w-4 mr-2 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {request.status === "approved" ? "Thời gian duyệt:" : "Thời gian từ chối:"} {request.actionTime}
              </span>
            </div>
            {request.actionBy && (
              <span className="text-sm text-muted-foreground">
                Người {request.status === "approved" ? "duyệt" : "từ chối"}: {request.actionBy}
              </span>
            )}
          </div>
        )}
      </CardContent>
      
      {showActions && (
        <CardFooter className="pt-0 justify-end gap-2">
          <Button 
            size="sm" 
            variant="outline" 
            className="text-green-600 bg-green-50 border-green-200 hover:bg-green-100"
            onClick={() => onApprove(request.id)}
          >
            <CheckCircle className="h-4 w-4 mr-1" />
            Duyệt
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            className="text-red-600 bg-red-50 border-red-200 hover:bg-red-100"
            onClick={() => onReject(request.id)}  
          >
            <XCircle className="h-4 w-4 mr-1" />
            Từ chối
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};
