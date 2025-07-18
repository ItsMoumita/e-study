import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaSun, FaMoon, FaBars } from 'react-icons/fa';
import { MdLightMode } from "react-icons/md";
import ThemeToggle from './ThemeToggle';
import Swal from 'sweetalert2';
import { AuthContext } from '../context/AuthContext';

const Navbar = ({ toggleTheme }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logOut } = useContext(AuthContext);
  const navLinkClass = ({ isActive }) =>
    isActive ? 'text-[#fdc800] transition' : 'text-white hover:text-[#fdc800] transition';

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
    <nav className="bg-[#002147]  px-6 md:px-12 py-5 shadow-md">
      <div className="flex justify-between items-center">
        {/* Website Name */}
        <h1 className="text-3xl font-bold">
          <span className="text-[#fdc800]">E</span>
          <span className="text-white">Study</span>
        </h1>

        {/* Mobile Icons: Theme Toggle + Menu Button */}
        <div className="flex items-center gap-4 md:hidden">
          <button
            onClick={toggleTheme}
            className="text-white text-xl hover:text-[#fdc800] transition"
          >
            <MdLightMode className="hidden dark:inline" />
            <FaMoon className="inline dark:hidden" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white text-2xl hover:text-[#fdc800] transition"
          >
            <FaBars />
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 md:gap-12 text-lg">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/assignments" className={navLinkClass}>
            Assignments
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
              {/* Profile Picture + Dropdown */}
             
              <div className="dropdown dropdown-end ">
                <div tabIndex={0} role="button" className="m-1">
                   <div className="relative">
                <img
                  src={user.photoURL}
                  alt="Profile"
                  className="w-10 h-10 rounded-full cursor-pointer border-2 border-[#fdc800]"
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                />
                <div
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                  className={`absolute left-0 top-12 bg-gray-800 border border-[#fdc800] p-3 rounded shadow-md w-56 z-50 transform transition-all duration-300 ${isDropdownOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
                    }`}
                >
                  <p className="text-white mb-2"> {user.displayName}</p>
                  {/* <NavLink to="/create-assignment" className={navLinkClass}>
                    Create Assignments
                  </NavLink>
                  <NavLink to="/my-attempts" className={navLinkClass}>
                    My Attempted Assignments
                  </NavLink>
                  <NavLink to="/pending" className={navLinkClass}>
                    Pending Assignments
                  </NavLink> */}
                </div>
              </div>
                </div>
                <ul tabIndex={0} className="dropdown-content menu bg-[#073366] text-lg space-y-2 rounded-box z-1 w-62 p-2 shadow-sm">
                  <NavLink to="/create-assignment" className={navLinkClass}>
                    Create Assignments
                  </NavLink>
                  <NavLink to="/my-attempts" className={navLinkClass}>
                    My Attempted Assignments
                  </NavLink>
                  <NavLink to="/pending" className={navLinkClass}>
                    Pending Assignments
                  </NavLink>
                </ul>
              </div>

              {/* Logout */}
              <button onClick={handleLogout} className="text-white hover:text-[#fdc800] transition">
                Logout
              </button>
            </>
          )}

          {/* Theme Toggle (Desktop) */}
          {/* <button onClick={toggleTheme} className="text-white hover:text-[#fdc800] transition">
            <MdLightMode className="hidden dark:inline" />
            <FaMoon className="inline dark:hidden" />
          </button> */}
          <ThemeToggle></ThemeToggle>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed  right-0  w-1/3 bg-[#073366] z-50 p-6 flex flex-col gap-4 text-lg shadow-lg transition-transform duration-300">


          {!user ? (
            <>
              <NavLink to="/" className={navLinkClass}>
                Home
              </NavLink>
              <NavLink to="/assignments" className={navLinkClass}>
                Assignments
              </NavLink>
              <NavLink to="/login" className={navLinkClass}>
                Login
              </NavLink>

              <NavLink to="/register" className={navLinkClass}>
                Register
              </NavLink>

            </>
          ) : (
            <>
              <div className="relative">
                <img
                  src={user.photoURL}
                  alt="Profile"
                  className="w-10 h-10 rounded-full cursor-pointer border-2 border-[#fdc800]"
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                />
                <div
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                  className={`absolute right-0 top-12 bg-gray-800 border border-[#fdc800] p-3 rounded shadow-md w-56 z-50 transform transition-all duration-300 ${isDropdownOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
                    }`}
                >
                  <p className="text-white mb-2"> {user.displayName}</p>
                  {/* <NavLink to="/create-assignment" className={navLinkClass}>
                    Create Assignments
                  </NavLink>
                  <NavLink to="/my-attempts" className={navLinkClass}>
                    My Attempted Assignments
                  </NavLink>
                  <NavLink to="/pending" className={navLinkClass}>
                    Pending Assignments
                  </NavLink> */}
                </div>
              </div>
              
              <NavLink to="/" className={navLinkClass}>
                Home
              </NavLink>
              <NavLink to="/assignments" className={navLinkClass}>
                Assignments
              </NavLink>
              <NavLink to="/create-assignment" className={navLinkClass}>
                Create Assignments
              </NavLink>
              <NavLink to="/my-attempts" className={navLinkClass}>
                My Attempted Assignments
              </NavLink>
              <NavLink to="/pending" className={navLinkClass}>
                Pending Assignments
              </NavLink>
              <button onClick={handleLogout} className="text-white hover:text-[#fdc800] transition text-left">
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
