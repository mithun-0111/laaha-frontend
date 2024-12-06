import { defaultLocale } from "@/site.config";
import { drupal } from "@/src/lib/drupal";
import { getParams } from "@/src/lib/getparams";
import { getLocale } from "next-intl/server";

const Copyright = async () => {
  const locale = await getLocale();
  let copyright;

  try {
    copyright = await drupal.getResource('block_content--basic',
      'dbcfd0a8-aed6-4faf-a1c4-a2e52e37cbe7', {
      params: getParams('block-basic', "block_content--basic").getQueryObject(),
      locale: locale,
      defaultLocale: defaultLocale,
      withAuth: {
        clientId: process.env.NEXT_PUBLIC_DRUPAL_CLIENT_ID as string,
        clientSecret: process.env.NEXT_PUBLIC_DRUPAL_CLIENT_SECRET as string,
      }
    });
  } catch (error) {
    console.error("Error fetching copyright:", error);
    copyright = { body: { value: "<p>Error loading copyright information.</p>" } }; // Fallback message
  }

  return (
    <div dangerouslySetInnerHTML={{ __html: copyright.body.value }} />
  );
}

export default Copyright;
