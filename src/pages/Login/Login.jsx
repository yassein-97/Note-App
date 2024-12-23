import React, { useContext, useState } from "react";
import image1 from "../../assets/notes1.png";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { data, Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext/UserContext";

export default function Login() {
  let [err, setErr] = useState();
  const navigate = useNavigate();
  let {token,setToken} = useContext(UserContext);

  const validationSchema = Yup.object({
    email: Yup.string().required("email is required").email("invalid format"),
    password: Yup.string()
      .required("password is required")
      .matches(
        /^[A-Za-z0-9]{8,20}$/,
        "password must be more than 8 char and less than 20"
      ),
  });

  async function onSubmit(formValues) {
    // console.log(formValues);

    const options = {
      url: "https://note-sigma-black.vercel.app/api/v1/users/signIn",
      method: "POST",
      data: formValues,
    };
    try {
      const { data } = await axios.request(options);
      console.log(data);
      if (data.msg == "done") {
        localStorage.setItem("token", data.token)
        setToken(data.token);
        navigate("/home");
      }
    } catch (error) {
      // console.log(error.response.data.msg);
      setErr(error.response.data.msg)
      
    }
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit,
    validationSchema,
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
                <h1 className="fw-bold text-center">Login Now</h1>

                <form className="pt-3" onSubmit={formik.handleSubmit}>
                  {err ? (
                    <p className="text-danger text-center"> {err}</p>
                  ) : null}

                  <input
                    type="email"
                    className="form-control my-2 fw-semibold"
                    placeholder="Enter your email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.email && formik.touched.email ? (
                    <p className="text-danger">{formik.errors.email}</p>
                  ) : null}

                  <input
                    type="password"
                    className="form-control my-2 fw-semibold"
                    placeholder="Enter your password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.password && formik.touched.password ? (
                    <p className="text-danger">{formik.errors.password}</p>
                  ) : null}

                  <button className="btn btn-info text-white w-100 my-3">
                    Sign up
                  </button>
                  <span>Don't have an account yet? <Link to={"/signup"}>Signup</Link></span>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
