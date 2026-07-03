import { createContext, useContext, useEffect, useState } from "react";
import { checkToken, getToken, killToken, putToken, setOnExpiredToken } from "../services/jwtHandling"
import { useMessageDialog } from "@/hooks/useMessageDialog";

type AuthContextType = {
  isLogged: boolean;
  ContextLogin: (username: string, token: string) => void;
  ContextLogout: () => void;
  username: string;
  token: string;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLogged, setIsLogged] = useState(false);
  const [username, setUsername] = useState<string>("");
  const [token, setToken] = useState<string>("");

  const {showMessage, MessageDialog} = useMessageDialog();

  useEffect(() => {
    async function loadSession() {
      const checkSession = await getToken(); //check for saved token
      if (!isLogged && checkSession.exists && checkSession.token && checkSession.username) { // not logged but has session data
        const response = await checkToken(checkSession.token); //verify token
        setUsername(response.success?checkSession.username:"");
        setToken(response.success?checkSession.token:"");
        response.success?{}:killToken();
        response.success?? showMessage({message : response.message,
            msgType: response.msgType,
            afterDialog: ()=> setIsLogged(true)}); //only showmessage if valid session found
      } else { // bad session data, clear it
        setUsername("");
        setToken("");
        await killToken();
        setIsLogged(false);
        } //then no message needed
      }
    loadSession();
  }, []);

  useEffect(() => {
    setOnExpiredToken(async () => {
      await killToken();
      showMessage({message : "Sessão expirada",
            msgType: "warning",
            afterDialog: () => {
      setIsLogged(false);
      setUsername("");
      setToken("");
      }});
    });
  }, []);

  useEffect(() => {
  if (!isLogged || !token) return;

  const interval = setInterval(() => {
    checkToken(token)
  }, 5 * 60 * 1000);

  return () => clearInterval(interval);
  }, [isLogged, token]);

  const ContextLogin = (username: string, token: string) => {
    showMessage({message : "Entrando",
            msgType: "success",
            afterDialog: () => {
      setIsLogged(true);
      putToken(username, token);
      setUsername(username);
      setToken(token);
    }});
    //console.log("sessão iniciada: ", username);
  };

  const ContextLogout = async () => {
      killToken();
      showMessage({message : "Saindo",
            msgType: "info",
            afterDialog: () => {
      setIsLogged(false);
      setUsername("");
      setToken("");
    }});
  };

  return (
    <>
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
    <MessageDialog/>
    </>
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