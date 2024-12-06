"use client"

import { useLocale } from 'next-intl';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ViewCountShimmer } from '../Shimmer';

type Props = {
  nid: number,
  uid: string
}

const PageViewCount = ({ nid, uid }: Props) => {
  const [viewCount, setViewCount] = useState('');
  const locale = useLocale();

  // Get User IP
  const getUserIP = async () => {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return data.ip;
    } catch (error) {
      console.error('Error fetching IP:', error);
      return null;
    }
  };

  useEffect(() => {
    const fetchViewCountAndUpdate = async () => {
      const uip = await getUserIP();
      const bodyData = { uid, uip };

      // Update view count on the server
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/${locale}/api/v1/node_view_count/${nid}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(bodyData),
        });

        if (!response.ok) {
          throw new Error('Failed to update view count');
        }

        const data = await response.json();
      } catch (error) {
        console.error('Error sending view count to server:', error);
      }

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/${locale}/api/node_view_count/${nid}`);
        if (!response.ok) {
          throw new Error('Failed to get view count');
        }

        const data = await response.json();
        setViewCount(data.count);
      } catch (error) {
        console.error('Error getting view count from server:', error);
      }
    };

    fetchViewCountAndUpdate();
  }, [nid, uid]);

  return ( viewCount ?
    <div className='view-count flex items-center'>
      <Image src={"/assets/images/view-icon.png"} className='me-2' width={21} height={16} alt="icon" /> 
      {viewCount + ' views'}
    </div>
    : <ViewCountShimmer />
  );
}

export default PageViewCount;
