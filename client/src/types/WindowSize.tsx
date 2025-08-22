import { useState, useEffect } from "react";

const useWindowSize = () => {
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0 // safe check
  );

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    console.log(handleResize)

    // cleanup on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
};

export default useWindowSize;
