import Head from "next/head";
import Footer from "../Footer";
import NavBar from "../Navbar";
import style from "./layout.module.css";

function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Bread | Presale</title>

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />

        <meta
          content="Freshly baked goodness! "
          name="description"
        />
        <meta content="Bread" property="og:title" />
        <meta
          content="Freshly baked goodness! "
          property="og:description"
        />
        <meta content="/banner.jpg" property="og:image" />
        <meta content="Bread" property="twitter:title" />
        <meta
          content="Freshly baked goodness! "
          property="twitter:description"
        />
        <meta
          content="/banner.jpg"
          property="twitter:image"
        />
        <meta property="og:type" content="website" />
        <meta content="summary_large_image" name="twitter:card" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <div className={style.Layout}>
        <NavBar />
        <main className={style.content}>{children}</main>
        <Footer />
      </div>
    </>
  );
}

export default Layout;
