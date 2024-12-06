const BASE_URL = process.env.NEXT_PUBLIC_DRUPAL_BASE_URL;

export const getContentCurationData = async (name:string, locale:string, pageNumber:number, filterType:string, sortBy:string) => {
  try {
    const response = await fetch(`${BASE_URL}/${locale}/api/v1/content_curation/${name}?page=${pageNumber}${filterType ? `&type=${filterType}`: ''}&sort_bef_combine=${sortBy}`);
    const data = await response.json();
    return data;
  } catch(error) {
    console.error(error);
  }
}

export const getResourceData = async (locale:string, catID: any, pageNumber:number, filterType:string, sortBy:string, searchParam: string) => {
  try {
    const validCatIDs = catID.filter((id:any) => id);
    const categoryParam = validCatIDs.length > 0 ? validCatIDs.join(',') : '';
    const response = await fetch(`${BASE_URL}/${locale}/api/v1/all_resources_page?${searchParam ? `title=${searchParam}`: ''}${categoryParam ? `&category=${categoryParam}`: ''}&page=${pageNumber}${filterType ? `&type=${filterType}`: ''}&sort_bef_combine=${sortBy}`);
    const data = await response.json();
    return data;
  } catch(error) {
    console.error(error);
  }
}

export const getCategoriesData = async (locale: string, tid:number) => {
  try {
    const res = await fetch(`${BASE_URL}/${locale}/api/v1/related-subcategories/term/${tid}`);

    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await res.json();
    return data;

  } catch(error) {
    console.error(error);
  }
}
 