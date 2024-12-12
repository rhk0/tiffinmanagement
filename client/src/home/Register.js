import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { LuEye, LuEyeOff } from "react-icons/lu";

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    pincode: Yup.string().required("pincode is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phone: Yup.string()
      .min(10, "Mobile No must be minimum 10 digits")
      .max(10, "Mobile No must be maximum 10 digits")
      .required("Mobile No is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Please Enter same Password")
      .required("Confirm Password is required"),
  });
  const handleTogglePassword = (field) => {
    if (field === "password") {
      setShowPassword(!showPassword);
    } else if (field === "confirmPassword") {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post("/api/v1/auth/register", values);

      if (response.status === 201) {
        // Registration was successful
        console.log("Registration successful");
        setSubmitting(false);
        setTimeout(() => {
          navigate("/login");
        }, 3000);

        setTimeout(() => {
          toast.success("Registered Sucessfully");
        }, 1000);
      } else {
        // Registration failed

        toast.info(response.data.message);

        setSubmitting(false);
      }
    } catch (error) {
      toast.error(" Check your Internet Connection");
      console.error("Error during registration:", error);
      setSubmitting(false);
    }
  };

  const initialValues = {
    username: "",
    pincode: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  return (
    <div
      style={{ background: "linear-gradient(to right, #805ad5, #ed64a6)" }}
      className="min-h-screen  flex items-center justify-center  bg-gray-100"
    >
      <div className="bg-white p-8 shadow-md rounded-lg  w-72 md:w-96 text-purple-500 mt-5 mb-5 ">
        <h1
          style={{
            background: "linear-gradient(to right, #5b21b6, #d946ef)",
            borderRadius: "2px",
          }}
          className="text-2xl text-center p-2 font-semibold mb-6 hover:scale-105"
        >
          Register
        </h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4 text-purple-500">
                <label htmlFor="username" className="block text-purple-500">
                  Username
                </label>
                <Field
                  type="text"
                  id="username"
                  name="name"
                  style={{
                    borderBottom: "2px solid #805ad5",
                    boxShadow: "0 2px 4px rgba(128, 90, 213, 0.1)",
                  }}
                  className="text-black-500 p-2 w-full"
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="text-pink-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-purple-500">
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
                  className="text-pink-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="phone" className="block text-purple-500">
                  Mobile No
                </label>
                <Field
                  type="text"
                  id="phone"
                  name="phone"
                  style={{
                    borderBottom: "2px solid #805ad5",
                    boxShadow: "0 2px 4px rgba(128, 90, 213, 0.1)",
                  }}
                  className="text-black-500 p-2 w-full"
                />
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="text-pink-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-purple-500">
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
                  className="text-black-500 p-2 w-full"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-pink-500"
                />
              </div>

              <div className="mb-4 relative">
                <label
                  htmlFor="confirmPassword"
                  className="block text-purple-500"
                >
                  Confirm Password
                </label>
                <Field
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  style={{
                    borderBottom: "2px solid #805ad5",
                    boxShadow: "0 2px 4px rgba(128, 90, 213, 0.1)",
                  }}
                  className="text-black-500 p-2 w-full"
                />
                <span
                  className="absolute mt-2.5 right-2 cursor-pointer"
                  onClick={() => handleTogglePassword("confirmPassword")}
                >
                  {showConfirmPassword ? <LuEye /> : <LuEyeOff />}
                </span>
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-pink-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="address" className="block text-purple-500">
                  address
                </label>
                <Field
                  type="text"
                  id="address"
                  name="address"
                  style={{
                    borderBottom: "2px solid #805ad5",
                    boxShadow: "0 2px 4px rgba(128, 90, 213, 0.1)",
                  }}
                  className="text-black-500 p-2 w-full"
                />
                <ErrorMessage
                  name="address"
                  component="div"
                  className="text-pink-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="pincode" className="block text-purple-500">
                  pincode
                </label>
                <Field
                  type="text"
                  id="pincode"
                  name="pincode"
                  style={{
                    borderBottom: "2px solid #805ad5",
                    boxShadow: "0 2px 4px rgba(128, 90, 213, 0.1)",
                  }}
                  className="text-black-500 p-2 w-full"
                />
                <ErrorMessage
                  name="pincode"
                  component="div"
                  className="text-pink-500"
                />
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  style={{
                    background: "linear-gradient(to right, #5b21b6, #d946ef)",
                  }}
                  className="bg-pink-500 text-white py-2 md:px-28 px-12 rounded hover:bg-pink-600"
                  disabled={isSubmitting}
                >
                  Register
                </button>
              </div>
              <div className="text-center text-black mt-2">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-purple-500 py-1 px-2"
                  style={{
                    borderBottom: "2px solid pink",
                  }}
                >
                  Login here !!
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
