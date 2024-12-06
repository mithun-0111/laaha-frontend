import { laila } from "@/src/lib/utils";
import Image from "next/image"

interface Props {
  title: string;
  description: string;
  image: string;
  className?: string;
}

const LahaHelpCard = ({ title, description, image, className }: Props) => {
  return (
    <div className='flex flex-col gap-6 bg-white rounded-xl w-1/3 items-center py-10 px-8'>
      <Image
        // src='https://laaha.org/sites/default/files/styles/scale_117w/public/2024-07/Icon_Search%403x_0.png?itok=s8zRH19o'
        src={image}
        width={100}
        height={100}
        alt='discover'
      />
      <div>
        <h2 className={`text-xxl ${laila.className} font-semibold text-center pb-[18px] text-[#2f3941]`}>{title}</h2>
        <p className='text-center font-univers text-l text-[#5a6872] leading-[22px]'>{description}</p>
      </div>
    </div>
  )
}

export default LahaHelpCard;