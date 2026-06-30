    import { createContext, useContext, useEffect, useState } from "react";
    import { getToken, killToken, putToken } from "../services/userAuth"

type AuthContextType = {
  isLogged: boolean;
  ContextLogin: (username: string, token: string) => void;
  ContextLogout: () => void;
  username: string | null;
  token: string | null;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLogged, setIsLogged] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    async function loadSession() {
      const checkSession = await getToken();

      setIsLogged(checkSession.exists);
      setUsername(checkSession.username ?? null);
      setToken(checkSession.token ?? null);
      if (checkSession.exists) {console.log("sessão encontrada: ", checkSession.username, checkSession.token)};
    }
    loadSession();
  }, []);

  const ContextLogin = (username: string, token: string) => {
    setIsLogged(true);
    putToken(username, token);
    setUsername(username);
    console.log("sessão iniciada: ", username);
  };

  const ContextLogout = async () => {
    setIsLogged(false);
    setUsername(null);
    killToken();
    console.log("sessão terminada.");
  };

 

  return (
    <AuthContext.Provider
      value={{
        isLogged,
        ContextLogin,
        ContextLogout,
        username,
        token
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth precisa estar dentro de AuthProvider"
    );
  }

  return context;
}