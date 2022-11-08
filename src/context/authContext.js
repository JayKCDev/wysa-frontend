import { createContext } from "react";

export const AuthContext = createContext({
  token: null,
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
  userId: null,
  nickname: "",
  support: "",
  stepsSkipped: "",
  stepsCompleted: null,
});
