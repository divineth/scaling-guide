import style from "./sale-widget.module.css";
import BreadLogo from "@/assets/images/bread-logo.png";
import { useEffect, useState } from "react";
import ProgressBar from "../ProgressBar";
import { useTotalCommitted } from "@/hooks/presale/useTotalCommited";
import { utils } from "ethers";
import ArrowUp from "@/assets/images/arrow-up.svg";
import ArrowDown from "@/assets/images/arrow-down.svg";
import { Arbitrum, useEtherBalance, useEthers } from "@usedapp/core";
import { onInputNumberChange, parseDecimals } from "@/utils/utils";
import { useBuyPresale } from "@/hooks/presale/useBuyPresale";
import { useUserContribution } from "@/hooks/presale/useUserContribution";
import Spinner from "@/assets/images/spinner.svg";
import Countdown, { zeroPad } from "react-countdown";
import { useSaleStatus } from "@/hooks/presale/useSaleStatus";
import WalletManager from "../WalletManager";
import { useBreadDapp } from "@/providers/BreadProvider/BreadDappProvider";
import { compareNonTokenWithToken } from "@/utils/utils";
import { useRouter } from "next/router";

function SaleWidget() {
  const [showDetails, setShowDetails] = useState(false);
  const [isPendingTx, setIsPendingTx] = useState(false);
  const [amount, setAmount] = useState("");
  const totalCommitted = useTotalCommitted();
  const saleStatus = useSaleStatus();
  const { send, state } = useBuyPresale();
  const { account } = useEthers();
  const ethBalance = useEtherBalance(account, { chainId: Arbitrum.chainId });
  const userContribution = useUserContribution(account);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const router = useRouter();

  function closeModal() {
    setIsDialogOpen(false);
  }

  function openModal() {
    setIsDialogOpen(true);
  }

  const endDate = 1679090400000;
  const { isChainError } = useBreadDapp();

  useEffect(() => {
    if (isPendingTx && state.status == "Success") {
      alert("Your purchase was successful");
      setIsPendingTx(false);
      setAmount("");
      router.reload();
    } else if (
      isPendingTx &&
      (state.status == "Fail" || state.status == "Exception")
    ) {
      alert(
        `Failed to purchase presale: ${
          state.errorMessage.charAt(0).toUpperCase() +
          state.errorMessage.slice(1)
        }`
      );
      setIsPendingTx(false);
      setAmount("");
    }
  }, [state]);

  const saleInfo = [
    {
      title: "Your ETH Contribution",
      value: userContribution
        ? `${parseDecimals(utils.formatEther(userContribution), 2)} ETH`
        : "0 ETH",
    },
    { title: "Hard Cap", value: "50.0 ETH" },
    {
      title: "Total Committed",
      value: totalCommitted
        ? `${parseDecimals(utils.formatEther(totalCommitted), 2)} ETH`
        : "0 ETH",
    },
    { title: "Max per User", value: "1.0 ETH" },
  ];

  const barPercentage = totalCommitted
    ? utils.formatEther(totalCommitted) / 100
    : 0;

  const handleAmountChange = (value) => {
    setAmount(value);
  };

  const setMaxAmount = () => {
    if (!ethBalance) {
      return;
    }
    const maxAmount = parseDecimals(utils.formatEther(ethBalance), 4);
    setAmount(maxAmount);
  };

  const handlePurchase = () => {
    try {
      setIsPendingTx(true);
      void send({ value: utils.parseEther(amount) });
    } catch (error) {
      console.error(error);
      setIsPendingTx(false);
    }
  };

  const errorMessage =
    parseFloat(amount) > 1
      ? "Enter an amount less than 1 ETH"
      : compareNonTokenWithToken(ethBalance, amount, 18) == -1
      ? "Insufficient Balance"
      : "";

  const allInfoSubmitted = errorMessage == "";

  const renderer = ({ days, hours, minutes, seconds }) => {
    return (
      <>
        {zeroPad(days)}D {zeroPad(hours)}H {zeroPad(minutes)}M{" "}
        {zeroPad(seconds)}S
      </>
    );
  };

  return (
    <>
      <div className={style.container}>
        <div className={style.content}>
          <div className={style.content__header}>
            <img src={BreadLogo.src} className="h-24" alt="" />
          </div>
          <div className={style.content__body}>
            <ProgressBar
              width={100}
              percent={barPercentage < 1 ? barPercentage : 1}
            />
            {/* {saleStatus && (
              <h3 className="text-center font-comfortaa_reg text-2xl my-2">
                LIVE NOW!<br/>
                <Countdown
                  date={endDate}
                  autoStart={true}
                  key={endDate}
                  renderer={renderer}
                />
              </h3>
            )}
            {saleStatus != undefined && !saleStatus && (
              <h3 className="text-center font-comfortaa_reg text-2xl my-2">
                Sale Closed!
              </h3>
            )} */}
            <h3 className="text-center font-comfortaa_reg text-2xl my-2">
              LIVE NOW!
            </h3>
            <div className={style.sale__form}>
              <div className="flex justify-between font-inter_reg text-lg">
                <h4>Available Balance:</h4>
                <p>{`${
                  ethBalance
                    ? parseDecimals(utils.formatEther(ethBalance), 2)
                    : "0"
                } ETH`}</p>
              </div>
              <div className="flex items-center h-12">
                <input
                  type="text"
                  value={amount}
                  onChange={(e) => {
                    onInputNumberChange(e, handleAmountChange);
                  }}
                  className={style.form_input}
                  placeholder="0.00"
                />
                <button className={style.max_btn} onClick={setMaxAmount}>
                  MAX
                </button>
              </div>
              <p className="text-red-600 text-center">{errorMessage}</p>
              <div className={style.form_action}>
                {account && (
                  <button
                    disabled={
                      !allInfoSubmitted ||
                      amount == "" ||
                      isPendingTx ||
                      !saleStatus ||
                      isChainError
                    }
                    onClick={handlePurchase}
                    className="flex gap-2 items-center"
                  >
                    Enter Sale{" "}
                    {isPendingTx && (
                      <img className="w-8" src={Spinner.src} alt="" />
                    )}
                  </button>
                )}
                {!account && (
                  <button
                    onClick={() => {
                      openModal();
                    }}
                    className="flex gap-2 items-center"
                  >
                    Connect Wallet
                  </button>
                )}
              </div>
              <div>
                {saleInfo.map((item, index) => (
                  <div
                    className="flex justify-between font-inter_reg text-md"
                    key={index}
                  >
                    <p>{item.title}</p>
                    <p>{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className={style.content__footer}>
            <button
              onClick={() => {
                setShowDetails(!showDetails);
              }}
              className="flex gap-2 font-comfortaa_bold text-lg "
            >
              DETAILS{" "}
              {showDetails ? (
                <img src={ArrowUp.src} alt="" className="w-6" />
              ) : (
                <img src={ArrowDown.src} alt="" className="w-6" />
              )}
            </button>

            {showDetails && (
              <p className="text-center font-inter_reg text-md px-2">
                Freshly baked goodness! <br /> Join the freshest bread bakery in
                all of DeFi. <br /> Read our docs{" "}
                <a
                  href="https://docs.breadarb.finance"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="underline"
                >
                  here
                </a>
              </p>
            )}
          </div>
        </div>
      </div>
      <WalletManager isOpen={isDialogOpen} onCloseModal={closeModal} />
    </>
  );
}

export default SaleWidget;
