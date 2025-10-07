import React from "react"
import { CardCarousel } from "@/components/ui/card-carousel"
import gitchell1 from "@assets/Gitchell 1_1759799401458.jpg"
import batterySalesFlyer from "@assets/Battery Sales Flyer pic_1759799408663.jpg"
import gitchell2 from "@assets/Gitchell 2_1759799401459.jpg"
import riceBattery from "@assets/Rice Battery Pic_1759799425946.jpg"
import schmidtBattery from "@assets/Schmidt Battery page_1759799436499.jpg"
import wolynn from "@assets/Wolynn_1759799440933.jpg"

const CardCarouselDemo = () => {
  const images = [
    { src: gitchell1, alt: "Sol-Ark Inverter Installation" },
    { src: batterySalesFlyer, alt: "Sol-Ark with Battery Storage System" },
    { src: gitchell2, alt: "Advance Power Battery Installation" },
    { src: riceBattery, alt: "Sol-Ark Inverter Setup" },
    { src: schmidtBattery, alt: "Sol-Ark Battery Backup System" },
    { src: wolynn, alt: "Sol-Ark Hybrid System with Batteries" }
  ]

  return (
    <div className="w-full">
      <CardCarousel
        images={images}
        autoplayDelay={2000}
        showPagination={true}
        showNavigation={true}
      />
    </div>
  )
}

export default CardCarouselDemo;
