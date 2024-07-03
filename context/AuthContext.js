import { createContext } from "react";

const AuthContext = createContext({
  auth: {
    token: "",
    authenticated: false,
  },
  login: () => null,
  logout: () => null,
});

export default AuthContext;