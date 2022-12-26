import * as React from "react";
import * as Yup from "yup";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState, useEffect } from "react";
import axios from "axios";
import SendIcon from "@mui/icons-material/Send";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { useFormik } from "formik";
import Input from "@mui/material/Input";

const theme = createTheme();
const ariaLabel = { "aria-label": "description" };
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
phoneNumber: Yup.string().matches(phoneRegExp, "Phone number is not valid");

const validationSchema = Yup.object({
  name: Yup.string().required("Enter Your Name"),
  phoneNumber: Yup.string().matches(phoneRegExp, "Phone number is not valid"),
  company: Yup.string().required("Enter Your company"),
  loadNumber: Yup.string().required("Enter Your Load/Booking Number "),
  customerName: Yup.string().required("Enter Your Customer Name"),
  containerNumber: Yup.string().required("Enter Your Container Number"),
});

const steps = ["User Information", "Hauling Information", "Review your order"];

export default function Register() {
  const [userInfo, setUserInfo] = useState({
    name: "",
    phoneNumber: "",
    company: "",
    loadNumber: "",
    customerName: "",
    containerNumber: "",
  });
  const [status, setStatus] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const isLastStep = activeStep === steps.length - 1;

  function _handleBack() {
    setActiveStep(activeStep - 1);
  }
  const _handleChange = (e) => {
    const value = e.target.value;
    setUserInfo({ ...userInfo, [e.target.name]: value });
  };
  function _handleSubmit() {
    if (isLastStep || !isMobile) {
      axios
        .post("/api/checkin", {
          userdata: userInfo,
        })
        .then((res) => {
          console.log(res.data);
          actions.setSubmitting(false);
          setActiveStep(activeStep + 1);
        })
        .catch((err) => console.log(err));
    } else {
      setActiveStep(activeStep + 1);
    }
  }

  const { touched, values, errors, isSubmitting, handleSubmit, handleChange } =
    useFormik({
      initialValues: {
        name: "",
        phoneNumber: "",
        company: "",
        loadNumber: "",
        customerName: "",
        containerNumber: "",
      },
      validationSchema,
      onSubmit: (values, actions) => {
        axios
          .post("/api/checkin", {
            userdata: userInfo,
          })
          .then((res) => {
            console.log(res.data);
            actions.setSubmitting(false);
            setActiveStep(activeStep + 1);
          })
          .catch((err) => console.log(err));
      },
    });

  const [isMobile, setIsMobile] = useState(false);

  //choose the screen size
  const handleResize = () => {
    if (window.innerWidth < 720) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  // create an event listener
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Client-side-only code
      window.addEventListener("resize", handleResize);
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Hauling Information
          </Typography>
          {isMobile && (
            <Stepper activeStep={activeStep}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            {!isMobile && (
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    name="name"
                    required
                    fullWidth
                    label="Name"
                    autoFocus
                    onChange={_handleChange}
                    errors={!!errors.name}
                    helperText={touched.name ? errors.name : ""}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Phone Number"
                    name="phoneNumber"
                    onChange={_handleChange}
                    errors={!!errors.phoneNumber}
                    helperText={touched.phoneNumber ? errors.phoneNumber : ""}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Hauling Company"
                    name="company"
                    onChange={_handleChange}
                    errors={!!errors.company}
                    helperText={touched.company ? errors.company : ""}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Load/Booking Number"
                    name="loadNumber"
                    onChange={_handleChange}
                    errors={!!errors.loadNumber}
                    helperText={touched.loadNumber ? errors.loadNumber : ""}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Customer Name"
                    name="customerName"
                    onChange={_handleChange}
                    errors={!!errors.customerName}
                    helperText={touched.customerName ? errors.customerName : ""}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Container Number"
                    name="containerNumber"
                    onChange={_handleChange}
                    errors={!!errors.containerNumber}
                    helperText={
                      touched.containerNumber ? errors.containerNumber : ""
                    }
                  />
                </Grid>
                <Button
                  type="submit"
                  onClick={_handleSubmit}
                  fullWidth
                  variant="contained"
                  disabled={isSubmitting}
                  sx={{ mt: 3, mb: 2 }}
                  endIcon={<SendIcon />}
                >
                  Submit
                </Button>
              </Grid>
            )}

            {activeStep === 0 && isMobile && (
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    name="name"
                    required
                    fullWidth
                    label="Name"
                    autoFocus
                    onChange={_handleChange}
                    errors={!!errors.name}
                    helperText={touched.name ? errors.name : ""}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Phone Number"
                    name="phoneNumber"
                    onChange={_handleChange}
                    errors={!!errors.phoneNumber}
                    helperText={touched.phoneNumber ? errors.phoneNumber : ""}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Hauling Company"
                    name="company"
                    onChange={_handleChange}
                    errors={!!errors.company}
                    helperText={touched.company ? errors.company : ""}
                  />
                </Grid>
              </Grid>
            )}

            {activeStep === 1 && isMobile && (
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Load/Booking Number"
                    name="loadNumber"
                    onChange={_handleChange}
                    errors={!!errors.loadNumber}
                    helperText={touched.loadNumber ? errors.loadNumber : ""}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Customer Name"
                    name="customerName"
                    onChange={_handleChange}
                    errors={!!errors.customerName}
                    helperText={touched.customerName ? errors.customerName : ""}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Container Number"
                    name="containerNumber"
                    onChange={_handleChange}
                    errors={!!errors.containerNumber}
                    helperText={
                      touched.containerNumber ? errors.containerNumber : ""
                    }
                  />
                </Grid>
              </Grid>
            )}

            {activeStep === 2 && isMobile && (
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Input
                    disabled
                    defaultValue={userInfo.name}
                    inputProps={ariaLabel}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Input
                    disabled
                    defaultValue={userInfo.phoneNumber}
                    inputProps={ariaLabel}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Input
                    disabled
                    defaultValue={userInfo.company}
                    inputProps={ariaLabel}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Input
                    disabled
                    defaultValue={userInfo.loadNumber}
                    inputProps={ariaLabel}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Input
                    disabled
                    defaultValue={userInfo.customerName}
                    inputProps={ariaLabel}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Input
                    disabled
                    defaultValue={userInfo.containerNumber}
                    inputProps={ariaLabel}
                  />
                </Grid>
              </Grid>
            )}

            {activeStep !== 0 && isMobile && (
              <Button
                onClick={_handleBack}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Back
              </Button>
            )}
            {isMobile && (
              <Button
                type="submit"
                onClick={_handleSubmit}
                fullWidth
                variant="contained"
                disabled={isSubmitting}
                sx={{ mt: 3, mb: 2 }}
                endIcon={<SendIcon />}
              >
                {isLastStep && isMobile ? "Submit" : "Nexxt"}
              </Button>
            )}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
