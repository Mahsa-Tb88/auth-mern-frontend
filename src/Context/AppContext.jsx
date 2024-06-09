import { createContext, useContext, useEffect, useReducer } from "react";
import { appReducer } from "./appReducer";
import { initialize } from "../utils/api";

const AppContext = createContext();

function AppContextProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, {
    user: {
      isLoggedIn: false,
      username: "",
      email: "",
    },
    initialized: false,
    initializedError: false,
    initializeApp,
  });
  useEffect(() => {
    const timeOut = setTimeout(initializeApp, 20);
    return () => clearTimeout(timeOut);
  }, []);
  async function initializeApp() {
    const result = await initialize();
    if (result.success) {
      console.log(result);
      // dispatch({ type: "setUser", payload: result.body });
    }
  }

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

function useAppContext() {
  return useContext(AppContext);
}

export { AppContextProvider, useAppContext };
