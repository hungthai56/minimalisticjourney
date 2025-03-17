
import { Request } from "@/types/request";
import { RequestCard } from "./RequestCard";
import { EmptyRequests } from "./EmptyRequests";

interface RequestListProps {
  requests: Request[];
  tabType: "all" | "pending" | "approved" | "rejected";
  onApprove: (id: number) => void;
  onReject: (id: number) => void;
}

export const RequestList = ({ requests, tabType, onApprove, onReject }: RequestListProps) => {
  if (requests.length === 0) {
    return <EmptyRequests type={tabType} />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {requests.map(request => (
        <RequestCard 
          key={request.id} 
          request={request}
          onApprove={onApprove}
          onReject={onReject}
        />
      ))}
    </div>
  );
};
