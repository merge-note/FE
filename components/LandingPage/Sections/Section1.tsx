import React from "react";
import Section1Bubble from "@/public/images/Section1Bubble.svg";
import Section1Sparkle from "@/public/images/Section1Sparkle.svg";
import { motion } from "framer-motion";

const Variate = {
  animate: { y: 0, opacity: 1 },
  initaial: { y: 60, opacity: 0 },
};

const Section1 = () => {
  return (
    <div className="h-screen px-10 flex justify-center">
      <div className="w-full h-[calc(100%-3.5rem)] p-12 flex items-center">
        <div className="w-2/5 flex flex-col items-center">
          <motion.h1
            animate={Variate.animate}
            initial={Variate.initaial}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl md:text-7xl text-center"
            style={{ fontFamily: "AbrilFatface-Regular" }}
          >
            Search it
          </motion.h1>
          <motion.h1
            animate={Variate.animate}
            initial={Variate.initaial}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-3xl md:text-7xl text-center"
            style={{ fontFamily: "AbrilFatface-Regular" }}
          >
            and
          </motion.h1>
          <motion.h1
            animate={Variate.animate}
            initial={Variate.initaial}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-3xl md:text-7xl  text-center"
            style={{ fontFamily: "AbrilFatface-Regular" }}
          >
            Note it
          </motion.h1>
          <motion.span
            animate={Variate.animate}
            initial={Variate.initaial}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-sm text-center font-light mt-2 text-gray-600"
          >
            Easily organize your findings with MySearchNote
            <br /> and enhance your learning experience.
          </motion.span>
        </div>
        <div className="w-3/5 h-full flex items-center justify-center relative">
          <img
            src="/images/Section1Bubble.png"
            alt="Bubble"
            className="w-[600px] h-[600px] absolute"
          />
          <img
            src="/images/Section1Sparkle.png"
            alt="Sparkle"
            className="w-[600px] h-[600px] absolute top-10"
          />
          <img
            src="/images/Section1Model.png"
            alt="Model"
            className="w-[450px] h-[450px] absolute top-30"
          />
        </div>
      </div>
    </div>
  );
};

export default Section1;
