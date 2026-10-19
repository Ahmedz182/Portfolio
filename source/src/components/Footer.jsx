import React from "react";

const Footer = () => {
  return (
    <>
      <div className="bg-primary dark:bg-bg-dark py-6 px-40 flex flex-col gap-3 justify-center items-center sm:px-10">
        <h3 className=" text-white pt-3">
          Design and Craft by
          <b className="text-secondary dark:text-dark-secondary px-1 cursor-pointer">
            M.Ahmed Fayyaz
          </b>
        </h3>
        <p className="text-white text-sm">Copyright © {new Date().getFullYear()}</p>
      </div>
    </>
  );
};

export default Footer;
