import React from "react";

const AuthContext = React.createContext({
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
  login: () => {},
  logout: () => {},
});

export default AuthContext;
