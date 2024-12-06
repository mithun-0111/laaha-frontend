import { useTranslations } from "next-intl"
import Image from "next/image"
import Link from "next/link"

export interface BreadcrumbsProps {
  items: {
    title: string
    url?: string
    icon?: string
  }[]
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const t = useTranslations()
  if (!items?.length) {
    return null
  }

  return (
    <nav className="py-4 text-text bg-shadow-gray rounded-lg my-5">
      <ol className="container flex px-4">
        <li className="flex items-center">
          <Link href="/" passHref legacyBehavior={true}>
            <a className="text-link">{"Home"}</a>
          </Link>

          <svg
                className="w-3 h-3 mx-1"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m13 17 5-5-5-5M6 17l5-5-5-5" />
            </svg>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center leading-none truncate text-m">
            {
              item.icon ? (
                <>
                  <Image width={24} height={24} src={item.icon} className="ms-2 rounded-full me-2 w-6 h-6" alt="icon" />
                </>
              ) : ''
            }
            {item.url ? (
              <Link href={item.url} passHref legacyBehavior={true}>
                <a className="text-link">{item.title}</a>
              </Link>
            ) : (
              item.title
            )}
            {index !== items.length - 1 && (
              <svg
                className="w-3 h-3 mx-1"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m13 17 5-5-5-5M6 17l5-5-5-5" />
              </svg>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
