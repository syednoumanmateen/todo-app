import { FC, ReactNode, createContext, useContext, useState } from "react";

interface User {
  _id: string,
  name: string;
  email: string;
  gender: string;
  profile: string;
}

interface AuthContextType {
  user: User | null;
  signIn: (userData: User) => void;
  signOut: () => void;
}

interface props {
  children: ReactNode
}

const AuthContext = createContext<AuthContextType | null>(null);

const useAuth = () => useContext(AuthContext);

const AuthProvider: FC<props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const signIn = (userData: User) => {
    localStorage.setItem('user', JSON.stringify(userData))
    setUser(userData)
  }
  const signOut = () => {
    localStorage.removeItem('user')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export { useAuth, AuthProvider };