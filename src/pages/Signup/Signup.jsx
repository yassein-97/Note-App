import React, { useState } from "react";
import image1 from "../../assets/notes1.png";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup"
import { useNavigate } from "react-router-dom";


export default function Signup() {
  let [err , setErr] = useState();
  const navigate = useNavigate();

  const validationSchema =  Yup.object({
    name: Yup.string().required("name isrequired").min(3,"more than 3 char").max(20,"must less than 20 char"),
    email: Yup.string().required("email is required").email("invalid format"),
    password: Yup.string().required("password is required").matches(/^[A-Za-z0-9]{8,20}$/,"password must be more than 8 char and less than 20"),
    age: Yup.number().required("age is required"),
    phone: Yup.string().required("phone is required").matches(/^01[0125][0-9]{8}$/)
  });

  async function onSubmit(formValues) {
    // console.log(formValues);
    const options = {
      url: "https://note-sigma-black.vercel.app/api/v1/users/signUp",
      method: "POST",
      data: formValues,
    };

    try {
      const { data } = await axios.request(options);
      if (data.msg == "done") {
        // console.log("done");
        navigate("/login");
      }
    } catch (error) {
      // console.log(error.response.data.msg);
      setErr(error.response.data.msg)
    }
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      age: "",
      phone: "",
    },
    onSubmit,
    validationSchema 
  });
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-5 d-none d-lg-flex justify-content-center align-items-center py-5">
            <img src={image1} className="w-100 p-5" alt="" />
          </div>

          <div className="col-md-7">
            <div className="min-vh-100 d-flex justify-content-center align-items-center">
              <div className="bg-light bg-opacity-25 shadow p-5 rounded-2 w-100">
                <h1 className="fw-bold text-center">Signup Now</h1>

                <form className="pt-3" onSubmit={formik.handleSubmit}>
                  {err ? <p className="text-danger text-center"> {err}</p>:null}
                  <input
                    type="text"
                    className="form-control my-2 fw-semibold"
                    placeholder="Enter your Name"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.name && formik.touched.name ? <p className="text-danger">{formik.errors.name}</p> : null}

                  <input
                    type="email"
                    className="form-control my-2 fw-semibold"
                    placeholder="Enter your email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.email && formik.touched.email ? <p className="text-danger">{formik.errors.email}</p> : null}

                  <input
                    type="password"
                    className="form-control my-2 fw-semibold"
                    placeholder="Enter your password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.password && formik.touched.password ? <p className="text-danger">{formik.errors.password}</p> : null}

                  <input
                    type="number"
                    className="form-control my-2 fw-semibold"
                    placeholder="Enter your age"
                    name="age"
                    value={formik.values.age}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.age && formik.touched.age ? <p className="text-danger">{formik.errors.age}</p> : null}
                  <input
                    type="tel"
                    className="form-control my-2 fw-semibold"
                    placeholder="Enter your Phone"
                    name="phone"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.phone && formik.touched.phone ? <p className="text-danger">{formik.errors.phone}</p> : null}

                  <button className="btn btn-info text-white w-100 my-3">
                    Sign up
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
