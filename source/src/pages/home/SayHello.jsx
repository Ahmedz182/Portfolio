import React from "react";
import SectionTitle from "../../components/SectionTitle";
import { useSelector } from "react-redux";

const SayHello = () => {
  const { portfolioData } = useSelector((state) => state.root);
  const { detail } = portfolioData || {};

  const rows = [
    { icon: "ri-user-line", label: "Name", value: detail?.name },
    { icon: "ri-mail-line", label: "Email", value: detail?.email, href: detail?.email && `mailto:${detail.email}` },
    { icon: "ri-phone-line", label: "Phone", value: detail?.phone, href: detail?.phone && `tel:${detail.phone}` },
    { icon: "ri-map-pin-line", label: "Location", value: detail?.location },
  ].filter((row) => row.value);

  return (
    <div>
      <SectionTitle title="Say Hello" />
      <div className="flex flex-row items-center gap-16 bg-primary dark:bg-bg-dark px-52 py-10 md:px-16 sm:flex-col sm:gap-6 sm:px-8 sm:py-4">
        <iframe
          title="contact_img"
          className="w-80 h-80 sm:w-64 sm:h-64 shrink-0"
          src="https://lottie.host/embed/e1c8118e-3c4e-4e9f-866e-416d79288f18/kpi96x5ODe.json"></iframe>
        <ul className="flex flex-col gap-5 text-tertiary pb-10 sm:pb-6 w-full">
          {rows.map((row) => (
            <li key={row.label} className="flex items-center gap-4">
              <i className={`${row.icon} text-xl text-secondary dark:text-dark-secondary`}></i>
              <div className="flex flex-col">
                <span className="text-xs text-tertiary/60">{row.label}</span>
                {row.href ? (
                  <a href={row.href} className="text-tertiary hover:text-secondary transition-colors duration-200 break-all">
                    {row.value}
                  </a>
                ) : (
                  <span className="break-words">{row.value}</span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SayHello;
