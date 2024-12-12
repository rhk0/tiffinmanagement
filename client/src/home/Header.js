import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import FancyText from "./FancyText";
import logo from "./logo.png";
const Header = ({ cartCount }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("auth"));
  const [navbar, setNavbar] = useState(false);
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [username, setUsername] = useState(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    // return userData ? userData.name : "";
    if (userData && userData.name) {
      return userData.name;
    }
    if (userData && userData.tcOwnerName) {
      return userData.tcOwnerName;
    }
    if (!userData) {
      return "";
    }
  });
  const [type, setType] = useState(() => {
    const userType = JSON.parse(localStorage.getItem("user"));
    return userType ? userType.role : "";
  });

  const handleLogin = () => {
    if (username) {
      setIsLoggedIn(true);
    }
  };
  useEffect(() => {
    handleLogin();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setUsername(null);
    setType(null);
  };

  const scrollToAboutUs = () => {
    const aboutUsSection = document.getElementById("about-us-section");
    if (aboutUsSection) {
      aboutUsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById("scroll-to-contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  const handleClick = () => {
    username ? navigate("/cart") : navigate("/login");
  };

  const toggleUserDropdown = () => {
    setUserDropdownOpen(!userDropdownOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setNavbar(true);
      } else {
        setNavbar(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <nav
        className={`md:py-2 text-grey ${
          navbar
            ? "bg-purple-400 text-grey fixed top-0 left-0 right-0 z-50"
            : "bg-purple-400 fixed top-0 left-0 right-0 z-50"
        }`}
        style={{
          background: "#F3DEBA",
          maxHeight: "100px",
        }}
      >
        <div className="justify-between px-3 lg:max-w-7xl md:items-center md:flex md:px-8">
          <div>
            <div className="flex items-center mb-4">
              <Link to="/">
                <img
                  className=""
                  src={logo}
                  alt="logo"
                  style={{
                    maxWidth: "200px",
                  }}
                />
              </Link>

              <div className="md:hidden px-4">
                <button
                  className="p-1 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  {mobileMenuOpen ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="fixed top-3 right-3  text-center h-4 border-full"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="fixed top-3 right-3  text-center h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
          <div
            className={`flex items-center  justify-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
              mobileMenuOpen ? "block bg-white" : "hidden"
            }`}
            style={{ fontSize: "20px" }}
          >
            <ul className="flex flex-col items-center space-y-4 md:flex-row md:space-x-4 md:space-y-0">
              <Link
                to="/menu"
                className="text-pink-600 hover-text-purple-600"
                style={{ fontWeight: "bold" }}
              >
                Menu
              </Link>

              <Link
                to="/"
                className="text-pink-600 hover-text-purple-600"
                style={{ fontWeight: "bold" }}
              >
                Home
              </Link>
              <button
                onClick={scrollToAboutUs}
                className="text-pink-600 hover-text-purple-600"
                style={{ fontWeight: "bold" }}
              >
                About US
              </button>
              <button
                onClick={scrollToContact}
                className="text-pink-600 hover-text-purple-600"
                style={{ fontWeight: "bold" }}
              >
                Contact US
              </button>

              {isLoggedIn ? (
                <div className="relative flex flex-col items-center md:flex-row md:items-center mb-3 md:mb-0 md:mr-4 gap-1 ">
                  <button
                    style={{
                      color: "white",
                      background: "linear-gradient(to right, #ff512f, #dd2476)",
                      fontWeight: "bold",
                    }}
                    className="btn rounded-lg hover-text-grey-600 mt-1 h-10"
                    onClick={toggleUserDropdown}
                  >
                    <FaUser
                      className="rounded"
                      style={{
                        fontSize: "24px",
                      }}
                    />
                  </button>
                  <button
                    style={{
                      color: "white",
                      background: "linear-gradient(to right, #ff512f, #dd2476)",
                      fontWeight: "bold",
                    }}
                    className="btn rounded-lg hover-text-grey-600 mt-1"
                    onClick={toggleUserDropdown}
                  >
                    <FancyText
                      className=""
                      style={{
                        fontSize: "24px",
                        fontWeight: "bold",
                      }}
                      gradient={{
                        from: "#F858E0",
                        to: "#77156C",
                        type: "linear",
                      }}
                      animate
                      animateDuration={1000}
                    >
                      {username || " "}
                    </FancyText>
                  </button>

                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 bg-white border rounded-lg shadow-lg">
                      {type === 0 && (
                        <Link
                          to="/customerdashboard"
                          className="block px-4 py-2 text-gray-800 hover-bg-gray-200"
                        >
                          Dashboard
                        </Link>
                      )}
                      {type === 1 && (
                        <Link
                          to="/admindashboard"
                          className="block px-4 py-2 text-gray-800 hover-bg-gray-200"
                        >
                          Dashboard
                        </Link>
                      )}
                      {type === 2 && (
                        <Link
                          to="/tcdashboard"
                          className="block px-4 py-2 text-gray-800 hover-bg-gray-200"
                        >
                          Dashboard
                        </Link>
                      )}
                      {type === 3 && (
                        <Link
                          to="/delboydashboard"
                          className="block px-4 py-2 text-gray-800 hover-bg-gray-200"
                        >
                          Dashboard
                        </Link>
                      )}
                      <button
                        onClick={handleLogout}
                        className="block px-4 py-2 text-red-500 hover-bg-gray-200"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/login"
                  className="text-gray-600 hover-text-gray-600 mb-3 md:mb-0 md:mr-4 flex items-center gap-1"
                >
                  <button
                    style={{
                      maxWidth: "100px",

                      color: "white",
                      background: "linear-gradient(to right, #ff512f, #dd2476)",
                      fontWeight: "bold",
                    }}
                    className="btn rounded-lg hover-text-grey-600 mt-3 h-10"
                    onClick={handleLogin}
                  >
                    <FaUser
                      className="rounded"
                      style={{
                        fontSize: "24px",
                      }}
                    />
                  </button>
                  <button
                    style={{
                      maxWidth: "100px",
                      color: "white",
                      background: "linear-gradient(to right, #ff512f, #dd2476)",
                      fontWeight: "bold",
                    }}
                    className="btn rounded-lg hover-text-grey-600 mt-3"
                    onClick={handleLogin}
                  >
                    <FancyText
                      className=""
                      style={{
                        fontSize: "24px",
                        fontWeight: "bold",
                      }}
                      gradient={{
                        from: "#F858E0",
                        to: "#77156C",
                        type: "linear",
                      }}
                      animate
                      animateDuration={1000}
                    >
                      Login
                    </FancyText>
                  </button>
                </Link>
              )}
              <button
                onClick={handleClick} // You should specify the onClick handler
                className="text-pink-600 hover-text-purple-600"
                style={{
                  height: "40px",
                  width: "50px",
                  position: "relative",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-9 h-[3rem] mt-[-20px]"
                >
                  <text
                    x="75%"
                    y="18%"
                    dy=".3em"
                    textAnchor="middle"
                    fontSize="11"
                    color="red"
                  >
                    {cartCount}
                  </text>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                  />
                </svg>
              </button>
            </ul>
          </div>
        </div>
      </nav>

      <div
        style={{
          paddingTop: navbar ? "20px" : "0",
        }}
      ></div>
    </div>
  );
};

export default Header;
