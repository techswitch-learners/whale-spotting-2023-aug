import { createContext, ReactNode, useState } from "react";
import { tryEncodedAuth } from "../clients/backendApiClient";

export const LoginContext = createContext({
  encodedAuth: "",
  isLoggedIn: false,
  isAdmin: false,
  userName: "",
  logIn: async (username: string, password: string) => {
    void username;
    void password;
    return false;
  },
  logOut: () => {},
});

interface LoginManagerProps {
  children: ReactNode;
}

export function LoginManager(props: LoginManagerProps): JSX.Element {
  const [loggedIn, setLoggedIn] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [userName, setUserName] = useState("");
  const [encodedAuth, setEncodedAuth] = useState("");

  async function logIn(username: string, password: string) {
    const encodedAuthToTry = `Basic ${btoa(username + ":" + password)}`;

    const validLogin = await tryEncodedAuth(encodedAuthToTry);
    if (!validLogin) {
      setLoggedIn(false);
      return false;
    } else {
      setEncodedAuth(encodedAuthToTry);
      setLoggedIn(true);
      setUserName(username);
      return true;
    }
  }

  function logOut() {
    setEncodedAuth("");
    setAdmin(false);
    setLoggedIn(false);
    setUserName("");
  }

  const context = {
    encodedAuth: encodedAuth,
    isLoggedIn: loggedIn,
    isAdmin: admin,
    userName: userName,
    logIn: logIn,
    logOut: logOut,
  };

  return (
    <LoginContext.Provider value={context}>
      {props.children}
    </LoginContext.Provider>
  );
}
