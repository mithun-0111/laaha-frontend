import { laila } from "@/src/lib/utils";
import { Module, Podcast, Video } from "@/src/lib/icons";
import Image from "next/image";
import Link from "next/link";

type ThumbnailImage = {
  url: string;
  alt: string;
  width: number;
  height: number;
};

type GridProps = {
  className?: string,
  item: {
    title: string;
    url: string,
    type: string;
    field_sub_category?: {
      parent_terms: [];
    },
    field_thumbnail_image: ThumbnailImage[];
  }
};

const GridCard = ({ className, item }: GridProps) => {
  return (
    <div className={`bg-gray-100 grid-card ${className}`}>
      <div className="relative">
        <div className="absolute top-4 left-4 bg-default-black bg-opacity-60 py-1 px-2 rounded-full flex items-center shadow">
          <span className="icon w-3 h-3">
            {item.type === 'scorm' ? <Module /> : (item.type === 'video' ? <Video /> : <Podcast />)}
          </span>
          <span className="ms-1 text-white text-sm">
            {item.type === 'scorm' ? 'Module' : (item.type === 'video' ? 'Video' : 'Podcast')}
          </span>
        </div>
        {item.field_thumbnail_image.length > 0 && (
          <Image
            src={item.field_thumbnail_image[0].url}
            alt={item.field_thumbnail_image[0].alt}
            width={item.field_thumbnail_image[0].width}
            height={item.field_thumbnail_image[0].height}
            className="w-full rounded-t-lg"
          />
        )}
      </div>
      <div className="p-4">
        <div className={`text-lg text-gray-950 mb-3 font-semibold transition-colors duration-200 hover:text-primary ${laila.className}`}>
          <Link href={item.url}>
            <span>{item.title}</span>
          </Link>
        </div>
        <div className="inline-flex flex-wrap gap-2">
          {item.field_sub_category && item.field_sub_category.parent_terms.length > 0 && item.field_sub_category.parent_terms.map((chip, index) => (
            <span key={index} className={`bg-color-secondary text-sm text-primary px-2 py-1 rounded-md ${laila.className}`}>
              {chip}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GridCard;
