
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";

interface NewRequestFormProps {
  onSubmit: () => void;
}

export const NewRequestForm = ({ onSubmit }: NewRequestFormProps) => {
  const [newRequest, setNewRequest] = useState({
    employeeName: "Nguyễn Văn A", // Default employee
    type: "leave",
    startDate: "",
    endDate: "",
    reason: ""
  });
  
  // Format date for input fields
  const formatDateForInput = (date = new Date()) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  
  // Set default dates when component mounts
  useEffect(() => {
    const today = new Date();
    setNewRequest(prev => ({
      ...prev,
      startDate: formatDateForInput(today),
      endDate: formatDateForInput(today)
    }));
  }, []);
  
  // Handle form changes
  const handleRequestFormChange = (field: string, value: string) => {
    setNewRequest(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <>
      <div className="grid gap-4 py-4">
        <div className="grid gap-2">
          <Label htmlFor="request-type">Loại yêu cầu</Label>
          <Select 
            value={newRequest.type}
            onValueChange={(value) => handleRequestFormChange("type", value)}
          >
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
            <Input 
              id="start-date" 
              type="date" 
              value={newRequest.startDate}
              onChange={(e) => handleRequestFormChange("startDate", e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="end-date">Ngày kết thúc</Label>
            <Input 
              id="end-date" 
              type="date" 
              value={newRequest.endDate}
              onChange={(e) => handleRequestFormChange("endDate", e.target.value)}
            />
          </div>
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="reason">Lý do</Label>
          <Textarea 
            id="reason" 
            placeholder="Nhập lý do..." 
            value={newRequest.reason}
            onChange={(e) => handleRequestFormChange("reason", e.target.value)}
          />
        </div>
        
        {newRequest.type === "leave" && (
          <div className="py-2 px-3 bg-blue-50 rounded-md flex items-center">
            <Calendar className="h-5 w-5 text-blue-500 mr-2" />
            <div className="text-sm text-blue-700">
              <p className="font-medium">Số ngày phép còn lại: 10 ngày</p>
            </div>
          </div>
        )}
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">Hủy</Button>
        </DialogClose>
        <Button onClick={onSubmit}>Gửi yêu cầu</Button>
      </DialogFooter>
    </>
  );
};
