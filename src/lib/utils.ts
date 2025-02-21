import { Laila } from 'next/font/google'

export function formatDate(input: string): string {
  const date = new Date(input)
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

export function absoluteUrl(input: string) {
  return `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}${input}`
}

export const laila = Laila({ weight: ['300', '400', '600', '700'], subsets: ['latin'] })
