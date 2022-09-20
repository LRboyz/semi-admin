import 'windi.css';
import '@/styles/globals.scss';

import { AppProps } from 'next/app';
import { NextPage } from 'next';
import NProgress from 'nprogress';

import { DefaultSeo } from 'next-seo';
import { LayoutAdapter } from '@/layouts';
import { AppStoreProvider } from '@/store';
import useProgress from '@/hooks/useProgress';

import SEO from '../../next-seo.config.json';
import { AuthProvider } from '@/context/AuthContext';

// NProgress configuration
NProgress.configure({ showSpinner: false });

// Extended component properties
type NextPageWithLayout = NextPage & {};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  useProgress(
    () => NProgress.start(),
    () => NProgress.done(),
  );

  return (
    <AuthProvider>
      <AppStoreProvider>
        <DefaultSeo {...SEO} />
        <LayoutAdapter {...pageProps}>
          <Component {...pageProps} />
        </LayoutAdapter>
      </AppStoreProvider>
    </AuthProvider>
  );
}
