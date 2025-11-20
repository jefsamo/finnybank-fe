/* eslint-disable react-hooks/set-state-in-effect */
// useAuth.ts
import { useEffect, useState } from "react";

export interface CurrentUser {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  tokenVersion: number;
}

export function useAuth() {
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    const storedUser = localStorage.getItem("currentUser");

    setToken(storedToken);

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.warn("Failed to parse currentUser from localStorage", e);
        setUser(null);
      }
    }

    setInitializing(false);
  }, []);

  // 👉 Only require token to consider the user logged in
  const isLoggedIn = !!token;

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("currentUser");
    setUser(null);
    setToken(null);
  };

  const hasRole = (role: string) => user?.roles?.includes(role) ?? false;

  return { user, token, isLoggedIn, initializing, logout, hasRole };
}
