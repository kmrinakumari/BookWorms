import { Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import app_config from "../../config";

const AddNovel = () => {
  const url = app_config.apiurl;
  const [selImage, setSelImage] = useState("");
  const genreOptions = ["Fiction", "Non-Fiction"];

  const [currentUser, setCurrentUser] = useState(
    JSON.parse(sessionStorage.getItem("user"))
  );

  // step-1 : create function for submission
  const userSubmit = async (formdata, { resetForm, setSubmitting }) => {
    setSubmitting(true);

    // setTimeout(() => {
    console.log(formdata);

    // for sending request to backend
    // 1. url
    // 2. request method
    // 3. data
    // 4. data format - json

    // returns promise
    const response = await fetch("http://localhost:5000/novel/add", {
      method: "POST",
      body: JSON.stringify(formdata),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // reading response status
    console.log(response.status);

    if (response.status === 200) {
      Swal.fire({
        icon: "success",
        title: "Registered",
        text: "User registered successfully",
      });
    }

    setSubmitting(false);
    resetForm();
    // }, 2000)
  };

  const myValidation = Yup.object().shape({
    username: Yup.string()
      .min(3, "Too short")
      .max(10, "Too Long")
      .required("Username Required"),
  });

  const uploadFile = (e) => {
    const file = e.target.files[0];
    setSelImage(file.name);
    const fd = new FormData();
    fd.append("myfile", file);
    fetch(url + "/util/uploadfile", {
      method: "POST",
      body: fd,
    }).then((res) => {
      if (res.status === 200) {
        console.log("file uploaded");
      }
    });
  };


  return (
    <motion.div
      initial={{ scale: 0.6, x: "800%", opacity: 0 }}
      animate={{ scale: 1, x: 0, opacity: 1 }}
      transition={{ duration: 0.5, type: "spring" }}
      className="col-md-6 mx-auto pt-5"
    >
      <div className="card">
        <div className="card-body">
          <h3 className="text-center">AddNovel</h3>
          <Formik
            initialValues={{
              title: "",
              author: "",
              genre: "",
              publisher: "",
              user: currentUser._id,
              rentable: false,
              sellable: false,
              rentPrice: 0,
              sellPrice: 0,
              createAt: new Date(),
            }}
            onSubmit={userSubmit}
          >
            {({ values, handleChange, handleSubmit, isSubmitting, errors }) => (
              <form onSubmit={handleSubmit}>
                <label>Title</label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  value={values.title}
                  onChange={handleChange}
                />
                <p className="mb-3 message">{errors.title}</p>
                <label>Author</label>
                <input
                  type="text"
                  className="form-control"
                  name="author"
                  value={values.author}
                  onChange={handleChange}
                />
                <label>Genre</label>
                <select
                  type="text"
                  className="form-control"
                  name="genre"
                  value={values.genre}
                  onChange={handleChange}
                >
                  {genreOptions.map((opt) => (
                    <option value={opt}>{opt}</option>
                  ))}
                </select>
                <label>Publisher</label>
                <input
                  type="text"
                  className="form-control"
                  name="publisher"
                  value={values.publisher}
                  onChange={handleChange}
                />

                <div className="row my-4">
                  <div className="col-md-6">
                    <label>Rentable</label>
                    <input
                      type="checkbox"
                      name="rentable"
                      value={values.rentable}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6">
                  <label>Sellable</label>
                <input
                  type="checkbox"
                  name="sellable"
                  value={values.sellable}
                  onChange={handleChange}
                />
                  </div>
                </div>

                
                <label>RentPrice</label>
                <input
                  type="number"
                  className="form-control"
                  name="rentPrice"
                  value={values.rentPrice}
                  onChange={handleChange}
                />
                <label>SellPrice</label>
                <input
                  type="number"
                  className="form-control"
                  name="sellPrice"
                  value={values.sellPrice}
                  onChange={handleChange}
                />

                <label className="mt-4 btn btn-dark" htmlFor="thumbnail">Upload Novel Image</label>
                <input hidden id="thumbnail" type="file" onChange={uploadFile} />
                 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="btn btn-primary mt-5"
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
      </div>
    </motion.div>
  );
};

export default AddNovel;
