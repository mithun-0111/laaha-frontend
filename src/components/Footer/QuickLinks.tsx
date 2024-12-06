import { getMenuItems } from "@/src/lib/globalElements";
import { useLocale, useTranslations } from "next-intl";
import { getLocale, getTranslations } from "next-intl/server";
import Link from "next/link";

const QuickLinks = async () => {
  const t = await getTranslations();

  const locale = await getLocale();
  const quickLinksMenu = await getMenuItems(locale);
  const { quickLinks } = quickLinksMenu.footer;

  return (
    <>
      {
        quickLinks.length > 0 && (
          <>
          <div className="quick-links flex-[0_0_50%]">
            <div className="mb-6 text-m text-color-neutral">{t('Quick Links')}</div>
            <ul className="ps-0 list-none">
              {quickLinks.map((item) => (
                <li className="mb-2" key={item.id}>
                  <Link href={item.url}> {item.title} </Link>
                </li>
              ))}
            </ul>
          </div>
        </>
        )
      }
    </>
  )
}

export default QuickLinks