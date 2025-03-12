
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Calendar, ClipboardCheck, Clock } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="container max-w-7xl mx-auto mt-8">
      <h1 className="text-3xl font-semibold mb-6">Bảng điều khiển</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="p-2 bg-primary/10 rounded-md">
                <Users className="h-10 w-10 text-primary" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-muted-foreground">Tổng nhân viên</p>
                <h3 className="text-2xl font-bold">248</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-500/10 rounded-md">
                <Calendar className="h-10 w-10 text-blue-500" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-muted-foreground">Nghỉ hôm nay</p>
                <h3 className="text-2xl font-bold">12</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-500/10 rounded-md">
                <ClipboardCheck className="h-10 w-10 text-green-500" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-muted-foreground">Yêu cầu đã duyệt</p>
                <h3 className="text-2xl font-bold">156</h3>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-500/10 rounded-md">
                <Clock className="h-10 w-10 text-yellow-500" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-muted-foreground">Đang chờ duyệt</p>
                <h3 className="text-2xl font-bold">8</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Yêu cầu ra/vào gần đây</CardTitle>
            <CardDescription>
              Các yêu cầu ra/vào công ty trong 7 ngày qua
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((item) => (
                <div 
                  key={item} 
                  className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                      <span className="font-medium">NV</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Nguyễn Văn {String.fromCharCode(64 + item)}</h4>
                      <p className="text-sm text-muted-foreground">Nghỉ phép: 14/05/2023</p>
                    </div>
                  </div>
                  <div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      item % 3 === 0 ? "bg-yellow-100 text-yellow-800" : 
                      item % 3 === 1 ? "bg-green-100 text-green-800" : 
                      "bg-red-100 text-red-800"
                    }`}>
                      {item % 3 === 0 ? "Đang chờ" : 
                       item % 3 === 1 ? "Đã duyệt" : 
                       "Từ chối"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Nhân viên mới</CardTitle>
            <CardDescription>
              Nhân viên mới gia nhập trong tháng gần nhất
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((item) => (
                <div 
                  key={item} 
                  className="flex items-center p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                    <span className="font-medium">NV</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">Nguyễn Văn {String.fromCharCode(69 + item)}</h4>
                    <p className="text-sm text-muted-foreground">Phòng Kỹ thuật • Gia nhập 05/05/2023</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
