import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
const Hero = () => {
  return (
    
    <section id="hero" className="relative min-h-screen bg-[#050816] overflow-hidden flex items-center justify-center">
      {/* Background Glow */}
      <div className="absolute top-20 left-20 w-[450px] h-[450px] rounded-full bg-blue-600/20 blur-[150px]" />

      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-violet-700/20 blur-[170px]" />

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)",
          backgroundSize: "70px 70px",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 inline-flex items-center gap-2 px-5 py-2 rounded-full border border-blue-500/30 bg-white/5 backdrop-blur-md text-blue-400 mb-8"
        >
          ✔️ Trusted by Students & Developers
        </motion.div>

        {/* Heading */}

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-6xl md:text-7xl lg:text-8xl font-black text-white leading-tight"
        >
          Learn.
          <br />
          Build.
          <br />

          <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-violet-500 bg-clip-text text-transparent">
            Get Hired.
          </span>
        </motion.h1>

        {/* Subtitle */}

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-9"
        >
          Learn through structured roadmaps, build real-world projects,
          master coding interviews, and become industry-ready with one
          unified learning platform.
        </motion.p>

        {/* Buttons */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 flex flex-col sm:flex-row justify-center gap-5"
        >
            <Link to="/interview-prep">
          <button className="group px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 text-white font-semibold flex items-center justify-center gap-3 hover:scale-105 transition">
            Start Learning

            <FaArrowRight className="group-hover:translate-x-1 transition" />
          </button>
           </Link>
           <a href="#modules">
          <button className="px-8 py-4 rounded-full border border-white/20 text-white hover:bg-white/10 transition">
            Explore Modules
          </button>
          </a>
        </motion.div>
      </div>
    </section>
    
  );
};

export default Hero;