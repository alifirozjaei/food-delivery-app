import React, { useContext, useState } from "react";
import { useEffect } from "react";
import FoodContext from "../contexts/food-context";
import RowContainer from "./RowContainer";
import { motion } from "framer-motion";
import { DUMMY_CATEGORIES } from "../utils/data";
import NotFound from "../img/NotFound.svg";

const MenuContainer = () => {
  const foodCtx = useContext(FoodContext);
  const { foods } = foodCtx;

  const [foodItems, setFoodItems] = useState(null);
  const [category, setCategory] = useState("all");

  const filterFoods = (filterStr) => {
    if (foods) {
      if (filterStr === "all") {
        setFoodItems(foods);
      } else {
        const data = foods.filter((item) => item.category === filterStr);
        setFoodItems(data);
      }
    }
    setCategory(filterStr);
  };

  useEffect(() => {
    if (foods && !foodItems) {
      filterFoods("all");
    }
  }, [foods]);

  return (
    <section className="w-full p-4 my-4" id="menu">
      <h3 className="text-2xl font-bold relative before:absolute before:w-56 before:h-1 before:rounded-lg before:bottom-0 before:right-0 before:bg-orange-500 before:-mb-2 ">
        منو غذا های ما
      </h3>

      <div
        className="w-full flex justify-center items-center gap-3 
      my-6 flex-wrap"
      >
        <motion.div
          whileTap={{ scale: 0.75 }}
          className={`text-sm md:text-base py-2 px-4 md:py-3 md:px-5 rounded cursor-pointer shadow-md duration-75 transition-all hover:bg-pink-400  ${
            category === "all" ? "bg-rose-600 text-white" : "bg-pink-200/60"
          }`}
          onClick={filterFoods.bind(null, "all")}
        >
          همه
        </motion.div>

        {DUMMY_CATEGORIES.map((item) => (
          <motion.div
            key={item.value}
            whileTap={{ scale: 0.75 }}
            className={`text-sm md:text-base py-2 px-4 md:py-3 md:px-5 rounded cursor-pointer shadow-md duration-75 transition-all hover:bg-pink-400 ${
              item.value === category
                ? "bg-rose-600 text-white"
                : "bg-pink-200/60"
            }`}
            onClick={filterFoods.bind(null, item.value)}
          >
            {item.title}
          </motion.div>
        ))}
      </div>

      {foodItems && <RowContainer flag={false} data={foodItems} />}
      {!foodItems && (
        <div>
          <img
            src={NotFound}
            alt="Not Found Food Item"
            className="w-1/2 md:w-1/3 mx-auto object-contain"
          />
          <p className="text-center my-12 text-lg font-bold">
            محصولی برای نمایش در این دسته موجود نمی باشد!
          </p>
        </div>
      )}
    </section>
  );
};

export default MenuContainer;
