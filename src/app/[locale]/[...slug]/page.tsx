export const runtime = 'edge'

import { drupal } from "@/src/lib/drupal"
import { getParams } from "@/src/lib/getparams"
import ScormComponent from "@/src/components/Scorm/ScormComponent"
import VideoComponent from "@/src/components/Video/VideoComponent"
import PodcastComponent from "@/src/components/Podcast/PodcastComponent"
import { defaultLocale } from "@/site.config"
import NotFound from "@/src/components/NotFound"
import { Breadcrumbs } from "@/src/components/Breadcrumb"
import BasicPage from "@/src/components/BasicPage/BasicPage"
import TaxonomyPage from "@/src/components/TaxonomyPage"

type NodePageParams = {
  locale: string,
  slug: string[]
}

type NodePageProps = {
  params: NodePageParams
  searchParams: { [key: string]: string | string[] | undefined }
}

// Function to fetch node data based on the slug and locale
async function fetchNodeData(slug: string[], locale: string) {
  const path = `/${slug.join("/")}`;

  try {
    // Fetch the content type information using translatePath
    const pathInfo = await drupal.translatePath(path);
    const contentType = pathInfo?.jsonapi?.resourceName;

    if (!contentType) {
      throw new Error("Content type could not be determined.");
    }

    const node = await drupal.getResourceByPath(path, {
      locale,
      defaultLocale,
      params: getParams(contentType)
    });

    return { node, contentType };

  } catch (error) {
    console.error("Error fetching node:", error);
    return { node: null, contentType: null };
  }
}

const contentTypeMapping: Record<string, React.ComponentType<any>> = {
  'node--scorm': ScormComponent,
  'node--video': VideoComponent,
  'node--podcast': PodcastComponent,
  'node--page': BasicPage,
};

export default async function NodePage({
  params: { locale, slug },
}: NodePageProps) {

  const { node, contentType } = await fetchNodeData(slug, locale);

  if(contentType !== 'taxonomy_term--categories') {
    const ContentComponent = contentTypeMapping[contentType || 'node--page'] || BasicPage;

    return (
      <>
        {contentType === 'node--page' && <Breadcrumbs items={[{ title: node?.title }]} />}
        {node ? (
          <div className="container">
            <ContentComponent data={node} />
          </div>
        ) : (
          <div className="container">
            <NotFound />
          </div>
        )}
      </>
    );
  } else {

    return (
      <TaxonomyPage node={node} />
    )
  }
}
