"use client"

import dynamic from "next/dynamic"
import { Breadcrumbs } from "../Breadcrumb"
import { useState } from "react";
import DetailPageParagraph from "../Paragraph/DetailPageParagraph";
import { ListingShimmer3col } from "../Shimmer";
import { useLocale } from "next-intl";

// Dynamically import components with loading placeholders
const PageViewCount = dynamic(() => import("../PageViewCount"), {
  ssr: false,
});

const Tags = dynamic(() => import("../Tags"), {
  loading: () => <p>Loading Tags...</p>,
  ssr: false,
});

const RecommendedPosts = dynamic(() => import("../RecommendedPost"), {
  loading: () =>  <ListingShimmer3col/>,
  ssr: false,

});

const PodcastComponent = ({ data }: any) => {
  const [podcastData] = useState(data || null)
  const title = podcastData?.title?.[0]?.value;
  const nid = podcastData?.nid?.[0]?.value;
  const uid = podcastData?.uid?.[0]?.target_id
  const tags = podcastData?.field_tags;

  const getFirstValidSubCategory = (subCategories: any) => {
    return subCategories.find(
      (subCategory: any) => subCategory && subCategory.field_category_short_name?.[0]
    );
  };

  const firstValidSubCategory = getFirstValidSubCategory(
    podcastData?.field_sub_category || []
  )

  let thumbnail_image = podcastData?.field_thumbnail_image?.[0]?.url
  let subCategory = firstValidSubCategory?.field_category_short_name?.[0].value
  let subCatUrl = firstValidSubCategory?.path?.[0]?.alias
  let subCatThumbanail =
    firstValidSubCategory?.field_sub_category_thumbnail?.[0]?.url
  let category = firstValidSubCategory?.parent?.["0"]?.field_category_short_name?.[0].value
  let categoryUrl = firstValidSubCategory?.parent?.["0"]?.path?.[0]?.alias
  let categoryThumbnail =
    firstValidSubCategory?.parent?.["0"]?.field_image?.[0]?.url

  const podcast_data = {
    layout_structure: podcastData?.layout_structure,
    field_content: podcastData?.field_content,
  }
  const locale = useLocale();

  return (
    <div className="podcast-page">
      <Breadcrumbs
        items={[
          { title: category, url: `/${locale}${categoryUrl}`, icon: categoryThumbnail },
          { title: subCategory, url: `/${locale}${subCatUrl}`, icon: subCatThumbanail },
          { title: title, url: "#", icon: thumbnail_image },
        ]}
      />
      <PageViewCount nid={nid} uid={uid} />
      <h1 className="mt-5 mb-8 max-w-3xl pe-4">{title}</h1>
      <DetailPageParagraph data={podcast_data} nid={nid} />
      { tags && <Tags tags={tags} /> }
      <RecommendedPosts nid={nid} />
    </div>
  )
}

export default PodcastComponent
