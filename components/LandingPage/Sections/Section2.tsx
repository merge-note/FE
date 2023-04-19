import Section2Bubble from "@/public/images/Section2Bubble.svg";
import Section2Line from "../public/images/Section2Line.svg";
import { motion } from "framer-motion";

const Section2 = () => {
  return (
    <div className="h-screen flex flex-col justify-between px-10 pt-20 pb-40">
      <div className="h-1/5 relative">
        <motion.h1
          className="text-5xl font-medium absolute left-20"
          style={{ fontFamily: "AbrilFatface-Regular" }}
          whileInView={{ opacity: 1, x: 20 }}
          initial={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Have you ever thought like this?
        </motion.h1>
        <img
          src="/images/Section2Bubble.png"
          alt="Bubble"
          className="w-[300px] h-[300px] absolute top-[-100px] left-[-60px]"
        />
      </div>
      <div className="h-4/5 flex gap-6 items-center justify-center">
        <motion.div
          initial={{ opacity: 0.8, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, delay: 0, type: "spring" }}
          className="w-60 h-60 p-4 bg-[#f7b3c7] shadow-lg cursor-pointer text-center flex flex-col justify-center"
        >
          <span className="text-3xl font-semibold">
            &quot;I forget important information.&quot;
          </span>
          <span className="block mt-2 text-3xl">🤔</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0.8, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, delay: 0.1, type: "spring" }}
          className="w-60 h-60 p-4 bg-[#c6dc60] shadow-lg cursor-pointer text-center flex flex-col justify-center"
        >
          <span className="text-3xl font-semibold">
            &quot;I lose ideas found while searching.&quot;
          </span>
          <span className="block mt-2 text-3xl">😥</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0.8, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, delay: 0.2, type: "spring" }}
          className="w-60 h-60 p-4 bg-[#c3acf1] drop-shadow-lg cursor-pointer text-center flex flex-col justify-center"
        >
          <span className="text-3xl font-semibold">
            &quot;I waste time re-searching for info.&quot;
          </span>
          <span className="block mt-2 text-3xl">🙄</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0.8, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, delay: 0.3, type: "spring" }}
          className="w-60 h-60 p-4 bg-[#ee4878] shadow-lg cursor-pointer text-center flex flex-col justify-center"
        >
          <span className="text-3xl font-semibold">
            &quot;I struggle to track and log search results.&quot;
          </span>
          <span className="block mt-2 text-3xl">🥺</span>
        </motion.div>
      </div>
    </div>
  );
};

export default Section2;
