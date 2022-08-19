import React from "react";

const FoodContext = React.createContext({
  foods: null,
  setFoods: () => {},
  addFood: () => {},
});

export default FoodContext;
