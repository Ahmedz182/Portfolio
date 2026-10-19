import React from "react";
import Intro from "../home/Intro";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const About = () => {
  return (
    <div className=" bg-primary dark:bg-bg-dark">
      <Header />
      <Intro />
      <Footer />
    </div>
  );
};

export default About;
