"use client"
export const runtime = "edge"

import GridCard from "@/src/components/Cards/GridCard"
import { fetchIDFromPath, getContentCurationData } from "@/src/lib/apis"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { useLocale } from "next-intl"
import Pagination from "@/src/components/Pagination"
import { useTranslations } from "@/src/contexts/TranslationsContext"
import dynamic from "next/dynamic"
import { useProgressBar } from "@/src/components/Shimmer/NGProgress"

const ContentCurationTop = dynamic(
  () => import("./content-curation-top"),
  {
    loading: () => null, // Remove GeneralLoader since we're using NProgress
    ssr: false,
  }
)

const ContentCuration = () => {
  const initialData = {
    pageNumber: 0,
    sortBy: "created_DESC",
    filterType: "",
  }

  const { slug } = useParams()
  const locale = useLocale()
  const { translations } = useTranslations()

  const [contentCurationData, setContentCurationData] = useState<any[]>([])
  const [contentParam, setContentParam] = useState(initialData)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [category, setCategory] = useState<any>(null)
  const [cachedID, setCachedID] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalItems, setTotalItems] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(0)

  // Use the NProgress loading bar
  useProgressBar(loading)

  const tabs = [
    { name: `${translations?.[locale]?.all}`, module_type: "" },
    { name: `${translations?.[locale]?.module}`, module_type: "scorm" },
    { name: `${translations?.[locale]?.video}`, module_type: "video" },
    { name: `${translations?.[locale]?.podcast}`, module_type: "podcast" },
  ]

  const [selectedTab, setSelectedTab] = useState(tabs[0].module_type)

  const generateCacheKey = () => {
    return `contentCuration-${slug}-${locale}-${contentParam.pageNumber}-${contentParam.filterType}-${contentParam.sortBy}`
  }

  const handleClick = (module_type: string) => {
    setSelectedTab(module_type)
    setCurrentPage(1)
    setContentParam((prev: any) => ({
      ...prev,
      filterType: module_type,
      pageNumber: 0,
    }))
  }

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const sortByValue = event.target.value
    setContentParam((prev) => ({
      ...prev,
      sortBy: sortByValue,
      pageNumber: 0,
    }))
    setCurrentPage(1)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    setContentParam((prev) => ({
      ...prev,
      pageNumber: page - 1,
    }))
  }

  useEffect(() => {
    const fetchData = async () => {
      if (slug && locale) {
        try {
          setLoading(true)
          const cacheKey = generateCacheKey()
          const cachedData = localStorage.getItem(cacheKey)
          const cachedIDValue = localStorage.getItem('cachedID')

          if (cachedIDValue) {
            setCachedID(cachedIDValue)
          }

          if (cachedData) {
            const { data, timestamp } = JSON.parse(cachedData)
            const now = new Date().getTime()

            if (now - timestamp < 3600000) {
              setContentCurationData(data.rows)
              setCategory(data.categoryList)
              setItemsPerPage(data.pager?.items_per_page || 0)
              setTotalItems(data.pager?.total_items || 0)
              setLoading(false)
              return
            }
          }

          const id = await fetchIDFromPath(slug as string, locale)
          const contentCuration = await getContentCurationData(
            id[0]?.tid,
            locale as string,
            contentParam.pageNumber,
            contentParam.filterType,
            contentParam.sortBy
          )

          setContentCurationData(contentCuration?.data?.rows || [])
          setCategory(contentCuration?.categoryList || null)

          if (contentCuration?.data?.pager) {
            setItemsPerPage(contentCuration.data.pager.items_per_page)
            setTotalItems(contentCuration.data.pager.total_items)
          }

          localStorage.setItem(
            cacheKey,
            JSON.stringify({
              data: {
                rows: contentCuration?.data?.rows || [],
                categoryList: contentCuration?.categoryList || null,
                pager: contentCuration?.data?.pager || {},
              },
              timestamp: new Date().getTime(),
            })
          )

          localStorage.setItem('cachedID', id[0]?.tid)
        } catch (error) {
          setError(error instanceof Error ? error.message : "An error occurred")
          console.error("Error fetching data:", error)
        } finally {
          setLoading(false)
        }
      }
    }

    fetchData()
  }, [slug, locale, contentParam])

  if (error) {
    return <div className="container py-8 text-red-500">{error}</div>
  }

  return (
    <div className="content-curation container mb-8">
      <div className="content-curation-top">
        <ContentCurationTop name={slug as string} />
      </div>

      {/* Tab for content filtering */}
      <div className="tabs mb-8 flex flex-wrap justify-between">
        <div className="tab-row flex gap-6 lg:gap-8 mb-4 lg:mb-0 ps-2 lg:ps-0 w-full lg:w-auto bg-gray-100 lg:bg-white">
          {tabs.length > 0 &&
            tabs.map((tab) => (
              <button
                key={tab.module_type}
                onClick={() => handleClick(tab.module_type)}
                className={
                  tab.module_type === selectedTab
                    ? "active text-primary border-b py-2 lg:py-0 "
                    : "hover:text-primary py-2 lg:py-0 "
                }
              >
                {tab.name}
              </button>
            ))}
        </div>
        <div className="sort flex items-center gap-6">
          <span> {translations?.[locale]?.sory_by} </span>
          <select className="pe-8" onChange={handleChange} value={contentParam.sortBy}>
            <option value="created_DESC">
              {translations?.[locale]?.latest}
            </option>
            <option value="created_ASC">
              {translations?.[locale]?.oldest}
            </option>
          </select>
        </div>
      </div>

      {/* Display content cards */}
      <div className="content-cards flex flex-wrap gap-8 pb-12">
        {contentCurationData?.length > 0 &&
          contentCurationData.map((item: any, index: number) => {
            let curatedItem = {
              title: item.title,
              url: item.url,
              type: item.type,
              field_sub_category: item.field_sub_category,
              field_thumbnail_image: item.field_thumbnail_image,
            }
            return (
              <GridCard
                key={index}
                className="lg:max-w-[calc(25%-1.5rem)] md:max-w-[calc(50%-1rem)] flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_25%]"
                item={curatedItem}
                category={category || {}}
              />
            )
          })}
      </div>

      {/* Pagination if needed */}
      {totalItems > itemsPerPage && (
        <Pagination
          currentPage={currentPage}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  )
}

export default ContentCuration
