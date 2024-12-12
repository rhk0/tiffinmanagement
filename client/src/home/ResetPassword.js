import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResetPassword = () => {
  const navigate = useNavigate();
  const initialValues = {
    email: "",
    otp: "",
    password: "",
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    otp: Yup.string()
      .matches(/^\d{6}$/, "OTP must be exactly 6 digits")
      .required("OTP is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post("/api/v1/auth/resetpassword", {
        email: values.email,
        otp: values.otp,
        password: values.password,
      });

      if (response.status === 200) {
        setSubmitting(false);
        toast.success("Password Reset Successfully");
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } else {
        console.error("error in reset password", response.data.error);
        setSubmitting(false);
      }
    } catch (error) {
      console.error(
        "Error in reseting password, please try after sometime:",
        error
      );
      setSubmitting(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 shadow-md rounded-lg w-96">
        <h1 className="text-2xl font-semibold mb-6 text-center">
          Reset Password
        </h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
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
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-pink-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="otp" className="block text-gray-600">
                  OTP
                </label>
                <Field
                  type="text"
                  id="otp"
                  name="otp"
                  className="border border-gray-300 p-2 w-full"
                />
                <ErrorMessage
                  name="otp"
                  component="div"
                  className="text-pink-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-gray-600">
                  New Password
                </label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  className="border border-gray-300 p-2 w-full"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-pink-500"
                />
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-pink-500 text-white py-2 px-4 rounded hover-bg-pink-600"
                  disabled={isSubmitting}
                >
                  Reset Password
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <ToastContainer />
    </div>
  );
};
export default ResetPassword;
