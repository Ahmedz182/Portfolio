import React from "react";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const { portfolioData } = useSelector((state) => state.root);
  const { intro } = portfolioData;

  if (!intro) return null;

  // console.log(intro);
  return (
    <div className=" fixed flex justify-center bg-primary dark:bg-bg-dark items-center  bottom-0 left-0 sm:pb-5 px-8 sm:static">
      <div className="   flex-col ">
        <div className="flex flex-col gap-2 text-tertiary/35  text-xl sm:flex-row">
          {intro.github && (
            <a href={intro.github} target="_blank" rel="noreferrer">
              <i className="ri-github-fill "></i>
            </a>
          )}
          {intro.facebook && (
            <a href={intro.facebook} target="_blank" rel="noreferrer">
              <i className="ri-facebook-circle-line"></i>
            </a>
          )}
          {intro.linkdein && (
            <a href={intro.linkdein} target="_blank" rel="noreferrer">
              <i className="ri-linkedin-box-fill"></i>
            </a>
          )}
          {intro.instagram && (
            <a href={intro.instagram} target="_blank" rel="noreferrer">
              <i className="ri-instagram-line"></i>
            </a>
          )}
          {intro.whatsapp && (
            <a href={intro.whatsapp} target="_blank" rel="noreferrer">
              <i className="ri-whatsapp-line"></i>
            </a>
          )}
          <div className="w-[2px] h-32 mx-auto bg-tertiary/35 sm:hidden"></div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
