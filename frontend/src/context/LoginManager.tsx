import { createContext, ReactNode, useState } from "react";
import { tryUserBase } from "../clients/backendApiClient";

export const LoginContext = createContext({
  userBase: "",
  isLoggedIn: false,
  isAdmin: false,
  logIn: async (username: string, password: string) => {
    username + password;
    return false;
  }, //How do we fix this paramters???
  logOut: () => {},
});

interface LoginManagerProps {
  children: ReactNode;
}

export function LoginManager(props: LoginManagerProps): JSX.Element {
  const [loggedIn, setLoggedIn] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [base, setBase] = useState("");

  async function logIn(username: string, password: string) {
    const userBase = `Basic ${btoa(username + ":" + password)}`;

    const validLogin = await tryUserBase(userBase);
    if (!validLogin) {
      setLoggedIn(false);
      return false;
    } else {
      setBase(userBase);
      setLoggedIn(true);
      return true;
    }
  }

  function logOut() {
    setBase("");
    setAdmin(false);
    setLoggedIn(false);
  }

  const context = {
    userBase: base,
    isLoggedIn: loggedIn,
    isAdmin: admin,
    logIn: logIn,
    logOut: logOut,
  };

  return (
    <LoginContext.Provider value={context}>
      {props.children}
    </LoginContext.Provider>
  );
}
