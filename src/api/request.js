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

export const getSingerListRequest = (type, area, alpha, offset) => {
  const al = alpha.toLowerCase();
  return axiosInstance.get(
    `/artist/list?type=${type}&area=${area}&initial=${al}&offset=${offset * 30}`
  );
};
export const getRankListRequest = () => {
  return axiosInstance.get(`/toplist/detail`);
};
export const getAlbumDetailRequest = (id) => {
  return axiosInstance.get(`/playlist/detail?id=${id}`);
};
