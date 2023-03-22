import React, { createContext, useState } from "react";
import Background from "./components/background/Background";
import Header from "./components/header/Header";

export const AppContext = createContext([]);

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [theme, setTheme] = useState(false);
  return (
    <AppContext.Provider value={{ tasks, setTasks, theme, setTheme }}>
      <main className="main">
        <Header />
        <Background />
      </main>
    </AppContext.Provider>
  );
};

export default App;
