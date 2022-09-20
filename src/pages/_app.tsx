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
import { ReactNode } from 'react';
import GuestGuard from '@/components/Auth/guestGuard';
import AuthGuard from '@/components/Auth/authGuard';
import FallbackSpinner from '@/components/Spinner';

// NProgress configuration
NProgress.configure({ showSpinner: false });

// Extended component properties
type NextPageWithLayout = NextPage & {
  authGuard: boolean;
  guestGuard: boolean;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

type GuardProps = {
  authGuard: boolean;
  guestGuard: boolean;
  children: ReactNode;
};

const Guard = ({ children, authGuard, guestGuard }: GuardProps) => {
  console.log(children, authGuard, guestGuard  ,"惊喜")
  if (guestGuard) {
    return <GuestGuard fallback={<FallbackSpinner />}>{children}</GuestGuard>
  } else if (!guestGuard && !authGuard) {
    return <>{children}</>;
  } else {
    return <AuthGuard fallback={<FallbackSpinner/>}>{children}</AuthGuard>
  }
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const authGuard = Component.authGuard ?? true;
  const guestGuard = Component.guestGuard ?? false;

  useProgress(
    () => NProgress.start(),
    () => NProgress.done(),
  );

  return (
    <AuthProvider>
      <AppStoreProvider>
        <DefaultSeo {...SEO} />
        <Guard guestGuard={guestGuard} authGuard={authGuard}>
          <LayoutAdapter {...pageProps}>
            <Component {...pageProps} />
          </LayoutAdapter>
        </Guard>
      </AppStoreProvider>
    </AuthProvider>
  );
}
