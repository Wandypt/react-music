import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getHotKeyWordsRequest,
  getSuggestListRequest,
  getResultSongsListRequest,
} from "./../../../api/request";
const initialState = {
  hotList: [], // 热门关键词列表
  suggestList: [], // 列表，包括歌单和歌手
  songsList: [], // 歌曲列表
  enterLoading: false,
};

export const getHotKeyWordsAsync = createAsyncThunk(
  "search/getHotKeyWords",
  async () => {
    const res = await getHotKeyWordsRequest();
    return res;
  }
);

export const getSuggestListAsync = createAsyncThunk(
  "search/getSuggestList",
  async (query) => {
    const res1 = await getSuggestListRequest(query);
    // console.log(res1);
    if (!res1) return;
    let tmpres1 = res1.data.result.albums || [];
    const res2 = await getResultSongsListRequest(query);
    if (!res2) return;
    let tmpres2 = res2.data.result.songs || [];
    return { res1: tmpres1, res2: tmpres2 };
  }
);

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    changeEnterLoading(state, actions) {
      state.enterLoading = actions.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getHotKeyWordsAsync.pending, (state) => {})
      .addCase(getHotKeyWordsAsync.fulfilled, (state, actions) => {
        state.hotList = actions.payload.data.result.hots;
      })
      .addCase(getHotKeyWordsAsync.rejected, (state, actions) => {
        console.log("加载失败", actions.error);
      });

    builder
      .addCase(getSuggestListAsync.pending, (state) => {})
      .addCase(getSuggestListAsync.fulfilled, (state, actions) => {
        state.suggestList = actions.payload.res1;
        state.songsList = actions.payload.res2;
        state.enterLoading = false;
      })
      .addCase(getSuggestListAsync.rejected, (state, actions) => {
        console.log("加载失败", actions.error);
      });
  },
});

export const { changeEnterLoading } = searchSlice.actions;
export default searchSlice.reducer;
