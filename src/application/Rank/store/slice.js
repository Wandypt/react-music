import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getRankListRequest } from "../../../api/request";

const initialState = {
  rankList: [],
  loading: true,
};

export const getRankListAsync = createAsyncThunk(
  "rank/getRankList",
  async () => {
    const res = await getRankListRequest();
    return res; // 此处的返回结果会在 .fulfilled中作为payload的值
  }
);

export const rankSlice = createSlice({
  name: "rank", // 命名空间，在调用action的时候会默认的设置为action的前缀,保证唯一.不重名
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getRankListAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getRankListAsync.fulfilled, (state, actions) => {
        state.loading = false;
        state.rankList = actions.payload.data.list;
      })
      .addCase(getRankListAsync.rejected, (state, actions) => {
        state.loading = false;
        console.log(__filename, "请求错误", actions.error);
      });
  },
});
export default rankSlice.reducer;
