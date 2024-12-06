import { Breadcrumbs } from "../Breadcrumb";
import PageViewCount from "../PageViewCount";
import Paragraph from "../Paragraph/Paragraph";
import RecommendedPosts from "../RecommendedPost";
import Tags from "../Tags";

const PodcastComponent = ({data}:any) => {
  const {title, layout_structure, field_content, field_tags } = data;
  const nid = data.drupal_internal__nid;
  const uid = data.uid.resourceIdObjMeta.drupal_internal__target_id;
  const thumbnail_image = data.field_thumbnail_image.image_style_uri.thumbnail;
  const subCategory = data.field_sub_category['0'].field_category_short_name;
  const subCatUrl = data.field_sub_category['0'].path.alias;
  const subCatThumbanail = data.field_sub_category['0'].field_sub_category_thumbnail.image_style_uri.thumbnail;
  const category = data.field_sub_category['0'].parent['0'].field_category_short_name;
  const categoryUrl = data.field_sub_category['0'].parent['0'].path.alias;
  const categoryThumbnail = data.field_sub_category['0'].parent['0'].field_image.image_style_uri.thumbnail

  const podacst_data = {
    layout_structure,
    field_content
  }
  return (
    <div className="podcast-page">
      <Breadcrumbs items={[
        { title: category, url: categoryUrl, icon: categoryThumbnail },
        { title: subCategory, url: subCatUrl, icon: subCatThumbanail },
        { title: title, url: '#', icon: thumbnail_image}
        ]} />
      <PageViewCount nid={nid} uid={uid} />
      <h1 className="mt-5 mb-8 max-w-3xl pe-4">{title}</h1>
      <Paragraph data={podacst_data} />
      <Tags tags={field_tags} />
      <RecommendedPosts nid={nid} />
    </div>
  )
}

export default PodcastComponent
