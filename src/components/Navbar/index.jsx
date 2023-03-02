import style from "./nav-bar.module.css";
import BreadLogo from "@/assets/images/bread-logo.png";

function NavBar() {
  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={style.nav__left}>
          <img src={BreadLogo.src} alt="bread-logo" className="w-32" />
        </div>
        <div className={style.nav__right}>
          <button className={style.connect_wallet}>
            Connect Wallet
          </button>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
