import { getMenuItems } from "@/src/lib/globalElements";
import { getLocale } from "next-intl/server";
import Link from "next/link";

const FooterBottom = async () => {
  const locale = await getLocale();
  const footerBottomMenu = await getMenuItems(locale);
  const { footerBottom } = footerBottomMenu.footer;

  return (
    <div className="footer-bottom-menu mb-4 lg:mb-0">
      <ul className="list-none flex flex-wrap items-center">
        {footerBottom.map((item) => (
          <li className="me-5 lg:me-10" key={item.id}>
            <Link className="text-primary lg:text-default-black" href={item.url}> {item.title} </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default FooterBottom