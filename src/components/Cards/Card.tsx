import { FC } from 'react';
import Link from 'next/link';
import { laila } from '@/src/lib/utils';

type Props = {
  className?: string;
  variant?: 'main' | 'side',
  item: {
    name?: string;
    node: {
      title: string;
      read_time: number;
      image_uri: string;
      type: string;
      url: string;
      show_link?:boolean
    };
  }
};

const Card: FC<Props> = ({ className, item, variant = 'main' }) => {
  return (
    <div
      className={`item w-full ${laila.className} ${className}`} >
      <a
        href={`${item.node.url}`}
        className={`${variant == 'main' ? '' : 'flex'}`}>
        <div
          className={`image_wrapper relative ${variant === 'main' ? '' : 'max-w-[calc(47%-0.5rem)] flex-[0_0_47%] me-4'} `}>
          <span className={`icon-${item.node.type}`}></span>
          <img
            src={item.node.image_uri}
            alt={item.name}
            className={`card-img w-full ${variant === 'main' ? 'mb-6' : ''}`}
          />
        </div>
        <div className="content w-full">
          { 
          item.name && 
            <div className="item-category text-primary mb-4 rounded-[0.2rem] bg-light-pink px-3 py-2 inline-block">
              {item.name}
            </div>
          }
          <div className="item-title font-semibold text-xl mb-4 hover:text-primary">{item.node.title}</div>
          { item.node.read_time &&
            <div className="item-duration font-opensans text-sm text-light-gray">{item.node.read_time + 'mins'} </div>
          }
          { item.node.show_link && 
            <Link href={item.node.url} className='btn-primary inline-block'> {"READ MORE"}</Link>
          }
        </div>
      </a>
    </div>
  );
};

export default Card;