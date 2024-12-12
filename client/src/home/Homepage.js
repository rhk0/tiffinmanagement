// Home.js
import React, { useState, useEffect } from "react";
import { faAddressBook } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import Header from "./Header";
import Hmenu from "./Hmenu";
import axios from "axios";
import ScrollArrow from "./ScollArrow";
import homebgimage from "../assets/images/homebgimage.jpg";
import homebg2 from "../assets/images/homebg2.jpg";
import bgims from "../assets/images/bgims.avif";
import Menu from "../home/Menu";
import Footer from "./Footer";
const Homepage = () => {
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleItems, setVisibleItems] = useState(8);
  const itemsPerPage = 4;
  const showLoadMore = items.length > visibleItems;
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    message: Yup.string().required("Message is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      message: "",
    },
    validationSchema,

    onSubmit: async (values) => {
      try {
        const response = await axios.post("/api/contact", values);
        console.log(response);

        if (response.status === 201) {
          setSubmissionStatus("success");
          formik.resetForm();
        } else {
          setSubmissionStatus("error");
        }
      } catch (error) {
        setSubmissionStatus("error");
        console.error("Error:", error);
      }
      console.log(values);
    },
  });

  const images = [
    {
      url: "https://image3.jdomni.in/banner/09082022/E2/C2/1A/CD2B0DCE7903A5C3E9314BABE1_1660041250744.jpeg?output-format=webp",
    },
    {
      url: "https://image2.jdomni.in/banner/09082022/E6/9B/A3/6804900ED6FF50D5538802EE12_1660041289644.jpeg?output-format=webp",
    },
    {
      url: "https://image1.jdomni.in/banner/09082022/91/AD/1C/139C6B468886AA7DF6AE88E78E_1660041388354.png?output-format=webp",
    },
    {
      url: "https://image1.jdomni.in/banner/09082022/91/AD/1C/139C6B468886AA7DF6AE88E78E_1660041388354.png?output-format=webp",
    },
    {
      url: "https://image3.jdomni.in/banner/09082022/E2/C2/1A/CD2B0DCE7903A5C3E9314BABE1_1660041250744.jpeg?output-format=webp",
    },
    // Add more image objects here
  ];

  const CuisineItem = [
    {
      name: " Gujarati Cuisine",
      description:
        "Gujarati thali consists of rotli, dal or kadhi, rice, and shaak/sabzi with different combinations of vegetables and spices.",
      imageSrc:
        "https://image3.jdomni.in/banner/09082022/61/93/CE/DAFF5B7441C59762701C5E5665_1660038710602.png?output-format=webp",
    },
    {
      name: "Maharashtrian Cuisine",
      description:
        "Maharashtrian food offers something for everyone, it consists of dal, rice, roti, bhaji, puri and sweets.",
      imageSrc:
        "https://image3.jdomni.in/banner/09082022/71/BA/69/C048BB2C5874DEBBD147634B5D_1660038315016.png?output-format=webp",
    },
    {
      name: "Jain Cuisine",
      description:
        "Jain thali consists of vegetables, squash, beans, peas, fruits, and lettuce, and excludes onions and garlic, root vegetables.",
      imageSrc:
        "https://image2.jdomni.in/banner/09082022/86/39/87/817E0165BCAF84D7995BAC0E1F_1660037740713.png?output-format=webp",
    },
    {
      name: "South Indian Cuisine",
      description:
        "South Indian cuisine is simply delicious and easily digestible. It consists of dosa, idli, saaru/rasam, and huli/sambar.",
      imageSrc:
        "https://image3.jdomni.in/banner/09082022/68/44/31/3A491AA749FE6D38CC8B47EAD0_1660038119474.png?output-format=webp",
    },

    // Add more menu items here
  ];
  const menuItems = [
    {
      name: "  Lunch Tiffin Service",
      description:
        "Allow us to take care of your daily lunch, regardless if you’re at work or at home.",
      imageSrc:
        "https://image3.jdomni.in/banner/09082022/D3/C6/EC/C04026A8352CF83621769A27E3_1660040820356.jpeg?output-format=webp",
    },
    {
      name: "Nutri-meal Lunch",
      description:
        "What would you choose? Stale cooked hotel food or goodness and wholeness of nutritious food?",
      imageSrc:
        "https://image3.jdomni.in/banner/09082022/EC/AF/B4/6CA28C9484E3E692FE0393141C_1660040864035.jpeg?output-format=webp",
    },
    {
      name: "Customised Tiffin",
      description:
        "Yes, you can virtually design your own meals and choose from plenty of options provided by us.",
      imageSrc:
        "https://image2.jdomni.in/banner/09082022/C8/7F/23/A8CD036DF1915908AC4D3991A9_1660040995720.jpeg?output-format=webp",
    },
    {
      name: "Customised Tiffin",
      description:
        "Yes, you can virtually design your own meals and choose from plenty of options provided by us.",
      imageSrc:
        "https://image1.jdomni.in/banner/09082022/6B/12/88/7E7BE9E7C0FF29F59392C578D1_1660041168479.jpeg?output-format=webp",
    },
  ];

  const getAllItems = async () => {
    try {
      const { data } = await axios.get("/api/v1/item/get-item");
      if (data?.success) {
        const items = data.item.map((item) => ({
          ...item,
        }));
        setItems(items);
      }
    } catch (error) {
      console.error(error); // Use console.error for error messages
      // toast.error("Something went wrong in getting food");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllItems();
  }, []);

  const handleLoadMore = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + itemsPerPage);
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send data to a server)
    console.log("Form data submitted:", formData);
  };

  return (
    <>
      <Header />
      <div>
        <div className="relative h-auto w-full">
          <img
            style={{
              width: "100%",
              height: "auto",
              marginTop: "60px",
            }}
            src={homebgimage}
            alt="IMg"
          />
          <div className=" flex flex-1 absolute top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2 text-white text-center w-full">
            <div className="container mx-auto pl-8">
              <p className="text-gray-800 md:text-3xl tracking-normal mt-0 bg-transparent font-normal">
                <span className="block md:text-6xl">Home Cooked and</span>
                <span className="block italic md:text-6xl">
                  Fresh Tiffin Services
                </span>
              </p>
            </div>
          </div>
        </div>

        <header
          className=" py-4"
          style={{ background: "linear-gradient(to right, #06beb6, #48b1bf)" }}
        >
          <div className="container mx-auto text-center decoration-black">
            <h1 className="text-4xl font-semibold">
              Welcome to Manasvi Tiffin Center
            </h1>
            <p className="mt-2">
              Delicious and Healthy Meals Delivered to Your Doorstep
            </p>
          </div>
        </header>
      </div>
      <div>
        <div>
          <img style={{ width: "100%" }} src={homebg2} alt="IMg" />
        </div>
        <div>
          {" "}
          <Hmenu />
        </div>
        <div className="text-center" id="about-us-section">
          <img src={bgims} />
          <div className="bg-orange-100">
            <h1 className="mt-4 mb-8 text-3xl font-semibold">About Us</h1>
            <p
              className="justify-between  "
              style={{
                fontStyle: "italic",
                textAlign: "justify",
                padding: "10px",
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% 100%",
                fontWeight: "revert-layer",
                backgroundImage:
                  "url(https://www.bing.com/images/search?view=detailV2&ccid=iZmRJpSy&id=B4894035CA3278248EB5B90A97689F254B3184D0&thid=OIP.iZmRJpSySKsI7x8gUlTSyAHaEz&mediaurl=https%3a%2f%2fimages.pexels.com%2fphotos%2f459469%2fpexels-photo-459469.jpeg%3fcs%3dsrgb%26dl%3dbasil-delicious-food-459469.jpg%26fm%3djpg&exph=3195&expw=4919&q=food+images&simid=608021284941233237&FORM=IRPRST&ck=3E026266793791D5EDE59B562BC713EF&selectedIndex=7)",
              }}
            >
              At Manasvi Tiffin Center, we are passionate about providing
              delicious and healthy meals that cater to your taste buds and
              nourish your body. With a commitment to quality, taste, and
              convenience, we have been serving the community with our
              delectable culinary creations for years. Our journey began with a
              simple idea - to bring home-cooked meals, filled with the warmth
              of love and traditional flavors, to the busy lives of individuals
              and families. Founded by a team of food enthusiasts, our mission
              was clear: to offer a diverse range of cuisines that delight the
              palate while ensuring the highest standards of hygiene and
              nutrition.
            </p>
          </div>
        </div>
      </div>
      <div className="text-center">
        <h1 className="mt-4 mb-8 text-3xl font-semibold">Gallery</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-4 p-3 ">
        {images.map((image, index) => (
          <img
            key={index}
            src={image.url}
            alt={`Image ${index + 1}`}
            className="rounded-3xl"
            style={{
              height: "300px",
              width: "1600px",
              borderRadius: "5px",
            }}
          />
        ))}
      </div>

      <div
        className="bg-gray-100 p-30 rounded-lg shadow-md"
        id="scroll-to-contact"
      >
        <h2 className="text-2xl font-semibold text-center mb-6">Contact Us</h2>
        <div
          className="flex flex-col md:flex-row justify-center items-center"
          style={{ padding: "15px" }}
        >
          {/* Left side: Contact form */}
          <div className="w-full md:w-1/2 md:mr-4">
            <div className="max-w-lg mx-auto">
              <form onSubmit={formik.handleSubmit}>
                <div className="mb-2">
                  <label htmlFor="name" className="block text-gray-600 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="border border-pink-300 p-2 w-full rounded-md"
                  />
                  {formik.touched.name && formik.errors.name ? (
                    <div className="text-pink-600">{formik.errors.name}</div>
                  ) : null}
                </div>
                <div className="mb-2">
                  <label htmlFor="email" className="block text-gray-600 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="border border-pink-300 p-2 w-full rounded-md"
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className="text-pink-600">{formik.errors.email}</div>
                  ) : null}
                </div>
                <div className="mb-2">
                  <label htmlFor="message" className="block text-gray-600 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formik.values.message}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="border border-pink-300 p-2 w-full rounded-md h-32 resize-none"
                  ></textarea>
                  {formik.touched.message && formik.errors.message ? (
                    <div className="text-pink-600">{formik.errors.message}</div>
                  ) : null}
                </div>
                <div className="text-center" style={{ fontWeight: "bold" }}>
                  <button
                    type="submit"
                    className="bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600"
                  >
                    SUBMIT
                  </button>
                  {submissionStatus === "success" && (
                    <div
                      className="text-green-600 mt-3"
                      style={{ fontSize: "25px" }}
                    >
                      Thank you for contacting us, We'll get back to you
                      shortly!!
                    </div>
                  )}

                  {submissionStatus === "error" && (
                    <div
                      className="text-red-600 mt-3"
                      style={{ fontSize: "25px" }}
                    >
                      Submission failed. Please try again later!!
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
          <br />
          {/* Right side: Contact information */}
          <div className="w-full md:w-1/2">
            <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center">
              <div className="mb-4">
                <h3 className="text-lg font-semibold">
                  <FontAwesomeIcon icon={faAddressBook} className="mr-2" />
                  Our Office Address
                </h3>
                <p>
                  Corporate Office : 111B,80 Feet Road, Old Ashoka Garden Bhopal
                </p>
              </div>
              <div className="mb-4">
                <h3 className="text-lg font-semibold">
                  <FontAwesomeIcon icon={faEnvelope} className="mr-2" /> General
                  Enquiries
                </h3>
                <p>
                  <a href="mailto:manasvitech01@gmail.com" className="text-xs">
                    manasvitech01@gmail.com
                  </a>
                </p>
              </div>
              <div className="mb-4">
                <h3 className="text-lg font-semibold">
                  <FontAwesomeIcon icon={faPhone} className="mr-2" /> Call Us
                </h3>
                <p>
                  <a href="tel:+91-8319955741">+91-8319955741</a>{" "}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">
                  <FontAwesomeIcon icon={faClock} className="mr-2" /> Our Timing
                </h3>
                <p>Monday - Saturday: 10:30 AM - 06:30 PM</p>
              </div>
              <div className="mt-4"></div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <ScrollArrow />
    </>
  );
};
export default Homepage;
