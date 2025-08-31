import React from "react";
import { SyncLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="loading">
      <SyncLoader color="#fff" size={16} />
    </div>
  );
};

export default Loading;
