"use client"

import { useEffect, useState } from "react"
import Logo from "../Header/Logo"
import Copyright from "./Copyright"
import ExploreMenu from "./ExploreMenu"
import FooterBottom from "./FooterBottom"
import QuickLinks from "./QuickLinks"
import SiteDesc from "./SiteDesc"
import { getFooterMenuData } from "@/src/lib/globalElements"
import { useLocale } from "next-intl"
import { drupal } from "@/src/lib/drupal"
import { getParams } from "@/src/lib/getparams"
import { defaultLocale } from "@/site.config"
import Image from "next/image"
import Link from "next/link"
import SocialMediaBlock from "./SocialMediaBlock"

// Cache keys
const FOOTER_MENU_CACHE_KEY = "footer-menu-data"
const SITE_DESC_CACHE_KEY = "site-description"
const COPYRIGHT_CACHE_KEY = "copyright-info"
const CACHE_EXPIRY = 3600000 // 1 hour in milliseconds

const Footer = () => {
  const [footerMenuData, setFooterMenuData] = useState<any>(null)
  const [siteDesc, setSiteDesc] = useState<any>({ body: { value: "" } })
  const [copyright, setCopyright] = useState<any>({ body: { value: "" } })
  const [loading, setLoading] = useState(true)
  const locale = useLocale()

  // Generate cache key with locale
  const generateCacheKey = (baseKey: string) => `${baseKey}-${locale}`

  // Get data from cache
  const getFromCache = (key: string) => {
    const cachedData = localStorage.getItem(key)
    if (!cachedData) return null
    
    const { data, timestamp } = JSON.parse(cachedData)
    if (Date.now() - timestamp < CACHE_EXPIRY) {
      return data
    }
    return null
  }

  // Save data to cache
  const saveToCache = (key: string, data: any) => {
    localStorage.setItem(
      key,
      JSON.stringify({
        data,
        timestamp: Date.now()
      })
    )
  }

  useEffect(() => {
    const fetchFooterData = async () => {
      const cacheKey = generateCacheKey(FOOTER_MENU_CACHE_KEY)
      const cachedData = getFromCache(cacheKey)
      
      if (cachedData) {
        setFooterMenuData(cachedData)
        return
      }

      try {
        const data = await getFooterMenuData(locale)
        setFooterMenuData(data.footer)
        saveToCache(cacheKey, data.footer)
      } catch (error) {
        console.error("Error fetching footer menu data:", error)
      }
    }

    fetchFooterData()
  }, [locale])

  useEffect(() => {
    const fetchData = async () => {
      const siteDescCacheKey = generateCacheKey(SITE_DESC_CACHE_KEY)
      const copyrightCacheKey = generateCacheKey(COPYRIGHT_CACHE_KEY)
      
      const cachedSiteDesc = getFromCache(siteDescCacheKey)
      const cachedCopyright = getFromCache(copyrightCacheKey)

      if (cachedSiteDesc && cachedCopyright) {
        setSiteDesc(cachedSiteDesc)
        setCopyright(cachedCopyright)
        setLoading(false)
        return
      }

      try {
        const [siteDescResponse, copyrightResponse] = await Promise.allSettled([
          cachedSiteDesc 
            ? Promise.resolve(cachedSiteDesc)
            : drupal.getResource(
                "block_content--footer_contact_information",
                "190696af-e4d3-43aa-a303-d207fdcd7f76",
                {
                  params: getParams(
                    "block-basic",
                    "block_content--footer_contact_information"
                  ).getQueryObject(),
                  locale: locale,
                  defaultLocale: defaultLocale,
                }
              ),
          cachedCopyright
            ? Promise.resolve(cachedCopyright)
            : drupal.getResource(
                "block_content--basic",
                "dbcfd0a8-aed6-4faf-a1c4-a2e52e37cbe7",
                {
                  params: getParams(
                    "block-basic",
                    "block_content--basic"
                  ).getQueryObject(),
                  locale: locale,
                  defaultLocale: defaultLocale,
                }
              ),
        ])

        if (siteDescResponse.status === "fulfilled" && !cachedSiteDesc) {
          setSiteDesc(siteDescResponse.value)
          saveToCache(siteDescCacheKey, siteDescResponse.value)
        } else if (!cachedSiteDesc) {
          console.error(
            "Error fetching site description:",
            siteDescResponse.status === "rejected" ? siteDescResponse.reason : "Unknown error"
          )
          setSiteDesc({
            body: { value: "<p>Error loading site description.</p>" },
          })
        }

        if (copyrightResponse.status === "fulfilled" && !cachedCopyright) {
          setCopyright(copyrightResponse.value)
          saveToCache(copyrightCacheKey, copyrightResponse.value)
        } else if (!cachedCopyright) {
          console.error(
            "Error fetching copyright info:",
            copyrightResponse.status === "rejected" ? copyrightResponse.reason : "Unknown error"
          )
          setCopyright({
            body: { value: "<p>Error loading copyright information.</p>" },
          })
        }
      } catch (error) {
        console.error("Error fetching data:", error)
        setSiteDesc({
          body: { value: "<p>Error loading site description.</p>" },
        })
        setCopyright({
          body: { value: "<p>Error loading copyright information.</p>" },
        })
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [locale])

  if (loading) {
    return (
      <div className="footer bg-color-secondary py-10 lg:py-16 min-h-[600px] lg:min-h-[300px]">
        <div className="container">
          <div className="footer-top lg:pb-16 flex flex-wrap items-start lg:border-b lg:border-color-pink-500 mb-10">
            <div className="footer-top-left order-1 mb-8 lg:mb-0 flex-[0_0_100%] lg:flex-[0_0_25%]">
              <Link href={`/${locale}`} className="inline-block">
                <div className="w-44 h-32">
                  <Image
                    loading="lazy"
                    src={"/assets/images/laaha-logo_footer.webp"}
                    width={175}
                    height={122}
                    alt="Footer Logo"
                  />
                </div>
              </Link>
            </div>
            <div className="footer-link order-3 lg:order-2 flex flex-wrap flex-[0_0_100%] lg:flex-[0_0_40%]">
              <div className="quick-links flex-[0_0_50%]">
                <span className="shimmer-item-effect mb-2 h-6 w-full block"></span>
                <span className="shimmer-item-effect mb-2 h-6 w-full block"></span>
                <span className="shimmer-item-effect mb-2 h-6 w-full block"></span>
                <span className="shimmer-item-effect mb-2 h-6 w-full block"></span>
              </div>

              <div className="quick-links flex-[0_0_50%]">
                <span className="shimmer-item-effect mb-2 h-6 w-full block"></span>
                <span className="shimmer-item-effect mb-2 h-6 w-full block"></span>
                <span className="shimmer-item-effect mb-2 h-6 w-full block"></span>
                <span className="shimmer-item-effect mb-2 h-6 w-full block"></span>
              </div>
            </div>
            <div className="flex-[0_0_100%] lg:flex-[0_0_35%] pb-8 mb-8 border-b border-color-pink-500 lg:pb-0 lg:mb-0 lg:border-b-0 order-2 lg:order-3">
              <span className="shimmer-item-effect mb-2 h-24 w-full block"></span>
            </div>
          </div>
          <div className="footer-bottom">
            <span className="shimmer-item-effect h-6 block w-full"></span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="footer bg-color-secondary py-10 lg:py-16">
      <div className="container">
        <div className="footer-top lg:pb-16 flex flex-wrap items-start lg:border-b lg:border-color-pink-500 mb-10">
          <div className="footer-top-left order-1 mb-8 lg:mb-0 flex-[0_0_100%] lg:flex-[0_0_25%]">
            <Link href={`/${locale}`} className="inline-block">
              <Image
                loading="lazy"
                src={"/assets/images/laaha-logo_footer.webp"}
                width={175}
                height={122}
                alt="Footer Logo"
              />
            </Link>
          </div>
          {footerMenuData && (
            <div className="footer-link order-3 lg:order-2 flex flex-wrap flex-[0_0_100%] lg:flex-[0_0_40%]">
              {/* Show social icons instead of menus */}
              {/* <QuickLinks data={footerMenuData.quickLinks} />
              <ExploreMenu data={footerMenuData.exploreLinks} /> */}

              <SocialMediaBlock data={footerMenuData?.socialBlock} />
            </div>
          )}

          <div className="flex-[0_0_100%] lg:flex-[0_0_35%] pb-8 mb-8 border-b border-color-pink-500 lg:pb-0 lg:mb-0 lg:border-b-0 order-2 lg:order-3">
            <SiteDesc siteDesc={siteDesc} />
          </div>
        </div>
        <div className="footer-bottom block lg:flex justify-between mb-12 lg:mb-0">
          <div className="footer-bottom-menu">
            {footerMenuData && (
              <FooterBottom data={footerMenuData.footerBottom} />
            )}
          </div>
          <div className="copyrights">
            <Copyright copyright={copyright} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
