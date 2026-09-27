import { useAuthContext } from "@/contexts/AuthContext";

export const useAuth = () => {
  const ctx = useAuthContext();
  return {
    admin: ctx.admin,
    isAuthenticated: ctx.isAuthenticated,
    isLoading: ctx.isLoading,
    login: ctx.login,
    logout: ctx.logout,
    checkAuth: ctx.checkAuth,
  };
};
