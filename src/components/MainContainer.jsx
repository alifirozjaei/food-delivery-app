import React, { useContext, useRef } from "react";
import { HomeContainer } from "./inedex";
import { motion } from "framer-motion";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import RowContainer from "./RowContainer";
import FoodContext from "../contexts/food-context";
import { useState } from "react";
import { useEffect } from "react";
import MenuContainer from "./MenuContainer";
import CardContainer from "./CardContainer";
import CardContext from "../contexts/card-context";
const MainContainer = () => {
  const foodCtx = useContext(FoodContext);
  const cardCtx = useContext(CardContext)
  const { foods } = foodCtx;
  const [fruitsItem, setFruitsItem] = useState(null);

  const RowRef = useRef();

  useEffect(() => {
    if (foods) {
      const data = foods.filter((item) => item.category === "میوه");
      setFruitsItem(data);
    }
  }, [setFruitsItem, foods]);

  const leftScrollHandler = () => {
    RowRef.current.scrollLeft -= 250;
    console.log(RowRef.current.scrollLeft);
  };

  const rightScrollHandler = () => {
    RowRef.current.scrollLeft += 250;
    console.log(RowRef.current.scrollLeft);
  };

  return (
    <div>
      {/* Header */}
      <HomeContainer />

      <section className="p-4 my-4">
        <h3 className="text-2xl font-bold relative before:absolute before:w-56 before:h-1 before:rounded-lg before:bottom-0 before:right-0 before:bg-orange-500 before:-mb-2 ">
          میوه های سالم و تازه
        </h3>

        <div className="flex gap-3 items-center my-3 justify-end">
          <motion.div
            onClick={rightScrollHandler}
            whileTap={{ scale: 0.75 }}
            className="w-8 h-8 rounded-lg bg-orange-300 cursor-pointer hover:bg-orange-500 transition-all duration-100 shadow-lg flex items-center justify-center "
          >
            <MdChevronRight />
          </motion.div>

          <motion.div
            whileTap={{ scale: 0.75 }}
            className="w-8 h-8 rounded-lg bg-orange-300 cursor-pointer hover:bg-orange-500 transition-all duration-100 shadow-lg flex items-center justify-center "
            onClick={leftScrollHandler}
          >
            <MdChevronLeft />
          </motion.div>
        </div>

        <RowContainer ref={RowRef} flag={true} data={fruitsItem} />
      </section>

      <MenuContainer />

      {cardCtx.showCard && <CardContainer />}
    </div>
  );
};

export default MainContainer;
