"use client"
import Script from 'next/script';

const GoogleAnalytics = () => {
  return (
    <>
      <Script 
        strategy='lazyOnload' 
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-DDZ4T7SHN0" 
      />
      <Script id="google-analytics" strategy='lazyOnload'>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-DDZ4T7SHN0', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  );
};

export default GoogleAnalytics;