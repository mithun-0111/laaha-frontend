import LahaHelpCard from '@/src/components/Cards/LahaHelpCard';
import { laila } from '@/src/lib/utils';

interface HelpData {
  title: string;
  description: string;
}

export default function HowLaahaCanHelpYou({ howLahaCanHelpDataStructured }: { howLahaCanHelpDataStructured: HelpData[] }) {
  return (
    <div className=" bg-[#d7f0fe] px-28 py-[42px] mb-20">
      <h2 className={`${laila.className} text-2xl font-bold pb-8`}>
        How Laaha can help you
      </h2>
      <div className={"flex gap-[30px]"}>
        {howLahaCanHelpDataStructured?.map((item, index) => (
          <LahaHelpCard
            key={index}
            title={item.title}
            description={item.description}
            image={`https://laaha.org/sites/default/files/styles/scale_117w/public/2024-07/Icon_Search%403x_0.png?itok=s8zRH19o`}
          />
        ))}
      </div>
    </div>
  )
}
