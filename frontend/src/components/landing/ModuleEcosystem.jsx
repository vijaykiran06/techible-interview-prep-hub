import { motion } from "framer-motion";
import {
  FaBriefcase,
  FaCode,
  FaRobot,
  FaUserGraduate,
  FaFolderOpen,
} from "react-icons/fa";
import { Link } from "react-router-dom";
const modules = [
  {
    title: "Company Interview Prep",
    description:
      "Browse interview processes, questions, stories and compensation.",
    icon: <FaBriefcase />,
    color: "from-pink-500/20 to-pink-700/10",
    glow: "hover:shadow-pink-500/30",
     link: "/interview-prep",
  },
  {
    title: "Technical Challenges",
    description:
      "Practice DSA, LLD, HLD and coding challenges.",
    icon: <FaCode />,
    color: "from-green-500/20 to-emerald-700/10",
    glow: "hover:shadow-green-500/30",
     link:"/learn/challenges",
     
  },
  {
    title: "AI Learning Hub",
    description:
      "Structured AI learning path with projects.",
    icon: <FaRobot />,
    color: "from-violet-500/20 to-indigo-700/10",
    glow: "hover:shadow-violet-500/30",
     link: "/learn/ai",
  },
  {
    title: "Interview Prep",
    description:
      "Level-wise interview preparation and practice.",
    icon: <FaUserGraduate />,
    color: "from-blue-500/20 to-cyan-700/10",
    glow: "hover:shadow-blue-500/30",
      link: "/learn/interview-prep",
  },
  {
    title: "Projects Hub",
    description:
      "Build real-world projects and strengthen your portfolio.",
    icon: <FaFolderOpen />,
    color: "from-yellow-500/20 to-orange-700/10",
    glow: "hover:shadow-yellow-500/30",
     link: "/learn/projects",
  },
];

const ModuleEcosystem = () => {
  return (
    <section id="modules" className="py-28 bg-[#050816]">
      <div className="max-w-7xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-center text-violet-400 font-semibold uppercase tracking-[5px]">
            Explore Modules
          </p>

          <h2 className="mt-4 text-center text-white text-5xl font-bold">
            Everything You Need.
            <br />
            <span className="bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
              All In One Platform.
            </span>
          </h2>

          <p className="mt-6 text-center text-gray-400 max-w-3xl mx-auto text-lg">
            Techible combines interview preparation, coding practice,
            AI learning, projects and structured roadmaps into one
            modern learning platform.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 mt-20">

          {modules.map((module, index) => (

            <motion.div
              key={module.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              viewport={{ once: true }}
              whileHover={{
                y: -8,
                scale: 1.02,
              }}
              className={`group rounded-3xl border border-white/10 bg-gradient-to-br ${module.color}
              backdrop-blur-xl p-8 shadow-xl transition-all duration-300 ${module.glow}`}
            >

              <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-3xl text-white mb-6 group-hover:scale-110 transition">
                {module.icon}
              </div>

              <h3 className="text-white text-2xl font-bold">
                {module.title}
              </h3>

              <p className="text-gray-400 mt-4 leading-7">
                {module.description}
              </p>

             <Link
          to={module.link}
        className="mt-8 inline-block text-cyan-400 font-semibold group-hover:translate-x-2 transition"
           >
             Explore →
         </Link>

            </motion.div>

          ))}

        </div>
      </div>
    </section>
    
  );
};

export default ModuleEcosystem;