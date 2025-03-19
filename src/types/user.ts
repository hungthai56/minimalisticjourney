
export interface User {
  id: number;
  username: string;
  name: string;
  password?: string; // Making this optional is better practice
  role: "admin" | "user";
  avatar?: string;
  email: string; // Adding email property
}

export const initialUsersData: User[] = [
  {
    id: 1,
    username: "admin",
    name: "Quản trị viên",
    password: "admin",
    role: "admin",
    avatar: "/placeholder.svg",
    email: "admin@example.com" // Adding email to the initial data
  }
];
