import React from "react";
import { useSelector } from "react-redux";

const Technology = () => {
  const { portfolioData } = useSelector((state) => state.root);
  const { intro } = portfolioData || {};
  const { skills = [] } = intro || {};

  return (
    <>
      <div className="text-tertiary bg-primary dark:bg-bg-dark px-28 py-10 text-xl sm:w-full sm:px-10">
        <h1>Here are a few technologies I've been working with recently:</h1>
        <div className="flex gap-4 py-5 px-1 flex-wrap">
          {skills.length > 0 ? (
            skills.map((skill, index) => (
              <h1
                key={index}
                className="text-tertiary cursor-pointer border border-tertiary rounded hover:bg-tertiary hover:text-primary hover:font-semibold flex px-7 py-2 transition duration-300 ease-in-out hover:cursor-pointer">
                {skill}
              </h1>
            ))
          ) : (
            <p>No skills available</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Technology;
