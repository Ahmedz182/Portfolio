import React from "react";
import { Triangle } from "react-loader-spinner";
const Loading = () => {
  return (
    <div className="loading fixed inset-0 bg-primary dark:bg-bg-dark flex items-center justify-center">
      <Triangle
        visible={true}
        height="80"
        width="80"
        color="#F24432"
        ariaLabel="triangle-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default Loading;
