import siteConfig from "@/site.config";
import { getParams } from "./getparams";
import { drupal } from "./drupal";

const fetchMenuItems = async (menuName: string, locale: string) => {
  const defaultLocale = siteConfig.defaultLocale;

  const menuOpts = {
    params: getParams("menu_link_content--menu_link_content").getQueryObject(),
    locale: locale,
    defaultLocale: defaultLocale,
    withAuth: {
      clientId: process.env.NEXT_PUBLIC_DRUPAL_CLIENT_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_DRUPAL_CLIENT_SECRET as string,
    },
  };

  try {
    const menuItems = await drupal.getMenu(menuName, menuOpts);
    return menuItems.items;
  } catch (error) {
    console.error(`Error fetching menu items: ${error}`);
    return [];
  }
};

export const getMenuItems = async (locale: string) => {

  const mainMenu = await fetchMenuItems("header-menu", locale);
  const quickLinks = await fetchMenuItems("quick-links", locale);
  const exploreLinks = await fetchMenuItems("explore-menu", locale);
  const footerBottom = await fetchMenuItems("footer-last-menu", locale);

  return {
    menus: {
      main: mainMenu,
    },
    footer: {
      quickLinks,
      exploreLinks,
      footerBottom
    },
  };
};

