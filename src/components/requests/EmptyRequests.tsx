
import { Card, CardContent } from "@/components/ui/card";
import { Clock, CheckCircle2, XCircle } from "lucide-react";

interface EmptyRequestsProps {
  type: "all" | "pending" | "approved" | "rejected";
}

export const EmptyRequests = ({ type }: EmptyRequestsProps) => {
  const getIcon = () => {
    switch (type) {
      case "pending": return <Clock className="h-6 w-6 text-muted-foreground" />;
      case "approved": return <CheckCircle2 className="h-6 w-6 text-muted-foreground" />;
      case "rejected": return <XCircle className="h-6 w-6 text-muted-foreground" />;
      default: return <Clock className="h-6 w-6 text-muted-foreground" />;
    }
  };

  const getMessage = () => {
    switch (type) {
      case "pending": return "Không có yêu cầu nào đang chờ duyệt";
      case "approved": return "Không có yêu cầu nào đã được duyệt";
      case "rejected": return "Không có yêu cầu nào bị từ chối";
      default: return "Không có yêu cầu nào";
    }
  };

  const getDescription = () => {
    switch (type) {
      case "pending": return "Tất cả các yêu cầu đang chờ duyệt sẽ hiển thị ở đây";
      case "approved": return "Tất cả các yêu cầu đã được duyệt sẽ hiển thị ở đây";
      case "rejected": return "Tất cả các yêu cầu bị từ chối sẽ hiển thị ở đây";
      default: return "Tất cả các yêu cầu sẽ hiển thị ở đây";
    }
  };

  return (
    <Card className="col-span-full">
      <CardContent className="pt-6 flex flex-col items-center justify-center py-10">
        <div className="rounded-full bg-muted h-12 w-12 flex items-center justify-center mb-4">
          {getIcon()}
        </div>
        <p className="text-lg font-medium">{getMessage()}</p>
        <p className="text-sm text-muted-foreground mt-1">
          {getDescription()}
        </p>
      </CardContent>
    </Card>
  );
};
