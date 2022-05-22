import React from "react";
import { UserDescriptionInterface, userCredentials } from "../interface";

export const UserContext = React.createContext<UserDescriptionInterface>({
  income: 0,
  thresholdExpense: [],
  firstName: "",
  lastName: "",
  loginEmail: "",
  onLogin: (credentials: userCredentials) => {},
  onLogout: () => {},
  loginStatus: false,
});

export const UserContextProvider: React.FC<{}> = (props) => {
  const defualtUserState = {
    income: 0,
    thresholdExpense: [],
    firstName: "",
    lastName: "",
    loginEmail: "",
    onLogin: (credentials: userCredentials) => {},
    onLogout: () => {},
    loginStatus: false,
  };
  return (
    <UserContext.Provider value={defualtUserState}>
      {props.children}
    </UserContext.Provider>
  );
};
