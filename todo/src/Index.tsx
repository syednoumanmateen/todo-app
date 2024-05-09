import { FC, memo, useEffect, useState } from "react";
import App from "./App";
import Spinner from "./components/Spinner";
import { AuthProvider } from "./context/AuthContext";
import { SocketProvider } from "./context/SocketContext";
import { ExpenseProvider } from "./context/ExpenseContext";
import { ThemeProvider, useTheme } from "./context/ThemeContext"

interface props { }

const Index: FC<props> = ({ }) => {
  const [showSpinner, setShowSpinner] = useState(true);
  const theme = useTheme()

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSpinner(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="App">
      {showSpinner ? <Spinner /> : <>
        <ThemeProvider>
          <AuthProvider>
            <ExpenseProvider>
              <SocketProvider>
                <div className={`${theme?.theme === 'light' ? 'bg-light text-dark' : 'bg-dark text-light'} h-screen hide-scrollbar`}>
                  <App />
                </div>
              </SocketProvider>
            </ExpenseProvider>
          </AuthProvider>
        </ThemeProvider>
      </>}
    </div>
  )
}

export default memo(Index)
