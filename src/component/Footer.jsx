import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaYoutube, FaGithub, FaLinkedinIn, FaArrowUp } from "react-icons/fa";

const Footer = () => {
  const year = new Date().getFullYear();

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="bg-[#002147] text-white">
      {/* Top area */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <h2 className="text-3xl font-bold">
                <span className="text-[#fdc800]">E</span>
                <span>Study</span>
              </h2>
            </div>
            <p className="text-white/80 text-lg">
              Your collaborative learning space.
            </p>
          </div>

          {/* Quick Links */}
          <nav>
            <h6 className="text-[#fdc800] font-semibold mb-3 uppercase tracking-wide">
              Quick Links
            </h6>
            <ul className="space-y-2 text-white/90">
              <li>
                <Link to="/" className="hover:text-[#fdc800] transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-[#fdc800] transition">
                  Courses
                </Link>
              </li>
              <li>
                <Link to="/assignments" className="hover:text-[#fdc800] transition">
                  Assignments
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-[#fdc800] transition">
                  Courses
                </Link>
              </li>
            </ul>
          </nav>

          {/* Resources */}
          <nav>
            <h6 className="text-[#fdc800] font-semibold mb-3 uppercase tracking-wide">
              Resources
            </h6>
            <ul className="space-y-2 text-white/90">
              <li>
                <Link to="/create-assignment" className="hover:text-[#fdc800] transition">
                  Create Assignments
                </Link>
              </li>
              <li>
                <Link to="/my-attempts" className="hover:text-[#fdc800] transition">
                  My Attempted Assignments
                </Link>
              </li>
              <li>
                <Link to="/pending" className="hover:text-[#fdc800] transition">
                  Pending Assignments
                </Link>
              </li>
            </ul>
          </nav>

          {/* Socials */}
          <div>
            <h6 className="text-[#fdc800] font-semibold mb-3 uppercase tracking-wide">
              Stay Connected
            </h6>
            <p className="text-white/80 text-lg">Follow us on social media</p>
            <div className="mt-4 flex items-center gap-4">
              <a
                href="https://www.youtube.com/results?search_query=learn+web+development"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#fdc800] transition"
                aria-label="YouTube"
              >
                <FaYoutube size={30} />
              </a>
              <a
                href="https://github.com/ItsMoumita"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#fdc800] transition"
                aria-label="GitHub"
              >
                <FaGithub size={30} />
              </a>
              <a
                href="https://www.linkedin.com/in/moumitaaa/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#fdc800] transition"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn size={30} />
              </a>
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#fdc800] transition"
                aria-label="Facebook"
              >
                <FaFacebookF size={30} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/70">
            © {year} <span className="text-[#fdc800] font-semibold">E</span>
            Study. All rights reserved.
          </p>

          <button
            onClick={scrollToTop}
            className="btn btn-sm rounded-full bg-[#fdc800] text-[#002147] border-0 hover:bg-[#eab308] flex items-center gap-2"
            aria-label="Back to top"
          >
            <FaArrowUp /> Back to top
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;