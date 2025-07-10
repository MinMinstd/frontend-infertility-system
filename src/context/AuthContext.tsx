import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { ReactNode } from "react";
import type { User } from "../types/auth.d";
import AuthApi from "../servers/auth.api";

interface AuthContextType {
  isLoggedIn: boolean;
  accessToken: string | null;
  user: User | null;
  login: (token: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    try {
      const res = await AuthApi.Me(); // API trả về: userId, email, phone, role
      console.log("User info:", res.data);

      setUser({
        userId: res.data.userId,
        name: res.data.name ?? "",
        email: res.data.email,
        phone: res.data.phone,
        role: res.data.role,
      });

      setIsLoggedIn(true);
    } catch (error) {
      console.error("Lỗi khi gọi AuthApi.Me:", error);
      logout(); // token không hoạt động sẽ tự động logout
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("accesstoken");
    if (token) {
      setAccessToken(token);
      fetchUser();
    } else {
      setIsLoading(false);
    }
  }, [fetchUser]); // Add fetchUser to dependency array

  const login = async (token: string) => {
    localStorage.setItem("accesstoken", token);
    setIsLoggedIn(true);
    setAccessToken(token);
    await fetchUser();
  };

  const logout = async () => {
    console.log("Trước khi xóa:", localStorage.getItem("accesstoken")); // kiểm tra có tồn tại không
    localStorage.removeItem("accesstoken");
    console.log("Sau khi xóa:", localStorage.getItem("accesstoken")); // xem đã mất chưa
    setIsLoggedIn(false);
    setAccessToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, accessToken, user, login, logout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
