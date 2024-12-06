
export const getFacets = async (country='', state='', city='') => {
  let facetsUrl = process.env.NEXT_PUBLIC_DRUPAL_BASE_URL + '/en/api/v1/find_services_facets';

  if (country !== '') {
    facetsUrl += '?filter[field_country]=' + country
  }
  if (state !== '' && country !== '') {
    facetsUrl += '&filter[field_state]=' + state
  }
  if (city !== '' && country !== '' && state !== '') {
    facetsUrl += '&filter[field_city]=' + city
  }

  let response = await fetch(facetsUrl);
  let data = await response.json();
  return data;
}

export const getServices = async (country='', state='', city='', titles: string[] = [], pageLimit=10, pageOffset=0) => {

  let url = process.env.NEXT_PUBLIC_DRUPAL_BASE_URL + '/en/jsonapi/index/find_services';

  if (country !== '') {
    url += '?filter[field_country]=' + country
  }
  if (state !== '' && country !== '') {
    url += '&filter[field_state]=' + state
  }
  if (city !== '' && country !== '' && state !== '') {
    url += '&filter[field_city]=' + city
  }
  if (titles.length > 0) {
    if (titles.length === 1) {
      url += '&filter[title]=' + titles[0]
    } else {
      url += '&filter[condition][group][conjunction]=OR';
      for (let i = 1; i <= titles.length; i++) {
        url += `&filter[condition][title${i}][condition]=title&filter[condition][title${i}][value]=${titles[i-1]}`;
      }
    }
  }

  url += '&page[limit]=' + pageLimit + '&page[offset]=' + pageOffset;

  let response = await fetch(url);
  let data = await response.json();
  return data;
}

