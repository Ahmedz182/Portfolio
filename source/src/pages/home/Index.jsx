import React from "react";
import Intro from "./Intro";
import Experience from "./Experience";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Sidebar from "../../components/Sidebar";
import Project from "./Project";
import HeroSection from "./HeroSection";
import SayHello from "./SayHello";
import { useSelector } from "react-redux";

const Index = () => {
  const { portfolioData } = useSelector((state) => state.root);
  return (
    <div>
      {portfolioData && (
        <div>
          <Header />
          <HeroSection />
          <Intro />
          <Experience />
          <Project />
          <SayHello />
          <Sidebar />
          <div className="bg-primary dark:bg-bg-dark py-6 px-40 flex flex-col gap-3 justify-center items-center sm:px-10">
            <div className="h-[1px] w-full bg-tertiary/70" />
          </div>
          <Footer />
        </div>
      )}
    </div>
  );
};

export default Index;
