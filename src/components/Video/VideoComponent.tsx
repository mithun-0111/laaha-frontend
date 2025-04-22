"use client"

import dynamic from "next/dynamic"
import { Breadcrumbs } from "../Breadcrumb"
import DetailPageParagraph from "../Paragraph/DetailPageParagraph";
import { useState } from "react";
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
  loading: () => <ListingShimmer3col/>,
  ssr: false,

});

const VideoComponent = ({ data }: any) => {
  const [videoData] = useState<any>(data || null);

  const video_data = {
    layout_structure: videoData?.layout_structure,
    field_content: videoData?.field_content,
  }
  const title = videoData?.title?.[0]?.value;
  const nid = videoData?.nid?.[0]?.value;
  const uid = videoData?.uid?.[0]?.target_id
  const tags = videoData?.field_tags;

  const getFirstValidSubCategory = (subCategories: any) => {
    return subCategories.find(
      (subCategory: any) => subCategory && subCategory.field_category_short_name?.[0]
    );
  };
  const firstValidSubCategory = getFirstValidSubCategory(
    videoData?.field_sub_category || []
  )
  let thumbnail_image = videoData?.field_thumbnail_image?.[0]?.url
  let subCategory = firstValidSubCategory?.field_category_short_name?.[0].value
  let subCatUrl = firstValidSubCategory?.path?.[0]?.alias
  let subCatThumbanail =
    firstValidSubCategory?.field_sub_category_thumbnail?.[0]?.url
  let category = firstValidSubCategory?.parent?.["0"]?.field_category_short_name?.[0].value
  let categoryUrl = firstValidSubCategory?.parent?.["0"]?.path?.[0]?.alias
  let categoryThumbnail =
    firstValidSubCategory?.parent?.["0"]?.field_image?.[0]?.url
  const locale = useLocale();

    return (
    <div className="scorm-page">
      <Breadcrumbs
        items={[
          { title: category, url: `/${locale}${categoryUrl}`, icon: categoryThumbnail },
          { title: subCategory, url: `/${locale}${subCatUrl}`, icon: subCatThumbanail },
          { title: title, url: "#", icon: thumbnail_image },
        ]}
      />
      {
        nid && uid && 
        <PageViewCount nid={nid} uid={uid} />
      }
      <h1 className="mt-5 mb-8 max-w-3xl pe-4">{title}</h1>
      <DetailPageParagraph data={video_data} />
      { tags && <Tags tags={tags} /> }
      {
        nid &&
        <RecommendedPosts nid={nid} />
      }
    </div>
  )
}

export default VideoComponent
