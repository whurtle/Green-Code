import '../styles/globals.css'
import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import Head from 'next/head';
import createEmotionCache from '../src/createEmotionCache'
import { EmotionCache, CacheProvider } from '@emotion/react'
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../src/theme'
import Layout from '../src/components/layout/layout';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const clientSideEmotionCache = createEmotionCache();

interface MyAppPropsWithLayout extends AppPropsWithLayout {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const getLayout = Component.getLayout ?? ((page) => page)

  return getLayout(
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Green Code</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="icon" href="/data/logo.png" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </CacheProvider>
  )
}
