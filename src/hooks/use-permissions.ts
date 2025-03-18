
export const usePermissions = () => {
  const getUserInfo = () => {
    const userStr = localStorage.getItem("user");
    if (!userStr) return null;
    return JSON.parse(userStr);
  };

  const isAdmin = () => {
    const user = getUserInfo();
    return user?.role === "admin";
  };

  const isUser = () => {
    const user = getUserInfo();
    return user?.role === "user";
  };

  const getCurrentUserId = () => {
    const user = getUserInfo();
    return user?.id;
  };

  const getCurrentUsername = () => {
    const user = getUserInfo();
    return user?.username;
  };

  const getCurrentUserName = () => {
    const user = getUserInfo();
    return user?.name;
  };

  return {
    isAdmin,
    isUser,
    getCurrentUserId,
    getCurrentUsername,
    getCurrentUserName
  };
};
