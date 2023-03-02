import style from "./footer.module.css";
import TelegramIcon from "@/assets/images/telegram.svg";
import TwitterIcon from "@/assets/images/twitter.svg";

function Footer() {
  const socialLinks = [
    {
      icon: TelegramIcon.src,
      url: "/#",
    },
    {
      icon: TwitterIcon.src,
      url: "/#",
    },
  ];

  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={style.socials}>
          {socialLinks.map((item, index) => (
            <a
              href={item.url}
              key={index}
              target="_blank"
              rel="noreferrer noopener"
            >
              <img src={item.icon} alt="" className="w-10" />
            </a>
          ))}
        </div>
        <p className="font-inter_reg">&copy;2023 Bread. All rights reserved.</p>
      </div>
    </div>
  );
}

export default Footer;
