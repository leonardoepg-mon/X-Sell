    import { createContext, useContext, useEffect, useState } from "react";
    import { checkToken, getToken, killToken, putToken, setOnExpiredToken } from "../services/userAuth"
import { MessageDialog } from "@/components/MessageDialog";


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

  const [message, setMessage] = useState('');
    const [msgType, setMsgType] = useState('');
    const [isMsgVisible, setMsgVisible] = useState(false);
    const [afterDialog, setAfterDialog] = useState<(() => void) | null>(null);

  useEffect(() => {
    async function loadSession() {
      const checkSession = await getToken(); //check for saved token
      if (checkSession.exists && checkSession.token && checkSession.username) { const response = await checkToken(checkSession.token); //verify token
        if (!response.success) { //if token expired or other problems, open dialog to say it
          setUsername("");
          setToken("");
          killToken();
          setAfterDialog(() => () => {
            setIsLogged(false);
          })
        } else {
          setUsername(checkSession.username);
          setToken(checkSession.token);
          setAfterDialog(() => () => { // token valid, session exists
            setIsLogged(true);
          })
        }
        setMessage(response.message);
        setMsgType(response.msgType);
        setMsgVisible(true);   // message from server
      } else { //no token found, session invalid
        setUsername("");
        setToken("");
        killToken();
        setAfterDialog(() => () => {
          setIsLogged(false);
        }) //then no message needed
      setMessage("");
      setMsgType("");
      }
    }
    loadSession();
    //console.log(token);
  }, []);

  useEffect(() => {
  setOnExpiredToken(async () => {
    await killToken();
    setIsLogged(false);
    setUsername("");
    setToken("");
  });
}, []);

  const ContextLogin = (username: string, token: string) => {
    setAfterDialog(() => () => {
      setIsLogged(true);
      putToken(username, token);
      setUsername(username);
      setToken(token);
    })
    setMessage("Entrando");
    setMsgType("info");
    setMsgVisible(true);
    //console.log("sessão iniciada: ", username);
  };

  const ContextLogout = async () => {
    
      setIsLogged(false);
      setUsername("");
      setToken("");
      killToken();
  
    //console.log("sessão terminada.");
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
    <MessageDialog visible= {isMsgVisible}
                           messageType={msgType}
                           message={message}
                            onOK={() => {
                                  setMsgVisible(false);
    
                                  if (afterDialog) {
                                    afterDialog();
                                    setAfterDialog(null);
                                  }
                                }}
        />
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