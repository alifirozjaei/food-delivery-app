import React, { useEffect, useReducer } from "react";
import AuthContext from "./auth-context";

const initialUserState = {
  user: {
    fullName: null,
    firstName: null,
    lastName: null,
    expiresIn: null,
    idToken: null,
    email: null,
    photoUrl: null,
    refreshToken: null,
    token: null,
  },
  isLoggedIn: false,
  isAdmin: false,
};

const reducer = (state, action) => {
  if (action.type === "login") {
    return action.payload;
  }

  if (action.type === "logout") {
    return initialUserState;
  }

  return initialUserState;
};

const AuthContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialUserState);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("auth-user"));
    if (data) {
      const now = new Date().getTime();
      if (+data.user.expiresIn > +now) {
        dispatch({
          type: "login",
          payload: data,
        });
      } else {
        localStorage.removeItem("auth-user");
      }
    }
  }, [dispatch]);

  const loginHandler = (data) => {
    const payload = {
      user: data,
      isLoggedIn: true,
      isAdmin: data.email === "ali.firozjaeii@gmail.com",
    };

    dispatch({
      type: "login",
      payload: payload,
    });

    localStorage.setItem("auth-user", JSON.stringify(payload));
  };

  const logoutHandler = () => {
    dispatch({
      type: "logout",
    });
    localStorage.removeItem("auth-user");
  };

  const initialValue = {
    user: state.user,
    isLoggedIn: state.isLoggedIn,
    isAdmin: state.isAdmin,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={initialValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
