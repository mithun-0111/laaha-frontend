'use client';

import { DownArrow } from '@/src/lib/icons';
import { absoluteUrl } from '@/src/lib/utils';
import { DrupalMenuItem } from 'next-drupal';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

interface ExtendedDrupalMenuItem extends DrupalMenuItem {
  field_icon?: {
    uri: {
      url: string;
    };
  };
}

interface MenuItemWithChildren extends ExtendedDrupalMenuItem {
  children: ExtendedDrupalMenuItem[];
}

interface MenuItemProps {
  menuItems: ExtendedDrupalMenuItem[];
}

const MenuItem = ({ menuItems }: MenuItemProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLUListElement | null>(null);

  const handleExpand = () => {
    setIsOpen(!isOpen);
  }

  const handleClickOutside = (event:MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const categorizedMenu: MenuItemWithChildren[] = menuItems.reduce<MenuItemWithChildren[]>((acc, item) => {
    if (!item.parent) {
      acc.push({ ...item, children: [] });
    } else {
      const parent = acc.find(menuItem => menuItem.id === item.parent);
      if (parent) {
        parent.children.push(item);
      }
    }
    return acc;
  }, []);
  
  return (
    <>
      <ul ref={menuRef} className="block lg:flex flex-wrap mt-8 ps-0 list-none lg:mt-0">
        {categorizedMenu && categorizedMenu.map(item => (
          <li key={item.id} className={`me-0 lg:me-10 border-t px-4 lg:px-0 lg:border-0 border-shadow-dark-gray relative ${item.children.length > 0 && 'lg:me-14'}`}>
            {item.title && item.children.length > 0 ?
              (<>
                <div onClick={handleExpand} className='flex items-center'>
                  {item.field_icon?.uri?.url && 
                    <div className='icon'>
                      <Image src={absoluteUrl(item.field_icon.uri.url)} alt={item.title} width={20} height={20} />
                    </div>
                  }
                  <div className='menu-item'>
                    <Link className='p-3 block' href={item.url}>{item.title}</Link>
                    <span className={isOpen ? 'absolute right-0 lg:-right-4 top-3 transform -rotate-180 cursor-pointer' : 'absolute top-3 cursor-pointer right-0 lg:-right-4'}> <DownArrow /> </span>
                  </div>
                </div>
              </>) :
              (item.title &&
                <div className='flex items-center'>
                  <div className='icon'>
                  {item.field_icon?.uri?.url && 
                    <Image src={absoluteUrl(item.field_icon.uri.url)} alt={item.title} width={20} height={20} />
                  }
                  </div>
                  <Link className='p-3 block' href={item.url}>{item.title}</Link>
                </div>
              )
            }

            {item.children.length > 0 && isOpen && (
              <ul className='bg-white lg:absolute top-full ps-4 lg:min-w-60 lg:border lg:border-shadow-dark-gray'>
                {item.children.map(childItem => (
                  <li key={childItem.id} className='list-none'>
                    <div className='flex items-center'>
                      <div className='icon'>
                      {childItem.field_icon?.uri?.url && 
                        <Image src={absoluteUrl(childItem.field_icon.uri.url)} alt={childItem.title} width={20} height={20} />
                      }
                      </div>
                      <Link className='p-4 block' href={childItem.url}>{childItem.title}</Link>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </>
  );
};

export default MenuItem;
