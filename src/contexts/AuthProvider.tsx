import { useEffect, useState } from "react";
import { useAuthQuery } from "../hooks/useAuthQuery";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data, refetch } = useAuthQuery();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(data?.isLoggedIn ?? false);

  // Keep local state in sync with server
  useEffect(() => {
    if (data?.isLoggedIn !== undefined) {
      setIsLoggedIn(data.isLoggedIn);
    }
  }, [data]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, refetch }}>
      {children}
    </AuthContext.Provider>
  );
}


