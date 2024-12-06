"use client"

import React, { useState, useEffect } from 'react';
import SimpleCard from '../Cards/SimpleCard';
import { absoluteUrl } from '@/src/lib/utils';
import Image from 'next/image';
import Card from '../Cards/Card';
import './taxonomy.scss';
import { useLocale } from 'next-intl';
import { getCategoriesData } from '@/src/lib/apis';
import { Breadcrumbs } from '../Breadcrumb';

const CategoryPage = ({ tid, breadcrumb }: { tid: number, breadcrumb: any }) => {
  const locale = useLocale();
  const [data, setData] = useState<any>(null);
  const [featuredData, setFeaturedData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function getCategoryData() {
      try {
        setLoading(true);
        setError(null);
        const catData = await getCategoriesData(locale, tid);
        setData(catData);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    async function getFeaturedStories() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/${locale}/api/v1/featured-stories/${tid}?langcode=${locale}`);

        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await res.json();
        setFeaturedData(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    getCategoryData();
    getFeaturedStories();
  }, [locale, tid]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const { cat_name, cat_icon, cat_alt, cat_color } = data?.category;

  return (
    <div className='category-page'>
      <Breadcrumbs items={breadcrumb} />

      <div className='category-top pb-10' style={{ backgroundColor: '#' + cat_color }}>
        <div className='cat-header container flex justify-center items-center py-10'>
          <Image alt={cat_alt} src={absoluteUrl('/' + cat_icon)} width={48} height={48} />
          <h1>{cat_name}</h1>
        </div>
        <div className="simple-card__wrapper container flex flex-wrap gap-6">
          {
            Object.values(data.content).map((item: any, index: any) => {
              const transformedItem = {
                title: item.subcat_name,
                url: item.url,
                image: absoluteUrl(item.sub_category_thumbnail),
                alt: item.sub_category_alt || item.subcat_name,
              };
              return <SimpleCard
                key={index}
                data={transformedItem}
                classes="md:flex-[0_0_50%] md:max-w-[calc(50%-1rem)] mb-6 lg:mb-0 lg:flex-[0_0_25%] lg:max-w-[calc(25%-1.5rem)]"
              />
            })
          }
        </div>
      </div>
      <div className='featured-stories mb-10'>
        <h2 className='text-center pt-20 pb-10 '> Featured Stories</h2>
        <div className='stories container flex flex-wrap'>
        {
          featuredData && featuredData.map((item:any, index:number) => {
            const transformedItem = {
              node: {
                title: item.title,
                read_time: parseInt(item.read_time, 10),
                image_uri: process.env.NEXT_PUBLIC_DRUPAL_BASE_URL + '/' + item.uri,
                type: item.type,
                url: item.url,
              }
            };
            return <Card key={index} item={transformedItem} />
          })
        }
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
