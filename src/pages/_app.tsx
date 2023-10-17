import '@/styles/globals.css';

import React from 'react';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';

function App({ Component, pageProps }: AppProps) {
  // suppress useLayoutEffect warnings when running outside a browser
  if (!process.browser) React.useLayoutEffect = React.useEffect;

  return (
    <ThemeProvider attribute="class">
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
export default App;
