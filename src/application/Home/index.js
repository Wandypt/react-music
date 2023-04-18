import { memo } from "react";
import { Link } from "react-router-dom";
import { Outlet } from "react-router";
import { Top, Tab, TabItem } from "./style";
import Player from "../Player";
function Home(props) {
  return (
    <div>
      <Top>
        <span className="iconfont menu">&#xe65c;</span>
        <span className="title">Web App</span>
        <span className="iconfont search">&#xe62b;</span>
      </Top>
      <Tab>
        <Link to="/recommend" activeclassname="selected">
          <TabItem>
            <span> 推荐 </span>
          </TabItem>
        </Link>
        <Link to="/singers" activeclassname="selected">
          <TabItem>
            <span> 歌手 </span>
          </TabItem>
        </Link>
        <Link to="/rank" activeclassname="selected">
          <TabItem>
            <span> 排行榜 </span>
          </TabItem>
        </Link>
      </Tab>
      <Outlet />
      <Player />
    </div>
  );
}

export default memo(Home);
