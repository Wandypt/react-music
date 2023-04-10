import { memo } from "react";
import { SliderContainer } from "./style";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper";
function Slider(props) {
  // const [sliderSwiper, setSliderSwiper] = useState(null);
  const { bannerList } = props;

  // useEffect(() => {
  //   if (bannerList.length && !sliderSwiper) {
  //     let newSliderSwiper = new Swiper(".slider-container", {
  //       loop: true,
  //       autoplay: {
  //         delay: 300,
  //         disableOnInteraction: false,
  //       },
  //       pagination: { el: ".swiper-pagination" },
  //     });
  //     setSliderSwiper(newSliderSwiper);
  //   }
  // }, [bannerList.length, sliderSwiper]);

  return (
    <SliderContainer>
      <div className="before"></div>
      <div className="slider-container">
        <div className="swiper-wrapper">
          <Swiper
            modules={[Autoplay, Pagination]}
            loop
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            pagination={{ type: "bullets", clickable: true }}
          >
            {bannerList.map((slider) => {
              return (
                <SwiperSlide key={slider.imageUrl}>
                  {/* <div className="swiper-slide" key={slider.imageUrl}> */}
                  {/* <div className="slider-nav"> */}
                  <img
                    src={slider.imageUrl}
                    width="100%"
                    height="100%"
                    alt="推荐"
                  />
                  {/* </div> */}
                  {/* </div> */}
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
        <div className="swiper-pagination"></div>
      </div>
    </SliderContainer>
  );
}

export default memo(Slider);
