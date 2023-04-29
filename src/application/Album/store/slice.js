import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAlbumDetailRequest } from "../../../api/request";

const initialState = {
  currentAlbum: [],
  loading: true,
};

export const getAlbumDetailAsync = createAsyncThunk(
  "album/getAlbumDetail",
  async (id) => {
    const res = await getAlbumDetailRequest(id.id);

    return res; // 此处的返回结果会在 .fulfilled中作为payload的值
  }
);

export const albumSlice = createSlice({
  name: "album", // 命名空间，在调用action的时候会默认的设置为action的前缀,保证唯一.不重名
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAlbumDetailAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAlbumDetailAsync.fulfilled, (state, actions) => {
        state.loading = false;
        state.currentAlbum = actions.payload.data.playlist;
      })
      .addCase(getAlbumDetailAsync.rejected, (state, actions) => {
        state.loading = false;
        console.log(__filename, "请求错误", actions.error);
      });
  },
});
export default albumSlice.reducer;
