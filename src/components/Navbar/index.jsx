import style from "./nav-bar.module.css";
import BreadLogo from "@/assets/images/bread-logo.png";
import WalletManager from "../WalletManager";
import { useState } from "react";
import { useEthers, shortenIfAddress } from "@usedapp/core";
import { useBreadDapp } from "@/providers/BreadProvider/BreadDappProvider";

function NavBar() {
  const { account } = useEthers();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { isChainError } = useBreadDapp();

  function closeModal() {
    setIsDialogOpen(false);
  }

  function openModal() {
    setIsDialogOpen(true);
  }
  return (
    <>
      <div className={style.container}>
        <div className={style.content}>
          <div className={style.nav__left}>
            <a href="https://app.breadarb.finance"><img src={BreadLogo.src} alt="bread-logo" className="w-32" /></a>
          </div>
          <div className={style.nav__right}>
            <button className={`${style.connect_wallet} ${isChainError && "text-red-600 font-bold"}`} onClick={openModal}>
              {account ? isChainError ? "Wrong Network" : shortenIfAddress(account) : "Connect Wallet"}
            </button>
          </div>
        </div>
      </div>
      <WalletManager isOpen={isDialogOpen} onCloseModal={closeModal} />
    </>
  );
}

export default NavBar;
