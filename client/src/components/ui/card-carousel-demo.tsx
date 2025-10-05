import React from "react"

import { CardCarousel } from "@/components/ui/card-carousel"

const CardCarouselDemo = () => {
  const images = [
    { src: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=500&h=750&fit=crop", alt: "Solar Panel Installation" },
    { src: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=500&h=750&fit=crop", alt: "Solar Inverter System" },
    { src: "https://images.unsplash.com/photo-1592210454359-9043f8e06bfb?w=500&h=750&fit=crop", alt: "Battery Storage System" },
    { src: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=750&fit=crop", alt: "Smart Energy Monitor" },
    { src: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=500&h=750&fit=crop", alt: "Solar Roof Installation" },
    { src: "https://images.unsplash.com/photo-1594736797933-d0d6b0d0d4b0?w=500&h=750&fit=crop", alt: "Electric Vehicle Charging Station" }
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
