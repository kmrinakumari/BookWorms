import { Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { Navigate, useNavigate } from "react-router-dom";

const AboutUs = () => {

  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState(JSON.parse(sessionStorage.getItem('user')))
  
  // step-1 : create function for submission
  const userSubmit = async (formdata, { resetForm, setSubmitting }) => {
    setSubmitting(true)

    // setTimeout(() => {
      console.log(formdata)

      // for sending request to backend
      // 1. url
      // 2. request method
      // 3. data
      // 4. data format - json

      // returns promise
      const response = await fetch('http://localhost:5000/user/add', {
        method: 'POST',
        body : JSON.stringify(formdata),
        headers: {
          'Content-Type' : 'application/json'
        }
      });

      // reading response status
      console.log(response.status);

      if(response.status === 200){

        Swal.fire({
          icon : 'success',
          title : 'Registered',
          text : 'User registered successfully'
        })

      }

      setSubmitting(false)
      resetForm()
      navigate('/main/login');
    // }, 2000)
  }

  const myValidation = Yup.object().shape({
    username: Yup.string().min(3, "Too short").max(10, "Too Long").required("Username Required"),
  })

  if (currentUser !== null) return <Navigate to="/user/profile" />;
  else
  return (
    <motion.div
      initial={{ scale: 0.6, x: "800%", opacity: 0 }}
      animate={{ scale: 1, x: 0, opacity: 1 }}
      transition={{ duration: 0.5, type: "spring" }}
      className="aboutus-bg">
        <div className="col-md-6 mx-auto pt-5">
      <p className="text-center text-white display-3 fw-bold"></p>
      <div className="card">
        <div className="card-body">
          <h4 className="text-center"><b><u>About Us</u></b></h4>
          <Formik initialValues={{ username: "", email: "", password: "" }} onSubmit={userSubmit} validationSchema={myValidation}>
            {({ values, handleChange, handleSubmit, isSubmitting, errors }) => (
              <form onSubmit={handleSubmit}>
                <label>Enter Name</label>
                <input type="text" className="form-control" name="username" value={values.username} onChange={handleChange} />
                <p className="mb-3 message">{errors.username}</p>

                <label>Enter Email</label>
                <input type="text" className="form-control" name="email" value={values.email} onChange={handleChange} />
                <p className="mb-3 message">{errors.email}</p>


                <label> Enter Password</label>
                <input type="password" className="form-control" name="password" value={values.password} onChange={handleChange} />

                <button disabled={isSubmitting} type="submit" className="btn btn-primary mt-5">
                  {isSubmitting ? <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : ""}
                  &nbsp;&nbsp;Now Here
                </button>
              </form>
            )}
          </Formik>
        </div>
      </div>
      </div>
    </motion.div>
  );
};

export default AboutUs;