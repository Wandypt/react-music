import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getHotSingerListRequest,
  getSingerListRequest,
  getRecommendListRequest,
} from "../../../api/request";

const initialState = {
  singerList: [],
  enterLoading: true, //控制进场Loading
  pullUpLoading: false, //控制上拉加载动画
  pullDownLoading: false, //控制下拉加载动画
  pageCount: 0, //这里是当前页数，我们即将实现分页功能
  //   category:,
};
//加载热门歌手
export const getHotSingerListAsync = createAsyncThunk(
  "singers/getHotSingerList",
  async () => {
    const res = await getHotSingerListRequest(0);
    return res; // 此处的返回结果会在 .fulfilled中作为payload的值
  }
);
//加载更多热门歌手
export const refreshMoreHotSingerListAsync = createAsyncThunk(
  "singers/refreshMoreHotSingerList",
  async (pageCount) => {
    console.log(pageCount);
    const res = await getHotSingerListRequest(pageCount);
    console.log(res);
    return res;
  }
);
//第一次加载对应类别的歌手
export const getSingerListAsync = createAsyncThunk(
  "singers/getSingerList",
  async (obj) => {
    console.log(obj);
    const res = await getSingerListRequest(obj.type, obj.area, obj.alpha, 0);
    return res;
  }
);

//加载更多歌手
export const refreshMoreSingerListAsync = createAsyncThunk(
  "singers/refreshMoreSingerList",
  async (obj) => {
    console.log(obj.offset);
    const res = await getSingerListRequest(
      obj.type,
      obj.area,
      obj.alpha,
      obj.offset
    );
    console.log(res);
    return res;
  }
);

export const singersSlice = createSlice({
  name: "singers", // 命名空间，在调用action的时候会默认的设置为action的前缀,保证唯一.不重名
  initialState,
  reducers: {
    changeSingerList(state, actions) {
      state.singerList = actions.payload;
    },
    changePageCount(state, actions) {
      state.pageCount = actions.payload;
    },
    changeEnterLoading(state, actions) {
      state.enterLoading = actions.payload;
    },
    changePullUpLoading(state, actions) {
      state.pullUpLoading = actions.payload;
    },
    changePullDownLoading(state, actions) {
      state.pullDownLoading = actions.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getHotSingerListAsync.pending, (state) => {
        state.enterLoading = true;
      })
      .addCase(getHotSingerListAsync.fulfilled, (state, actions) => {
        state.enterLoading = false;
        state.singerList = actions.payload.data.artists;
      })
      .addCase(getHotSingerListAsync.rejected, (state, actions) => {
        state.enterLoading = false;
        console.log(__filename, "热门歌手数据获取失败", actions.error);
      });
    builder
      .addCase(getSingerListAsync.pending, (state) => {})
      .addCase(getSingerListAsync.fulfilled, (state, actions) => {
        state.singerList = actions.payload.data.artists;
        state.enterLoading = false;
        state.pullDownLoading = false;
      })
      .addCase(getSingerListAsync.rejected, (state, actions) => {
        console.log("歌手数据获取失败", actions.error);
      });
    builder
      .addCase(refreshMoreHotSingerListAsync.pending, (state) => {})
      .addCase(refreshMoreHotSingerListAsync.fulfilled, (state, actions) => {
        state.singerList = [
          ...state.singerList,
          ...actions.payload.data.artists,
        ];
        state.pullUpLoading = false;
      })
      .addCase(refreshMoreHotSingerListAsync.rejected, (state, actions) => {
        console.log("热门歌手数据获取失败", actions.error);
      });
    builder
      .addCase(refreshMoreSingerListAsync.pending, (state) => {})
      .addCase(refreshMoreSingerListAsync.fulfilled, (state, actions) => {
        state.singerList = [
          ...state.singerList,
          ...actions.payload.data.artists,
        ];
        state.pullUpLoading = false;
      })
      .addCase(refreshMoreSingerListAsync.rejected, (state, actions) => {
        console.log("歌手数据获取失败", actions.error);
      });
  },
});
export const {
  changeEnterLoading,
  changePageCount,
  changePullDownLoading,
  changePullUpLoading,
  changeSingerList,
} = singersSlice.actions;

export default singersSlice.reducer;
