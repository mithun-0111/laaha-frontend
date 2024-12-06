import { NextIntlClientProvider, useMessages } from 'next-intl';
import Header from '@/src/components/Header';
import Container from '@/src/components/Container';
import '@/src/styles/globals.css';
import Menu from '@/src/components/Menu';
import Footer from '@/src/components/Footer';
import GlobalSticky from '@/src/components/GlobalSticky';
import { rtlLocales } from '@/site.config';

const RootLayout = ({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}) => {
  const messages = useMessages();

  return (
    <html lang={locale}  dir={rtlLocales.includes(locale) ? 'rtl' : 'ltr'}>
      <body suppressHydrationWarning={true}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <div>
            <Header>
              <Menu />
            </Header>
            <main>
              <div>{children}</div>
              <GlobalSticky />
            </main>
            <Footer />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;
