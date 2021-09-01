import React, { useState } from "react";
import "./signup.css";
import { useAuth } from "./AuthContext";
import { Link, useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "15px",
    textAlign: "center",
  },
  myButton: {
    marginTop: "10px",
  },
}));
export default function SignupPage() {
  const classes = useStyles();
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const { signup } = useAuth();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      password2: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(6, "Passwod must be 6 characters or more")
        .required("Required"),
      password2: Yup.string().oneOf(
        [Yup.ref("password"), null],
        "Passwords do not match"
      ),
    }),

    onSubmit: async (values) => {
      try {
        setLoading(true);
        await signup(values.email, values.password);
        alert("Account created, Press Ok to Redirect to Home Page!");
        history.push("/");
      } catch {
        alert("Failed to create an Account");
      }
      setLoading(false);
    },
  });

  return (
    <div className="bg">
      <div className="signup-container">
        <div className="form-content">
          <form
            className={classes.root}
            onSubmit={formik.handleSubmit}
            noValidate
            autoComplete="off"
          >
            <h1>Sign Up</h1>
            <Box mb={"16px"}>
              <TextField
                fullWidth
                label="Username"
                helperText={formik.touched.username && formik.errors.username}
                error={formik.touched.username && formik.errors.username}
                type="text"
                name="username"
                variant="outlined"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
              />
            </Box>
            <Box mb={"16px"}>
              <TextField
                fullWidth
                label="Email"
                helperText={formik.touched.email && formik.errors.email}
                error={formik.touched.email && formik.errors.email}
                type="text"
                name="email"
                variant="outlined"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
            </Box>
            <Box mb={"16px"}>
              <TextField
                fullWidth
                label="Password"
                helperText={formik.touched.password && formik.errors.password}
                error={formik.touched.password && formik.errors.password}
                type="password"
                name="password"
                variant="outlined"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
            </Box>
            <Box mb={"16px"}>
              <TextField
                fullWidth
                label="Confirm Password"
                helperText={formik.touched.password2 && formik.errors.password2}
                error={formik.touched.password2 && formik.errors.password2}
                type="password"
                name="password2"
                variant="outlined"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password2}
              />
            </Box>
            <Button
              disabled={loading}
              className={classes.myButton}
              type="submit"
              color="primary"
              variant="contained"
              fullWidth
            >
              Sign up
            </Button>
            <span className="form-input-page">
              Already have an account? Login <Link to="/signin">here</Link>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
}

// const validate = (values) => {
//   const errors = {};
//   if (!values.username) {
//     errors.username = "UserName is Required";
//   } else if (values.username.length > 15) {
//     errors.username = "Must be 15 characters or less";
//   }
//   if (!values.email) {
//     errors.email = "Email is Required";
//   } else if (
//     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
//   ) {
//     errors.email = "Invalid email address";
//   }
//   if (!values.password) {
//     errors.password = "Password is Required";
//   } else if (values.password.length <= 6) {
//     errors.password = "Password Must be greater than 6 characters";
//   } else if (values.password !== values.password2) {
//     errors.password = "Passwords do not Match";
//     errors.password2 = "Passwords do not Match";
//   }
//   if (!values.password2) {
//     errors.password2 = "Password is Required";
//   }
//   return errors;
// };
