'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Star } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'

interface Testimonial {
  id: string
  nameAz: string
  contentAz: string
  rating: number
  image?: string | null
}

interface TestimonialsCarouselProps {
  testimonials: Testimonial[]
}

export default function TestimonialsCarousel({ testimonials }: TestimonialsCarouselProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.slice(0, 3).map((testimonial) => (
          <div key={testimonial.id} className="bg-gray-50 rounded-lg p-6">
            <div className="flex mb-4">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
              ))}
            </div>
            <p className="text-gray-700 mb-4 italic">
              "{testimonial.contentAz}"
            </p>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gray-300 rounded-full mr-3 overflow-hidden">
                {testimonial.image ? (
                  <Image
                    src={testimonial.image}
                    alt={testimonial.nameAz}
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-400 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">
                      {testimonial.nameAz.charAt(0)}
                    </span>
                  </div>
                )}
              </div>
              <span className="font-medium text-gray-900">
                {testimonial.nameAz}
              </span>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={30}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      breakpoints={{
        640: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
      }}
      className="testimonials-swiper"
    >
      {testimonials.map((testimonial) => (
        <SwiperSlide key={testimonial.id}>
          <div className="bg-gray-50 rounded-lg p-6 h-full">
            <div className="flex mb-4">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
              ))}
            </div>
            <p className="text-gray-700 mb-4 italic text-sm">
              "{testimonial.contentAz}"
            </p>
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gray-300 rounded-full mr-3 overflow-hidden">
                {testimonial.image ? (
                  <Image
                    src={testimonial.image}
                    alt={testimonial.nameAz}
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-400 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">
                      {testimonial.nameAz.charAt(0)}
                    </span>
                  </div>
                )}
              </div>
              <span className="font-medium text-gray-900 text-sm">
                {testimonial.nameAz}
              </span>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
