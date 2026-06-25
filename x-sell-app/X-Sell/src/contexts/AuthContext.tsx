    import { createContext, useContext, useState } from "react";
    import { getToken } from "../services/userAuth"

type AuthContextType = {
  isLogged: boolean;
  ContextLogin: () => void;
  ContextLogout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLogged, setIsLogged] = useState(getToken());//checks local storage for token and username);

  const ContextLogin = () => {
    setIsLogged(true);
  };

  const ContextLogout = () => {
    setIsLogged(false);
  };

 

  return (
    <AuthContext.Provider
      value={{
        isLogged,
        ContextLogin,
        ContextLogout,
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