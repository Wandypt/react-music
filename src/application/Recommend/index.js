import { memo, useEffect } from "react";
import Slider from "../../components/slider";
import Scroll from "../../components/scroll";
import RecommendList from "../../components/list";
import { Content } from "./style";
import { useSelector, useDispatch } from "react-redux";
import { getBannerListAsync, getRecommendListAsync } from "./store/slice";
import { forceCheck } from "react-lazyload";
import Loading from "../../baseUI/loading/index";
function Recommend() {
  const dispatch = useDispatch();
  const { bannerList, recommendList, loading } = useSelector(
    (state) => state.recommendReducer
  );

  useEffect(() => {
    if (!bannerList.length) {
      dispatch(getBannerListAsync());
    }
  }, [dispatch, bannerList]);

  useEffect(() => {
    if (!recommendList.length) {
      dispatch(getRecommendListAsync());
    }
  }, [dispatch, recommendList]);

  // const bannerListJS = bannerList ? bannerList.toJS() : [];
  // const recommendListJS = recommendList ? recommendList.toJS() : [];

  return (
    <Content>
      <Scroll className="list" onScroll={forceCheck}>
        <div>
          <Slider bannerList={bannerList}></Slider>
          <RecommendList recommendList={recommendList}></RecommendList>
        </div>
      </Scroll>
      {loading && <Loading></Loading>}
    </Content>
  );
}
// // 映射 Redux 全局的 state 到组件的 props 上
// const mapStateToProps = (state) => ({
//   // 不要在这里将数据 toJS
//   // 不然每次 diff 比对 props 的时候都是不一样的引用，还是导致不必要的重渲染，属于滥用 immutable
//   bannerList: state.getIn(["recommend", "bannerList"]),
//   recommendList: state.getIn(["recommend", "recommendList"]),
// });
// // 映射 dispatch 到 props 上
// const mapDispatchToProps = (dispatch) => {
//   return {
//     getBannerDataDispatch() {
//       dispatch(actionTypes.getBannerList());
//     },
//     getRecommendListDataDispatch() {
//       dispatch(actionTypes.getRecommendList());
//     },
//   };
// };
// export default connect(mapStateToProps, mapDispatchToProps)(memo(Recommend));
export default memo(Recommend);
