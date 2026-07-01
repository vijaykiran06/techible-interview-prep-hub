import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaPaperPlane,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer id="footer" className="bg-[#050816] border-t border-white/10 mt-20">

      <div className="max-w-7xl mx-auto px-6 py-20">

        <div className="grid lg:grid-cols-5 gap-12">

          {/* Logo */}

          <div>

            <h2 className="text-4xl font-bold text-white">
              Techible
            </h2>

            <p className="text-gray-400 mt-6 leading-8">
              One platform to learn, build projects and crack product
              company interviews.
            </p>

            <div className="flex gap-5 mt-8 text-xl text-gray-400">

              <FaGithub className="hover:text-white cursor-pointer transition" />
              <FaLinkedin className="hover:text-blue-400 cursor-pointer transition" />
              <FaTwitter className="hover:text-cyan-400 cursor-pointer transition" />
              <FaInstagram className="hover:text-pink-400 cursor-pointer transition" />

            </div>

          </div>

          {/* Modules */}

          <div>

            <h3 className="text-white font-semibold text-xl mb-6">
              Modules
            </h3>

            <ul className="space-y-4 text-gray-400">

              <li className="hover:text-white cursor-pointer">Interview Prep</li>
              <li className="hover:text-white cursor-pointer">Technical Challenges</li>
              <li className="hover:text-white cursor-pointer">AI Learning Hub</li>
              <li className="hover:text-white cursor-pointer">Projects Hub</li>

            </ul>

          </div>

          {/* Resources */}

          <div>

            <h3 className="text-white font-semibold text-xl mb-6">
              Resources
            </h3>

            <ul className="space-y-4 text-gray-400">

              <li>Blog</li>
              <li>Roadmaps</li>
              <li>Interview Stories</li>
              <li>FAQs</li>

            </ul>

          </div>

          {/* Company */}

          <div>

            <h3 className="text-white font-semibold text-xl mb-6">
              Company
            </h3>

            <ul className="space-y-4 text-gray-400">

              <li>About</li>
              <li>Contact</li>
              <li>Privacy Policy</li>
              <li>Terms</li>

            </ul>

          </div>

          {/* Newsletter */}

          <div>

            <h3 className="text-white font-semibold text-xl mb-6">
              Stay Updated
            </h3>

            <p className="text-gray-400 mb-6">
              Subscribe to receive latest updates.
            </p>

            <div className="flex rounded-xl overflow-hidden border border-white/10">

              <input
                type="email"
                placeholder="Your Email"
                className="flex-1 bg-transparent px-4 py-3 outline-none text-white"
              />

              <button className="bg-gradient-to-r from-blue-600 to-violet-600 px-5">

                <FaPaperPlane className="text-white" />

              </button>

            </div>

          </div>

        </div>

        <div className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center">

          <p className="text-gray-500">
            © 2026 Techible. All Rights Reserved.
          </p>

          <p className="text-gray-500 mt-4 md:mt-0">
            Built with ❤️ using React & Tailwind CSS
          </p>

        </div>

      </div>

    </footer>
  );
};

export default Footer;