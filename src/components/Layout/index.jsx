import Head from "next/head";
import Footer from "../Footer";
import NavBar from "../Navbar";
import style from "./layout.module.css";

function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Bread | Presale</title>
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
