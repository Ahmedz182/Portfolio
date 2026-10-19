import React, { useState } from "react";
import SectionTitle from "../../components/SectionTitle";
// import project from "../../assets/json/Projects";
import { useSelector } from "react-redux";

const Project = () => {
  const [selected, setSelected] = useState(0);
  const { portfolioData } = useSelector((state) => state.root);
  const { projects = [] } = portfolioData;

  if (projects.length === 0) return null;

  return (
    <>
      <SectionTitle title="Projects" />
      <div className="bg-primary dark:bg-bg-dark flex gap-5 sm:flex-col w-full   ps-40 pe-10 py-10 sm:px-8 sm:py-4 sm:gap-2 ">
        <span className="flex flex-col sm:overflow-x-scroll sm:flex-row   py-2 px-3 w-2/5 sm:w-full sm:gap-3">
          {projects.map((project, index) => (
            <div className="flex" key={project._id || index}>
              <div
                className=" cursor-pointer"
                onClick={() => {
                  setSelected(index);
                }}>
                <h3
                  className={` ${
                    selected === index
                      ? "px-4 py-4  border-l-2  border-tertiary  cursor-pointer border-l-3 text-tertiary bg-tertiary/25 rounded-tr rounded-br font-semibold "
                      : "text-white px-4 py-4  border-l-2 overflow-x-auto border-tertiary/25 sm:mx-1 sm:px-2"
                  }
            transition duration-300 ease-in-out`}>
                  {project.title}
                </h3>
              </div>
            </div>
          ))}
        </span>

        <div className="flex flex-col w-full items-center  justify-center px-1 gap-5 py-20 sm:px-5">
          <h1 className="text-secondary dark:text-dark-secondary text-2xl font-bold">
            {projects[selected].title}
          </h1>
          <h1 className="text-white">
            Built in :{" "}
            <strong className="text-tertiary text-xl  font-semibold">
              {projects[selected].technology || projects[selected].technolgy}
            </strong>
          </h1>
          <p className="text-white text-sm  ">{projects[selected].desc}</p>
          <a href={projects[selected].preview} target="_blank" rel="noreferrer">
            <button
              type="button"
              className="text-tertiary cursor-pointer border  w-36 border-tertiary rounded hover:bg-tertiary hover:text-primary hover:font-semibold flex px-4 py-2 transition duration-300 ease-in-out">
              Live Preview
            </button>
          </a>
        </div>
        <div className="flex object-fill  justify-center py-24 h-2/3 sm:py-5 sm:h-full sm:w-full">
          <img
            src={projects[selected].img}
            alt=""
            className="img "
            loading="lazy"
          />
        </div>
      </div>
    </>
  );
};

export default Project;
