// import { headers } from 'next/headers';
export const runtime = "edge"

import { Metadata } from "next"
// import Card from '@/src/components/Cards/Card';
import HomepageLearningPathSlider from "@/src/components/Slider/HomepageLearningPathSlider"
// import { ExploreSpecialCards } from '@/src/components/Cards/ExploreSpecialCards';

// import HomepageSpecialTopicsSlider from '@/src/components/Slider/HomepageSpecialTopicsSlider';
// import Image from 'next/image';
import LahaHelpCard from "@/src/components/Cards/LahaHelpCard"
import HomePageBannerSlider from "@/src/components/Slider/HomepageBannerSlider"
import HomepageSearch from "@/src/components/Search/HomepageSearch"
import { drupal } from "@/src/lib/drupal"
import { getParams } from "@/src/lib/getparams"
import { getLocale } from "next-intl/server"
import ContentMadeForYou from "./components/content-made-for-you"
import StoriesOfStrength from "./components/stories-of-strength"
import { laila } from "@/src/lib/utils"
import ExploreSpecialTopics from "./components/explore-special-topics"
import FindServices from "./components/find-services"
import HowLaahaCanHelpYou from "./components/how-laaha-can-help-you"

export const metadata: Metadata = {
  title: "Laaha Homepage",
  description:
    "Laaha is a safe space for women and girls to discuss health, safety, violence, and relationships.",
}

export default async function Home() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/en/api/v1/home_dynamic`
  )
  let jsonRes = await response.json()

  let homepageBlocksToShow = [
    "field_banner",
    "field_need_help",
    "field_how_laaha_can_help_you",
    "field_new_modules_hub",
    "field_stories",
  ]

  let contentMadeForYouTitle = jsonRes?.data["resource-block"]["block_title"]
  let categoryWiseData = jsonRes?.data["resource-block"]["category"]
  let contentMadeForYouData = []

  for (let [k, v] of Object.entries(categoryWiseData) as [
    string,
    { name: string; nodes: any },
  ][]) {
    let vals = Object.values(v.nodes)
    let structuredContent = {
      category: v.name,
      data: vals[(Math.random() * vals.length) | 0],
    }
    contentMadeForYouData.push(structuredContent)
  }

  let locale = await getLocale()

  const layoutNodes: Object = await drupal.getResourceByPath(`/${locale}`, {
    params: getParams("homepage").getQueryObject(),
  })

  let orderOfNodes = []
  for (let [nodeKey, nodeValue] of Object.entries(layoutNodes)) {
    if (homepageBlocksToShow.includes(nodeKey)) {
      orderOfNodes.push(nodeKey)
    }
  }

  orderOfNodes.splice(1, 0, "find_services")
  orderOfNodes.splice(2, 0, "field_need_help")
  orderOfNodes = Array.from(new Set(orderOfNodes))

  let howLahaCanHelpData =
    (layoutNodes as any)?.field_how_laaha_can_help_you?.field_cards ?? []
  let exploreSpecialData = (layoutNodes as any)?.field_new_modules_hub ?? []
  let storiesOfStrengthData = (layoutNodes as any)?.field_stories ?? []

  console.log('exploreSpecialData :: ',exploreSpecialData)

  let howLahaCanHelpDataStructured = []
  for (let data of howLahaCanHelpData) {
    howLahaCanHelpDataStructured.push({
      title: data?.field_label,
      description: data?.field_card_description,
      image_uri: "",
    })
  }

  let exploreSpecialDataStructured = []
  for (let data of exploreSpecialData) {
    exploreSpecialDataStructured.push({
      title: data?.field_title,
      description: data?.field_card_description,
      image_uri: data?.field_image_uri,
    })
  }

  console.log({exploreSpecialDataStructured})

  let storiesOfStrengthDataStructured = []
  for (let data of storiesOfStrengthData.field_stories_images ?? []) {
    storiesOfStrengthDataStructured.push({
      description: String(data.field_description.processed),
      by: String(data.field_label),
    })
  }

  let homepageBlockComponentMapping = {
    field_banner: {
      component: HomePageBannerSlider,
      props: {},
    },
    find_services: {
      component: FindServices,
      props: {},
    },
    field_stories: {
      component: () => {
        return <StoriesOfStrength stories={storiesOfStrengthDataStructured} />
      },
      props: {},
    },
    field_need_help: {
      component: HomepageSearch,
      props: {},
    },

    field_new_modules_hub: {
      component: () => (
        <ExploreSpecialTopics
          exploreSpecialDataStructured={exploreSpecialDataStructured}
        />
      ),
      props: {},
    },
    field_how_laaha_can_help_you: {
      component: () => (
        <HowLaahaCanHelpYou
          howLahaCanHelpDataStructured={howLahaCanHelpDataStructured}
        />
      ),
      props: {},
    },
  }

  return (
    <>
      {orderOfNodes.map((node, index) => {
        let Comp =
          homepageBlockComponentMapping[
            node as keyof typeof homepageBlockComponentMapping
          ]?.component

        if (Comp) {
          return (
            <Comp
              key={index}
              {...homepageBlockComponentMapping[
                node as keyof typeof homepageBlockComponentMapping
              ].props}
            />
          )
        }
        return (
          <div key={index} className="bg-pink-400">
            {node}
          </div>
        )
      })}

      <ContentMadeForYou
        contentMadeForYouTitle={contentMadeForYouTitle}
        contentMadeForYouData={contentMadeForYouData}
      />

      <HomepageLearningPathSlider />
    </>
  )
}
