import { useTranslations } from "@/src/contexts/TranslationsContext"
import { CloseIcon } from "@/src/lib/icons"
import { useLocale } from "next-intl"

const handleExit = () => {
  window.location.href = "https://www.google.com"
}

const ExitButton = () => {
  const { translations } = useTranslations()
  const locale = useLocale()

  return (
    <button
      className="py-3 px-5 text-white font-bold btn-secondary rounded inline-flex items-center"
      onClick={handleExit}
      type="button"
      aria-label={
        translations?.[locale]?.exit_webiste || "Exit and go to Google"
      }
    >
      <div className="me-3 -mt-0.5">
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="7 7 10 10" fill="#ffffff">
          <path d="M16 8L8 16M8.00001 8L16 16" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
        </svg>
      </div>
      <span>{translations?.[locale]?.exit_webiste || "EXIT WEBSITE"}</span>
    </button>
  )
}

export default ExitButton
