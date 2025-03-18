
import { User } from "@/types/user";
import { fetchWithAuth } from "@/utils/api";

// For demo purposes only - this would come from the real API in production
const MOCK_USERS: User[] = [
  {
    id: 1,
    username: "admin",
    name: "Quản trị viên",
    role: "admin",
    avatar: "/placeholder.svg",
    email: "admin@example.com"
  },
  {
    id: 2,
    username: "user1",
    name: "Nguyễn Văn A",
    role: "user",
    avatar: "/placeholder.svg",
    email: "user1@example.com"
  },
  {
    id: 3,
    username: "user2",
    name: "Trần Thị B",
    role: "user",
    avatar: "/placeholder.svg",
    email: "user2@example.com"
  }
];

// Flag to control if we're using mock data or real API calls
const USE_MOCK = true;

export const getUsers = async (): Promise<User[]> => {
  if (USE_MOCK) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return [...MOCK_USERS];
  }
  
  // Real API call
  return fetchWithAuth('/users');
};

export const getUserById = async (id: number): Promise<User | undefined> => {
  if (USE_MOCK) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return MOCK_USERS.find(user => user.id === id);
  }
  
  // Real API call
  return fetchWithAuth(`/users/${id}`);
};

export const createUser = async (user: Omit<User, "id" | "avatar">): Promise<User> => {
  if (USE_MOCK) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Create new user with mock ID and avatar
    const newUser: User = {
      id: Math.max(...MOCK_USERS.map(u => u.id)) + 1,
      avatar: "/placeholder.svg",
      ...user
    };
    
    // In a real API this would be persisted
    MOCK_USERS.push(newUser);
    
    return newUser;
  }
  
  // Real API call
  return fetchWithAuth('/users', {
    method: 'POST',
    body: JSON.stringify(user)
  });
};

export const updateUser = async (id: number, user: Partial<User>): Promise<User> => {
  if (USE_MOCK) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const index = MOCK_USERS.findIndex(u => u.id === id);
    if (index === -1) {
      throw new Error('User not found');
    }
    
    // Update user
    MOCK_USERS[index] = { ...MOCK_USERS[index], ...user };
    
    return MOCK_USERS[index];
  }
  
  // Real API call
  return fetchWithAuth(`/users/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(user)
  });
};

export const deleteUser = async (id: number): Promise<void> => {
  if (USE_MOCK) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 700));
    
    const index = MOCK_USERS.findIndex(u => u.id === id);
    if (index === -1) {
      throw new Error('User not found');
    }
    
    // Remove user
    MOCK_USERS.splice(index, 1);
    
    return;
  }
  
  // Real API call
  return fetchWithAuth(`/users/${id}`, {
    method: 'DELETE'
  });
};
