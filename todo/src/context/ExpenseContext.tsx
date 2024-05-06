import { FC, ReactNode, createContext, useContext, useState } from "react";

interface expense {

}

interface ExpenseContextType {
  expense: expense | null;
  expenseTracker: () => void;
}

interface props {
  children: ReactNode
}

const ExpenseContext = createContext<ExpenseContextType | null>(null);

const useAuth = () => useContext(ExpenseContext);

const ExpenseProvider: FC<props> = ({ children }) => {
  const [expense, setExpense] = useState<expense | null>(() => {
    const storedExpense = localStorage.getItem("expense");
    return storedExpense ? JSON.parse(storedExpense) : null;
  });

  const expenseTracker = () => {
    const expenseData = ""
    setExpense(expenseData)
  }

  return (
    <ExpenseContext.Provider value={{ expense, expenseTracker }}>
      {children}
    </ExpenseContext.Provider>
  );
};

export { useAuth, ExpenseProvider };