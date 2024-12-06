import Card from "@/src/components/Cards/Card";
import { laila } from "@/src/lib/utils";

interface ContentMadeForYouProps {
  contentMadeForYouTitle: string;
  contentMadeForYouData: any[];
}

export default function ContentMadeForYou({ contentMadeForYouTitle, contentMadeForYouData }: ContentMadeForYouProps) {
  return (
    <div className='content-made-for-you mb-20 px-28'>
        <h2 className={`${laila.className} text-2xl font-semibold pb-8`}>{contentMadeForYouTitle}</h2>
        <div className='flex gap-4 flex-wrap md:flex-nowrap'>
          <div className='w-full'>
            <Card
              item={
                {
                  name: contentMadeForYouData[0].category,
                  node: {
                    title: contentMadeForYouData[0].data.title,
                    read_time: contentMadeForYouData[0].data.read_time,
                    // image_uri: contentMadeForYouData[0].data.image_uri,
                    image_uri: 'https://laaha.org/sites/default/files/styles/scale_592w/public/2024-06/VSS_M_84_b_ENG-Thumbnail.png?itok=ThrWO1zY',
                    type: contentMadeForYouData[0].data.type,
                    url: contentMadeForYouData[0].data.url
                  }
                }
              }
            />
          </div>
          <div className='side-content w-full flex flex-col gap-4'>
            <Card
              variant="side"
              item={
                {
                  name: contentMadeForYouData[1].category,
                  node: {
                    title: contentMadeForYouData[1].data.title,
                    read_time: contentMadeForYouData[1].data.read_time,
                    // image_uri: contentMadeForYouData[0].data.image_uri,
                    image_uri: 'https://laaha.org/sites/default/files/styles/scale_592w/public/2024-06/VSS_M_84_b_ENG-Thumbnail.png?itok=ThrWO1zY',
                    type: contentMadeForYouData[1].data.type,
                    url: contentMadeForYouData[1].data.url
                  }
                }
              }
            />
            <Card
              variant="side"
              item={
                {
                  name: contentMadeForYouData[2].category,
                  node: {
                    title: contentMadeForYouData[2].data.title,
                    read_time: contentMadeForYouData[2].data.read_time,
                    // image_uri: contentMadeForYouData[0].data.image_uri,
                    image_uri: 'https://laaha.org/sites/default/files/styles/scale_592w/public/2024-06/VSS_M_84_b_ENG-Thumbnail.png?itok=ThrWO1zY',
                    type: contentMadeForYouData[2].data.type,
                    url: contentMadeForYouData[2].data.url
                  }
                }
              }
            />
          </div>
        </div>
      </div>
  )
}