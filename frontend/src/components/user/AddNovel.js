import { Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

const AddNovel = () => {
  
  
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
    // }, 2000)
  }

  const myValidation = Yup.object().shape({
    username: Yup.string().min(3, "Too short").max(10, "Too Long").required("Username Required"),
  })

  return (
    <motion.div
      initial={{ scale: 0.6, x: "800%", opacity: 0 }}
      animate={{ scale: 1, x: 0, opacity: 1 }}
      transition={{ duration: 0.5, type: "spring" }}
      className="col-md-6 mx-auto pt-5">
      <div className="card">
        <div className="card-body">
          <h3 className="text-center">Signup Here</h3>
          <Formik initialValues={{ title:"",author:"",genre:"",publisher:"",user:"",rentable:"",sellable:"",rentPrice:"",sellPrice:"",createAt:"" }} onSubmit={userSubmit} >
            {({ values, handleChange, handleSubmit, isSubmitting, errors }) => (
              <form onSubmit={handleSubmit}>

                <label>Title</label>
                <input type="text" className="form-control" name="title" value={values.title} onChange={handleChange} />
                <p className="mb-3 message">{errors.title}</p>
                <label>Author</label>
                <input type="text" className="form-control" name="author" value={values.author} onChange={handleChange} />
                <label>Genre</label>
                <input type="text" className="form-control" name="genre" value={values.genre} onChange={handleChange} />
                <label>Publisher</label>
                <input type="text" className="form-control" name="publisher" value={values.publisher} onChange={handleChange} />
                <label>User</label>
                <input type="text" className="form-control" name="user" value={values.user} onChange={handleChange} />
                <label>Rentable</label>
                <input type="text" className="form-control" name="rentable" value={values.rentable} onChange={handleChange} />
                <label>Sellable</label>
                <input type="text" className="form-control" name="sellable" value={values.sellable} onChange={handleChange} />
                <label>RentPrice</label>
                <input type="text" className="form-control" name="rentprice" value={values.rentPrice} onChange={handleChange} />
                <label>SellPrice</label>
                <input type="text" className="form-control" name="sellprice" value={values.sellPrice} onChange={handleChange} />
                <label>CreateAt</label>
                <input type="text" className="form-control" name="createat" value={values.createAt} onChange={handleChange} />
                
                <button disabled={isSubmitting} type="submit" className="btn btn-primary mt-5">
                  {isSubmitting ? <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : ""}
                  &nbsp;&nbsp;Submit
                </button>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </motion.div>
  )
}

export default AddNovel;