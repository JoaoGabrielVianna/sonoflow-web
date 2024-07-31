import { createContext, ReactNode, useContext } from "react";
import { AuthContextType } from "../types/auth";
import { Navbar } from "../components/Navbar";
import { Loading } from "../components/Loading";
import useProvideAuth from "../hooks/useProvideAuth";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const auth = useProvideAuth()
  if (auth.loading) {
    return <Loading />
  }

  return (
    <AuthContext.Provider value={auth}>
      <div className="h-screen flex items-center justify-center">
        {children}
        {auth.showNavbar && <Navbar />}
      </div>
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context
}