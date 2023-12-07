import "../styles/globals.css";
import Head from "next/head";
import Layout from "@/components/Layout/Layout";
import { UserProvider } from "@/hooks/useUser";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
      </Head>
      <UserProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserProvider>
    </>
  );
}

export default MyApp;
