import { useState } from "react";
import { 
  Card, 
  CardContent,
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Save, User, Lock, FileText, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const { toast } = useToast();
  
  const [profileData, setProfileData] = useState({
    fullName: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    phone: "0987654321",
    dateOfBirth: "1980-01-01",
    address: "123 Đường ABC, Quận XYZ, TP.HCM",
  });
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  
  const [avatar, setAvatar] = useState<string | null>(null);
  
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [id]: value
    }));
  };
  
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [id]: value
    }));
  };
  
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log("Saving profile data:", profileData);
    
    toast({
      title: "Lưu thay đổi thành công",
      description: "Thông tin cá nhân của bạn đã được cập nhật",
    });
  };
  
  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      toast({
        title: "Thiếu thông tin",
        description: "Vui lòng điền đầy đủ thông tin mật khẩu",
        variant: "destructive",
      });
      return;
    }
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "Mật khẩu không khớp",
        description: "Mật khẩu mới và xác nhận mật khẩu không khớp nhau",
        variant: "destructive",
      });
      return;
    }
    
    console.log("Changing password:", passwordData);
    
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    
    toast({
      title: "Đổi mật khẩu thành công",
      description: "Mật khẩu của bạn đã được cập nhật",
    });
  };
  
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleRemoveAvatar = () => {
    setAvatar(null);
    toast({
      title: "Đã xóa ảnh đại diện",
    });
  };

  return (
    <div className="container max-w-5xl mx-auto mt-8">
      <h1 className="text-3xl font-semibold mb-6">Thông tin cá nhân</h1>
      
      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="w-full max-w-md">
          <TabsTrigger value="profile" className="flex items-center">
            <User className="h-4 w-4 mr-2" />
            Thông tin cá nhân
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center">
            <Lock className="h-4 w-4 mr-2" />
            Bảo mật
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Thông tin cá nhân</CardTitle>
              <CardDescription>
                Cập nhật thông tin cá nhân của bạn
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center">
                <div className="h-24 w-24 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xl font-medium mr-6 overflow-hidden">
                  {avatar ? (
                    <img src={avatar} alt="Avatar" className="h-full w-full object-cover" />
                  ) : (
                    "NA"
                  )}
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">Ảnh đại diện</h3>
                  <div className="flex space-x-2">
                    <label htmlFor="avatar-upload" className="cursor-pointer">
                      <Button size="sm" variant="outline" type="button" onClick={() => document.getElementById('avatar-upload')?.click()}>
                        Thay đổi ảnh
                      </Button>
                      <input 
                        id="avatar-upload" 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={handleAvatarChange}
                      />
                    </label>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="text-destructive"
                      onClick={handleRemoveAvatar}
                      disabled={!avatar}
                    >
                      Xóa
                    </Button>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <form onSubmit={handleSaveProfile}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Họ và tên</Label>
                    <Input 
                      id="fullName" 
                      value={profileData.fullName}
                      onChange={handleProfileChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="employeeId">Mã nhân viên</Label>
                    <Input id="employeeId" value="EMP001" readOnly className="bg-muted" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={profileData.email}
                      onChange={handleProfileChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Số điện thoại</Label>
                    <Input 
                      id="phone" 
                      value={profileData.phone}
                      onChange={handleProfileChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="position">Vị trí</Label>
                    <Input id="position" value="Giám đốc" readOnly className="bg-muted" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="department">Phòng ban</Label>
                    <Input id="department" value="Ban giám đốc" readOnly className="bg-muted" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">Ngày sinh</Label>
                    <Input 
                      id="dateOfBirth" 
                      type="date" 
                      value={profileData.dateOfBirth}
                      onChange={handleProfileChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="address">Địa chỉ</Label>
                    <Input 
                      id="address" 
                      value={profileData.address}
                      onChange={handleProfileChange}
                    />
                  </div>
                </div>
                
                <Button className="mt-6" type="submit">
                  <Save className="h-4 w-4 mr-2" />
                  Lưu thay đổi
                </Button>
              </form>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Thông tin công việc</CardTitle>
              <CardDescription>
                Thông tin về công việc và lịch sử làm việc
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Ngày vào làm</Label>
                  <p className="font-medium">01/01/2020</p>
                </div>
                
                <div className="space-y-2">
                  <Label>Số năm làm việc</Label>
                  <p className="font-medium">3 năm 5 tháng</p>
                </div>
                
                <div className="space-y-2">
                  <Label>Số ngày phép còn lại</Label>
                  <p className="font-medium">12 ngày</p>
                </div>
                
                <div className="space-y-2">
                  <Label>Trạng thái</Label>
                  <p className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Đang làm việc
                  </p>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <h3 className="font-medium flex items-center">
                  <FileText className="h-4 w-4 mr-2" />
                  Quá trình công tác
                </h3>
                <div className="space-y-4 mt-4">
                  <div className="relative pl-8 pb-4 border-l-2 border-border">
                    <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-primary"></div>
                    <h4 className="font-medium">Giám đốc</h4>
                    <p className="text-sm text-muted-foreground">Ban giám đốc • 01/2022 - Hiện tại</p>
                  </div>
                  
                  <div className="relative pl-8 pb-4 border-l-2 border-border">
                    <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-muted"></div>
                    <h4 className="font-medium">Phó giám đốc</h4>
                    <p className="text-sm text-muted-foreground">Ban giám đốc • 01/2021 - 12/2021</p>
                  </div>
                  
                  <div className="relative pl-8">
                    <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-muted"></div>
                    <h4 className="font-medium">Trưởng phòng</h4>
                    <p className="text-sm text-muted-foreground">Phòng Kinh doanh • 01/2020 - 12/2020</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Đổi mật khẩu</CardTitle>
              <CardDescription>
                Cập nhật mật khẩu đăng nhập của bạn
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={handleChangePassword}>
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Mật khẩu hiện tại</Label>
                  <Input 
                    id="currentPassword" 
                    type="password" 
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="newPassword">Mật khẩu mới</Label>
                  <Input 
                    id="newPassword" 
                    type="password" 
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Xác nhận mật khẩu mới</Label>
                  <Input 
                    id="confirmPassword" 
                    type="password" 
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                  />
                </div>
                
                <Button className="mt-4" type="submit">
                  <Save className="h-4 w-4 mr-2" />
                  Cập nhật mật khẩu
                </Button>
              </form>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Bảo mật tài khoản</CardTitle>
              <CardDescription>
                Cài đặt bảo mật cho tài khoản của bạn
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="space-y-0.5">
                    <h4 className="font-medium">Xác thực hai lớp</h4>
                    <p className="text-sm text-muted-foreground">
                      Tăng cường bảo mật cho tài khoản của bạn bằng xác thực hai lớp
                    </p>
                  </div>
                  <Button variant="outline">Thiết lập</Button>
                </div>
                
                <Separator />
                
                <div className="flex justify-between items-center">
                  <div className="space-y-0.5">
                    <h4 className="font-medium">Phiên đăng nhập</h4>
                    <p className="text-sm text-muted-foreground">
                      Quản lý c��c phiên đăng nhập trên các thiết bị khác nhau
                    </p>
                  </div>
                  <Button variant="outline">Quản lý</Button>
                </div>
                
                <Separator />
                
                <div className="flex justify-between items-center">
                  <div className="space-y-0.5">
                    <h4 className="font-medium text-destructive">Khóa tài khoản</h4>
                    <p className="text-sm text-muted-foreground">
                      Tạm thời khóa tài khoản của bạn
                    </p>
                  </div>
                  <Button variant="outline" className="text-destructive">Khóa</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
