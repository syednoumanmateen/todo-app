import { FC, memo, useEffect, useState } from "react";
import App from "./App";
import Spinner from "./components/Spinner";
import { AuthProvider } from "./context/AuthContext";
import { SocketProvider } from "./context/SocketContext";
import { ExpenseProvider } from "./context/ExpenseContext";

interface props { }

const Index: FC<props> = ({ }) => {
  const [showSpinner, setShowSpinner] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSpinner(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="App">
      {showSpinner ? <Spinner /> : <>
        <AuthProvider>
          <ExpenseProvider>
            <SocketProvider>
              <div className="bg-dark text-light h-screen">
                <App />
              </div>
            </SocketProvider>
          </ExpenseProvider>
        </AuthProvider>
      </>}
    </div>
  )
}

export default memo(Index)
