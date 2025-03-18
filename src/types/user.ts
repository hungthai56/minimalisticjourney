
export interface User {
  id: number;
  username: string;
  name: string;
  password: string; // Note: In a real application, passwords should be hashed
  role: "admin" | "user";
  avatar?: string;
}

export const initialUsersData: User[] = [
  {
    id: 1,
    username: "admin",
    name: "Quản trị viên",
    password: "admin",
    role: "admin",
    avatar: "/placeholder.svg"
  }
];
