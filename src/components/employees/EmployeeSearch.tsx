
import { Search, Filter, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type EmployeeSearchProps = {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (status: string) => void;
};

export const EmployeeSearch = ({ 
  searchTerm, 
  onSearchChange,
  statusFilter,
  onStatusFilterChange
}: EmployeeSearchProps) => {
  return (
    <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
      <div className="relative w-full md:w-96">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input 
          placeholder="Tìm kiếm nhân viên..." 
          className="pl-10"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-full md:w-auto">
            <Filter className="h-4 w-4 mr-2" />
            {statusFilter === "all" ? "Tất cả trạng thái" : 
             statusFilter === "active" ? "Đang làm việc" : 
             statusFilter === "inactive" ? "Nghỉ việc" : "Lọc"}
            <ChevronDown className="h-4 w-4 ml-2" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => onStatusFilterChange("all")}>
            Tất cả trạng thái
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onStatusFilterChange("active")}>
            Đang làm việc
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onStatusFilterChange("inactive")}>
            Nghỉ việc
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
