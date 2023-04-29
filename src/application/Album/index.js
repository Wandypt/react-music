import { memo, useState, useRef, useEffect, useCallback } from "react";
import { Container, TopDesc, Menu } from "./style";
import { CSSTransition } from "react-transition-group";
import Header from "../../baseUI/header";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router";
import Scroll from "../../baseUI/scroll/index";
import { getCount } from "../../api/utils";
import style from "../../assets/global-style";
import { getAlbumDetailAsync } from "./store/slice";
import Loading from "../../baseUI/loading/index";
import { isEmptyObject } from "../../api/utils";
import { HEADER_HEIGHT } from "./../../api/config";
import SongsList from "../SongsList";
function Album() {
  const [showStatus, setShowStatus] = useState(true);
  const [title, setTitle] = useState("歌单");
  const [isMarquee, setIsMarquee] = useState(false); // 是否跑马灯

  const headerEl = useRef();
  const navigate = useNavigate();

  const id = useParams();
  const dispatch = useDispatch();

  const { currentAlbum, loading } = useSelector((state) => state.albumReducer);

  useEffect(() => {
    if (!currentAlbum?.length) {
      dispatch(getAlbumDetailAsync(id));
    }
  }, [dispatch, id]);

  // const handleBack = () => {
  //   setShowStatus(false);
  // };

  const handleBack = useCallback(() => {
    setShowStatus(false);
  }, []);

  const handleScroll = useCallback(
    (pos) => {
      let minScrollY = -HEADER_HEIGHT;
      let percent = Math.abs(pos.y / minScrollY);
      let headerDom = headerEl.current;
      // 滑过顶部的高度开始变化
      if (pos.y < minScrollY) {
        headerDom.style.backgroundColor = style["theme-color"];
        headerDom.style.opacity = Math.min(1, (percent - 1) / 2);
        setTitle(currentAlbum.name);
        setIsMarquee(true);
      } else {
        headerDom.style.backgroundColor = "";
        headerDom.style.opacity = 1;
        setTitle("歌单");
        setIsMarquee(false);
      }
    },
    [currentAlbum]
  );
  const renderTopDesc = () => {
    return (
      <TopDesc background={currentAlbum.coverImgUrl}>
        <div className="background">
          <div className="filter"></div>
        </div>
        <div className="img_wrapper">
          <div className="decorate"></div>
          <img src={currentAlbum.coverImgUrl} alt="" />
          <div className="play_count">
            <i className="iconfont play">&#xe885;</i>
            <span className="count">
              {getCount(currentAlbum.subscribedCount)}
            </span>
          </div>
        </div>
        <div className="desc_wrapper">
          <div className="title">{currentAlbum.name}</div>
          <div className="person">
            <div className="avatar">
              <img src={currentAlbum.creator.avatarUrl} alt="" />
            </div>
            <div className="name">{currentAlbum.creator.nickname}</div>
          </div>
        </div>
      </TopDesc>
    );
  };

  const renderMenu = () => {
    return (
      <Menu>
        <div>
          <i className="iconfont">&#xe6ad;</i>
          评论
        </div>
        <div>
          <i className="iconfont">&#xe86f;</i>
          点赞
        </div>
        <div>
          <i className="iconfont">&#xe62d;</i>
          收藏
        </div>
        <div>
          <i className="iconfont">&#xe606;</i>
          更多
        </div>
      </Menu>
    );
  };
  const { playList } = useSelector((state) => state.playerReducer);

  return (
    <CSSTransition
      in={showStatus}
      timeout={300}
      classNames="fly"
      appear={true}
      unmountOnExit
      onExited={() => navigate(-1)}
    >
      <Container play={playList.length}>
        <Header
          ref={headerEl}
          title={title}
          handleClick={handleBack}
          isMarquee={isMarquee}
        ></Header>
        {!isEmptyObject(currentAlbum) ? (
          <Scroll bounceTop={false} onScroll={handleScroll}>
            <div>
              {renderTopDesc()}
              {renderMenu()}
              <SongsList
                songs={currentAlbum.tracks}
                collectCount={currentAlbum.subscribedCount}
                showCollect={true}
                showBackground={true}
              ></SongsList>
            </div>
          </Scroll>
        ) : null}
        {loading && <Loading />}
      </Container>
    </CSSTransition>
  );
}

export default memo(Album);
