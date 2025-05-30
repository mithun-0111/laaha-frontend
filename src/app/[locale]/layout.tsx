import { NextIntlClientProvider, useMessages } from "next-intl"
import Header from "@/src/components/Header"
import "@/src/styles/globals.css"
import Footer from "@/src/components/Footer"
import GlobalSticky from "@/src/components/GlobalSticky"
import { rtlLocales } from "@/site.config"
import { SignupProvider } from "@/src/contexts/SignUpProvider"
import { getUid, getUserAvatar, getUserName, getUserRole } from "@/src/lib/auth"
import AutoLogout from "@/src/components/AutoLogout"
import { TranslationsProvider } from "@/src/contexts/TranslationsContext"
import MetaTags from "@/src/components/Metatags"
import ClientWrapper from "@/src/lib/queryclient"
import { ValidCountryUserProvider } from "@/src/contexts/ValidCountryUser"
import GoogleAnalytics from "@/src/components/GoogleAnalytics"

const RootLayout = ({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: {
    locale: string
  }
}) => {
  const messages = useMessages()
  const uName = getUserName()
  const avatarUrl = getUserAvatar()
  const uid = getUid()
  const userRole = getUserRole()

  return (
    <html lang={locale} dir={rtlLocales.includes(locale) ? "rtl" : "ltr"}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <TranslationsProvider>
          <MetaTags locale={locale} />
        </TranslationsProvider>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href={`${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}`} crossOrigin="anonymous" />
        <link rel="preconnect" href={`https://fonts.googleapis.com`} crossOrigin="anonymous"/>
        <meta name="robots" content="index, follow" />
        {/* <GoogleAnalytics /> */}
      </head>
      <body suppressHydrationWarning={true}>

        <NextIntlClientProvider locale={locale} messages={messages}>
          <TranslationsProvider>
            <ClientWrapper>
              <ValidCountryUserProvider>
                <SignupProvider uName={uName || ""} avatarUrl={avatarUrl || ''} uid={uid || ''} userRole={userRole || ''}>
                  <Header />
                  <main className="min-h-[400px]">
                    {children}

                    <GlobalSticky />
                  </main>
                  <Footer />
                  <AutoLogout />
                </SignupProvider>
              </ValidCountryUserProvider>
            </ClientWrapper>
          </TranslationsProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

export default RootLayout
