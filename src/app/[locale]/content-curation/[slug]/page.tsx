"use client"
export const runtime = 'edge'

import GridCard from "@/src/components/Cards/GridCard";
import { laila } from "@/src/lib/utils";
import { getContentCurationData } from "@/src/lib/apis";
import { useEffect, useState } from 'react';
import { useParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import Pagination from "@/src/components/Pagination";
import { ListingShimmer } from "@/src/components/Shimmer";

const ContentCuration = () => {
  const initialData = {
    pageNumber: 0,
    sortBy: 'created_DESC',
    filterType: '',
  };

  const { slug } = useParams();
  const locale = useLocale();
  const t = useTranslations();

  const [contentCurationData, setContentCurationData] = useState<any>({});
  const [contentParam, setContentParam] = useState(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const tabs = [
    { name: 'All', module_type: '' },
    { name: 'Modules', module_type: 'scorm' },
    { name: 'Videos', module_type: 'video' },
    { name: 'Podcasts', module_type: 'podcast' },
  ];

  const [selectedTab, setSelectedTab] = useState(tabs[0].module_type);
  const { pageNumber, filterType, sortBy } = contentParam;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalItems, setTotalItems] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(0);

  const handleClick = (module_type: string) => {
    setSelectedTab(module_type);
    setContentParam((prev: any) => ({ ...prev, filterType: module_type, pageNumber: 0 }));
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const sortByValue = event.target.value;
    setContentParam((prev) => ({
      ...prev,
      sortBy: sortByValue,
      pageNumber: 0,
    }));
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setContentParam((prev) => ({
      ...prev,
      pageNumber: page - 1,
    }));
  };

  // Update data whenever the contentParam changes
  useEffect(() => {
    const fetchData = async () => {
      if (slug && locale) {
        try {
          const contentCuration = await getContentCurationData(slug as string, locale as string, pageNumber, filterType, sortBy);
          setContentCurationData(contentCuration.data);

          if (contentCuration.data?.['content-curation-view-block']?.pagination) {
            setItemsPerPage(contentCuration.data['content-curation-view-block'].pagination.items_per_page);
            setTotalItems(contentCuration.data['content-curation-view-block'].pagination.total_items);
          }
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [slug, locale, contentParam]); // Ensure it reacts to changes in contentParam

  if (loading) return <ListingShimmer/>;
  if (error) return <div>Error: {error}</div>;

  const {
    'taxonomy-block': { title, description, bgimage, video_url, resource_count } = {},
    'content-curation-view-block': contentCurationBlocks,
  } = contentCurationData;

  return (
    <div className="content-curation container mb-8">
      <div
        className='curation-block py-8 mb-6 flex flex-wrap gap-6 items-center'
        style={bgimage && {
          background: `url(${bgimage}) no-repeat center center`,
          backgroundSize: 'cover',
        }}
      >
        <div className={`curation-info ${video_url ? 'flex-[0_0_100%] lg:flex-[0_0_50%] lg:max-w-[calc(50%-1rem)]' : 'mx-auto text-center'}`}>
          <div className="resource-count mb-4">{resource_count} Resources available</div>
          <h1 className={`title mb-2 tracking-tight ${laila.className}`}>
            {title}
          </h1>
          <div className="subtitle text-color-neutral">
            {description}
          </div>
        </div>
        {video_url && (
          <div className="intro-video flex-[0_0_100%] lg:flex-[0_0_50%] lg:max-w-[calc(50%-1rem)]">
            <video className="max-w-full w-full" width={640} height={360} controls muted loop autoPlay playsInline>
              <source src={video_url} type="video/mp4" />
            </video>
          </div>
        )}
      </div>

      <div className="tabs mb-8 flex flex-wrap justify-between">
        <div className="tab-row flex gap-6 lg:gap-8 mb-4 lg:mb-0">
          {tabs.length > 0 && tabs.map((tab) => (
            <button
              key={tab.module_type}
              onClick={() => handleClick(tab.module_type)}
              className={tab.module_type === selectedTab ? 'active text-primary' : 'hover:text-primary'}
            >
              {t(tab.name)}
            </button>
          ))}
        </div>
        <div className="sort flex items-center gap-6">
          <span> {t('Sort By:')} </span>
          <select className="pe-8" onChange={handleChange} value={sortBy}>
            <option value="created_DESC">{t('Latest')}</option>
            <option value="created_ASC">{t('Oldest')}</option>
          </select>
        </div>
      </div>

      <div className="content-cards flex flex-wrap gap-8 pb-12">
        {contentCurationBlocks?.data && contentCurationBlocks.data.map((item: any, index: number) => (
          <GridCard key={index} className="lg:max-w-[calc(25%-1.5rem)] md:max-w-[calc(50%-1rem)] flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_25%]" item={item} />
        ))}
      </div>

      {totalItems > itemsPerPage && (
        <Pagination
          currentPage={currentPage}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default ContentCuration;
