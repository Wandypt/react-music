import axiosInstance from "./config";

export const getBannerRequest = () => {
  return axiosInstance.get("/banner");
};

export const getRecommendListRequest = () => {
  return axiosInstance.get("/personalized");
};

export const getHotSingerListRequest = (count) => {
  return axiosInstance.get(`/top/artists?offset=${count * 30}&limit=30`);
};

export const getSingerListRequest = (type, area, offset) => {
  // const al = alpha.toLowerCase();
  return axiosInstance.get(
    `/artist/list?type=${type}&area=${area}&offset=${offset * 30}`
  );
};
export const getRankListRequest = () => {
  return axiosInstance.get(`/toplist/detail`);
};
export const getAlbumDetailRequest = (id) => {
  return axiosInstance.get(`/playlist/detail?id=${id}`);
};

export const getSingerInfoRequest = (id) => {
  return axiosInstance.get(`/artists?id=${id}`);
};

export const getSongDetailRequest = (id) => {
  return axiosInstance.get(`/song/detail?ids=${id}`);
};
export const getLyricRequest = (id) => {
  return axiosInstance.get(`/lyric?id=${id}`);
};

export const getHotKeyWordsRequest = () => {
  return axiosInstance.get(`/search/hot`);
};

export const getSuggestListRequest = (query) => {
  return axiosInstance.get(`/search/suggest?keywords=${query}`);
};

export const getResultSongsListRequest = (query) => {
  return axiosInstance.get(`/search?keywords=${query}`);
};
