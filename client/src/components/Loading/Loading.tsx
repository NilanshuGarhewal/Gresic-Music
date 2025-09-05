import React from "react";
import { SyncLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="loading">
      <SyncLoader color="#5b76f7" size={16} />
    </div>
  );
};

export default Loading;
