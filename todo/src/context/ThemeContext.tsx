import { FC, ReactNode, createContext, useContext, useState } from "react";

interface theme {

}

interface ThemeContextType {
  theme: theme | null;
  themeToggler: () => void;
}

interface props {
  children: ReactNode
}

const ThemeContext = createContext<ThemeContextType | null>(null);

const useTheme = () => useContext(ThemeContext);

const ThemeProvider: FC<props> = ({ children }) => {
  const [theme, setTheme] = useState<theme | null>('light');

  const themeToggler = () => {
    const themeData = theme === "dark" ? "light" : "dark"
    setTheme(themeData)
  }

  return (
    <ThemeContext.Provider value={{ theme, themeToggler }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { useTheme, ThemeProvider };