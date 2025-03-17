
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type EmployeeSearchProps = {
  searchTerm: string;
  onSearchChange: (value: string) => void;
};

export const EmployeeSearch = ({ searchTerm, onSearchChange }: EmployeeSearchProps) => {
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
      <Button variant="outline" className="w-full md:w-auto">
        <Filter className="h-4 w-4 mr-2" />
        Lọc
      </Button>
    </div>
  );
};
