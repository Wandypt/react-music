import { memo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getRankListAsync } from "./store/slice";
import { filterIndex } from "../../api/utils";
import { Container, List, ListItem, SongList } from "./style";
import Scroll from "../../baseUI/scroll/index";
import Loading from "../../baseUI/loading";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
function Rank() {
  const dispatch = useDispatch();
  const { rankList, loading } = useSelector((state) => state.rankReducer);
  const navigate = useNavigate();
  const enterDetail = (detail) => {
    navigate(`/rank/${detail.id}`);
  };
  useEffect(() => {
    if (!rankList?.length) {
      dispatch(getRankListAsync());
    }
  }, [dispatch, rankList]);
  let globalStartIndex = filterIndex(rankList);
  let officialList = rankList.slice(0, globalStartIndex);
  let globalList = rankList.slice(globalStartIndex);
  // 这是渲染榜单列表函数，传入 global 变量来区分不同的布局方式
  const renderRankList = (list, global) => {
    return (
      <List globalRank={global}>
        {list.map((item) => {
          return (
            <ListItem
              key={item.coverImgId}
              tracks={item.tracks}
              onClick={() => enterDetail(item)}
            >
              <div className="img_wrapper">
                <img src={item.coverImgUrl} alt="" />
                <div className="decorate"></div>
                <span className="update_frequecy">{item.updateFrequency}</span>
              </div>
              {renderSongList(item.tracks)}
            </ListItem>
          );
        })}
      </List>
    );
  };

  const renderSongList = (list) => {
    return list.length ? (
      <SongList>
        {list.map((item, index) => {
          return (
            <li key={index}>
              {index + 1}. {item.first} - {item.second}
            </li>
          );
        })}
      </SongList>
    ) : null;
  };

  // 榜单数据未加载出来之前都给隐藏
  let displayStyle = loading ? { display: "none" } : { display: "" };

  return (
    <Container>
      <Scroll>
        <div>
          <h1 className="offical" style={displayStyle}>
            {" "}
            官方榜{" "}
          </h1>
          {renderRankList(officialList)}
          <h1 className="global" style={displayStyle}>
            {" "}
            全球榜{" "}
          </h1>
          {renderRankList(globalList, true)}
        </div>
      </Scroll>
      {loading && <Loading></Loading>}
      <Outlet />
    </Container>
  );
}

export default memo(Rank);
