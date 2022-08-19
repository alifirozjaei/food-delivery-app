import React, { useState } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";

// import google authentication
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../firebase.config";

// improt icons
import {
  MdDashboard,
  MdLogout,
  MdOutlineAddShoppingCart,
} from "react-icons/md";

// import animation element
import { motion } from "framer-motion";

// import image
import avatar from "../img/avatar.png";
import logo from "../img/logo.png";
import AuthContext from "../contexts/auth-context";
import CardContext from "../contexts/card-context";

const expiresCalculator = (expiresIn) => {
  const now = new Date().getTime();
  const expirseTime = now + +expiresIn * 1000;
  return expirseTime;
};

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const authCtx = useContext(AuthContext);
  const cardCtx = useContext(CardContext);
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const loginHandler = async () => {
    try {
      const result = await signInWithPopup(firebaseAuth, provider);

      const { _tokenResponse: res } = result;

      const credential = GoogleAuthProvider.credentialFromResult(result);

      const data = {
        fullName: res.fullName,
        firstName: res.firstName,
        lastName: res.lastName,
        expiresIn: expiresCalculator(res.expiresIn),
        idToken: res.idToken,
        email: res.email,
        photoUrl: res.photoUrl,
        refreshToken: res.refreshToken,
        token: credential.accessToken,
      };

      authCtx.login(data);
    } catch (error) {
      console.log(error);
    }
  };

  const dropdownAvatarHandler = () => {
    setShowDropdown((prevState) => !prevState);
  };

  const logoutHandler = () => {
    authCtx.logout();
  };

  const showCartHandler = () => {
    cardCtx.toggleShowCard();
  };

  return (
    <header className="w-full fixed z-50 p-2 md:p-3 md:px-16 bg-primary">
      {/* for desktop & tablet device */}
      <nav className="hidden md:flex  items-center  w-full">
        {/* logo */}
        <Link to="/" className="flex items-center justify-center gap-2 ">
          <img src={logo} alt="logo" className="object-contain h-12" />
          <p className="text-headingColor text-xl font-bold ">شهر</p>
        </Link>

        {/* navigation links */}
        <ul className="flex items-center gap-8  list-none mr-auto">
          <li className="text-base text-textColor cursor-pointer hover:text-headingColor ">
            <a href="#home">خانه</a>
          </li>
          <li className="text-base text-textColor cursor-pointer hover:text-headingColor ">
            <a href="#menu">منو</a>
          </li>
          <li className="text-base text-textColor cursor-pointer hover:text-headingColor ">
            درباره ما
          </li>
          <li className="text-base text-textColor cursor-pointer hover:text-headingColor ">
            خدمات
          </li>
        </ul>

        {/* shopping cart basket */}
        <button onClick={showCartHandler} className="relative text-2xl flex items-center mr-8 font-display cursor-pointer group">
          <MdOutlineAddShoppingCart />
          <div className="w-6 h-6 rounded-full bg-cartNumBg flex items-center justify-center group-hover:bg-red-700 duration-200">
            <p className="text-sm text-white group-hover:text-slate-200 transition-all duration-200 font-semibold ">
            {cardCtx.totalQyt}
            </p>
          </div>
        </button>

        {/* user avatar and dropdown box(login | logout | add new item) */}
        <div className="relative ">
          <motion.img
            whileTap={{ scale: 0.6 }}
            className="w-10 h-10 min-h-[40px] mr-8 min-w-[40px] object-contain shadow-xl rounded-full cursor-pointer"
            src={authCtx.isLoggedIn ? authCtx.user.photoUrl : avatar}
            alt="avatar"
            onClick={authCtx.isLoggedIn ? dropdownAvatarHandler : loginHandler}
          />

          {/* dropdown box (include: logout, ) */}
          {authCtx.isLoggedIn && showDropdown && (
            <div className="w-48 mt-2 absolute z-50 p-4 left-0 bg-white/90 shadow-lg rounded-3xl divide-y animate-appear">
              <div className="text-center">{authCtx.user.fullName}</div>
              <div className="pt-3 flex flex-col space-y-3">
                {/* add new item | activer for admin*/}
                {authCtx.isAdmin && (
                  <p className="text-sm font-light text-center hover:bg-primary transition-all duration-200 p-2 rounded-lg">
                    <Link to="/createItems">افزودن آیتم جدید</Link>
                  </p>
                )}

                {/* logout button */}
                <button
                  onClick={logoutHandler}
                  className="text-sm flex justify-center items-center hover:bg-primary transition-all duration-200 p-2 rounded-lg"
                >
                  خروج
                  <MdLogout />
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* for mobile device*/}
      <nav className="flex items-center justify-between md:hidden w-full px-6 relative">
        {/* shopping cart basket */}
        <button onClick={showCartHandler} className="relative text-2xl flex items-center font-display cursor-pointer group">
          <MdOutlineAddShoppingCart />
          <div className="w-6 h-6 rounded-full bg-cartNumBg flex items-center justify-center group-hover:bg-red-700 duration-200">
            <p className="text-sm text-white group-hover:text-slate-200 transition-all duration-200 font-semibold ">
              {cardCtx.totalQyt}
            </p>
          </div>
        </button>

        {/* logo */}
        <Link to="/" className="flex items-center justify-center gap-2 ">
          <img src={logo} alt="logo" className="object-contain h-12" />
          <p className="text-headingColor text-xl font-bold ">شهر</p>
        </Link>

        <div>
          {!authCtx.isLoggedIn && (
            <motion.div
              whileTap={{ scale: 0.6 }}
              className="w-10 h-10 min-h-[40px] flex justify-center items-center  min-w-[40px] object-contain text-4xl cursor-pointer "
              onClick={dropdownAvatarHandler}
            >
              <MdDashboard />
            </motion.div>
          )}

          {authCtx.isLoggedIn && (
            <motion.img
              whileTap={{ scale: 0.6 }}
              className="w-10 h-10 min-h-[40px] mr-8 min-w-[40px] object-contain shadow-xl rounded-full cursor-pointer"
              src={authCtx.user.photoUrl}
              alt="avatar"
              onClick={dropdownAvatarHandler}
            />
          )}

          {/* dropdown box (include: logout, ) */}
          {showDropdown && (
            <div className=" mt-2 absolute z-50 p-4 left-0 right-0 bg-white shadow-lg rounded-3xl  animate-appear ">
              <ul className="flex p-3 flex-col space-y-4  list-none mr-auto">
                <li className="text-base text-textColor cursor-pointer hover:text-headingColor ">
                  <a href="#home">خانه</a>
                </li>
                <li className="text-base text-textColor cursor-pointer hover:text-headingColor ">
                  <a href="#menu">منو</a>
                </li>
                <li className="text-base text-textColor cursor-pointer hover:text-headingColor ">
                  درباره ما
                </li>
                <li className="text-base text-textColor cursor-pointer hover:text-headingColor ">
                  خدمات
                </li>
                {authCtx.isLoggedIn && authCtx.isAdmin && (
                  <li className="text-base text-textColor cursor-pointer hover:text-headingColor ">
                    <Link to="/createItems">افزودن آیتم جدید</Link>
                  </li>
                )}
              </ul>

              <div className="pt-3 flex flex-col space-y-3">
                {/* logout button */}
                {authCtx.isLoggedIn && (
                  <button
                    onClick={logoutHandler}
                    className="text-sm flex justify-center items-center hover:bg-slate-200 active:bg-slate-300 bg-primary transition-all duration-200 p-2 rounded-lg"
                  >
                    خروج
                    <MdLogout />
                  </button>
                )}
                {/* login button */}
                {!authCtx.isLoggedIn && (
                  <button
                    onClick={loginHandler}
                    className="text-sm flex justify-center items-center hover:bg-slate-200 active:bg-slate-300 bg-primary transition-all duration-200 p-2 rounded-lg"
                  >
                    ورود
                    <MdLogout />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
