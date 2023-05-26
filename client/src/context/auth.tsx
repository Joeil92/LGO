import { createContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";

interface User {
  username: string;
  roles: string[];
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

interface AuthContextProps {
  authState: AuthState;
  login: (token: string) => void;
  logout: () => void;
}

const initialAuthState: AuthState = {
  user: null,
  isAuthenticated: false,
};

export const AuthContext = createContext<AuthContextProps>({
  authState: initialAuthState,
  login: () => {},
  logout: () => {}
});

export const AuthProvider = ({ children }: any) => {
  const [authState, setAuthState] = useState<AuthState>(initialAuthState);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) login(token);
  }, [])

  const decodeJwt = (token: string) => jwt_decode(token);

  const login = (token: string) => {
    
    localStorage.setItem('token', token);

    const decode_user: any = decodeJwt(token);

    const user: User = {
      username: decode_user.username,
      roles: decode_user.roles
    };

    setAuthState({ user, isAuthenticated: true });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuthState(initialAuthState);
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};