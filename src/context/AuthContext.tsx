import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { User } from "../types/auth.d";
import AuthApi from "../servers/auth.api";

interface AuthContextType {
  isLoggedIn: boolean;
  accessToken: string | null;
  user: User | null;
  login: (token: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("accesstoken");
    if (token) {
      setIsLoggedIn(true);
      setAccessToken(token);
      fetchUser();
    }
  }, []);

  const fetchUser = async () => {
    try {
      const res = await AuthApi.Me(); //API trả về user (id, role, name)
      setUser(res.data);
    } catch {
      logout(); // token không hoạt động sẽ tự động logout
    }
  };

  const login = async (token: string) => {
    localStorage.setItem("accesstoken", token);
    setIsLoggedIn(true);
    setAccessToken(token);
    await fetchUser();
  };

  const logout = async () => {
    localStorage.removeItem("accesstoken");
    setIsLoggedIn(false);
    setAccessToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, accessToken, user, login, logout }}
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
