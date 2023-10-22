import '@/styles/globals.css';

import React from 'react';
import type { AppProps } from 'next/app';
import { SWRConfig } from 'swr';
import { StyleProviders } from '@/styles/StyleProviders';

function App({ Component, pageProps }: AppProps) {
  // suppress useLayoutEffect warnings when running outside a browser
  if (!process.browser) React.useLayoutEffect = React.useEffect;

  return (
    <SWRConfig value={{ revalidateIfStale: false, revalidateOnFocus: false }}>
      <StyleProviders>
        <Component {...pageProps} />
      </StyleProviders>
    </SWRConfig>
  );
}
export default App;
