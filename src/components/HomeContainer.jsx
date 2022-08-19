import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import FoodContext from "../contexts/food-context";

import delivery from "../img/delivery.png";
import hero from "../img/heroBg.png";

const HomeContainer = () => {
  const foodCtx = useContext(FoodContext);
  const [randomFood, setRandomFood] = useState(null);
  const { foods } = foodCtx;

  function getMultipleRandom(arr, num) {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());

    return shuffled.slice(0, num);
  }

  useEffect(() => {
    if (foods && !randomFood) {
      const randomData = getMultipleRandom(foods, 4);
      setRandomFood(randomData);
    }
  }, [foods, setRandomFood, randomFood]);

  return (
    <header
      id="home"
      className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-auto lg:h-screen "
    >
      <div className="p-4 space-y-3 md:space-y-10">
        <div className="flex justify-center md:justify-start">
          <div className="text-sm max-w-fit px-6 py-1 font-extrabold flex items-center bg-orange-200/50 rounded-full justify-center text-orange-500">
            پیک موتوری
            <div className="bg-white rounded-full flex items-center justify-center mr-3 overflow-hidden shadow-xl">
              <img className="w-9 h-9  object-contain" src={delivery} alt="" />
            </div>
          </div>
        </div>

        <div className=" text-center md:text-start text-5xl md:mt-12 font-bold tracking-wide leading-relaxed">
          سریعترین تحویل در
          <span className="mr-3 text-orange-500">شهر شما</span>
        </div>
        <p className="text-justify text-slate-700 text-base">
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده
          از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و
          سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای
          متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه
          درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد.
        </p>
<br />
        <a href='#menu' className="w-full md:w-fit px-6 text-white bg-gradient-to-bl from-orange-400 to-orange-600 p-2 rounded-full hover:from-orange-500 hover:to-orange-700 active:from-orange-600 active:to-orange-800 transition-colors ">
          اکنون سفارش دهید
        </a>
      </div>
      {randomFood && (
        <div
          style={{
            backgroundImage: `url(${hero})`,
            backgroundSize: "60% auto",
          }}
          className="p-4 bg-no-repeat bg-contain"
        >
          <div className="w-full lg:w-10/12 xl:10/12 p-2 mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* items*/}
            {randomFood.map((item) => (
              <div
                key={item.id}
                className="flex flex-col items-center group cursor-pointer"
              >
                <img src={item.image} className="h-40 max-w-full z-30" alt="" />
                <div className="bg-primary/70  rounded-xl -mt-24 text-center w-full z-20 pt-24 space-y-4 pb-4 h-60 group-hover:shadow-2xl transition-all duration-300 shadow-sm flex flex-col" >
                  <h3 className="font-semibold text-2xl text-slate-700">
                    {item.title}
                  </h3>
                  <h5 className="text-base font-light text-slate-500">
                    {item.category}
                  </h5>
                  <h4 className='mt-auto'>
                    {item.price.toLocaleString()}
                    <span className="text-rose-700">تومان</span>
                  </h4>
                </div>
              </div>
            ))}
            {/* end items */}
          </div>
        </div>
      )}
    </header>
  );
};

export default HomeContainer;
