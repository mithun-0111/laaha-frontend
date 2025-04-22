export const runtime = "edge"

import NotFound from "@/src/components/NotFound"
import { fetchContentVariationData } from "@/src/lib/apis"
import ScormComponent from "@/src/components/Scorm/ScormComponent"
import VideoComponent from "@/src/components/Video/VideoComponent"
import PodcastComponent from "@/src/components/Podcast/PodcastComponent"
import BasicPage from "@/src/components/BasicPage/BasicPage"
import TaxonomyPage from "@/src/components/TaxonomyPage"
import NavigationProgress from "./NavigationProgress"
import { headers } from "next/headers"
import AccessDenied from "@/src/components/AccessDenied"

async function fetchNodeData(slug: string[], locale: string, countryCode:string) {
  const apiUrl = `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/${locale}/router/translate-path?path=/${slug}`;
  
  try {
    const response = await fetch(apiUrl, {
      headers: {
        Accept: "application/json",
      },
    });

    // First check the content type before parsing
    const contentType = response.headers.get('content-type');
    if (!contentType?.includes('application/json')) {
      const errorText = await response.text();
      throw new Error(`Server returned ${response.status} ${response.statusText}: ${errorText.slice(0, 100)}`);
    }

    if (!response.ok) {
      // If we have JSON error response, parse it
      const errorData = await response.json();
      throw new Error(errorData.message || `API request failed with status ${response.status}`);
    }

    const data = await response.json();

    if (!data || !data.jsonapi) {
      throw new Error("Invalid API response structure");
    }

    const contentTypeFromData = data.jsonapi.resourceName;

    if (!contentTypeFromData) {
      throw new Error("Content type could not be determined.");
    }

    if (
      contentTypeFromData === "node--podcast" ||
      contentTypeFromData === "node--video" ||
      contentTypeFromData === "node--scorm" ||
      contentTypeFromData === "node--page"
    ) {
      const variationData = await fetchContentVariationData(`/${slug}`, locale, countryCode);
      return { node: variationData, contentType: contentTypeFromData };
    }

    if (contentTypeFromData === "taxonomy_term--categories") {
      return { node: data, contentType: contentTypeFromData };
    }

    throw new Error(`Unsupported content type: ${contentTypeFromData}`);
  } catch (error) {
    console.error("Error fetching node data from:", apiUrl, error);
    throw error;
  }
}

// Content type mapping
const contentTypeMapping: Record<string, React.ComponentType<any>> = {
  "node--scorm": ScormComponent,
  "node--video": VideoComponent,
  "node--podcast": PodcastComponent,
  "node--page": BasicPage,
}

type NodePageParams = {
  locale: string
  slug: string[]
}

export default async function NodePage({
  params: { locale, slug },
}: {
  params: NodePageParams
}) {
  const headersList = headers();
  const countryCode = headersList.get('x-country-code') || 'US';

  try {
    const nodeData = await fetchNodeData(slug, locale, countryCode)
    const { node, contentType } = nodeData || { node: null, contentType: null }

    if(node.error) {
      return <AccessDenied />
    }
    // Handle taxonomy page
    if (contentType === "taxonomy_term--categories") {
      return (
        <>
          <NavigationProgress />
          <TaxonomyPage node={node} />
        </>
      )
    }

    // Select the component based on content type
    const ContentComponent =
      contentTypeMapping[contentType || "node--page"] || BasicPage

    if (
      contentType === "node--video" ||
      contentType === "node--scorm" ||
      contentType === "node--page" ||
      contentType === "node--podcast"
    ) {
      return (
        <>
          <NavigationProgress />
          <div className="container">
            {node ? <ContentComponent slug={slug} data={node} /> : <NotFound />}
          </div>
        </>
      )
    }

    return <NotFound />
  } catch (error) {
    return <NotFound />
  }
}
