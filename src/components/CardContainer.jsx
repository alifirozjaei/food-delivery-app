import React, { useContext } from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import CardContext from "../contexts/card-context";
import empty from "../img/emptyCart.svg";
const CardContainer = () => {
  const cardCtx = useContext(CardContext);

  const toggleShowCardHandler = () => {
    cardCtx.toggleShowCard();
  };

  const clearCardHanlder = () => {
    cardCtx.clearCard();
  };

  const addItemToCardHandler = (food) => {
    cardCtx.addItemToCard(food);
  };

  const removeItemFromCardHandler = (food) => {
    cardCtx.removeItemFromCard(food);
  };

  const submitCardHandler = () => {};

  return (
    <div className="w-full md:w-[450px] h-screen animate-visible fixed bottom-0 right-0 md:p-2 z-50 px-0">
      <div className="w-full h-[100%] bg-white rounded-xl m-0 md:m-1 shadow-lg flex flex-col">
        {/* close card button */}
        <div className="flex justify-end">
          <button
            className="text-textColor bg-rose-100 py-2 px-4 text-2xl hover:bg-rose-200 active:bg-rose-300 rounded"
            onClick={toggleShowCardHandler}
          >
            <MdOutlineKeyboardBackspace />
          </button>
        </div>
        {/* end close card button */}

        {/* card items */}
        {!!cardCtx.totalQyt && (
          <div className="max-h-[380px] md:max-h-[440px] overflow-y-auto scrollbar-thin  custom-scrollbar divide-y p-2 ">
            {cardCtx.items.map((item) => (
              <div key={item.id} className="grid grid-cols-4 p-2 gap-2">
                <img
                  src={item.image}
                  className="col-start-1 col-end-2 object-contain overflow-hidden"
                  alt=""
                />
                <div className="col-start-2 col-end-5 flex items-center">
                  <div>
                    <p>{item.title}</p>
                    <p className="text-slate-600 text-sm mt-2">
                      {item.price}
                      <span className="text-sm text-rose-600">تومان</span>
                    </p>
                  </div>
                  <div className="mr-auto grid grid-cols-3 place-items-center text-center">
                    <button
                      className="w-10 h-10 rounded border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-white transition-all active:text-green-700 font-bold text-lg"
                      onClick={addItemToCardHandler.bind(null, item)}
                    >
                      +
                    </button>
                    <span>x {item.qty}</span>
                    <button
                      className="w-10 h-10 rounded border-2 border-zinc-500 text-zinc-500 hover:bg-zinc-500 hover:text-white transition-all active:text-zinc-700 font-bold text-lg"
                      onClick={removeItemFromCardHandler.bind(null, item)}
                    >
                      -
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {!cardCtx.totalQyt && (
          <div>
            <img
              src={empty}
              className="w-3/5 object-contain mx-auto mt-8 mb-4"
              alt=""
            />
            <p className="font-bold text-2xl text-center mt-6">
              سبد خرید شما خالی است !
            </p>
          </div>
        )}
        {/* end card items */}

        {!!cardCtx.totalQyt && (
          <div className="text-center text-lg md:text-2xl my-2 mt-4">
            هزینه :{cardCtx.totalAmount}
            <span className="text-base text-rose-600">تومان</span>
          </div>
        )}

        {/* action box */}
        {!!cardCtx.totalQyt && (
          <div className="mt-auto p-2 mb-1 flex justify-end gap-2">
            <button
              onClick={submitCardHandler}
              className="py-2 px-6 text-green-500 hover:bg-green-500 hover:text-white transition-all duration-200 active:bg-green-700 border-green-500 border-2 rounded"
            >
              ثبت
            </button>

            <button
              onClick={clearCardHanlder}
              className="py-2 px-6 border rounded text-white bg-zinc-800/90 hover:bg-zinc-900 active:bg-black transition-all duration-200"
            >
              پاک کردن
            </button>
          </div>
        )}
        {/* end action box */}
      </div>
    </div>
  );
};

export default CardContainer;
