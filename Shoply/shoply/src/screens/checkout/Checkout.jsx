import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Stepper, Step, StepLabel, Alert } from "@mui/material";
import { useEffect, useState } from "react";
import { shades } from "../../theme";
import * as yup from "yup";
// import { loadStripe } from "@stripe/stripe-js";
import Shipping from "./Shipping";
import Payment from "./PaymentForm";
import { useBootstrapBreakpoints } from "react-bootstrap/esm/ThemeProvider";
import { placeOrder } from "../../slices/orderSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import axios from "axios";


// const stripePromise = loadStripe(
//   "pk_test_51LgU7yConHioZHhlAcZdfDAnV9643a7N1CMpxlKtzI1AUWLsRyrord79GYzZQ6m8RzVnVQaHsgbvN1qSpiDegoPi006QkO0Mlc"
// );

const checkoutSchema = [
  yup.object().shape({
    billingAddress: yup.object().shape({
      firstName: yup
        .string()
        .required("Billing Address : First Name is Required")
        .min(
          3,
          "Billing Address : First Name must be greater than 3 characters"
        )
        .max(
          20,
          "Billing Address : First Name must be less than 20 characters"
        ),
      lastName: yup
        .string()
        .required("Billing Address : Last Name is Required")
        .min(3, "Billing Address : Last Name must be greater than 3 characters")
        .max(20, "Billing Address : Last Name must be less than 20 characters"),
      country: yup
        .string()
        .required("Billing Address : Country Name is Required")
        .min(
          3,
          "Billing Address : Country Name must be greater than 3 characters"
        )
        .max(
          30,
          "Billing Address : Country Name must be less than 30 characters"
        ),
      street1: yup
        .string()
        .required("Billing Address : Street 1 is Required")
        .min(3, "Billing Address : Street 1 must be greater than 3 characters")
        .max(40, "Billing Address : Street 1 must be less than 40 characters"),
      street2: yup.string(),
      city: yup
        .string()
        .required("Billing Address : City Name is Required")
        .min(3, "Billing Address : City Name must be greater than 3 characters")
        .max(30, "Billing Address : City Name must be less than 30 characters"),
      state: yup
        .string()
        .required("Billing Address : State Name is Required")
        .min(3, "Billing Address : State must be greater than 3 characters")
        .max(30, "Billing Address : State must be less than 30 characters"),
      zipCode: yup
        .string()
        .required("Billing Address : Zip Code is Required")
        .min(6, "Billing Address : ZIP Code must be 6 Character Long")
        .max(6, "Billing Address : ZIP Code must be 6 Character Long"),
    }),
    shippingAddress: yup.object().shape({
      isSameAddress: yup.boolean(),
      firstName: yup.string().when("isSameAddress", {
        is: false,
        then: () =>
          yup
            .string()
            .required("Shipping Address : First Name is Required")
            .min(
              3,
              "Shipping Address : First Name must be greater than 3 characters"
            )
            .max(
              20,
              "Shipping Address : First Name must be less than 20 characters"
            ),
      }),
      lastName: yup.string().when("isSameAddress", {
        is: false,
        then: () =>
          yup
            .string()
            .required("Shipping Address : Last Name is Required")
            .min(
              3,
              "Shipping Address : Last Name must be greater than 3 characters"
            )
            .max(
              20,
              "Shipping Address : Last Name must be less than 20 characters"
            ),
      }),
      country: yup.string().when("isSameAddress", {
        is: false,
        then: () =>
          yup
            .string()
            .required("Shipping Address : Country Name is Required")
            .min(
              3,
              "Shipping Address : Country Name must be greater than 3 characters"
            )
            .max(
              30,
              "Shipping Address : Country Name must be less than 30 characters"
            ),
      }),
      street1: yup.string().when("isSameAddress", {
        is: false,
        then: () =>
          yup
            .string()
            .required("Shipping Address : Street 1 is Required")
            .min(
              3,
              "Shipping Address : Street 1 must be greater than 3 characters"
            )
            .max(
              40,
              "Shipping Address : Street 1 must be less than 40 characters"
            ),
      }),
      street2: yup.string(),
      city: yup.string().when("isSameAddress", {
        is: false,
        then: () =>
          yup
            .string()
            .required("Shipping Address : City Name is Required")
            .min(
              3,
              "Shipping Address : City Name must be greater than 3 characters"
            )
            .max(
              30,
              "Shipping Address : City Name must be less than 30 characters"
            ),
      }),
      state: yup.string().when("isSameAddress", {
        is: false,
        then: () =>
          yup
            .string()
            .required("Shipping Address : State Name is Required")
            .min(
              3,
              "Shipping Address : State must be greater than 3 characters"
            )
            .max(
              30,
              "Shipping Address : State must be less than 30 characters"
            ),
      }),
      zipCode: yup.string().when("isSameAddress", {
        is: false,
        then: () =>
          yup
            .string()
            .required("Shipping Address : Zip Code is Required")
            .min(6, "Shipping Address : ZIP Code must be 6 Character Long")
            .max(6, "Shipping Address : ZIP Code must be 6 Character Long"),
      }),
    }),
  }),
  yup.object().shape({
    email: yup
      .string()
      .required("Email is Required")
      .email("Must Be a valid Email Format"),
    phoneNumber: yup
      .string()
      .required("Phone Number is Required")
      .min(10, "Phone Number must be exactly 10 characters long")
      .max(10, "Phone Number must be exactly 10 characters long"),
  }),
];

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [activeStep, setActiveStep] = useState(0);
  const cart = useSelector((state) => state.cartState?.cart?.items);
  const { orders, success, loading, error } = useSelector(
    (state) => state.orderState
  );
  const { user } = useSelector((state) => state.userstate);
  const isFirstStep = activeStep === 0;
  const isSecondStep = activeStep === 1;
  const [errors, setErrors] = useState("");

  const [orderData, setOrderData] = useState({
    billingAddress: {
      firstName: user.username.split(" ")[0],
      lastName: user.username.split(" ")[1],
      country: "",
      street1: "",
      street2: "",
      city: "",
      state: "",
      zipCode: "",
    },
    shippingAddress: {
      isSameAddress: true,
      firstName: "",
      lastName: "",
      country: "",
      street1: "",
      street2: "",
      city: "",
      state: "",
      zipCode: "",
    },
    email: user.email,
    phoneNumber: "",
    paymentMethod: "",
  });

  // useEffect(() => {
  //   if (!loading && !error && success) {
  //     toast.success("Order Placed Successfully");
  //     navigate("/checkout/success");
  //   } else if (!loading && !success && error) {
  //     toast.error(error);
  //   }
  // }, [success, loading, error]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFirstStep && orderData.shippingAddress.isSameAddress) {
      setOrderData({
        ...orderData,
        billingAddress: {
          ...orderData.billingAddress,
        },
        shippingAddress: {
          ...orderData.billingAddress,
          isSameAddress: true,
        },
      });

      try {
        let result = await checkoutSchema[0].validate(orderData, {
          abortEarly: false,
        });
        setErrors("");
        setActiveStep(activeStep + 1);
      } catch (error) {

        setErrors(error.errors[0]);
      }
    } else if (isSecondStep) {
      try {
        let result = await checkoutSchema[1].validate(orderData, {
          abortEarly: false,
        });
        setErrors("");
        let itemsToSend = cart.map((item) => {
          return { productId: item.productId, qty: item.qty };
        });
        if (orderData.paymentMethod === "cod") {
          let { data } = await axios.post(
            `${process.env.REACT_APP_API_URL}api/v1/order/create`,
            {
              items: itemsToSend,
              shipping: {
                ...orderData.shippingAddress,
                phoneNumber: orderData.phoneNumber,
              },
            },
            {
              headers: {
                authorization: `Bearer ${user.token}`,
              },
            }
          );
          if (data.success) {
            toast.success("Order Placed successfully");
            navigate("/checkout/success");
          } else {
            toast.error("Some error occured while processing your order");
          }
        } else if (orderData.paymentMethod === "card") {
          try {
            let { data } = await axios.post(
              `${process.env.REACT_APP_API_URL}api/v1/orderStripe/create-checkout-session`,
              {
                items: itemsToSend,
                shipping: {
                  ...orderData.shippingAddress,
                  phoneNumber: orderData.phoneNumber,
                },
              },
              {
                headers: {
                  authorization: `Bearer ${user?.token}`,
                },
              }
            );

            window.location.href = data.url;
          } catch (error) {
            console.log(error);
          }
        }
      } catch (error) {
        setErrors(error.errors[0]);
      }
    }
  };

  return (
    <Box width="80%" m="100px auto">
      <Stepper activeStep={activeStep} sx={{ m: "20px 0" }}>
        <Step>
          <StepLabel>Billing</StepLabel>
        </Step>
        <Step>
          <StepLabel>Payment</StepLabel>
        </Step>
      </Stepper>
      <Box>
        {errors && (
          <Alert severity="error" sx={{ marginBlock: "12xpx" }}>
            {errors}
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          {isFirstStep && (
            <Shipping values={orderData} setOrderData={setOrderData} />
          )}
          {isSecondStep && (
            <Payment values={orderData} setOrderData={setOrderData} />
          )}
          <Box display="flex" justifyContent="space-between" gap="50px">
            {!isFirstStep && (
              <Button
                fullWidth
                color="primary"
                variant="contained"
                sx={{
                  backgroundColor: shades.primary[200],
                  boxShadow: "none",
                  color: "white",
                  borderRadius: 0,
                  padding: "15px 40px",
                }}
                onClick={() => setActiveStep(activeStep - 1)}
              >
                Back
              </Button>
            )}
            <Button
              fullWidth
              type="submit"
              color="primary"
              variant="contained"
              sx={{
                backgroundColor: shades.primary[400],
                boxShadow: "none",
                color: "white",
                borderRadius: 0,
                padding: "15px 40px",
              }}
            >
              {!isSecondStep ? (
                "Next"
              ) : !error && loading ? (
                <ClipLoader color="#ffffff" size={35} />
              ) : (
                "Place Your Order"
              )}
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Checkout;

// import { useSelector } from "react-redux";
// import { Box, Button, Stepper, Step, StepLabel } from "@mui/material";
// import { Formik } from "formik";
// import { useState } from "react";
// import * as yup from "yup";
// import { shades } from "../../theme";
// import Payment from "./PaymentForm";
// import Shipping from "./Shipping";
// import { loadStripe } from "@stripe/stripe-js";

// const stripePromise = loadStripe(
//   "pk_test_51LgU7yConHioZHhlAcZdfDAnV9643a7N1CMpxlKtzI1AUWLsRyrord79GYzZQ6m8RzVnVQaHsgbvN1qSpiDegoPi006QkO0Mlc"
// );

// const Checkout = () => {
//   const [activeStep, setActiveStep] = useState(0);
//   const cart = useSelector((state) => state.cartState.items);
//   const {user} = useSelector((state) => state.userstate);
//   const isFirstStep = activeStep === 0;
//   const isSecondStep = activeStep === 1;

//   const handleFormSubmit = async (values, actions) => {
//     setActiveStep(activeStep + 1);

//     // this copies the billing address onto shipping address
//     if (isFirstStep && values.shippingAddress.isSameAddress) {
//       actions.setFieldValue("shippingAddress", {
//         ...values.billingAddress,
//         isSameAddress: true,
//       });
//     }

//     if (isSecondStep) {
//       makePayment(values);
//     }

//     actions.setTouched({});
//   };

//   async function makePayment(values) {
//     const stripe = await stripePromise;
//     const requestBody = {
//       userName: [values.firstName, values.lastName].join(" "),
//       email: values.email,
//       items: cart?.map(({ productId, qty }) => ({
//         productId,
//         qty,
//       })),
//     };

//     const response = await fetch("process.env.REACT_APP_API_URLapi/v1/orderStripe/create-checkout-session", {
//       method: "POST",
//       headers: { "Content-Type": "application/json",
//     authorization : `Bearer ${user.token}` },
//       body: JSON.stringify(requestBody),
//     });
//     const session = await response.json();
//     await stripe.redirectToCheckout({
//       sessionId: session.id,
//     });
//   }

//   return (
//     <Box width="80%" m="100px auto">
//       <Stepper activeStep={activeStep} sx={{ m: "20px 0" }}>
//         <Step>
//           <StepLabel>Billing</StepLabel>
//         </Step>
//         <Step>
//           <StepLabel>Payment</StepLabel>
//         </Step>
//       </Stepper>
//       <Box>
//         <Formik
//           onSubmit={handleFormSubmit}
//           initialValues={initialValues}
//           validationSchema={checkoutSchema[activeStep]}
//         >
//           {({
//             values,
//             errors,
//             touched,
//             handleBlur,
//             handleChange,
//             handleSubmit,
//             setFieldValue,
//           }) => (
//             <form onSubmit={handleSubmit}>
//               {isFirstStep && (
//                 <Shipping
//                   values={values}
//                   errors={errors}
//                   touched={touched}
//                   handleBlur={handleBlur}
//                   handleChange={handleChange}
//                   setFieldValue={setFieldValue}
//                 />
//               )}
//               {isSecondStep && (
//                 <Payment
//                   values={values}
//                   errors={errors}
//                   touched={touched}
//                   handleBlur={handleBlur}
//                   handleChange={handleChange}
//                   setFieldValue={setFieldValue}
//                 />
//               )}
//               <Box display="flex" justifyContent="space-between" gap="50px">
//                 {!isFirstStep && (
//                   <Button
//                     fullWidth
//                     color="primary"
//                     variant="contained"
//                     sx={{
//                       backgroundColor: shades.primary[200],
//                       boxShadow: "none",
//                       color: "white",
//                       borderRadius: 0,
//                       padding: "15px 40px",
//                     }}
//                     onClick={() => setActiveStep(activeStep - 1)}
//                   >
//                     Back
//                   </Button>
//                 )}
//                 <Button
//                   fullWidth
//                   type="submit"
//                   color="primary"
//                   variant="contained"
//                   sx={{
//                     backgroundColor: shades.primary[400],
//                     boxShadow: "none",
//                     color: "white",
//                     borderRadius: 0,
//                     padding: "15px 40px",
//                   }}
//                 >
//                   {!isSecondStep ? "Next" : "Place Order"}
//                 </Button>
//               </Box>
//             </form>
//           )}
//         </Formik>
//       </Box>
//     </Box>
//   );
// };

// const initialValues = {
//   billingAddress: {
//     firstName: "",
//     lastName: "",
//     country: "",
//     street1: "",
//     street2: "",
//     city: "",
//     state: "",
//     zipCode: "",
//   },
//   shippingAddress: {
//     isSameAddress: true,
//     firstName: "",
//     lastName: "",
//     country: "",
//     street1: "",
//     street2: "",
//     city: "",
//     state: "",
//     zipCode: "",
//   },
//   email: "",
//   phoneNumber: "",
// };

// const checkoutSchema = [
//   yup.object().shape({
//     billingAddress: yup.object().shape({
//       firstName: yup.string().required("required"),
//       lastName: yup.string().required("required"),
//       country: yup.string().required("required"),
//       street1: yup.string().required("required"),
//       street2: yup.string(),
//       city: yup.string().required("required"),
//       state: yup.string().required("required"),
//       zipCode: yup.string().required("required"),
//     }),
//     shippingAddress: yup.object().shape({
//       isSameAddress: yup.boolean(),
//       firstName: yup.string().when("isSameAddress", {
//         is: false,
//         then: yup.string().required("required"),
//       }),
//       lastName: yup.string().when("isSameAddress", {
//         is: false,
//         then: yup.string().required("required"),
//       }),
//       country: yup.string().when("isSameAddress", {
//         is: false,
//         then: yup.string().required("required"),
//       }),
//       street1: yup.string().when("isSameAddress", {
//         is: false,
//         then: yup.string().required("required"),
//       }),
//       street2: yup.string(),
//       city: yup.string().when("isSameAddress", {
//         is: false,
//         then: yup.string().required("required"),
//       }),
//       state: yup.string().when("isSameAddress", {
//         is: false,
//         then: yup.string().required("required"),
//       }),
//       zipCode: yup.string().when("isSameAddress", {
//         is: false,
//         then: yup.string().required("required"),
//       }),
//     }),
//   }),
//   yup.object().shape({
//     email: yup.string().required("required"),
//     phoneNumber: yup.string().required("required"),
//   }),
// ];

// export default Checkout;

// import {
//   Box,
//   Container,
//   FormControl,
//   InputLabel,
//   MenuItem,
//   Paper,
//   Select,
//   ThemeProvider,
//   Typography,
//   createTheme,
// } from "@mui/material";
// import React, { useState } from "react";
// import { Button } from "../../styles/Button";
// import axios from "axios";
// import { useSelector } from "react-redux";

// const theme = createTheme();

// const Checkout = () => {
//   const [paymentMethod, setPaymentMethod] = useState("cod");
//   const {cart} = useSelector(state => state.cartState)
//   const {user} = useSelector(state => state.userstate)

//   const handleChange = (e) => {
//     setPaymentMethod(e.target.value);
//   };

//   const handleOrder = async (e) => {
//     e.preventDefault();
//     if (paymentMethod === "cod") {
//       console.log("Cash on Delivery");
//     } else {
//       try {
//         let {data} = await axios.post("process.env.REACT_APP_API_URLapi/v1/orderStripe/create-checkout-session", {
//         items : cart.items.map((item) => {
//           return {
//             productId : item.productId,
//             qty : item.qty
//           }
//         })
//       }, {
//         headers : {
//           "Content-Type" : "application/json",
//           authorization : `Bearer ${user.token}`
//         }
//       })
//       // console.log(data)
//       window.location.href = data.url

//       } catch (error) {

//       }
//     }
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <Container component="main" maxWidth="xl" sx={{ mb: 4 }}>
//         <Box
//           sx={{
//             my: {
//               xs: 2,
//               md: 3,
//             },
//             p: {
//               xs: 2,
//               md: 5,
//             },
//           }}
//         >
//           <Typography
//             textAlign={"center"}
//             sx={{
//               fontFamily: "'Jost', sans-serif",
//               fontSize: "32px",
//               fontWeight: "500",
//               lineHeight: "1.33",
//             }}
//           >
//             Choose Payment Method :
//           </Typography>
//           <Box
//             sx={{
//               maxWidth: "400px",
//               marginInline: "auto",
//               marginTop: "30px",
//               boxShadow: "2px 2px 10px #ced4da",
//               padding: "50px 30px",
//             }}
//           >
//             <FormControl fullWidth>
//               <InputLabel id="demo-simple-select-label">
//                 Payment Method
//               </InputLabel>
//               <Select
//                 labelId="demo-simple-select-label"
//                 id="demo-simple-select"
//                 value={paymentMethod}
//                 label="Payment Method"
//                 onChange={handleChange}
//               >
//                 <MenuItem value={"cod"}>Cash On Delivery</MenuItem>
//                 <MenuItem value={"card"}>Online Payment (Card Only)</MenuItem>
//               </Select>
//             </FormControl>
//             <Button
//               onClick={handleOrder}
//               style={{
//                 marginTop: "20px",
//                 width: "100%",
//               }}
//             >
//               {paymentMethod === "cod" ? "Place Order" : "Pay Now"}
//             </Button>
//           </Box>
//         </Box>
//       </Container>
//     </ThemeProvider>
//   );
// };

// export default Checkout;

// // import * as React from 'react';
// // import CssBaseline from '@mui/material/CssBaseline';
// // import AppBar from '@mui/material/AppBar';
// // import Box from '@mui/material/Box';
// // import Container from '@mui/material/Container';
// // import Paper from '@mui/material/Paper';
// // import Stepper from '@mui/material/Stepper';
// // import Step from '@mui/material/Step';
// // import StepLabel from '@mui/material/StepLabel';
// // import Button from '@mui/material/Button';
// // import Link from '@mui/material/Link';
// // import Typography from '@mui/material/Typography';
// // import { createTheme, ThemeProvider } from '@mui/material/styles';
// // import AddressForm from './AddressForm';
// // import PaymentForm from './PaymentForm';
// // import Review from './Review';

// // const steps = ['Shipping address', 'Payment details', 'Review your order'];

// // const theme = createTheme();

// // export default function Checkout() {
// //   const [orderData, setOrderData] = React.useState({
// //     firstName : '',
// //     lastName : "",
// //     address1 : "",
// //     address2 : "",
// //     city  : "",
// //     state : "",
// //     zip : "",
// //     country : "",
// //     cardName : '',
// //     cardNumber : '',
// //     cardExpiry : "",
// //     cardCVV : ""
// //   })

// //   const [activeStep, setActiveStep] = React.useState(0);

// //   const handleNext = () => {
// //     if(activeStep === 0 && orderData.firstName !== "" && orderData.lastName !== "" &&orderData.address1 !== "" &&orderData.address2 !== "" &&orderData.city !== "" &&orderData.state !== "" &&orderData.zip !== "" &&orderData.country !== "" ){
// //       setActiveStep(activeStep + 1);
// //     }else if(activeStep === 1 && orderData.cardName !== "" && orderData.cardNumber !== "" && orderData.cardExpiry !== "" && orderData.cardCVV !== ""){
// //       setActiveStep(activeStep + 1);
// //     }else if(activeStep === 2){
// //       setActiveStep(activeStep + 1);
// //     }else{
// //       alert("All Fields are mandatory")
// //     }

// //   };

// //   const handleBack = () => {
// //     setActiveStep(activeStep - 1);
// //   };

// //   const handleFormChange = (e) => {
// //     setOrderData({
// //       ...orderData,
// //       [e.target.name] : e.target.value
// //     })
// //   }

// //   function getStepContent(step) {
// //     switch (step) {
// //       case 0:
// //         return <AddressForm handleFormChange={handleFormChange} orderData={orderData} />;
// //       case 1:
// //         return <PaymentForm handleFormChange={handleFormChange} orderData={orderData} />;
// //       case 2:
// //         return <Review handleFormChange={handleFormChange} orderData={orderData} />;
// //       default:
// //         throw new Error('Unknown step');
// //     }
// //   }

// //   return (
// //     <ThemeProvider theme={theme}>
// //       <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
// //         <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
// //           <Typography component="h1" variant="h4" align="center">
// //             Checkout
// //           </Typography>
// //           <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
// //             {steps.map((label) => (
// //               <Step key={label}>
// //                 <StepLabel>{label}</StepLabel>
// //               </Step>
// //             ))}
// //           </Stepper>
// //           {activeStep === steps.length ? (
// //             <React.Fragment>
// //               <Typography variant="h5" gutterBottom>
// //                 Thank you for your order.
// //               </Typography>
// //               <Typography variant="subtitle1">
// //                 Your order number is #2001539. We have emailed your order
// //                 confirmation, and will send you an update when your order has
// //                 shipped.
// //               </Typography>
// //             </React.Fragment>
// //           ) : (
// //             <React.Fragment>
// //               {getStepContent(activeStep)}
// //               <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
// //                 {activeStep !== 0 && (
// //                   <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
// //                     Back
// //                   </Button>
// //                 )}
// //                 <Button
// //                   variant="contained"
// //                   onClick={handleNext}
// //                   sx={{ mt: 3, ml: 1 }}
// //                 >
// //                   {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
// //                 </Button>
// //               </Box>
// //             </React.Fragment>
// //           )}
// //         </Paper>
// //       </Container>
// //     </ThemeProvider>
// //   );
// // }
