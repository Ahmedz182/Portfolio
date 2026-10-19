import React from "react";
import Typewriter from "typewriter-effect";
// import Cv from "../../assets/cv/ahmed.pdf";
import { useSelector } from "react-redux";

const HeroSection = () => {
  const { portfolioData } = useSelector((state) => state.root);
  const { heroSection = {} } = portfolioData;
  const { name, caption, desc, hireMeBtn, resumeBtn, img } = heroSection;

  return (
    <>
      <div className=" bg-primary gap-3 dark:bg-bg-dark sm:items-center overflow-hidden sm:w-full flex sm:flex-col px-32 md:px-16 sm:px-10">
        <div className="flex  flex-col gap-9 sm:gap-6 md:gap-6 py-12  w-1/8  sm:w-100">
          <h1 className="text-white ">Hi, I am</h1>
          <p className="typing  text-secondary dark:text-dark-secondary  text-5xl md:text-4xl sm:text-2xl font-bold">
            <Typewriter
              onInit={(typewriter) => {
                typewriter.typeString(`${name || ""}`).start();
              }}
            />
          </p>
          <h1 className="text-white text-5xl  md:text-4xl sm:text-2xl  font-bold ">
            {caption || ""}
          </h1>
          <p className="text-white w-[50vw] sm:w-[75vw]   p-2">{desc || ""}</p>
          <div className="flex flex-row  gap-4">
            {hireMeBtn && (
              <a href={hireMeBtn} target="_blank" rel="noreferrer">
                <button className="text-tertiary  border   border-tertiary w-40 py-3 rounded hover:bg-tertiary  hover:text-primary hover:font-semibold transition duration-300 ease-in-out hover:cursor-pointer">
                  Hire Me
                </button>
              </a>
            )}
            {resumeBtn && (
              <a href={resumeBtn} download="Resume">
                <button className="text-tertiary  border  border-tertiary w-40 py-3 rounded hover:bg-tertiary  hover:text-primary hover:font-semibold transition duration-300 ease-in-out hover:cursor-pointer">
                  Resume
                </button>
              </a>
            )}
          </div>
        </div>
        <div className=" py-12 sm:py-0 img-wraper">
          <img src={img} alt="Dev" className="img" loading="lazy" />
        </div>
      </div>
    </>
  );
};

export default HeroSection;
