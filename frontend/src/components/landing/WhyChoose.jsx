import { motion } from "framer-motion";
import {
  FaRocket,
  FaBookOpen,
  FaUsers,
  FaChartLine,
  FaShieldAlt,
  FaGraduationCap,
} from "react-icons/fa";

const features = [
  {
    icon: <FaRocket />,
    title: "Comprehensive Preparation",
    description:
      "Everything you need for interviews, coding practice and career growth in one platform.",
    color: "from-pink-500 to-purple-600",
  },
  {
    icon: <FaBookOpen />,
    title: "Curated Learning",
    description:
      "Structured learning paths designed by industry experts.",
    color: "from-cyan-500 to-blue-600",
  },
  {
    icon: <FaUsers />,
    title: "Real Interview Experience",
    description:
      "Company questions, interview stories and practical preparation.",
    color: "from-green-500 to-emerald-600",
  },
  {
    icon: <FaChartLine />,
    title: "Track Progress",
    description:
      "Follow your journey and improve consistently every day.",
    color: "from-yellow-500 to-orange-500",
  },
  {
    icon: <FaShieldAlt />,
    title: "Industry Ready",
    description:
      "Develop practical skills through projects and technical challenges.",
    color: "from-violet-500 to-indigo-600",
  },
  {
    icon: <FaGraduationCap />,
    title: "Career Guidance",
    description:
      "Roadmaps, interview preparation and mentorship to land your dream role.",
    color: "from-rose-500 to-pink-600",
  },
];

const WhyChoose = () => {
  return (
    
    <section  id="why" className="py-28 bg-[#050816]">
      <div className="max-w-7xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="uppercase tracking-[4px] text-violet-400 text-center font-semibold">
            Why Choose Techible
          </p>

          <h2 className="text-center text-white text-5xl font-bold mt-4">
            Learn Smarter.
            <br />
            <span className="bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
              Build Faster.
            </span>
          </h2>

          <p className="text-center text-gray-400 mt-6 max-w-3xl mx-auto text-lg">
            A modern learning ecosystem designed to help students master
            coding, build projects and crack interviews.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 mt-20">

          {features.map((feature, index) => (

            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              viewport={{ once: true }}
              whileHover={{
                y: -8,
                scale: 1.02,
              }}
              className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 hover:border-violet-500/40 hover:shadow-[0_0_40px_rgba(124,58,237,.25)] transition-all"
            >

              <div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center text-3xl text-white`}
              >
                {feature.icon}
              </div>

              <h3 className="text-white text-2xl font-bold mt-8">
                {feature.title}
              </h3>

              <p className="text-gray-400 mt-5 leading-8">
                {feature.description}
              </p>

            </motion.div>

          ))}

        </div>

      </div>
    </section>
    
  );
};

export default WhyChoose;