import { createContext, ReactNode, useState } from "react";
import { tryUserBase } from "../clients/backendApiClient";
import { redirect } from "react-router-dom";

export const LoginContext = createContext({
  userBase: "",
  isLoggedIn: false,
  isAdmin: false,
  logIn: (email: string, password: string) => {
    email + password;
  },
  logOut: () => {},
});

interface LoginManagerProps {
  children: ReactNode;
}

export function LoginManager(props: LoginManagerProps): JSX.Element {
  const [loggedIn, setLoggedIn] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [base, setBase] = useState("");

  async function logIn(email: string, password: string) {
    const userBase = `Basic ${btoa(email + ":" + password)}`;

    const validLogin = await tryUserBase(userBase);
    if (!validLogin) {
      setLoggedIn(false);
      return redirect("/login");
    } else {
      setBase(userBase);
      setLoggedIn(true);
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
