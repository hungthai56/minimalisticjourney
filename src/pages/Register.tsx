
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RegisterForm from "@/components/RegisterForm";
import { useToast } from "@/hooks/use-toast";
import { User, initialUsersData } from "@/types/user";

const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleRegister = (username: string, password: string, name: string) => {
    // Check if username already exists
    const existingUsers = JSON.parse(localStorage.getItem("users") || JSON.stringify(initialUsersData));
    const userExists = existingUsers.some((user: User) => user.username === username);
    
    if (userExists) {
      toast({
        variant: "destructive",
        title: "Lỗi",
        description: "Tên đăng nhập đã tồn tại.",
      });
      return;
    }
    
    // Create new user
    const newUser: User = {
      id: existingUsers.length + 1,
      username,
      password,
      name,
      role: "user" // Default role for new registrations
    };
    
    // Save to localStorage
    const updatedUsers = [...existingUsers, newUser];
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    
    // Show success message
    toast({
      title: "Đăng ký thành công",
      description: "Tài khoản của bạn đã được tạo thành công.",
    });
    
    // Redirect to login
    navigate("/login");
  };

  return <RegisterForm onRegister={handleRegister} />;
};

export default Register;
