import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient.js";

const AuthContext = createContext({ user: null, loading: true });

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const { data } = await supabase.auth.signInWithPassword({
        email: "demo@stark.com",
        password: "demo"
      });
      setUser(data.user);
      setLoading(false);
    };
    initAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}


