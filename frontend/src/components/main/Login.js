import { Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { Link, Navigate, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(sessionStorage.getItem("user"))
  );

  // step-1 : create function for submission
  const userSubmit = async (formdata, { resetForm, setSubmitting }) => {
    const response = await fetch("http://localhost:5000/user/authenticate", {
      method: "POST",
      body: JSON.stringify(formdata),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "You have successfully logged in",
      });
      const data = await response.json();
      console.log(data);
      // setLoggedIn(true)
      // this will store user data in session
      if (data.isAdmin) {
        sessionStorage.setItem("admin", JSON.stringify(data));
        navigate("/admin/manageuser");
      } else {
        sessionStorage.setItem("user", JSON.stringify(data));
        navigate("/user/addnovel");
      }
    } else if (response.status === 400) {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Invalid Credentials",
      });
    }
  };

  const myValidation = Yup.object().shape({
    email: Yup.string()
      .min(3, "Too short")
      .max(20, "Too Long")
      .required("Username Required"),
  });

  if (currentUser !== null) return <Navigate to="/user/profile" />;
  else
    return (
      <motion.div
        initial={{ scale: 0.6, x: "800%", opacity: 0 }}
        animate={{ scale: 1, x: 0, opacity: 1 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="d-flex align-items-center login-bg"
      >
        <div className="col-sm-6 col-md-4 col-lg-3 mx-auto">
          <p className="text-center text-white display-3 fw-bold">Book Worms</p>
          <div className="card mt-5">
            <div className="card-body p-5">
              <h3 className="text-center">Login</h3>
              <Formik
                initialValues={{ email: "", password: "" }}
                onSubmit={userSubmit}
                validationSchema={myValidation}
              >
                {({
                  values,
                  handleChange,
                  handleSubmit,
                  isSubmitting,
                  errors,
                }) => (
                  <form onSubmit={handleSubmit}>
                    <label>Email</label>
                    <input
                      type="text"
                      className="form-control"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                    />
                    <p className="mb-3 message">{errors.email}</p>

                    <label>Password</label>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                    />

                    <button
                      disabled={isSubmitting}
                      type="submit"
                      className="btn btn-primary mt-5 w-100"
                    >
                      {isSubmitting ? (
                        <span
                          class="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                      ) : (
                        ""
                      )}
                      &nbsp;&nbsp;Submit
                    </button>
                  </form>
                )}
              </Formik>
            </div>
            <hr />
            <p className="text-center mb-3">
              New to BookWorms?&nbsp;
              <Link to="/main/signup">Sign Up</Link>
            </p>
          </div>
        </div>
      </motion.div>
    );
};

export default Login;
