// import createIntlMiddleware from "next-intl/middleware"
// import { locales } from "@/navigation" // Your locales
// import { NextResponse } from "next/server"
// import { decrypt } from "@/src/lib/session"
// import { deployCountries } from "@/site.config"

// // Create the internationalization middleware
// const intlMiddleware = createIntlMiddleware({
//   locales,
//   defaultLocale: "en",
//   localeDetection: true,
// })

// // Middleware function
// export async function middleware(request) {
//   const acceptLanguage = request.headers.get("accept-language") || "en"
//   const countryCode = request.headers.get("CF-IPCountry") || "VE"
//   let deployedCountryCodes = Object.keys(deployCountries)
//   let localeValue

//   const preferredLocales = acceptLanguage
//     .split(",")
//     .map((lang) => lang.split(";")[0].trim())
//     .filter((lang) => locales.includes(lang))

//   if (deployedCountryCodes.includes(countryCode)) {
//     let defaultLanCode = deployCountries[countryCode]

//     if (preferredLocales.includes(defaultLanCode)) {
//       localeValue =
//         preferredLocales.length > 0 ? preferredLocales[0] : locales[0]
//     } else {
//       localeValue = defaultLanCode
//     }
//   } else {
//     localeValue = preferredLocales.length > 0 ? preferredLocales[0] : locales[0]
//   }

//   const response = intlMiddleware(request)

//   // Set country code and browser language code in cookies and headers
//   response.cookies.set("COUNTRY_CODE", countryCode, {
//     path: "/",
//     httpOnly: false,
//   })
//   response.cookies.set("BROWSER_LANG_CODE", localeValue, {
//     path: "/",
//     httpOnly: false,
//   })

//   response.cookies.set("NEXT_LOCALE", localeValue, {
//     path: "/",
//     httpOnly: false,
//   })

//   response.headers.set("X-Country-Code", countryCode)
//   response.headers.set("X-Browser-Lang-Code", localeValue)

//   // Check for session cookie
//   const session = request.cookies.get("session")?.value

//   if (session) {
//     try {
//       const payload = await decrypt(session)

//       // Check if ACCESS_TOKEN and REFRESH_TOKEN are already set in the request cookies
//       const existingAccessToken = request.cookies.get("ACCESS_TOKEN")?.value
//       const existingRefreshToken = request.cookies.get("REFRESH_TOKEN")?.value

//       // Add user data to the response headers
//       response.headers.set("x-user-id", payload?.payload?.userName || "")
//       response.headers.set("x-avatar-url", payload?.payload.avatarUrl || "")
//       response.headers.set("x-uid", payload?.payload.userId || "")
//       response.headers.set("x-user-role", payload?.payload.userRole)

//       // Only set the ACCESS_TOKEN cookie if it's not already set
//       if (!existingAccessToken) {
//         response.cookies.set("ACCESS_TOKEN", payload?.payload.accessToken, {
//           path: "/",
//           httpOnly: false,
//           secure: true,
//           expires: new Date(Date.now() + 15 * 60 * 1000), // expires in 15 minutes
//         })
//       }

//       // Only set the REFRESH_TOKEN cookie if it's not already set
//       if (!existingRefreshToken) {
//         response.cookies.set("REFRESH_TOKEN", payload?.payload.refreshToken, {
//           path: "/",
//           httpOnly: false,
//         })
//       }
//     } catch (error) {
//       console.error("Error decrypting session:", error)
//     }
//   }

//   // Redirection logic
//   const pathname = request.nextUrl.pathname
//   const localeFromPath = pathname.split("/")[1] // Extract locale from path
//   const isLocaleValid = locales.includes(localeFromPath)

//   // If locale is valid and the path doesn't contain additional segments, redirect to /[locale]/home
//   if (isLocaleValid && pathname.split("/").length === 2) {
//     // The path is something like /[locale], so we redirect to /[locale]/home
//     const url = request.nextUrl.clone()
//     url.pathname = `/${localeFromPath}/home` // Redirect to /[locale]/home
//     return NextResponse.redirect(url)
//   }

//   // If the path is just the root '/', redirect to /home
//   if (pathname === "/") {
//     const url = request.nextUrl.clone()
//     url.pathname = `/home`
//     return NextResponse.redirect(url)
//   }

//   return response
// }

// export const config = {
//   matcher: [
//     "/((?!api|_next|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|assets).*)",
//   ],
// }

import createIntlMiddleware from "next-intl/middleware"
import { locales } from "@/navigation" // Your locales
import { NextResponse } from "next/server"
import { decrypt } from "@/src/lib/session"
import { deployCountries } from "@/site.config"

// Create the internationalization middleware with custom detection
const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale: "en",
  localeDetection: false, // Disable built-in detection
})

export async function middleware(request) {
  const { pathname } = request.nextUrl

  const acceptLanguage = request.headers.get("accept-language") || "en"
  const countryCode = request.headers.get("CF-IPCountry") || "IND"
  let deployedCountryCodes = Object.keys(deployCountries)
  let localeValue

  const preferredLocales = acceptLanguage
    .split(",")
    .map((lang) => lang.split(";")[0].trim())
    .filter((lang) => locales.includes(lang))

    if (deployedCountryCodes.includes(countryCode)) {
    let defaultLanCode = deployCountries[countryCode]

    localeValue = preferredLocales.includes(defaultLanCode)
      ? preferredLocales[0]
      : defaultLanCode
  } else {
    localeValue = preferredLocales.length > 0 ? preferredLocales[0] : "en"
  }

  // 2. Handle root path redirection
  if (pathname === "/") {
    const url = request.nextUrl.clone()
    url.pathname = `/${localeValue}/home`
    return NextResponse.redirect(url)
  }

  // 3. Handle paths with no locale prefix
  const firstPathSegment = pathname.split("/")[1]
  if (!locales.includes(firstPathSegment)) {
    // Add the determined locale to the path
    const url = request.nextUrl.clone()
    url.pathname = `/${localeValue}${pathname}`
    return NextResponse.redirect(url)
  }

  // 4. Handle paths with locale but no additional segments
  if (locales.includes(firstPathSegment)) {
    const pathSegments = pathname.split("/").filter(Boolean)
    if (pathSegments.length === 1) {
      // Only locale present
      const url = request.nextUrl.clone()
      url.pathname = `/${firstPathSegment}/home`
      return NextResponse.redirect(url)
    }
  }

  // 5. Process with intlMiddleware
  const response = intlMiddleware(request)

  // 6. Set cookies and headers
  response.cookies.set("COUNTRY_CODE", countryCode, {
    path: "/",
    httpOnly: false,
  })
  response.cookies.set("BROWSER_LANG_CODE", localeValue, {
    path: "/",
    httpOnly: false,
  })
  
  response.cookies.set("NEXT_LOCALE", firstPathSegment, {
    path: "/",
    httpOnly: false,
  })

  response.headers.set("X-Country-Code", countryCode)
  response.headers.set("X-Browser-Lang-Code", localeValue)

  // Check for session cookie
  const session = request.cookies.get("session")?.value

  if (session) {
    try {
      const payload = await decrypt(session)

      // Check if ACCESS_TOKEN and REFRESH_TOKEN are already set in the request cookies
      const existingAccessToken = request.cookies.get("ACCESS_TOKEN")?.value
      const existingRefreshToken = request.cookies.get("REFRESH_TOKEN")?.value

      // Add user data to the response headers
      response.headers.set("x-user-id", payload?.payload?.userName || "")
      response.headers.set("x-avatar-url", payload?.payload.avatarUrl || "")
      response.headers.set("x-uid", payload?.payload.userId || "")
      response.headers.set("x-user-role", payload?.payload.userRole)

      // Only set the ACCESS_TOKEN cookie if it's not already set
      if (!existingAccessToken) {
        response.cookies.set("ACCESS_TOKEN", payload?.payload.accessToken, {
          path: "/",
          httpOnly: false,
          secure: true,
          expires: new Date(Date.now() + 15 * 60 * 1000), // expires in 15 minutes
        })
      }

      // Only set the REFRESH_TOKEN cookie if it's not already set
      if (!existingRefreshToken) {
        response.cookies.set("REFRESH_TOKEN", payload?.payload.refreshToken, {
          path: "/",
          httpOnly: false,
        })
      }
    } catch (error) {
      console.error("Error decrypting session:", error)
    }
  }

  return response
}

export const config = {
  matcher: [
    "/((?!api|_next|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|assets).*)",
  ],
}
