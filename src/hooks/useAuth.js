import { AuthContext } from "context/AuthContext";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";

export function useAuth() {
  const { isAuthenticated, isAuthLoaded } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (isAuthLoaded) {
      if (!isAuthenticated) router.push("/auth/login");
    }
  }, []);
}
