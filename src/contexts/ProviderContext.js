import React from "react";
import AuthContextProvider from "./AuthContextProvider";
import CardContextProvider from "./CardContextProvider";
import FoodContextProvider from "./FoodContextProvider";

const ProviderContext = (props) => {
  return (
    <AuthContextProvider>
      <CardContextProvider>
        <FoodContextProvider>{props.children}</FoodContextProvider>
      </CardContextProvider>
    </AuthContextProvider>
  );
};

export default ProviderContext;
