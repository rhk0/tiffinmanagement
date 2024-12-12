import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TfRegister = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
    phone: Yup.string().required("Phone is required"),
    address: Yup.string().required("Address is required"),
    pincode: Yup.string().required("Pincode is required")
    .matches(/^\d{6}$/, "Pincode must be 6 digits"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/auth/register", // Replace with your actual registration API URL
        values
      );

      if (response.status === 201) {
        // Registration was successful
        console.log("Registration successful");
        setSubmitting(false);
        setTimeout(() => {
          navigate("/login");
        }, 3000);
        // Redirect to the login page
        setTimeout(() => {
          toast.success("Registered Successfully");
        }, 1000);
      } else {
        // Registration failed
        console.error("Registration failed:", response.data.error);
        setSubmitting(false);
        // Handle the error, e.g., display an error message to the user
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setSubmitting (false);
      // Handle the error, e.g., display an error message to the user
    }
  };

  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
    pincode: "",
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 shadow-md rounded-lg w-96">
        <h1 className="text-2xl text-center font-semibold mb-6">Register</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-600">
                  Name
                </label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  className="border border-gray-300 p-2 w-full"
                />
                <ErrorMessage name="name" component="div" className="text-pink-500" />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-600">
                  Email
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className="border border-gray-300 p-2 w-full"
                />
                <ErrorMessage name="email" component="div" className="text-pink-500" />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-gray-600">
                  Password
                </label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  className="border border-gray-300 p-2 w-full"
                />
                <ErrorMessage name="password" component="div" className="text-pink-500" />
              </div>
              <div className="mb-4">
                <label htmlFor="confirmPassword" className="block text-gray-600">
                  Confirm Password
                </label>
                <Field
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  className="border border-gray-300 p-2 w-full"
                />
                <ErrorMessage name="confirmPassword" component="div" className="text-pink-500" />
              </div>
              <div className="mb-4">
                <label htmlFor="phone" className="block text-gray-600">
                  Phone
                </label>
                <Field
                  type="tel"
                  id="phone"
                  name="phone"
                  className="border border-gray-300 p-2 w-full"
                />
                <ErrorMessage name="phone" component="div" className="text-pink-500" />
              </div>
              <div className="mb-4">
                <label htmlFor="address" className="block text-gray-600">
                  Address
                </label>
                <Field
                  type="text"
                  id="address"
                  name="address"
                  className="border border-gray-300 p-2 w-full"
                />
                <ErrorMessage name="address" component="div" className="text-pink-500" />
              </div>
              <div className="mb-4">
                <label htmlFor="pincode" className="block text-gray-600">
                  Pincode
                </label>
                <Field
                  type="text"
                  id="pincode"
                  name="pincode"
                  className="border border-gray-300 p-2 w-full"
                />
                <ErrorMessage name="pincode" component="div" className="text-pink-500" />
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600"
                  disabled={isSubmitting}
                >
                  Register
                </button>
              </div>
              <div className="text-center mt-2">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-black py-1 px-2"
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

export default TfRegister;
