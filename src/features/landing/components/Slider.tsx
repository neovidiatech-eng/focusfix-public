"use client";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import i18n from "@/src/i18n";

export const Slider = () => {
  const { t } = useTranslation();
  const images = [
    "/image1.jpeg",
    "/image2.jpeg",
    "/image3.jpeg",
    "/image4.jpeg",
    "/image5.jpeg",
    "/image6.jpeg",
  ];

  return (
    <section className="py-16 px-6">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-12 space-y-3">
          <h3 className="text-3xl md:text-4x text-brand-100 font-bold">
            {t("slider.title")}
          </h3>
          <p className="text-slate-400 max-w-2xl mx-auto font-medium">
            {t("slider.description")}
          </p>
        </div>

        <div className="relative group">
          <Swiper
            dir={i18n.language === "ar" ? "rtl" : "ltr"}
            key={i18n.language}
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            loop={true}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            pagination={{
              clickable: true,
              el: '.custom-pagination',
            }}
            navigation={{
              nextEl: '.swiper-button-next-custom',
              prevEl: '.swiper-button-prev-custom',
            }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="rounded-4xl"
          >
            {images.map((img, i) => (
              <SwiperSlide key={i} className="pb-16">
                <div className="px-2">
                  <div className="relative overflow-hidden rounded-3xl border-2 border-[#ad9360]/20 shadow-2xl transition-all hover:border-[#ad9360]/60">
                    <img
                      src={img}
                      alt={`Repair Work ${i + 1}`}
                      className="w-full h-[300px] md:h-[390px] object-contain"
                    />
                    {/* <div className="absolute bottom-4 ltr:right-10 bg-[#021026] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                      {t("slider.result")}
                    </div> */}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <button className="swiper-button-prev-custom absolute ltr:-left-4 rtl:-right-4 md:ltr:-left-3 md:rtl:-right-3 top-1/2 -translate-y-1/2 w-12 h-12 bg-brand-100 text-brand-100 rounded-full flex items-center justify-center transition-all z-20 shadow-xl hover:scale-110 active:scale-95 cursor-pointer disabled:opacity-0">
            <ChevronLeft className="rtl:rotate-180" size={24} color="white" />
          </button>

          <button className="swiper-button-next-custom absolute ltr:-right-4 rtl:-left-4 md:ltr:-right-3 md:rtl:-left-3 top-1/2 -translate-y-1/2 w-12 h-12 bg-brand-100 text-brand-100 rounded-full flex items-center justify-center transition-all z-20 shadow-xl hover:scale-110 active:scale-95 cursor-pointer disabled:opacity-0">
            <ChevronRight className="rtl:rotate-180" size={24} color="white" />
          </button>

          <div className="custom-pagination flex justify-center gap-2 mt-4"></div>
        </div>
      </div>

      <style jsx global>{`
        .custom-pagination .swiper-pagination-bullet {
          width: 6px;
          height: 6px;
          background: var(--color-brand-100) !important;
          opacity: 1;
          transition: all 0.3s ease;
        }
        .custom-pagination .swiper-pagination-bullet-active {
          background: var(--color-brand-100) !important;
          width: 24px !important;
          border-radius: 4px;
        }
      `}</style>
    </section>
  );
};