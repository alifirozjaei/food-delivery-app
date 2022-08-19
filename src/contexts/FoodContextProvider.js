import React from "react";
import { useState } from "react";
import FoodContext from "./food-context";

const FoodContextProvider = (props) => {
  const [foods, setFoods] = useState(null);

  const setFoodsHandler = (items) => {
    setFoods(items);
  };

  const addFoodHandler = (item) => {
    setFoods((prev) => {
      return [...prev, item];
    });
  };

  const providerValue = {
    foods: foods,
    setFoods: setFoodsHandler,
    addFood: addFoodHandler,
  };

  return (
    <FoodContext.Provider value={providerValue}>
      {props.children}
    </FoodContext.Provider>
  );
};

export default FoodContextProvider;
