import { configureStore } from "@reduxjs/toolkit";
import recommendSlice from "../application/Recommend/store/slice";
//全局store
const store = configureStore({
  reducer: {
    recommendReducer: recommendSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
}); //configureStore已经配置好了thunk
export default store;
