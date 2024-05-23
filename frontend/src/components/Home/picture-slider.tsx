"use client"
import "@madzadev/image-slider/dist/index.css";
// @ts-ignore
import Slider from "@madzadev/image-slider";
import Next from "@public/next.png"

const SliderPicture = () => {
    const images = [
        { url: "https://picsum.photos/seed/b/1920/1080" },
        { url: "https://picsum.photos/seed/b/1920/1080" },
        { url: "https://picsum.photos/seed/c/1366/768" },
      ];
    return (
        <>
        <div className="phone:hidden tablet:hidden mb-[4%]">
          <Slider
            imageList={images}
            width={`100%`}
            height={300}
            loop={true}
            autoPlay={true}
            autoPlayInterval={3000} // in milliseconds
            showDotControls={false}
          />
        </div>
        <div className="laptop:hidden desktop:hidden">
          <Slider
            imageList={images}
            width={`100%`}
            height={240}
            loop={true}
            autoPlay={true}
            autoPlayInterval={3000} // in milliseconds
            showArrowControls={false}
          />
        </div>
        </>
    )
}

export default SliderPicture