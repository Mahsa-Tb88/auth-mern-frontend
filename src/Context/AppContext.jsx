import { createContext, useContext, useEffect, useReducer } from "react";
import { appReducer } from "./appReducer";
import { initialize } from "../utils/api";

const AppContext = createContext();

function AppContextProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, {
    user: {
      id: "",
      isLoggedIn: false,
      username: "",
      email: "",
    },

    initializeApp,
  });

  useEffect(() => {
    const timeOut = setTimeout(initializeApp, 20);
    return () => clearTimeout(timeOut);
  }, []);

  async function initializeApp() {
    const result = await initialize();
    console.log(result);
    if (result.success) {
      console.log("initialize");
      const user = {
        id: result.body._id,
        email: result.body.email,
        username: result.body.username,
        isLoggedIn: true,
      };
      dispatch({ type: "setUser", payload: user });
    } else {
      console.log(result);
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
