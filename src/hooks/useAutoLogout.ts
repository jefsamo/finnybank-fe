// src/hooks/useAutoLogout.ts
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";

const IDLE_TIMEOUT_MS = 2 * 60 * 1000; // 2 minutes

export const useAutoLogout = () => {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) return; // don't run if not logged in

    let timeoutId: number;

    const resetTimer = () => {
      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        logout();
        navigate("/login");
      }, IDLE_TIMEOUT_MS);
    };

    // Activity events that count as "user is active"
    const events = [
      "click",
      "mousemove",
      "keydown",
      "scroll",
      "touchstart",
    ] as const;

    events.forEach((event) => window.addEventListener(event, resetTimer));

    // Start the timer on mount
    resetTimer();

    // Cleanup on unmount or when user logs out
    return () => {
      window.clearTimeout(timeoutId);
      events.forEach((event) => window.removeEventListener(event, resetTimer));
    };
  }, [isLoggedIn, logout, navigate]);
};
