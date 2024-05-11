"use client"
import Image from "next/image";
import "@madzadev/image-slider/dist/index.css";
// @ts-ignore
import Slider from "@madzadev/image-slider";
import Navbar from "@/app/components/Navbar";

export default function Home() {
  const images = [
    { url: "https://picsum.photos/seed/a/1600/900" },
    { url: "https://picsum.photos/seed/b/1920/1080" },
    { url: "https://picsum.photos/seed/c/1366/768" },
  ];
  return (
    <main>
        {/* <Slider
          imageList={images}
          width={`100%`}
          height={450}
          loop={true}
          autoPlay={true}
          autoPlayInterval={3000} // in milliseconds
        /> */}
    </main>
  );
}
