import React from "react";
import SectionTitle from "../../components/SectionTitle";
import { useSelector } from "react-redux";
import Technology from "./Technology";

const Intro = () => {
  const { portfolioData } = useSelector((state) => state.root);
  const { heroSection, intro } = portfolioData || {};
  const { name } = heroSection || {};
  const { img, desc1, desc2, salution } = intro || {};
  return (
    <>
      <SectionTitle title="About Me " />

      <div className="bg-primary dark:bg-bg-dark flex gap-16 px-24 py-12 sm:flex-col sm:px-8 sm:py-4">
        <div className=" py-8 w-2/6 p-8 sm:w-full  sm:py-3 sm:p-5 img-wraper">
          <img
            src={img}
            alt="Developer"
            className="rounded  shadow-tertiary/50 devimg admin-img"
          />
        </div>
        <div className="flex flex-col gap-5  text-white py-16 w-3/5 sm:w-full sm:py-4">
          <p>
            {salution}
            <strong className="text-tertiary"> {name}</strong>
            {desc1}
          </p>
          <p>{desc2}</p>
        </div>
      </div>
      <Technology />
    </>
  );
};

export default Intro;
