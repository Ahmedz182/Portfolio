import React from "react";
import SayHello from "../home/SayHello";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Sidebar from "../../components/Sidebar";

const Contact = () => {
  return (
    <div className=" bg-primary dark:bg-bg-dark">
      <Header />
      <SayHello />
      <Footer />
      <Sidebar />
    </div>
  );
};

export default Contact;
