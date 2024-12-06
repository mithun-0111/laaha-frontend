import { defaultLocale } from "@/site.config";
import { drupal } from "@/src/lib/drupal";
import { getParams } from "@/src/lib/getparams";
import { getLocale } from "next-intl/server";

const SiteDesc = async () => {
  const locale = await getLocale();
  let siteDesc;

  try {
    siteDesc = await drupal.getResource('block_content--footer_contact_information',
      '190696af-e4d3-43aa-a303-d207fdcd7f76', {
        params: getParams('block-basic', "block_content--footer_contact_information").getQueryObject(),
        locale: locale,
        defaultLocale: defaultLocale,
        withAuth: {
          clientId: process.env.NEXT_PUBLIC_DRUPAL_CLIENT_ID as string,
          clientSecret: process.env.NEXT_PUBLIC_DRUPAL_CLIENT_SECRET as string,
        }
    });
  } catch (error) {
    console.error("Error fetching site description:", error);
    siteDesc = { body: { value: "<p>Error loading site description.</p>" } }; // Fallback message
  }

  return (
    <div dangerouslySetInnerHTML={{ __html: siteDesc.body.value }} />
  );
};

export default SiteDesc;
