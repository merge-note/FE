import React from "react";
import { motion } from "framer-motion";

const Variate = {
  animate: { y: 0, opacity: 1 },
  initaial: { y: 60, opacity: 0 },
};

const Section3 = () => {
  return (
    <div className="h-screen px-10 flex flex-col relative overflow-hidden">
      <img
        src="/images/Section3Bubble.png"
        alt="Bubble"
        className="absolute -right-5 top-0 w-[140px]"
      />
      <div>
        <motion.h1
          whileInView={Variate.animate}
          initial={Variate.initaial}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl font-medium absolute left-[150px]"
          style={{ fontFamily: "AbrilFatface-Regular" }}
        >
          Meet My Search Note
        </motion.h1>
      </div>
      <div className="w-full h-full flex overflow-hidden">
        <div className="w-1/2 flex items-center justify-center">
          <img
            src="/images/Section3Model.png"
            alt="model"
            className="w-[400px] h-[550px] absolute bottom-24"
          />
        </div>
        <div className="w-1/2 flex flex-col items-center justify-center overflow-hidden">
          <div className="h-[550px] flex flex-col items-center justify-evenly absolute bottom-24">
            <motion.div
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <h1 className="text-3xl font-bold underline decoration-4 decoration-amber-300">
                Just One Click Away
              </h1>
              <span className="text-md">
                Explore YouTube and Google search results all at once.
                <br />
                Save time and find the information you need faster.
              </span>
            </motion.div>
            <motion.div
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              <h1 className="text-3xl font-bold underline underline-offset-4 decoration-4 decoration-amber-300">
                Search and Memo Combo
              </h1>
              <span className="text-md">
                Discover the smart way to search
                <br /> and keep track of your findings with our memo feature.
              </span>
            </motion.div>
            <motion.div
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.7, delay: 0.6 }}
            >
              <h1 className="text-3xl font-bold underline underline-offset-4 decoration-4 decoration-amber-300">
                Monthly Memo Tracking
              </h1>
              <span className="text-md">
                Our feature lets you easily track and monitor
                <br /> your monthly memo count, helping you stay organized.
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section3;
