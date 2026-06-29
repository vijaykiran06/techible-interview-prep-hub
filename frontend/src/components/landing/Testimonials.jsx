import { motion } from "framer-motion";
import { FaStar, FaQuoteRight } from "react-icons/fa";

const testimonials = [
  {
    name: "Ankit Sharma",
    role: "SDE @ Microsoft",
    image: "https://i.pravatar.cc/150?img=11",
    review:
      "Techible helped me prepare systematically. The interview questions and learning path gave me confidence.",
  },
  {
    name: "Priya Verma",
    role: "SDE @ Amazon",
    image: "https://i.pravatar.cc/150?img=32",
    review:
      "The structured roadmap and company interview preparation saved me weeks of searching for resources.",
  },
  {
    name: "Rohit Gupta",
    role: "Software Engineer",
    image: "https://i.pravatar.cc/150?img=15",
    review:
      "Everything I needed was available in one platform. The project section was especially useful.",
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-28 bg-[#050816]">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center">

          <p className="uppercase tracking-[4px] text-violet-400 font-semibold">
            Testimonials
          </p>

          <h2 className="text-5xl font-bold text-white mt-4">
            What Students
            <span className="bg-gradient-to-r from-cyan-400 to-violet-500 bg-clip-text text-transparent">
              {" "}Say
            </span>
          </h2>

          <p className="text-gray-400 mt-6 max-w-3xl mx-auto text-lg">
            Thousands of learners trust Techible to prepare for coding,
            projects and interviews.
          </p>

        </div>

        <div className="grid lg:grid-cols-3 gap-8 mt-20">

          {testimonials.map((item, index) => (

            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{
                y: -8,
                scale: 1.02,
              }}
              className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 hover:border-violet-500/40 transition"
            >

              <div className="flex items-center gap-4">

                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-full object-cover"
                />

                <div>
                  <h3 className="text-white text-xl font-semibold">
                    {item.name}
                  </h3>

                  <p className="text-gray-400">
                    {item.role}
                  </p>
                </div>

              </div>

              <div className="flex gap-1 text-yellow-400 mt-6">

                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />

              </div>

              <p className="text-gray-400 leading-8 mt-6">
                {item.review}
              </p>

              <FaQuoteRight className="text-violet-500 text-4xl mt-8 ml-auto" />

            </motion.div>

          ))}

        </div>

      </div>
    </section>
  );
};

export default Testimonials;