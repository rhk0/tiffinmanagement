import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { FaUser, FaLock, FaSignInAlt } from "react-icons/fa";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  // for some sttart changes
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      //
      const userRole = userData.role;
      console.log(userRole, "user");

      if (userRole === 1) {
        setTimeout(() => {
          navigate("/admindashboard");
        });
      } else if (userRole === 2) {
        setTimeout(() => {
          navigate("/tcdashboard");
        });
      } else if (userRole === 3) {
        setTimeout(() => {
          navigate("/delboydashboard");
        });
      } else if (userRole === 0) {
        navigate("/customerdashboard");
      }

      //
    }
  }, []);

  // end changes
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post("/api/v1/auth/login", values);
      if (response && response.data.success) {
        const t = response.data.token;
        const user = response.data.user;
        console.log(response, "all data from res");
        const token = JSON.stringify(t);
        const users = JSON.stringify(user);

        localStorage.setItem("auth", token);
        localStorage.setItem("user", users);

        const userRole = response.data.user.role;

        if (userRole === 1) {
          setTimeout(() => {
            navigate("/admindashboard");
          }, 1000);
          setTimeout(() => {
            toast.success("Login successful");
          }, 500);
        } else if (userRole === 2) {
          setTimeout(() => {
            navigate("/tcdashboard");
          }, 1000);
          setTimeout(() => {
            toast.success("Login successful");
          }, 500);
        } else if (userRole === 3) {
          setTimeout(() => {
            navigate("/delboydashboard");
          }, 1000);
          setTimeout(() => {
            toast.success("Login successful");
          }, 500);
        } else if (userRole === 0) {
          setTimeout(() => {
            navigate("/customerdashboard");
          }, 1000);
          setTimeout(() => {
            toast.success("Login successful");
          }, 500);
        }
        //onLogin();
      } else {
        toast.error(response.data.message);

        console.error("Login failed:", response.data.error);
        setSubmitting(false);
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
      toast.error("Internal Server Issue. Please try again.");

      setSubmitting(false);
    }
  };
  return (
    <div
      style={{ background: "linear-gradient(to right, #805ad5, #ed64a6)" }}
      className="min-h-screen flex items-center  justify-center  sm:pt-0 sm:pl-5 sm:pr-5"
    >
      <div>
        <div
          className="bg-white p-8 shadow-md w-72 md:w-96 rounded-lg w-auto sm:w-[310px] "
          style={{ width: "538px", height: "560px" }}
        >
          <h1
            style={{
              background: "linear-gradient(to right, #5b21b6, #d946ef)",
            }}
            className="text-2xl hover:scale-105 text-white font-semibold mb-6 text-center p-3 md:p-4 mt-1 rounded-md flex items-center justify-center"
          >
            <FaSignInAlt className="mr-2 text-2xl " /> Login panel
          </h1>
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {({ isSubmitting }) => (
              <Form>
                <div className="mb-4 ">
                  <label
                    htmlFor="email"
                    className="block flex text-purple-500 items-center"
                  >
                    <FaUser className="inline-block mr-2 text-purple-500" />
                    Email
                  </label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    style={{
                      borderBottom: "2px solid #805ad5",
                      boxShadow: "0 2px 4px rgba(128, 90, 213, 0.1)",
                    }}
                    className="text-black-500 p-2 w-full"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="password"
                    className="block text-gray-600 flex text-purple-500 items-center"
                  >
                    <FaLock className="inline-block mr-2" />
                    Password
                  </label>
                  <Field
                    type="password"
                    id="password"
                    name="password"
                    style={{
                      borderBottom: "2px solid #805ad5",
                      boxShadow: "0 2px 4px rgba(128, 90, 213, 0.1)",
                    }}
                    className="text-black p-2 w-full"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-pink-500"
                  />
                </div>
                <div className="text-center ">
                  <button
                    type="submit"
                    style={{
                      background: "linear-gradient(to right, #5b21b6, #d946ef)",
                    }}
                    className=" text-white py-2 md:px-28 px-12 rounded hover:bg-green-600 "
                    disabled={isSubmitting}
                  >
                    Login
                  </button>
                </div>
              </Form>
            )}
          </Formik>

          <div className="text-center mt-2">
            <Link
              to="/fogetpassword"
              className="text-purple-500 py-1 px-2 "
              style={{
                borderBottom: "2px solid pink",
              }}
            >
              Forgot Password
            </Link>
          </div>

          <div className="text-center mt-2">
            Don't have an account? <br></br>
            <Link
              to="/register"
              className="text-purple-500 py-1 px-2 "
              style={{
                borderBottom: "2px solid pink ",
              }}
            >
              Register here!!
            </Link>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
