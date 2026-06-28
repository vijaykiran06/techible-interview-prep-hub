import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
      });
    }

    setMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#050816]/90 backdrop-blur-xl border-b border-white/10">

      <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">

        {/* Logo */}

        <Link to="/">
          <h1 className="text-4xl font-black text-white">
            Techible
          </h1>
        </Link>

        {/* Desktop Menu */}

        <div className="hidden md:flex items-center gap-12 text-gray-300">

          <button
            onClick={() => scrollToSection("modules")}
            className="hover:text-white transition"
          >
            Modules
          </button>

          <button
            onClick={() => scrollToSection("why")}
            className="hover:text-white transition"
          >
            Why Techible
          </button>

          <button
            onClick={() => scrollToSection("journey")}
            className="hover:text-white transition"
          >
            Journey
          </button>

          <button
            onClick={() => scrollToSection("testimonials")}
            className="hover:text-white transition"
          >
            Testimonials
          </button>

          <button
            onClick={() => scrollToSection("footer")}
            className="hover:text-white transition"
          >
            Contact
          </button>

        </div>

        {/* Desktop Button */}

        <Link to="/interview-prep">
          <button className="hidden md:block px-8 py-3 rounded-full bg-white text-black font-semibold hover:scale-105 transition">
            Get Started
          </button>
        </Link>

        {/* Mobile Icon */}

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white text-3xl"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

      </div>

      {/* Mobile Menu */}

      {menuOpen && (
        <div className="md:hidden bg-[#050816] border-t border-white/10">

          <div className="flex flex-col items-center py-8 gap-6 text-gray-300">

            <button onClick={() => scrollToSection("modules")}>
              Modules
            </button>

            <button onClick={() => scrollToSection("why")}>
              Why Techible
            </button>

            <button onClick={() => scrollToSection("journey")}>
              Journey
            </button>

            <button onClick={() => scrollToSection("testimonials")}>
              Testimonials
            </button>

            <button onClick={() => scrollToSection("footer")}>
              Contact
            </button>

            <Link to="/interview-prep">
              <button
                onClick={() => setMenuOpen(false)}
                className="px-8 py-3 rounded-full bg-white text-black font-semibold"
              >
                Get Started
              </button>
            </Link>

          </div>

        </div>
      )}

    </nav>
  );
};

export default Navbar;