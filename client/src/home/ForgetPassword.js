import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgetPassword = () => {
  const navigate = useNavigate();

  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });

   // State for success message

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      // Send a POST request to the API endpoint with the email
      const response = await axios.post("http://localhost:5000/api/v1/auth/forget-password", {
        email: values.email,
      });

      if(response.status === 200){
        setSubmitting(false);
            toast.success("Otp successfuly sent to your email !!");
       
        setTimeout(() => {
            navigate("/resetpassword");
        }, 3000);
       
      }
      else{
        console.error("Otp not send:", response.data.error);
        setSubmitting(false);
      }
      
    } catch (error) {
        console.error("Error in sending otp:", error);
        setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 shadow-md rounded-lg w-96">
     
        <h1 className="text-2xl font-semibold mb-6 text-center">Forget Password</h1>
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

              <div className="text-center">
                <button
                  type="submit"
                  className="bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600"
                  disabled={isSubmitting}
                >
                  Send Mail
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <ToastContainer style={{
       top:"0",
       left:"25",
       right:"25",
       textAlign:"center"
      }}/>
    </div>
  );
};

export default ForgetPassword;
