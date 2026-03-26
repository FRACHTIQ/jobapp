import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { PropsWithChildren } from "react";
import { clearToken, getToken, login, register, storeToken } from "../lib/api";

type User = {
  id: string;
  email: string;
  name: string;
};

type AuthContextValue = {
  user: User | null;
  token: string | null;
  hydrated: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: PropsWithChildren) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    void getToken().then((storedToken) => {
      if (storedToken) {
        setToken(storedToken);
      }
      setHydrated(true);
    });
  }, []);

  async function signIn(email: string, password: string) {
    const result = await login(email, password);
    await storeToken(result.token);
    setToken(result.token);
    setUser(result.user);
  }

  async function signUp(name: string, email: string, password: string) {
    const result = await register(email, password, name);
    await storeToken(result.token);
    setToken(result.token);
    setUser(result.user);
  }

  async function signOut() {
    await clearToken();
    setUser(null);
    setToken(null);
  }

  const value = useMemo(
    () => ({ token, user, hydrated, signIn, signUp, signOut }),
    [hydrated, token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}
