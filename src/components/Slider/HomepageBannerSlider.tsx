"use client"

import React, { useEffect, useRef, useState } from 'react'
import Slider, { InnerSlider } from 'react-slick';
import "slick-carousel/slick/slick.css";
import { NextIcon, PrevIcon } from '@/src/lib/icons';
import Image from 'next/image';
import { laila } from "@/src/lib/utils";
import { getParams } from '@/src/lib/getparams';
import { drupal } from '@/src/lib/drupal';
import { getLocale } from 'next-intl/server';


function NextArrow(props: { className?: string, style?: React.CSSProperties, onClick: () => void }) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className}  p-2 w-11 h-11 cursor-pointer`}
      style={{ ...style }}
      onClick={onClick}>
      <NextIcon />
    </div>
  );
}

function PrevArrow(props: { className?: string, style?: React.CSSProperties, onClick: () => void }) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className}  p-2 w-11 h-11 cursor-pointer`}
      style={{ ...style }}
      onClick={onClick}>
      <PrevIcon />
    </div>
  );
}


interface BannerProps {
  title: string;
  subtitle: string;
  description: string;
  image_uri: string;
  cta_uri: string;
  cta_title: string;
}

const HomePageBannerSlider = () => {

  let [bannerData, setBannerData] = useState<BannerProps[]>([]);
  const sliderRef = useRef<Slider>(null);

  const next = () => {
    sliderRef.current?.slickNext();
  };
  const previous = () => {
    sliderRef.current?.slickPrev();
  };


  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // autoplay: true,
    nextArrow: <div></div>,
    prevArrow: <div></div>
  };




  async function getBannerData() {
    // const locale = await getLocale();
    const locale = 'en'
    const layoutNodes = await drupal.getResourceByPath(`/${locale}`, {
      params: getParams("homepage").getQueryObject()
    });
    return layoutNodes;
  }

  useEffect(() => {
    getBannerData().then(res => {
      let fieldBannerData = res.field_banner;
      let tempBannerData = []
      for (let data of fieldBannerData) {
        tempBannerData.push({
          title: data.field_banner_main_heading.processed,
          subtitle: data.field_banner_subtitle,
          description: data.field_banner_description,
          image_uri: data.field_banner_background_image.image_style_uri,
          cta_uri: data?.field_cta?.uri ?? '',
          cta_title: data?.field_cta?.title ?? '',
        })
      }
      setBannerData(tempBannerData)

    })
  }, [])

  return (
    <div className='banner-slider pt-20 px-28'>
      <Slider
        ref={sliderRef}
        {...settings}>
        {
          bannerData.map((item, index) => {
            return (
              <div key={index} >
                <div className={`flex flex-col-reverse md:flex-row font-univers flex-wrap `}>
                  <div className={`text-content w-full md:w-1/2 flex flex-col  justify-between`}>
                    <div>
                      <h2
                        className={`title font-bold text-3xl md:text-[48px]  ${laila.className}`}
                        dangerouslySetInnerHTML={{ __html: item.title }}>
                      </h2>
                      <h3 className={`subtitle font-semibold mb-4 text-xxl md:text-[36px] leading-[48px] ${laila.className}`}>
                        {item.subtitle}
                      </h3>
                      <p className={`text-xl leading-5 mt-8`}>
                        {item.description}
                      </p>
                      {
                        item.cta_uri !== '' &&

                        <a
                          href={item.cta_uri}
                          className={`bg-primary text-white px-[24px] py-[10px] rounded-full text-l mt-8 inline-block`}>
                          {item.cta_title}
                        </a>
                      }
                    </div>
                    <div className={`cta flex gap-4 pb-6`}>
                      <PrevArrow className='prev-arrow bg-primary rounded-full' onClick={previous} />
                      <NextArrow className='next-arrow bg-primary rounded-full' onClick={next} />
                    </div>
                  </div>
                  <div className={`image-content w-full md:w-1/2 flex justify-end`}>
                    <Image
                      src="https://laaha.org/sites/default/files/styles/scale_486w/public/2024-07/banner_1_0.webp?itok=jp1AFvFN"
                      width={500}
                      height={400}
                      alt="banner-slider"
                    />
                  </div>
                </div>

              </div>
            )
          })
        }


      </Slider>
    </div>
  )
}

export default HomePageBannerSlider;