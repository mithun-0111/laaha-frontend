"use client"
export const runtime = 'edge'

import { ArrowRight, DownArrow, RightAngular } from "@/src/lib/icons"
import Image from "next/image"
import { laila } from "@/src/lib/utils"
import { useEffect, useRef, useState } from "react"
import * as DropdownArrow from "@/public/assets/images/dropdown-arrow.svg"
import AccessServicesCard from "@/src/components/Cards/AccessServicesCard"
import { getFacets, getServices } from "./api"
interface ServicesOffered {
  title: string
  selected: boolean
}

interface CardData {
  title: string
  location: string
  phoneNumber: string
  email: string
  tag: string
}

export default function AccessServices() {
  const [servicesOffered, setServicesOffered] = useState<ServicesOffered[]>([])
  const [cardData, setCardData] = useState<CardData[]>([])
  const [totalCardItems, setTotalCardItems] = useState(0)
  const [countries, setCountries] = useState([])
  const [states, setStates] = useState([])
  const [cities, setCities] = useState([])

  const [selectedCountry, setSelectedCountry] = useState("")
  const [selectedState, setSelectedState] = useState("")
  const [selectedCity, setSelectedCity] = useState("")

  const [currentPage, setCurrentPage] = useState(1)

  const PAGE_LIMIT = 10
  const accordionRef = useRef<HTMLDivElement>(null)
  const accordionButtonRef = useRef<HTMLButtonElement>(null)

  const toggleAccordion = (e: any) => {
    accordionRef.current?.classList.toggle("hidden")
    accordionButtonRef.current?.classList.toggle("rotate-180")
  }

  const handleServiceChange = async (e: any) => {
    const title = e.target.value
    let tempServicesOffered = [...servicesOffered]
    for (let service of tempServicesOffered) {
      if (service.title === title) {
        service.selected = !service.selected
      }
    }
    setServicesOffered(tempServicesOffered)
    let titlesArr = tempServicesOffered.filter((service) => service.selected === true).map(item => item.title)
    let servicesData = await getServices(
      selectedCountry,
      selectedState,
      selectedCity,
      titlesArr,
      PAGE_LIMIT,
      0
    )
    setTotalCardItems(servicesData.meta.count)
    setCurrentPage(1)
    let tempCardData = []
    for (let service of servicesData.data) {
      tempCardData.push({
        title: service.attributes.field_service_provider_name,
        phoneNumber: service.attributes.field_telephone_number,
        email: service.attributes.field_email_id,
        location:
          service.attributes.field_city + ", " + service.attributes.field_state,
        tag: service.attributes.title,
      })
    }
    setCardData(tempCardData)
  }

  const handleCountryChange = async (e: any) => {
    let tempCountry = e.target.value
    setSelectedCountry(tempCountry)
    let data = await getFacets(tempCountry)
    let tempServicesOffered = []
    for (let service of data.data.titles) {
      tempServicesOffered.push({ title: service, selected: false })
    }
    setServicesOffered(tempServicesOffered)
    setStates(data.data.field_state)
    setSelectedState("")
    setSelectedCity("")
    setCurrentPage(1)

    let servicesData = await getServices(tempCountry)
    setTotalCardItems(servicesData.meta.count)
    let tempCardData = []
    for (let service of servicesData.data) {
      tempCardData.push({
        title: service.attributes.field_service_provider_name,
        phoneNumber: service.attributes.field_telephone_number,
        email: service.attributes.field_email_id,
        location:
          service.attributes.field_city + ", " + service.attributes.field_state,
        tag: service.attributes.title,
      })
    }
    setCardData(tempCardData)
  }

  const handleStateChange = async (e: any) => {
    let tempState = e.target.value
    setSelectedState(tempState)
    let data = await getFacets(selectedCountry, tempState)
    let tempServicesOffered = []
    for (let service of data.data.titles) {
      tempServicesOffered.push({ title: service, selected: false })
    }
    setServicesOffered(tempServicesOffered)
    setCities(data.data.field_city)
    setSelectedCity("")

    let servicesData = await getServices(
      selectedCountry,
      tempState,
      "",
      [],
      PAGE_LIMIT,
      0
    )
    setTotalCardItems(servicesData.meta.count)
    let tempCardData = []
    for (let service of servicesData.data) {
      tempCardData.push({
        title: service.attributes.field_service_provider_name,
        phoneNumber: service.attributes.field_telephone_number,
        email: service.attributes.field_email_id,
        location:
          service.attributes.field_city + ", " + service.attributes.field_state,
        tag: service.attributes.title,
      })
    }
    setCardData(tempCardData)
  }

  const handleCityChange = async (e: any) => {
    let tempCity = e.target.value
    setSelectedCity(tempCity)
    let data = await getFacets(selectedCountry, selectedState, tempCity)
    let tempServicesOffered = []
    for (let service of data.data.titles) {
      tempServicesOffered.push({ title: service, selected: false })
    }
    setServicesOffered(tempServicesOffered)

    let servicesData = await getServices(
      selectedCountry,
      selectedState,
      tempCity,
      [],
      PAGE_LIMIT,
      0
    )
    setTotalCardItems(servicesData.meta.count)
    let tempCardData = []
    for (let service of servicesData.data) {
      tempCardData.push({
        title: service.attributes.field_service_provider_name,
        phoneNumber: service.attributes.field_telephone_number,
        email: service.attributes.field_email_id,
        location:
          service.attributes.field_city + ", " + service.attributes.field_state,
        tag: service.attributes.title,
      })
    }
    setCardData(tempCardData)
  }

  const handlePageChange = async (e: any) => {
    let page = e.target.value
    setCurrentPage(page)
  }

  const handlePrevNext = (action: string) => {
    let maxPage = Math.ceil( totalCardItems / PAGE_LIMIT);
    if (action === 'increment' && currentPage < maxPage) {
      setCurrentPage(currentPage + 1)
    } else if (action === 'decrement' && currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  useEffect(() => {
    let pageOffset = (currentPage - 1) * PAGE_LIMIT;    
    let titlesArr = servicesOffered.filter((service) => service.selected === true).map(item => item.title)
    getServices(
      selectedCountry,
      selectedState,
      selectedCity,
      titlesArr,
      PAGE_LIMIT,
      pageOffset
    ).then((servicesData) => {
      let tempCardData = []
      for (let service of servicesData.data) {
        tempCardData.push({
          title: service.attributes.field_service_provider_name,
          phoneNumber: service.attributes.field_telephone_number,
          email: service.attributes.field_email_id,
          location:
            service.attributes.field_city +
            ", " +
            service.attributes.field_state,
          tag: service.attributes.title,
        })
      }
      setCardData(tempCardData)
      setTotalCardItems(servicesData.meta.count)
    })
  }, [currentPage])

  useEffect(() => {
    getFacets().then((data) => {
      setCountries(data.data.field_country)
    })
  }, [])

  return (
    <div>
      <div className="flex flex-col pb-16">
        <div className="access-services-wrapper px-28 pt-24 bg-[#ffe5f0] text-white font-univers">
          <div className="">
            <div className="breadcrumb flex items-center gap-3 pb-2">
              <Image
                width={24}
                height={24}
                src={"/assets/images/breadcrumb-home.png"}
                alt="breadcrumb"
              />
              <RightAngular stroke="#000" width={16} height={16} />
              <span className="text-[#31020e] text-m pt-1">Find Services</span>
            </div>
            <h1
              className={`text-[#333] text-4xl font-semibold ${laila.className}`}
            >
              Find Services
            </h1>
            <h4 className={`text-[#5a6872] text-base`}>
              Find assistance for your various problems from nearby service
              providers in your locality.
            </h4>
          </div>
        </div>
        <div className="search-wrapper flex gap-6 px-28">
          <div className="w-1/3 flex flex-col">
            <label htmlFor="country" className="text-[#333] text-base">
              Country
            </label>
            <select
              name="country"
              id="country"
              className="py-[14px] px-4 rounded-full appearance-none"
              onChange={handleCountryChange}
              value={selectedCountry}
            >
              <option value="">Select Country</option>
              {countries.map((country, index) => (
                <option key={index} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
          <div className="w-1/3 flex flex-col">
            <label htmlFor="state" className="text-[#333] text-base">
              State
            </label>
            <select
              name="state"
              id="state"
              className="py-[14px] px-4 rounded-full appearance-none"
              value={selectedState}
              onChange={handleStateChange}
            >
              <option value="">Select State</option>
              {states.map((state, index) => (
                <option key={index} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>
          <div className="w-1/3 flex flex-col">
            <label htmlFor="city" className="text-[#333] text-base">
              City
            </label>
            <select
              name="city"
              id="city"
              className="py-[14px] px-4 rounded-full appearance-none"
              value={selectedCity}
              onChange={handleCityChange}
            >
              <option value="">Select City</option>
              {cities.map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="services-offered flex px-28 pb-24 gap-8">
        <aside className="w-3/12">
          <div
            onClick={toggleAccordion}
            className="accordion-header cursor-pointer bg-[#f7265d] text-white px-4 py-[12px] text-l rounded-t-md flex justify-between items-center"
          >
            <span>Services offered</span>
            <button className="rotate-180" ref={accordionButtonRef}>
              <DownArrow fill="white" width={16} height={16} />
            </button>
          </div>
          <div ref={accordionRef} className="accordion-body bg-[#feebf1]">
            {servicesOffered.map((item, index) => (
              <div className="py-2 px-4 flex justify-between gap-2" key={index}>
                <label htmlFor={item.title} className="text-[#333] text-base">
                  {item.title}
                </label>
                <input
                  id={item.title}
                  type="checkbox"
                  checked={item.selected}
                  value={item.title}
                  onChange={handleServiceChange}
                />
              </div>
            ))}
          </div>
        </aside>
        <div className="w-9/12">
          {cardData.length === 0 && (
            <div className="flex flex-col items-center justify-center">
              <h1 className={`${laila.className} text-[48px] text-center`}>
                Seems like services are not available in your city or region
              </h1>
              <Image
                width={500}
                height={400}
                src="/assets/images/need-help-no-results.png"
                alt="banner-slider"
              />
              <p className="text-xl text-center text-[#68737d]">
                We apologize for the inconvenience, but the services are not
                available in your area. You can select some different region and
                city to look at services available there.
              </p>
              <a
                href="/en/home"
                className="py-[14px] px-5 bg-primary text-white rounded-md text-l mt-8 inline-block leading-[18px]"
              >
                Take me to homepage
              </a>
            </div>
          )}
          <div className="grid grid-cols-2 gap-6">
            {cardData.map((item, index) => {
              return (
                <AccessServicesCard
                  key={index}
                  className={
                    "border p-6 rounded-xl border-[#c2c8cc] hover:border-[#f7265d]"
                  }
                  phoneNumber={item.phoneNumber}
                  email={item.email}
                  title={item.title}
                  tag={item.tag}
                  location={item.location}
                />
              )
            })}
          </div>

          {totalCardItems > 10 && (
            <div className="pagination-wrapper flex justify-between mt-10">
              <button
                onClick={() => handlePrevNext('decrement')}
                className="p-[13px] border border-[#5a6872] rounded-md text-m">
                Previous
              </button>
              <div className="flex overflow-x-auto">
                {Array.from({length: Math.ceil(totalCardItems / 10)}, (_, index) => {
                  return (
                    <button
                      key={index}
                      value={index + 1}
                      onClick={handlePageChange}
                      className={
                        currentPage - 1 === index
                          ? "bg-[#feebf1] text-[#f7265d] rounded-full text-m px-5"
                          : " rounded-full text-m px-5"
                      }
                    >
                      {index + 1}
                    </button>
                  )
                })}
              </div>
              <button
                onClick={() => handlePrevNext('increment')}
                className="p-[13px] border border-[#5a6872] rounded-md text-m">
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
