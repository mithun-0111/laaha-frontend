import { useLocale } from "next-intl";
import { laila } from "@/src/lib/utils";

export default function FindServices() {
  const locale = useLocale()
  console.log({ locale })
  return (
    <div className="find-services-wrapper px-28 bg-primary text-white py-6 font-univers">
      <div className="">
        <div className="find-services__content flex justify-between items-center">
          <div className="content__wrapper">
            <div className="description text-l">
              If you or someone needs help or faced violence, click here to find
              nearby services and learn how to connect with them
            </div>
          </div>
          <a
            href={`/${locale}/access-services`}
            className={`cta bg-[#ffbe21] text-black ${laila.className} text-l font-semibold py-4 px-6 rounded-md`}
          >
            Find Services
          </a>
        </div>
      </div>
    </div>
  )
}
