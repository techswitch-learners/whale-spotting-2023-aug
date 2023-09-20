import { createContext, ReactNode, useState } from "react";
import {
  getAllPendingPosts,
  tryEncodedAuth,
} from "../clients/backendApiClient";

export const LoginContext = createContext({
  encodedAuth: "",
  isLoggedIn: false,
  isAdmin: false,
  pendingPostCount: 0,
  logIn: async (username: string, password: string) => {
    void username;
    void password;
    return false;
  },
  logOut: () => {},
  updatePendingPostCount: async (encodedAuth: string) => {
    void encodedAuth;
  },
});

interface LoginManagerProps {
  children: ReactNode;
}

export function LoginManager(props: LoginManagerProps): JSX.Element {
  const [loggedIn, setLoggedIn] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [encodedAuth, setEncodedAuth] = useState("");
  const [pendingPostCount, setPendingPostCount] = useState(0);

  async function logIn(username: string, password: string) {
    const encodedAuthToTry = `Basic ${btoa(username + ":" + password)}`;

    const validLogin = await tryEncodedAuth(encodedAuthToTry);
    if (!validLogin) {
      setLoggedIn(false);
      return false;
    } else {
      setEncodedAuth(encodedAuthToTry);
      setLoggedIn(true);
      if (validLogin.role === 1) {
        setAdmin(true);
      } else {
        setAdmin(false);
      }
      return true;
    }
  }

  async function updatePendingPostCount(encodedAuth: string) {
    const pendingPosts = await getAllPendingPosts(encodedAuth);
    if (pendingPosts) {
      setPendingPostCount(pendingPosts.posts.length);
    }
  }

  function logOut() {
    setEncodedAuth("");
    setAdmin(false);
    setLoggedIn(false);
  }

  const context = {
    encodedAuth: encodedAuth,
    isLoggedIn: loggedIn,
    isAdmin: admin,
    pendingPostCount: pendingPostCount,
    logIn: logIn,
    logOut: logOut,
    updatePendingPostCount: updatePendingPostCount,
  };

  return (
    <LoginContext.Provider value={context}>
      {props.children}
    </LoginContext.Provider>
  );
}
