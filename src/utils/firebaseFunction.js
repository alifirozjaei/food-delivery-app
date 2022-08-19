import { addDoc, collection, getDocs, orderBy, query } from "firebase/firestore";
import { firestore } from "../firebase.config";

// save new Item
export const saveFood = async (data) => {
  try {
    const docRef = await addDoc(collection(firestore, "foods"), data);
    return {
      status: "ok",
      result: docRef,
    };
  } catch (e) {
    return {
      status: "error",
      result: e,
    };
  }
};

export const getAllFoods = async () => {
  let data = [] ; 
  const q = query(collection(firestore, "foods"), orderBy('id', 'desc'));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    data.push({...doc.data(), url:doc.id})
  });
  return data;
};
