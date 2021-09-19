import { createContext, useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import { api } from "services/apiClient";
import { toast } from "react-toastify";

export const AuthContext = createContext({});

export function signOut() {
  localStorage.removeItem("token");

  Router.push("/auth/login");
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const isAuthenticated = !!user;

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      api
        .get("/me")
        .then((response) => setUser(response.data))
        .catch(() => signOut());
    } else {
      router.push("/auth/login");
    }
  }, []);

  async function signIn({ login, senha }) {
    try {
      const response = await api.post("login", {
        login,
        senha,
      });

      const { user, token } = response.data;

      localStorage.setItem("token", token);

      setUser(user);

      api.defaults.headers["Authorization"] = `Bearer ${token}`;

      toast.success("Login realizado");

      router.push("/admin/dashboard");
    } catch (error) {
      toast.error("Credenciais inválidas");
    }
  }
  return (
    <AuthContext.Provider value={{ signIn, signOut, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  );
}
