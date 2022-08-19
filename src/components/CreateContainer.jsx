import { getDownloadURL, ref, uploadString } from "firebase/storage";
import React, { useContext, useReducer, useState } from "react";
import { useRef } from "react";
import FoodContext from "../contexts/food-context";
import { storage } from "../firebase.config";
import { convertBase64, isBase64UrlImage } from "../utils/convertBase64";
import { DUMMY_CATEGORIES } from "../utils/data";
import {  saveFood } from "../utils/firebaseFunction";
import FileInput from "./form/FileInput";
import Input from "./form/Input";
import SelectInput from "./form/SelectInput";
import LoadingSpinner from "./ui/LoadingSpinner";

const imageInitialState = {
  image: null,
  status: {
    code: null,
    message: null,
  },
};

const formErrorInitial = {
  title: {
    invalid: false,
    msg: null,
  },

  category: {
    invalid: false,
    msg: null,
  },

  calories: {
    invalid: false,
    msg: null,
  },

  price: {
    invalid: false,
    msg: null,
  },
};

const imageReducer = (state, action) => {
  if (action.type === "error") {
    return {
      image: null,
      status: {
        code: action.status.code,
        message: action.status.message,
      },
    };
  }

  if (action.type === "success") {
    return {
      image: action.image,
      status: {
        code: action.status.code,
        message: action.status.message,
      },
    };
  }

  if (action.type === "ok") {
    return {
      image: action.image,
      status: {
        code: "ok",
        message: null,
      },
    };
  }

  return imageInitialState;
};

const CreateContainer = () => {
  // loading spinner state
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState(formErrorInitial);
  const [showMSG, setShowMSG] = useState({ type: null });

  // upload image state
  const [image, dispatchImage] = useReducer(imageReducer, imageInitialState);

  // input refs
  const titleRef = useRef();
  const categoryRef = useRef();
  const priceRef = useRef();
  const caloriesRef = useRef();

  // context
  const foodCtx = useContext(FoodContext);

  // upload image
  const fileChangeHandler = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setIsLoading(true);
      const base64 = await convertBase64(file);
      const imageIsValid = await isBase64UrlImage(base64);
      if (imageIsValid) {
        const storageRef = ref(
          storage,
          `images/${Date.now()}.${file.type.split("/")[1]}`
        );

        uploadString(storageRef, base64, "data_url")
          .then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
              dispatchImage({
                type: "success",
                status: {
                  code: "success",
                  message: "تصویر با موفقیت آپلود شد.",
                },
                image: url,
              });
            });
          })
          .catch((e) => {
            dispatchImage({
              type: "error",
              status: {
                code: "error",
                message: "خطایی در آپلود فایل رخ داده است!",
              },
            });
          })
          .finally(() => {
            setIsLoading(false);
          });
      } else {
        dispatchImage({
          type: "error",
          status: {
            code: "error",
            message: "فرمت فایل ورودی معتبر نیست !",
          },
        });
      }
    }
  };

  const addFoodHandler = async () => {
    setFormError(formErrorInitial);

    let haveError = false;
    const titleEntered = titleRef.current.value;
    const categoryEntered = categoryRef.current.value;
    const caloriesEntered = caloriesRef.current.value;
    const priceEntered = priceRef.current.value;

    if (titleEntered.trim() === "") {
      haveError = true;
      setFormError((prev) => ({
        ...prev,
        title: {
          invalid: true,
          msg: "پر کردن فیلد عنوان الزامی است!",
        },
      }));
    }

    if (priceEntered.trim() === "") {
      haveError = true;
      setFormError((prev) => ({
        ...prev,
        price: {
          invalid: true,
          msg: "پر کردن فیلد هزینه الزامی است!",
        },
      }));
    }

    if (+priceEntered.trim() < 0) {
      haveError = true;
      setFormError((prev) => ({
        ...prev,
        price: {
          invalid: true,
          msg: "مقدار وارد شده معتبر نیست!",
        },
      }));
    }

    if (caloriesEntered.trim() === "") {
      haveError = true;
      setFormError((prev) => ({
        ...prev,
        calories: {
          invalid: true,
          msg: "پر کردن فیلد کالری الزامی است!",
        },
      }));
    }

    if (+caloriesEntered.trim() < 0) {
      haveError = true;
      setFormError((prev) => ({
        ...prev,
        calories: {
          invalid: true,
          msg: "مقدار وارد شده معتبر نیست!",
        },
      }));
    }

    if (image.status.code !== "success") {
      haveError = true;
      dispatchImage({
        type: "error",
        status: {
          code: "error",
          message: "انتخاب تصویر معتبر الزامی است!",
        },
      });
    }

    if (haveError) {
      return;
    }

    const data = {
      id: `${Date.now()}`,
      title: titleEntered,
      category: categoryEntered,
      calories: caloriesEntered,
      price: priceEntered,
      image: image.image,
    };

    setIsLoading(true);
    const response = await saveFood(data);
    if (response.status === "ok") {
      setShowMSG({
        type: "ok",
        msg: "با موفقیت ثبت شده است!",
      });
      foodCtx.addFood({
        ...data,
        url: response.result.id,
      });
    }

    if (response.status === "error") {
      setShowMSG({
        type: "error",
        msg: "خطایی در ثبت اطلاعات رخ داده است!",
      });
      console.log(response);
    }
    setIsLoading(false);
  };

  return (
    <div className=" p-4 m-4 md:p-8 ">
      {/* <LoadingSpinner/> */}
      {isLoading && <LoadingSpinner />}
      <div>
        {/* input for get food's image  */}
        <FileInput onChange={fileChangeHandler} />
        {image.status.code === "error" && (
          <div className="bg-rose-200 p-3 text-sm text-red-600 rounded border-r-red-600 border-r-4 my-3">
            {image.status.message}
          </div>
        )}

        {image.status.code === "success" && (
          <div className="bg-green-200 p-3 text-sm text-green-600 rounded border-r-green-600 border-r-4 my-3">
            {image.status.message}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 m-4">
          <div className="md:col-end-3 md:col-start-1 space-y-4">
            {/* food's name */}
            <Input
              ref={titleRef}
              title="عنوان"
              input={{
                id: "name",
                type: "text",
                placeholder: "عنوان رو وارد کنید...",
              }}
              message={formError.title.msg}
              isInvalid={formError.title.invalid}
            />

            {/*  food's category */}
            <SelectInput
              ref={categoryRef}
              id="category"
              title="دسته"
              options={DUMMY_CATEGORIES}
            />

            {/* food's calories */}
            <Input
              ref={caloriesRef}
              title="کالری"
              input={{
                id: "calories",
                min: 0,
                step: 1,
                type: "number",
                placeholder: "مقدار کالری را وارد کنید...",
              }}
              message={formError.calories.msg}
              isInvalid={formError.calories.invalid}
            />

            {/* food's price */}
            <Input
              ref={priceRef}
              title="قیمت"
              input={{
                id: "price",
                min: 0,
                step: 1,
                type: "number",
                placeholder: "قیمت را وارد کنید...",
              }}
              message={formError.price.msg}
              isInvalid={formError.price.invalid}
            />

            <button
              onClick={addFoodHandler}
              className="w-full p-2 bg-green-500 hover:bg-green-600 active:bg-green-700"
            >
              ارسال
            </button>
          </div>
          <div className="overflow-hidden md:col-start-3 md:col-end-4 flex justify-center items-center">
            {/* show food's selected image */}
            {image.image && (
              <img
                src={image.image}
                className="object-contain max-w-full max-h-full w-4/5 mx-auto"
                alt=""
              />
            )}
          </div>
        </div>
        {showMSG.type === "ok" && (
          <div className="bg-green-200 p-3 text-sm text-green-600 rounded border-r-green-600 border-r-4 my-3">
            {showMSG.msg}
          </div>
        )}
        {showMSG.type === "error" && (
          <div className="bg-rose-200 p-3 text-sm text-rose-600 rounded border-r-rose-600 border-r-4 my-3">
            {showMSG.msg}
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateContainer;
