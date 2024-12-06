import { DrupalJsonApiParams } from "drupal-jsonapi-params"

export function getParams(resourceType: string, fieldMachineName?: string) {
  const apiParams = new DrupalJsonApiParams();

  if (resourceType === "menu_link_content--menu_link_content") {
    return apiParams.addInclude(['field_icon']).addFields("menu_link_content--menu_link_content", [
      "title,url,route,attributes,parent,expanded,field_icon",
    ])
  }

  if( resourceType === "block-basic") {
    return apiParams.addFields(fieldMachineName ? fieldMachineName : '' , [
      "body",
    ])
  }

  if(resourceType === 'homepage') {
    return apiParams.addInclude(["field_banner", "field_need_help", "field_how_laaha_can_help_you.field_cards",
      "field_new_modules_hub", "field_stories.field_stories_images"
    ])
  }

  if(resourceType === 'view') {
    apiParams.addFields("view--view", [
      "title"
    ])
  }

  if(resourceType === "node--page") {
    apiParams
      .addInclude([
        "field_content",
        "field_content.field_single_image",
        "field_content.field_single_image.field_media_image",
        "field_content.paragraph_type"
      ])
      .addFields("node--page", [
        "title",
        "uid",
        "path",
        "status",
        "field_content",
        "layout",
        "layout_structure"
      ]);
  }

  if(resourceType === 'node--scorm') {
    apiParams
      .addInclude([
        "field_content",
        "field_tags",
        "field_sub_category",
        "field_thumbnail_image",
        "field_sub_category.field_sub_category_thumbnail",
        "field_sub_category.parent",
        "field_sub_category.parent.field_image"
      ])
  }

  if(resourceType === 'node--video') {
    apiParams
      .addInclude([
        "field_content",
        "field_content.field_video_file",
        "field_tags",
        "field_sub_category",
        "field_thumbnail_image",
        "field_sub_category.field_sub_category_thumbnail",
        "field_sub_category.parent",
        "field_sub_category.parent.field_image"
      ])
  }

  if(resourceType === 'node--podcast') {
    apiParams
      .addInclude([
        "field_content",
        "field_tags",
        "field_content.field_audio",
        "field_content.field_single_image.field_media_image",
        "field_content.field_vtt_file",
        "field_thumbnail_image",
        "field_sub_category",
        "field_sub_category.field_sub_category_thumbnail",
        "field_sub_category.parent",
        "field_sub_category.parent.field_image"
      ])
  }

  if(resourceType === 'taxonomy_term--categories') {
    apiParams
      .addInclude([
        "field_icon",
        "field_sub_category_thumbnail",
        "parent.field_icon"
      ])
  }

  return apiParams.getQueryObject()
}
