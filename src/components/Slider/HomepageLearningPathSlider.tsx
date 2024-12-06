"use client"

import React, { useEffect, useRef, useState } from 'react'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import CarouselCard from '@/src/components/Cards/CarouselCard';
import { laila } from "@/src/lib/utils";
import { NextIcon, PrevIcon } from '@/src/lib/icons';

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

interface LearningPathProps {
  name: string;
  description: string;
  image_uri: string;
  topics: number;
  resource: string | number;
  cta: {
    url: string;
  };
}

const HomepageLearningPathSlider = () => {



  const sliderRef = useRef<Slider>(null);

  let [title, setTitle] = useState('');
  let [data, setData] = useState<LearningPathProps[] | null>(null);

  const next = () => {
    sliderRef.current?.slickNext();
  };
  const previous = () => {
    sliderRef.current?.slickPrev();
  };

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    nextArrow: <div></div>,
    prevArrow: <div></div>
  };

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/en/api/v1/home_dynamic`)
      .then(res => res.json())
      .then(res => {
        setTitle(res?.data['categories-block']['block_title']);
        setData(res?.data['categories-block']['category'])
      })

  }, [])

  return (
    <div className='slider-container relative mb-20 px-28'>
      <div className={`${laila.className} text-xxxl font-semibold mb-8 flex`}>
        <h1 className={'w-full md:w-1/2'}>{title}</h1>
        <div className='w-1/2 justify-end gap-3 hidden md:flex'>
          <PrevArrow className='prev-arrow bg-primary rounded-full' onClick={previous} />
          <NextArrow className='next-arrow bg-primary rounded-full' onClick={next} />
        </div>
      </div>

      <div className='hidden md:block'>
        <Slider
          ref={sliderRef}
          {...settings}>

          {
            data?.map((item, index) => {
              return (
                <CarouselCard
                  key={index}
                  className={`bg-blue-100 mr-6 rounded-xl`}
                  item={{
                    name: item.name,
                    description: item.description,
                    topics: item.topics,
                    resource: item.resource,
                    cta: {
                      url: item.cta.url,
                    },
                    image_uri: 'https://laaha.org/sites/default/files/styles/scale_180w/public/2024-07/Icon_Help%20and%20Services%403x_1.webp?itok=dbwv_stY',
                    // image_uri: item.image_uri
                  }}
                />
              )
            })
          }
        </Slider>


      </div>
      {
        data?.map((item, index) => {
          return (
            <CarouselCard
              key={index}
              className={`bg-blue-100 m-4 rounded-xl block md:hidden`}
              item={{
                name: item.name,
                description: item.description,
                topics: item.topics,
                resource: item.resource,
                cta: {
                  url: item.cta.url,
                },
                image_uri: 'https://laaha.org/sites/default/files/styles/scale_180w/public/2024-07/Icon_Help%20and%20Services%403x_1.webp?itok=dbwv_stY',
                // image_uri: item.image_uri
              }}
            />
          )
        })
      }
    </div>
  );
}


export default HomepageLearningPathSlider;