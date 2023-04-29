import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getSingerInfoRequest } from "../../../api/request";

const initialState = {
  artist: {},
  songsOfArtist: [],
  loading: true,
};

export const getSingerInfoAsync = createAsyncThunk(
  "singer/getSingerInfo",
  async (id) => {
    const res = await getSingerInfoRequest(id.id);
    console.log(res);
    return res; // 此处的返回结果会在 .fulfilled中作为payload的值
  }
);

export const singerSlice = createSlice({
  name: "singer", // 命名空间，在调用action的时候会默认的设置为action的前缀,保证唯一.不重名
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getSingerInfoAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSingerInfoAsync.fulfilled, (state, actions) => {
        state.loading = false;
        state.artist = actions.payload.data.artist;
        state.songsOfArtist = actions.payload.data.hotSongs;
      })
      .addCase(getSingerInfoAsync.rejected, (state, actions) => {
        state.loading = false;
        console.log(__filename, "请求错误", actions.error);
      });
  },
});
export default singerSlice.reducer;
