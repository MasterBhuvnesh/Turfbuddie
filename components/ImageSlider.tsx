"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";

interface ImageSliderProps {
  images: string[];
  turfName: string;
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

export default function ImageSlider({ images, turfName }: ImageSliderProps) {
  return (
    <Swiper
      modules={[Autoplay]}
      autoplay={{
        delay: 3000, // 3 seconds
        disableOnInteraction: false,
      }}
      
      className="h-64 w-full"
    >
      {images.map((image, index) => (
        <SwiperSlide key={index} className="relative h-64">
          <Image
            src={`${supabaseUrl}/storage/v1/object/public/turf_images/${turfName.replace(/ /g, "_")}/${image}`}
            alt={`Image ${index + 1}`}
            fill
            style={{ objectFit: "cover" }}
            className="rounded-lg"
            priority={index === 0}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
