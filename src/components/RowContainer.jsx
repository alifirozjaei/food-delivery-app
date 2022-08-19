import React, { useContext } from "react";
import { MdShoppingBasket } from "react-icons/md";
import { motion } from "framer-motion";
import Spinner from "./ui/Spinner";
import CardContext from "../contexts/card-context";

const RowContainer = React.forwardRef((props, ref) => {
  const { flag } = props;

  const cardCtx = useContext(CardContext);

  const addItemToCardHandler = (food) => {
    cardCtx.addItemToCard(food);
  };

  const classes = `flex items-center scrollbar-none scroll-smooth gap-3 w-full py-3 my-12 min-h-[320px] h-auto ${
    flag ? "overflow-x-scroll " : "overflow-x-hidden flex-wrap justify-center"
  }`;

  const items = props.data ? (
    props.data.map((item) => (
      <div
        key={item.id}
        className="min-w-[250px] w-[250px] h-auto p-2 transition-all duration-200 hover:bg-gray-200/80  rounded-lg"
      >
        <div className="w-full flex items-center justify-center flex-col ">
          <img
            src={item.image}
            className="w-40 hover:scale-105 transition-all duration-200 object-contain h-40"
            alt=""
          />
          <motion.div
            onClick={addItemToCardHandler.bind(null, item)}
            whileTap={{ scale: 0.75 }}
            className="transition-all duration-75  w-8 h-8 rounded-full bg-red-600 text-white flex justify-center items-center text-2xl cursor-pointer hover:bg-red-800 shadow-lg "
          >
            <MdShoppingBasket />
          </motion.div>
        </div>
        <div className="w-full text-center mt-3">
          <p className="font-semibold text-textColor text-base md:text-lg">
            {item.title}
          </p>
          <p className="text-textColor mt-2 text-sm">{item.calories} کالری</p>
          <p className="text-textColor mt-2 text-base font-semibold">
            {item.price.toLocaleString(3)}
            <span className="text-red-500 mr-2">تومان</span>
          </p>
        </div>
      </div>
    ))
  ) : (
    <div className="flex items-center justify-center w-full">
      <Spinner />
    </div>
  );

  return (
    <div ref={ref} className={classes}>
      {items}
    </div>
  );
});

export default RowContainer;
