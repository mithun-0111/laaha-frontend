'use client'
import { laila } from "@/src/lib/utils";
import useWindowSize from "@/src/hooks/useWindowSize";
import Image from "next/image";


interface Props {
  title: string;
  description: string;
  className?: string;
  image: string;
}

export const ExploreSpecialCards = ({title, description, image, className} : Props) => {

  let windowSize = useWindowSize();

  return (
    <div className={`w-full p-6 ${className} rounded-xl min-h-max md:min-h-[450px] flex flex-col justify-between`}>
      <div className="text-wrapper">
        <h1 className={`mb-3 ${laila.className} text-xxl font-semibold`}>{title}</h1>
        <p className={`text-l`}>{description}</p>
      </div>
      <div className='cta-wrapper flex flex-col md:flex-row-reverse mt-6'>
        <div className='img-wrapper w-full md:w-1/2 overflow-hidden mb-6 md:mb-0'>
          <Image
            width={windowSize[0] < 768 ? 160 : 500}
            height={windowSize[1] < 768 ? 160 : 500}
            src={image}
            alt={'image'}
            />
        </div>
        <div className='w-full md:w-1/2 flex-end items-end relative'>
          <button className={'bg-primary text-white rounded-lg px-5 py-2 md:absolute bottom-0'}>Explore Now</button>
        </div>
      </div>
    </div>
  )
}