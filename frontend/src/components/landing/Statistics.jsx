import { motion } from "framer-motion";
import {
  FaBuilding,
  FaQuestionCircle,
  FaBook,
  FaUsers,
  FaTrophy,
} from "react-icons/fa";

const stats = [
  {
    icon: <FaBuilding />,
    value: "20+",
    title: "Companies Covered",
    color: "text-pink-400",
  },
  {
    icon: <FaQuestionCircle />,
    value: "200+",
    title: "Interview Questions",
    color: "text-violet-400",
  },
  {
    icon: <FaBook />,
    value: "5",
    title: "Learning Modules",
    color: "text-blue-400",
  },
  {
    icon: <FaUsers />,
    value: "5000+",
    title: "Students",
    color: "text-green-400",
  },
  {
    icon: <FaTrophy />,
    value: "98%",
    title: "Success Rate",
    color: "text-yellow-400",
  },
];

const Statistics = () => {
  return (
    <section className="bg-[#050816] py-20">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-6">

          {stats.map((item, index) => (

            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.08,
              }}
              whileHover={{
                y: -6,
              }}
              className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-7 text-center hover:border-violet-500/40 transition"
            >

              <div
                className={`text-4xl ${item.color} flex justify-center mb-5`}
              >
                {item.icon}
              </div>

              <h2
                className={`text-4xl font-bold ${item.color}`}
              >
                {item.value}
              </h2>

              <p className="text-gray-400 mt-3">
                {item.title}
              </p>

            </motion.div>

          ))}

        </div>

      </div>
    </section>
  );
};

export default Statistics;