import HomepageSpecialTopicsSlider from "@/src/components/Slider/HomepageSpecialTopicsSlider"
import { laila } from "@/src/lib/utils";
import { ExploreSpecialCards } from "@/src/components/Cards/ExploreSpecialCards";


interface ExploreSpecialProps {
  title: string;
  description: string;
  image_uri: string;
}


export default function ExploreSpecialTopics({ exploreSpecialDataStructured }: { exploreSpecialDataStructured: ExploreSpecialProps[] }) {
  return (
    <div className='explore-special flex flex-col gap-10 px-28 mb-20'>
        <h1 className={`${laila.className} font-semibold text-2xl`}>
          Explore special topics
        </h1>

        <div className={`gap-10 hidden md:flex`}>
          {
            exploreSpecialDataStructured?.map((data: ExploreSpecialProps, index: number) => {
              return <ExploreSpecialCards
                key={index}
                className='bg-yellow-200'
                title={data.title}
                description={data.description}
                // image={data.image_uri}
                image={'https://laaha.org/sites/default/files/styles/scale_344w/public/2024-07/m_26%20illustration_01.png?itok=fu1U3r61'}
              />
            })
          }
        </div>

        <div className={`gap md:hidden`}>
          <HomepageSpecialTopicsSlider />
        </div>

      </div>
  )
}