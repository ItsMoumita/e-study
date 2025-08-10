import React, { useContext, useState } from "react";
import { NavLink } from "react-router";
import { FaMoon, FaBars, FaChevronDown } from "react-icons/fa";
import { MdLightMode } from "react-icons/md";
import ThemeToggle from "./ThemeToggle";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext";

const Navbar = ({ toggleTheme }) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logOut } = useContext(AuthContext);

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-[#fdc800] transition"
      : "text-white hover:text-[#fdc800] transition";

  const handleLogout = async () => {
    try {
      await logOut();
      await Swal.fire({
        title: "Success!",
        text: "Logged out successful!",
        icon: "success",
        background: "white/70",
        color: "black",
        confirmButtonColor: "#002147",
      });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#002147] px-6 md:px-12 py-5 shadow-md">
      <div className="px-6 lg:px-18 flex justify-between items-center gap-6">
        {/* Brand */}
        <h1 className="text-3xl font-bold">
          <span className="text-[#fdc800]">E</span>
          <span className="text-white">Study</span>
        </h1>

        {/* Mobile icons */}
        <div className="flex items-center gap-4 md:hidden">
          <button
            onClick={toggleTheme}
            className="text-white text-xl hover:text-[#fdc800] transition"
          >
            <MdLightMode className="hidden dark:inline" />
            <FaMoon className="inline dark:hidden" />
          </button>
          <button
            onClick={() => setMobileMenuOpen((s) => !s)}
            className="text-white text-2xl hover:text-[#fdc800] transition"
          >
            <FaBars />
          </button>
        </div>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-6 md:gap-12 text-lg">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>

          {/* Assignments with hover dropdown */}
          <div className="dropdown dropdown-hover">
            <div
              tabIndex={0}
              role="button"
              className="flex items-center gap-1 text-white hover:text-[#fdc800] transition"
            >
              <NavLink to="/assignments" className={navLinkClass}>
                Assignments
              </NavLink>
              <FaChevronDown className="text-[#fdc800]" />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-[#073366] text-base rounded-box w-64 p-3 shadow z-[60] space-y-1"
            >
              <li>
                <NavLink to="/assignments" className={navLinkClass}>
                  All Assignments
                </NavLink>
              </li>
              <li>
                <NavLink to="/create-assignment" className={navLinkClass}>
                  Create Assignments
                </NavLink>
              </li>
              <li>
                <NavLink to="/my-attempts" className={navLinkClass}>
                  My Attempted Assignments
                </NavLink>
              </li>
              <li>
                <NavLink to="/pending" className={navLinkClass}>
                  Pending Assignments
                </NavLink>
              </li>
            </ul>
          </div>

          <NavLink to="/courses" className={navLinkClass}>
            Courses
          </NavLink>

          {!user ? (
            <>
              <NavLink to="/login" className={navLinkClass}>
                Login
              </NavLink>
              <NavLink to="/register" className={navLinkClass}>
                Register
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to="/profile" className={navLinkClass}>
                Profile
              </NavLink>
              {/* Profile with hover dropdown: show name + logout */}
              <div className="dropdown dropdown-end dropdown-hover">
                <div tabIndex={0} role="button" className="m-1">
                  <img
                    src={user.photoURL}
                    alt="Profile"
                    className="w-10 h-10 rounded-full cursor-pointer border-2 border-[#fdc800]"
                  />
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu bg-[#073366] rounded-box w-56 p-3 shadow z-[60] space-y-2"
                >
                  <li className="text-white px-2 py-1 pointer-events-none">
                    {user.displayName}
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="text-white hover:text-[#fdc800] transition text-left"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </>
          )}

          {/* Theme toggle */}
          <ThemeToggle />
        </div>
      </div>

      {/* Mobile Menu Sheet */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed right-0 w-1/3 min-w-64 bg-[#073366] z-50 p-6 flex flex-col gap-4 text-lg shadow-lg transition-transform duration-300">
          <NavLink to="/" className={navLinkClass} onClick={() => setMobileMenuOpen(false)}>
            Home
          </NavLink>
          <NavLink to="/courses" className={navLinkClass} onClick={() => setMobileMenuOpen(false)}>
            Courses
          </NavLink>
          <NavLink to="/assignments" className={navLinkClass} onClick={() => setMobileMenuOpen(false)}>
            Assignments
          </NavLink>
          {/* Sub-items (since hover doesn't work on mobile) */}
          <NavLink to="/create-assignment" className={navLinkClass} onClick={() => setMobileMenuOpen(false)}>
            Create Assignments
          </NavLink>
          <NavLink to="/my-attempts" className={navLinkClass} onClick={() => setMobileMenuOpen(false)}>
            My Attempted Assignments
          </NavLink>
          <NavLink to="/pending" className={navLinkClass} onClick={() => setMobileMenuOpen(false)}>
            Pending Assignments
          </NavLink>

          {!user ? (
            <>
              <NavLink to="/login" className={navLinkClass} onClick={() => setMobileMenuOpen(false)}>
                Login
              </NavLink>
              <NavLink to="/register" className={navLinkClass} onClick={() => setMobileMenuOpen(false)}>
                Register
              </NavLink>
            </>
          ) : (
            <>
             
              <div className="flex items-center gap-3 mt-2">
                <img
                  src={user.photoURL}
                  alt="Profile"
                  className="w-10 h-10 rounded-full border-2 border-[#fdc800]"
                />
                <span className="text-white">{user.displayName}</span>
              </div>
               <NavLink to="/profile" className={navLinkClass}>
                Profile
              </NavLink>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleLogout();
                }}
                className="text-white hover:text-[#fdc800] transition text-left"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;