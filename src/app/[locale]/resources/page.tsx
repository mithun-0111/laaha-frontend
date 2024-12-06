"use client";
export const runtime = 'edge'

import GridCard from "@/src/components/Cards/GridCard";
import { laila } from "@/src/lib/utils";
import { getResourceData } from "@/src/lib/apis";
import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import Pagination from "@/src/components/Pagination";
import "./resources.scss";
import { Filter, SearchIcon } from "@/src/lib/icons";
import { ResourceListingShimmer } from "@/src/components/Shimmer";

interface ContentParam {
  pageNumber: number;
  sortBy: string;
  filterType: string;
  catID: string[];
  searchParam: string
}

interface ResourceData {
  "all-resources-view-block"?: {
    pagination?: {
      items_per_page: number;
      total_items: number;
    };
    category_hierarchical_terms?: {
      [key: string]: {
        tid: string;
        child_terms: {
          [key: string]: {
            tid: string;
          };
        };
      };
    };
    data?: any[];
  };
}

const ResourcePage = () => {
  const initialData: ContentParam = {
    pageNumber: 0,
    sortBy: "created_DESC",
    filterType: "",
    catID: [],
    searchParam: '',
  };

  const locale = useLocale();
  const t = useTranslations();

  const [resourceData, setResourceData] = useState<ResourceData>({});
  const [contentParam, setContentParam] = useState<ContentParam>(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalItems, setTotalItems] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(0);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<{ [key: string]: boolean }>({});
  const [showFilters, setShowFilters] = useState(false);

  const tabs = [
    { name: "All", module_type: "" },
    { name: "Modules", module_type: "scorm" },
    { name: "Videos", module_type: "video" },
    { name: "Podcasts", module_type: "podcast" },
  ];

  const [selectedTab, setSelectedTab] = useState<string>(tabs[0].module_type);
  const { pageNumber, catID, filterType, sortBy, searchParam } = contentParam;

  const handleClick = (module_type: string) => {
    setSelectedTab(module_type);
    setContentParam((prev) => ({ ...prev, filterType: module_type, pageNumber: 0 }));
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const sortByValue = event.target.value;
    setContentParam((prev) => ({
      ...prev,
      sortBy: sortByValue,
      pageNumber: 0,
    }));
  };

  const handleCategoryClick = (id: string, checked: boolean, parentId?: string, parentName?: string) => {
    setContentParam((prev) => ({
      ...prev,
      catID: checked ? [...prev.catID, id] : prev.catID.filter((catId) => catId !== id),
    }));

    setSelectedCategories((prev) => {
      const newSelection = { ...prev };

      if (checked) {
        newSelection[parentId || id] = true;
      } else if (parentId) {
        const parentSubcategories = document.querySelectorAll<HTMLInputElement>(
          `input[data-parent-id="${parentId}"]:checked`
        );
        if (parentSubcategories.length === 0) {
          delete newSelection[parentId];
        }
      } else {
        delete newSelection[id];
      }

      return newSelection;
    });
  };

  const handleMainCatClick = (categoryId: string) => {
    setExpandedCategory((prev) => (prev === categoryId ? null : categoryId));
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setContentParam((prev) => ({
      ...prev,
      pageNumber: page - 1,
    }));
  };

  const handleChipClose = (parentId: string) => {
    setSelectedCategories((prev) => {
      const newSelection = { ...prev };
      delete newSelection[parentId];
      return newSelection;
    });

    const parentCheckbox = document.getElementById(parentId) as HTMLInputElement;
    if (parentCheckbox) {
      parentCheckbox.checked = false;
    }

    const subcategoryCheckboxes = document.querySelectorAll<HTMLInputElement>(
      `input[data-parent-id="${parentId}"]`
    );
    subcategoryCheckboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });

    setContentParam((prev) => ({
      ...prev,
      catID: prev.catID.filter(
        (catId) =>
          ![parentId, ...Array.from(subcategoryCheckboxes).map((cb) => cb.id)].includes(catId)
      ),
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      if (locale) {
        try {
          const resource = await getResourceData(
            locale as string,
            catID,
            pageNumber,
            filterType,
            sortBy,
            searchParam
          );
          setResourceData(resource.data);

          const pagination = resource.data?.["all-resources-view-block"]?.pagination;
          if (pagination) {
            setItemsPerPage(pagination.items_per_page);
            setTotalItems(pagination.total_items);
          }
        } catch (error) {
          console.error(error);
          setError("Failed to fetch resources");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [locale, contentParam]);

  if (loading) return <ResourceListingShimmer />;
  if (error) return <div>Error: {error}</div>;

  const contentResourceBlocks = resourceData["all-resources-view-block"];
  const categoriesData = resourceData["all-resources-view-block"]?.category_hierarchical_terms;

  return (
    <div className="content-resources container mb-8">
      <div className="resources-block py-8 mb-6 flex flex-wrap gap-6 items-center">
        <div className={`resources-info 'mx-auto text-center'}`}>
          <h1 className={`title mb-2 tracking-tight ${laila.className}`}>
            {"All Resources"}
          </h1>
          <div className="resource-count">{totalItems} Resources available</div>
        </div>
      </div>

      <div className="content__wrapper flex flex-wrap">
        <div className={`sidebar lg:pr-8 flex-[0_0_100%] lg:flex-[0_0_25%]`}>
          <div className="resource-search relative">
            <input type="text" placeholder="Search..." onChange={
              (e) => setContentParam((prev) => (
                {
                  ...prev,
                  searchParam: e.target.value
                }
              )) }
              className="py-2 mb-8 pe-4 ps-9 w-full rounded-3xl border border-primary"
            />
            <span className="absolute left-2 top-2"><SearchIcon /></span>
          </div>
          <div className={`${showFilters ? 'block' : 'hidden'} lg:block fixed left-0 right-0 top-0 bottom-0 bg-white lg:bg-transparent z-50 h-full w-full lg:static`}>
            {
              Object.keys(selectedCategories).length > 0 &&
              <div className="selected-filters hidden lg:flex flex-wrap gap-2 mb-8">
                {Object.keys(selectedCategories).map((id) => {
                  let categoryName = "";

                  Object.entries(categoriesData ?? {}).forEach(([parentName, category]) => {
                    if (category.tid === id) {
                      categoryName = parentName;
                    } else if (category.child_terms) {
                      Object.entries(category.child_terms).forEach(([childName, child]) => {
                        if (child.tid === id) {
                          categoryName = childName;
                        }
                      });
                    }
                  });

                  return (
                    <div key={id} className="chip p-2 rounded-3xl inline-block bg-gray-200">
                      {categoryName}
                      <button className="close-icon ms-2 text-primary" onClick={() => handleChipClose(id)}>
                        ×
                      </button>
                    </div>
                  );
                })}
              </div>
            }

            <div className="filter-header lg:hidden flex justify-between bordre-b border-gray p-4">
              <h3 className="font-bold text-xl"> {'FILTERS'} </h3>
              <span onClick={() => location.reload()}> Clear All </span>
            </div>

            <div className="categories max-h-[calc(100vh-7rem)] lg:max-h-none overflow-y-auto">
              <ul className="list-none ps-0">
                {Object.entries(categoriesData ?? {}).map(([categoryName, categoryData]) => (
                  <li key={categoryData.tid} className="border first:rounded-t-xl last:rounded-b-xl border-gray-200">
                    <div className={`cat-item cursor-pointer relative w-full p-4 ${expandedCategory === categoryData.tid ? "active" : ""
                      }`} onClick={() => handleMainCatClick(categoryData.tid)}>
                      <input
                        type="checkbox"
                        className="me-3 cursor-pointer"
                        id={categoryData.tid}
                        onChange={(event) =>
                          handleCategoryClick(event.target.id, event.target.checked)
                        }
                      />
                      
                      <label htmlFor={categoryData.tid} className="cursor-pointer">
                        {categoryName}
                      </label>
                      <span className="w-2.5 h-2.5 border-t-2 border-r-2 transition-all duration-200 ease-in-out right-3 border-color-neutral border-solid inline-block absolute rotate-[135deg] right-0 top-5 transform"></span>
                    </div>

                    <ul
                      className={`list-none bg-gray-100 subcategories ${expandedCategory === categoryData.tid ? "expanded" : "collapsed"
                        }`}
                    >
                      {Object.entries(categoryData.child_terms).map(([childKey, child]) => (
                        <li key={childKey} className="p-4">
                          <input
                            type="checkbox"
                            className="me-3 cursor-pointer"
                            id={child.tid}
                            name={categoryName}
                            data-parent-id={categoryData.tid}
                            onChange={(event) =>
                              handleCategoryClick(
                                event.target.id,
                                event.target.checked,
                                categoryData.tid
                              )
                            }
                          />
                          <label htmlFor={child.tid} className="cursor-pointer">{childKey}</label>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex lg:hidden bg-white fixed border-t border-shadow-dark-gray w-full p-4 bottom-0 justify-between lg:hidden">
              <span onClick={() => setShowFilters(false)}> Cancel </span>
              <span onClick={() => setShowFilters(false)}> Apply </span>
            </div>
          </div>
        </div>

        <div className="content-area flex-[0_0_100%] lg:flex-[0_0_75%]">
          <div className="tabs mb-8 flex flex-wrap justify-between">
            <div className="tab-row flex gap-6 lg:gap-8 mb-4 lg:mb-0">
              {tabs.map((tab) => (
                <button
                  key={tab.module_type}
                  onClick={() => handleClick(tab.module_type)}
                  className={tab.module_type === selectedTab ? "active text-primary" : ""}
                >
                  {t(tab.name)}
                </button>
              ))}
            </div>
            <div className="filter-sections flex w-full lg:w-auto items-center justify-between">
              <div className="filter lg:hidden flex items-center" onClick={() => setShowFilters(true)}>
                <span className="me-1">Filters</span>
                <span><Filter/></span>
              </div>

              <div className="sort flex items-center gap-6">
                <span>{t("Sort By:")} </span>
                <select className="pe-8" onChange={handleChange} value={sortBy}>
                  <option value="created_DESC">{t("Latest")}</option>
                  <option value="created_ASC">{t("Oldest")}</option>
                </select>
              </div>

            </div>
          </div>

          <div className="content-cards flex flex-wrap gap-8 pb-12">
          {
            Array.isArray(contentResourceBlocks?.data) && contentResourceBlocks?.data.length > 0 ? (
              contentResourceBlocks.data.map((item, index) => (
                <GridCard
                  key={index}
                  className="lg:max-w-[calc(25%-1.5rem)] md:max-w-[calc(50%-1rem)] flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_25%]"
                  item={item}
                />
              ))
            ) : (
              <div className="view-empty">No Resources found.</div>
            )
          }

          </div>

          {totalItems > itemsPerPage && (
            <Pagination
              currentPage={currentPage}
              totalItems={totalItems}
              itemsPerPage={itemsPerPage}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ResourcePage;
