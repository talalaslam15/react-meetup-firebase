import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import { Link, useHistory } from "react-router-dom";
import "./signup.css";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";

import { useFormik } from "formik";
import * as Yup from "yup";

const useStyles = makeStyles(() => ({
  root: {
    padding: "15px",
    textAlign: "center",
  },
  myButton: {
    marginTop: "10px",
  },
}));
export default function SigninPage() {
  const classes = useStyles();

  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(6, "Must be 6 characters or more")
        .required("Required"),
    }),

    onSubmit: async (values) => {
      try {
        setLoading(true);
        await login(values.email, values.password);
        history.push("/");
      } catch {
        alert("Failed to Sign in!");
      }
      setLoading(false);
    },
  });

  return (
    <div className="bg">
      <div className="signin-container">
        <div className="form-content">
          <form className={classes.root} onSubmit={formik.handleSubmit}>
            <Box textAlign="center" clone>
              <h1>Sign in</h1>
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
            <Button
              disabled={loading}
              className={classes.myButton}
              type="submit"
              color="primary"
              variant="contained"
              fullWidth
            >
              Sign in
            </Button>
            <span className="form-input-page">
              Don't have an account? Create one <Link to="/signup">here</Link>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
}
