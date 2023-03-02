import style from "./sale-widget.module.css";
import BreadLogo from "@/assets/images/bread-logo.png";
import { useState } from "react";
import ProgressBar from "../ProgressBar";

function SaleWidget() {
  const [showDetails, setShowDetails] = useState(false);
  const saleInfo = [
    { title: "Price Per Bread", value: 0 },
    { title: "Total Committed", value: 0 },
    { title: "Funds to Raise", value: 0 },
    { title: "Min per User", value: 0 },
    { title: "Max per User", value: 0 },
  ];

  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={style.content__header}>
          <img src={BreadLogo.src} className="h-24" alt="" />
        </div>
        <div className={style.content__body}>
          <ProgressBar width={100} percent={0.1} />
          <h3 className="text-center font-comfortaa_reg text-3xl">LIVE NOW! ENDS IN xH xxM</h3>
          <div className={style.sale__form}>
            <div className="flex justify-between font-inter_reg text-lg">
              <h4>Balance:</h4>
              <p>0.00</p>
            </div>
            <div className="flex items-center h-12">
              <input type="text" className={style.form_input} />
              <button className={style.max_btn}>MAX</button>
            </div>
            <div className={style.form_action}>
              <button>Enter Sale</button>
            </div>
            <div>
              {saleInfo.map((item, index) => (
                <div className="flex justify-between font-inter_reg text-md" key={index}>
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
            className="font-comfortaa_bold text-lg "
          >
            DETAILS
          </button>

          {showDetails && (
            <p className="text-center font-inter_reg text-md px-2">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Blanditiis, aliquam a sed architecto veritatis ad eaque possimus
              distinctio, earum harum incidunt voluptatem dolores provident
              explicabo quam accusantium? Illo, nulla suscipit?
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default SaleWidget;
