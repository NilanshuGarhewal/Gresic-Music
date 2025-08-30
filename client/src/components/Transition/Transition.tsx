import { motion } from "framer-motion";
import React, { FC } from "react";

const Transition = (OgComponent: FC) => {
  return () => (
    <>
      <OgComponent />
      <motion.div
        className="slide-in"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 1 }}
        transition={{ duration: 2, ease: [0.25, 0.46, 0.45, 0.94] }}
      />
      
      <motion.div
        className="slide-out"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        exit={{ scaleY: 0 }}
        transition={{ duration: 2, ease: [0.25, 0.46, 0.45, 0.94] }}
      />
    </>
  );
};

export default Transition;