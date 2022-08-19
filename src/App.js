import React, { useContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { CreateContainer, Header, MainContainer } from "./components/inedex";
import { AnimatePresence } from "framer-motion";
import AuthContext from "./contexts/auth-context";
import FoodContext from "./contexts/food-context";
import { getAllFoods } from "./utils/firebaseFunction";
const App = () => {
  const authCtx = useContext(AuthContext);
  const foodCtx = useContext(FoodContext);

  useEffect(() => {
    
    
    try {
      getAllFoods().then((data) => {
        foodCtx.setFoods(data);
      });
    } catch (error) {
      console.log(error);
    }
  }, [foodCtx]);

  return (
    <AnimatePresence>
      <div className="w-screen max-w-[100%] min-h-screen h-auto font-sans bg-primary overflow-x-hidden ">
        <Header />
        <main className="container mx-auto mt-20  px-2 relative">
          <Routes>
            <Route path="/*" element={<MainContainer />} />
            {authCtx.isLoggedIn && authCtx.isAdmin && (
              <Route path="/createItems" element={<CreateContainer />} />
            )}
          </Routes>
        </main>
      </div>
    </AnimatePresence>
  );
};

export default App;
