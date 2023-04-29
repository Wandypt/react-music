import { configureStore } from "@reduxjs/toolkit";
import recommendSlice from "../application/Recommend/store/slice";
import singersSlice from "../application/Singers/store/slice";
import rankSlice from "../application/Rank/store/slice";
import albumSlice from "../application/Album/store/slice";
import singerSlice from "../application/Singer/store/slice";
import playerSlice from "../application/Player/store/slice";
import searchSlice from "../application/Search/store/slice";
//全局store
const store = configureStore({
  reducer: {
    recommendReducer: recommendSlice,
    singersReducer: singersSlice,
    rankReducer: rankSlice,
    albumReducer: albumSlice,
    singerReducer: singerSlice,
    playerReducer: playerSlice,
    searchReducer: searchSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
}); //configureStore已经配置好了thunk
export default store;
