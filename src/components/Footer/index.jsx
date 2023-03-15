import style from "./footer.module.css";
import DiscordIcon from "@/assets/images/discord.svg";
import TwitterIcon from "@/assets/images/twitter.svg";
import GitbookIcon from "@/assets/images/gitbook.svg";

function Footer() {
  const socialLinks = [
    {
      icon: TwitterIcon.src,
      url: "https://twitter.com/breadarbitrum?s=21&t=gwoZTRmCgTScJO00keJAMA",
    },
    {
      icon: DiscordIcon.src,
      url: "https://discord.gg/dCXJXYuAue",
    },
    {
      icon: GitbookIcon.src,
      url: "https://docs.breadarb.finance",
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
              <img src={item.icon} alt="" className="w-8" />
            </a>
          ))}
        </div>
        <p className="font-inter_reg font-bold">&copy;2023 Bread. All rights reserved.</p>
      </div>
    </div>
  );
}

export default Footer;
