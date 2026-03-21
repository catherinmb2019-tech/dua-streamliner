import { createContext, useContext, useState } from "react";
import { AuthService } from "../../patterns/singleton/AuthService";

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState(null);

  const login = async (username: string, password: string) => {
    const auth = AuthService.getInstance();
    const result = await auth.login(username, password);
    setUser(result);
  };

  return (
    <AuthContext.Provider value={{ user, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);