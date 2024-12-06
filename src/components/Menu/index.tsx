import { getMenuItems } from "@/src/lib/globalElements";
import { getLocale } from "next-intl/server";
import MenuItem from "./MenuItem";

export default async function Menu() {
  const locale = await getLocale();
  const mainMenu = await getMenuItems(locale);
  const { main } = mainMenu.menus;

  return (
    <nav className="hidden lg:block pt-10 lg:pt-0">
      <MenuItem menuItems={main} />
    </nav>
  );
}
