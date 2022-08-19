import React, { useEffect, useState } from "react";
import { useReducer } from "react";
import CardContext from "./card-context";

const initialState = {
  showCard: false,
  totalAmount: 0,
  totalQyt: 0,
  items: [],
};

const cardReducerFunction = (state, action) => {
  if (action.type === "TOGGLE_SHOW_CARD") {
    return { ...state, showCard: !state.showCard };
  }

  if (action.type === "INITIAL_CARD") {
    return { ...state, ...action.payload };
  }

  if (action.type === "ADD_ITEM_TO_CART") {
    const findItem = state.items.findIndex(
      (item) => item.id === action.payload.id
    );
    if (findItem >= 0) {
      const newItems = [...state.items];
      newItems[findItem].qty += 1;
      return {
        ...state,
        items: newItems,
        totalAmount: state.totalAmount + +action.payload.price,
        totalQyt: state.totalQyt + 1,
      };
    } else {
      const newItems = [...state.items, { ...action.payload, qty: 1 }];
      return {
        ...state,
        items: newItems,
        totalAmount: state.totalAmount + +action.payload.price,
        totalQyt: state.totalQyt + 1,
      };
    }
  }

  if (action.type === "REMOVE_ITEM_FROM_CARD") {
    const findItem = state.items.findIndex(
      (item) => item.id === action.payload.id
    );
    if (state.items[findItem].qty === 1) {
      const newItems = state.items.filter(
        (item) => item.id !== action.payload.id
      );
      return {
        ...state,
        items: newItems,
        totalAmount: state.totalAmount - action.payload.price,
        totalQyt: state.totalQyt - 1,
      };
    } else {
      const newItems = [...state.items];
      newItems[findItem].qty -= 1;
      return {
        ...state,
        items: newItems,
        totalAmount: state.totalAmount - action.payload.price,
        totalQyt: state.totalQyt - 1,
      };
    }
  }

  return initialState;
};

const CardContextProvider = (props) => {
  const [card, dispatch] = useReducer(cardReducerFunction, initialState);
  const { totalQyt, totalAmount, items } = card;
  const [first, setFirst] = useState(true);

  useEffect(() => {
    if (first) {
      const data = JSON.parse(localStorage.getItem("card"));
      if (data) {
        dispatch({
          type: "INITIAL_CARD",
          payload: data,
        });
      }
      setFirst(false);
    } else {
      localStorage.setItem(
        "card",
        JSON.stringify({
          totalQyt,
          totalAmount,
          items,
        })
      );
    }
  }, [totalQyt, totalAmount, items]);

  const toggleShowCardHandler = () => {
    dispatch({
      type: "TOGGLE_SHOW_CARD",
    });
  };

  const addItemToCardHandler = (food) => {
    dispatch({
      type: "ADD_ITEM_TO_CART",
      payload: food,
    });
  };

  const removeItemFromCardHandler = (food) => {
    dispatch({
      type: "REMOVE_ITEM_FROM_CARD",
      payload: food,
    });
  };

  const clearCardHanlder = () => {
    localStorage.removeItem("card");
    dispatch({
      type: "CLEAR",
    });
  };

  const cardContextValue = {
    showCard: card.showCard,
    totalAmount: card.totalAmount,
    totalQyt: card.totalQyt,
    items: card.items,
    toggleShowCard: toggleShowCardHandler,
    clearCard: clearCardHanlder,
    addItemToCard: addItemToCardHandler,
    removeItemFromCard: removeItemFromCardHandler,
  };

  return (
    <CardContext.Provider value={cardContextValue}>
      {props.children}
    </CardContext.Provider>
  );
};

export default CardContextProvider;
