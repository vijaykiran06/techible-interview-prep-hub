import { motion } from "framer-motion";
import {
  FaBookOpen,
  FaCode,
  FaLaptopCode,
  FaUserTie,
  FaTrophy,
} from "react-icons/fa";

const journey = [
  {
    number: "01",
    title: "Learn",
    description: "Master the fundamentals through structured roadmaps.",
    icon: <FaBookOpen />,
    color: "from-violet-500 to-fuchsia-500",
  },
  {
    number: "02",
    title: "Practice",
    description: "Solve coding problems and strengthen your concepts.",
    icon: <FaCode />,
    color: "from-blue-500 to-cyan-500",
  },
  {
    number: "03",
    title: "Build",
    description: "Develop real-world projects to gain practical skills.",
    icon: <FaLaptopCode />,
    color: "from-green-500 to-emerald-500",
  },
  {
    number: "04",
    title: "Interview",
    description: "Prepare with company-specific interview questions.",
    icon: <FaUserTie />,
    color: "from-yellow-500 to-orange-500",
  },
  {
    number: "05",
    title: "Get Placed",
    description: "Land your dream internship or full-time opportunity.",
    icon: <FaTrophy />,
    color: "from-pink-500 to-rose-500",
  },
];

const LearningJourney = () => {
  return (
    <section id="journey" className="py-28 bg-[#050816]">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-20">

          <p className="uppercase tracking-[4px] text-violet-400 font-semibold">
            Learning Journey
          </p>

          <h2 className="text-5xl font-bold text-white mt-4">
            Your Roadmap
            <span className="bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
              {" "}
              To Success
            </span>
          </h2>

          <p className="text-gray-400 mt-6 max-w-3xl mx-auto text-lg">
            A structured learning path that takes you from beginner to
            interview-ready software engineer.
          </p>

        </div>

        <div className="grid lg:grid-cols-5 md:grid-cols-3 gap-10">

          {journey.map((step, index) => (

            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              viewport={{ once: true }}
              className="relative text-center"
            >

              {index !== journey.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[70%] w-full h-[2px] bg-gradient-to-r from-violet-500 to-cyan-500" />
              )}

              <div
                className={`mx-auto w-20 h-20 rounded-full bg-gradient-to-r ${step.color}
                flex items-center justify-center text-white text-3xl shadow-xl`}
              >
                {step.icon}
              </div>

              <h3 className="mt-6 text-2xl font-bold text-violet-400">
                {step.number}
              </h3>

              <h4 className="mt-2 text-white text-xl font-semibold">
                {step.title}
              </h4>

              <p className="mt-4 text-gray-400 leading-7">
                {step.description}
              </p>

            </motion.div>

          ))}

        </div>

      </div>
    </section>
  );
};

export default LearningJourney;