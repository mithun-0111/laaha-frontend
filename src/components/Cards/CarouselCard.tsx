import { laila } from "@/src/lib/utils";
import { ArrowRight } from '@/src/lib/icons';

interface Props {
  key?: string | number;
  className?: string;
  item: {
    name: string;
    description: string;
    topics: number;
    resource: number | string;
    cta: {
      url: string;
    };
    image_uri: string;
  }
}

const CarouselCard = ({ key, item, className }: Props) => {
  return (

    <div className={`carousel-card-wrapper text-center p-7 ${className}`} key={key || item.name}>
      <div className="text-center">
        <div className="mage-wrapper inline-block">
          <img src={item.image_uri} alt={item.name} />
        </div>
        <div className="categories-content">
          {
            item?.name && <a href={item.cta.url}>
              <h2 className={`${laila.className} name text-xxl font-semibold my-4`}>
                {item.name}
              </h2>
            </a>
          }
          {
            item?.description && <p className="description univers text-light-gray mb-6 text-l">
              {item.description}
            </p>
          }
          <div className="counts text-[14px] text-light-gray">
            <span>{item.topics}
              {(item.topics == 1) ? ' Topic' : ' Topics'}
            </span>
            {" | "}
            <span>
              {item.resource}
              {(item.resource == 1) ? ' Resource' : ' Resources'}
            </span>
          </div>
          <a href={item.cta.url} className="cta__explore mt-4 text-primary inline-block ">
            <div className="flex gap-2">
              Explore Now
              <span className="text-sm top-[3px] relative">
                <ArrowRight width={16} height={16} />
              </span>
            </div>
          </a>
        </div>
      </div>
    </div>

  )
}

export default CarouselCard;