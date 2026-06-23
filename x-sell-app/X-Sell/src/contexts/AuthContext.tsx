    import { createContext, useContext, useState } from "react";

type AuthContextType = {
  isLogged: boolean;
  login: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLogged, setIsLogged] = useState(false);

  const login = () => {
    setIsLogged(true);
  };

  const logout = () => {
    setIsLogged(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isLogged,
        login,
        logout,
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