import React from "react";
import logo from "../assets/img/logo_arabics.svg";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/rootSlice";

const Header = () => {
  const dispatch = useDispatch();
  const isDarkTheme = useSelector((state) => state.root.theme === "dark");

  return (
    <div className="bg-primary dark:bg-bg-dark flex justify-between items-center px-4">
      <Link to="/">
        <img
          src={logo}
          alt="logo"
          className="h-20 rotate-2 p-2.5 hover:cursor-pointer"
        />
      </Link>

      <button
        type="button"
        aria-label={isDarkTheme ? "Switch to light theme" : "Switch to dark theme"}
        className="theme-container"
        onClick={() => dispatch(toggleTheme())}>
        <i className={`${isDarkTheme ? "ri-sun-line" : "ri-moon-line"} text-xl text-primary`}></i>
      </button>
    </div>
  );
};

export default Header;
