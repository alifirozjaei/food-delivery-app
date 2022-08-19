import React from "react";

const CardContext = React.createContext({
  showCard: false,
  totalAmount: 0,
  totalQyt: 0,
  items: [],
  toggleShowCard: () => {},
  clearCard: () => {},
  addItemToCard: () => {},
  removeItemFromCard: () => {},
});

export default CardContext;
