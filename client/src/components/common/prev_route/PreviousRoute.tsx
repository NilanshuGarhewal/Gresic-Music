import { useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const usePreviousRoute = () => {
  const location = useLocation();
  const prevLocationRef = useRef<string | null>(null);
  const [previousPath, setPreviousPath] = useState<string | null>(null);

  useEffect(() => {
    setPreviousPath(prevLocationRef.current);
    prevLocationRef.current = location.pathname;
  }, [location]);

  return previousPath;
};

export default usePreviousRoute;
