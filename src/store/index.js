import { configureStore } from "@reduxjs/toolkit";
import recommendSlice from "../application/Recommend/store/slice";
import singersSlice from "../application/Singers/store/slice";
//全局store
const store = configureStore({
  reducer: {
    recommendReducer: recommendSlice,
    singersReducer: singersSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
}); //configureStore已经配置好了thunk
export default store;
