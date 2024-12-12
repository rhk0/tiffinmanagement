import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineInstagram } from "react-icons/ai";
import { AiFillLinkedin } from "react-icons/ai";
import { AiFillGoogleCircle } from "react-icons/ai";

const date = new Date();
const currentYear = date.getFullYear();

const Footer = () => {
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
  return (
    <div className="container-fluid p-0  bg-white text-pink-600 ">
      <footer
        className="text-center text-black bg-gradient-to-r bg-pink-600 to-blue-800"
        style={{
          background: "linear-gradient(to right, #9796f0, #fbc7d4) ",
        }}
      >
        <section className="p-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-left col-span-1 sm:col-span-2 md:col-span-1">
                <h6 className="text-2xl font-bold text-brown text-center">
                  MANASVI TIFFIN
                </h6>
                <hr className="my-4 border-2 border-brown" />
                <p className="text-black text-center">
                  We are an MNC company with a good work environment and
                  supportive staff.
                </p>
              </div>

              <div className="text-left col-span-1 sm:col-span-2 md:col-span-1">
                <h6 className="text-2xl font-bold text-grey text-center">
                  Links
                </h6>
                <hr className="my-4 border-2 border-grey" />
                <ul className="text-center">
                  <li>
                    <Link to="/" className="text-grey text-center">
                      Home
                    </Link>{" "}
                  </li>
                  <li>
                    <Link
                      onClick={scrollToAboutUs}
                      className="text-grey text-center"
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={scrollToContact}
                      className="text-grey text-center"
                    >
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link to="/" className="text-grey text-center">
                      Privacy Policy
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Column 3 */}
              <div className="text-center col-span-1 sm:col-span-2 md:col-span-1">
                <h6 className="text-2xl font-bold text-grey">Social links</h6>
                <hr className="my-4 border-2 border-grey" />
                <div className="flex justify-center items-center  space-x-4">
                  <a
                    href="https://www.linkedin.com/in/manasvi-technologies-7aa426262/"
                    className="text-grey"
                  >
                    <AiFillLinkedin />
                  </a>
                  <a
                    href="https://www.google.com/maps/place/manasvi+Technologies+(OPC)+Private+Limited/@23.2659701,77.4605003,15z/data=!4m6!3m5!1s0x397c6977a8c0eaf1:0x9474730f15fd13ee!8m2!3d23.2659701!4d77.4605003!16s%2Fg%2F11txv93p8w?entry=ttu"
                    className="text-grey"
                  >
                    <AiFillGoogleCircle />
                  </a>
                  <a
                    href="https://www.instagram.com/manasvi.technologies/"
                    className="text-grey"
                  >
                    <AiOutlineInstagram />
                  </a>
                </div>
                <p className="mt-4">
                  <Link to="/contact" className="text-grey">
                    Help?
                  </Link>
                </p>
              </div>

              {/* Column 4 */}
              <div className="text-left col-span-1 sm:col-span-2 md:col-span-1">
                <h6 className="text-2xl font-bold text-grey text-center">
                  Contact
                </h6>
                <hr className="my-4 border-2 border-grey" />
                <p className="text-grey">
                  111B,80 Feet Road, Old Ashoka Garden Bhopal,
                </p>
                <a href="mailto:manasvitech01@gmail.com" className="text-grey">
                  manasvitech01@gmail.com
                </a>
                <br />
                <a href="https://www.manasvitech.in/" className="text-grey">
                  manasvitech.in
                </a>
                <br />
                <a className="text-grey" href="tel:8319955741">
                  +91 8319955741
                </a>
              </div>
            </div>

            <hr className="my-6 border-2 border-grey" />

            <div className="text-grey md:text-2xl">
              © {currentYear} Copyright : &nbsp;
              <a href="https://www.manasvitech.in/" className="text-grey">
                manasvi technologies (opc) pvt ltd
              </a>
            </div>
          </div>
        </section>
      </footer>
    </div>
  );
};

export default Footer;
