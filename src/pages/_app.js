import Head from 'next/head';

import '../styles/globals.scss';

// This default export is required in a new `pages/_app.js` file.
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="description" content="Web site created using create-react-app" />
        <title>BlackJack</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
