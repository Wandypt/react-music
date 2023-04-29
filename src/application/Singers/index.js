import { memo, useState, useEffect } from "react";
import Horizen from "../../baseUI/horizen-item";
import { categoryTypes, alphaTypes, categoryMap } from "../../api/config";
import { NavContainer, List, ListItem, ListContainer } from "./style";
import Scroll from "../../baseUI/scroll/index"; //../.. ../../components/scroll/index";
import {
  getHotSingerListAsync,
  refreshMoreHotSingerListAsync,
  getSingerListAsync,
  refreshMoreSingerListAsync,
  changePageCount,
  changePullDownLoading,
  changePullUpLoading,
  changeEnterLoading,
} from "./store/slice";
import { useSelector, useDispatch } from "react-redux";
import LazyLoad, { forceCheck } from "react-lazyload";
import Loading from "../../baseUI/loading";
import { useNavigate } from "react-router";
import { Outlet } from "react-router";
function Singers() {
  const navigate = useNavigate();

  let [category, setCategory] = useState();
  // sessionStorage.getItem("cache_category") || "" //缓存

  let [alpha, setAlpha] = useState(); //sessionStorage.getItem("cache_alpha") || ""

  const dispatch = useDispatch();
  const {
    singerList,
    enterLoading,
    pullUpLoading,
    pullDownLoading,
    pageCount,
  } = useSelector((state) => state.singersReducer);

  useEffect(() => {
    if (!singerList?.length) {
      dispatch(getHotSingerListAsync(0));
    }
  }, [dispatch, singerList]); //dispatch, singerList
  //上拉列表
  const handlePullUp = () => {
    dispatch(changePullUpLoading(true));
    dispatch(changePageCount(pageCount + 1));
    if (category === "") {
      dispatch(refreshMoreHotSingerListAsync(pageCount + 1));
    } else {
      const obj = {
        type: categoryMap.get(category).type,
        area: categoryMap.get(category).area,
        alpha: alpha,
        offset: pageCount + 1,
      };
      dispatch(refreshMoreSingerListAsync(obj));
    }
  };

  //顶部下拉
  const handlePullDown = () => {
    dispatch(changePageCount(0));
    dispatch(changePullDownLoading(true));
    if (category === "" && alpha === "") {
      dispatch(getHotSingerListAsync());
    } else {
      const type = categoryMap.get(category).type;
      const area = categoryMap.get(category).area;
      const obj = { type: type, area: area, alpha: alpha };
      dispatch(getSingerListAsync(obj));
    }
  };

  let handleUpdateAlpha = (val) => {
    // if (val === alpha) {
    //   setAlpha("");
    //   sessionStorage.setItem("alpha", "");
    //   setCategory("");
    //   sessionStorage.setItem("category", "");

    //   dispatch(changePageCount(0));
    //   dispatch(getHotSingerListAsync());
    // } else {
    setAlpha(val);
    // sessionStorage.setItem("cache_alpha", val);
    // if (category === "") {
    //   dispatch(changePageCount(0));
    //   dispatch(changeEnterLoading(true));
    //   dispatch(getSingerListAsync({ alpha: val }));
    // } else {
    const type = categoryMap.get(category).type;
    const area = categoryMap.get(category).area;
    const obj = { type: type, area: area, alpha: val };
    dispatch(changePageCount(0));
    dispatch(changeEnterLoading(true));
    dispatch(getSingerListAsync(obj));
    // }
    // }
  };

  let handleUpdateCatetory = (val) => {
    // if (val === category) {
    //   setAlpha("");
    //   // sessionStorage.setItem("cache_category", "");
    //   setCategory("");
    //   // sessionStorage.setItem("cache_alpha", "");
    //   dispatch(changePageCount(0));
    //   dispatch(changeEnterLoading(true));
    //   dispatch(getHotSingerListAsync());
    // } else {
    setCategory(val);
    // sessionStorage.setItem("cache_category", val);
    const type = categoryMap.get(val).type;
    const area = categoryMap.get(val).area;
    const obj = { type: type, area: area, alpha: alpha };
    dispatch(changePageCount(0));
    dispatch(changeEnterLoading(true));
    dispatch(getSingerListAsync(obj));
    // }
  };
  const enterDetail = (id) => {
    console.log("dianji", id);
    navigate(`/singers/${id}`);
  };
  return (
    <div>
      <NavContainer>
        <Horizen
          list={categoryTypes}
          title={"分类 (默认热门):"}
          handleClick={(val) => handleUpdateCatetory(val)}
          oldVal={category}
        ></Horizen>
        <Horizen
          list={alphaTypes}
          title={"首字母:"}
          handleClick={(val) => handleUpdateAlpha(val)}
          oldVal={alpha}
        ></Horizen>
      </NavContainer>
      <ListContainer>
        <Scroll
          pullUp={handlePullUp}
          pullDown={handlePullDown}
          pullUpLoading={pullUpLoading}
          pullDownLoading={pullDownLoading}
          onScroll={forceCheck}
        >
          <List>
            {singerList?.map((item, index) => {
              return (
                <ListItem
                  key={item.accountId + "" + index}
                  onClick={() => enterDetail(item.id)}
                >
                  <div className="img_wrapper">
                    <LazyLoad
                      placeholder={
                        <img
                          width="100%"
                          height="100%"
                          src={require("./singer.png")}
                          alt="music"
                        />
                      }
                    >
                      <img
                        src={`${item.picUrl}?param=300x300`}
                        width="100%"
                        height="100%"
                        alt="music"
                      />
                    </LazyLoad>
                  </div>
                  <span className="name">{item.name}</span>
                </ListItem>
              );
            })}
          </List>
        </Scroll>
        {enterLoading && <Loading></Loading>}
      </ListContainer>
      <Outlet />
    </div>
  );
}

export default memo(Singers);
