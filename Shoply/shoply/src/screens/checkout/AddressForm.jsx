import { getIn } from "formik";
import { Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import useMediaQuery from "@mui/material/useMediaQuery";

const AddressForm = ({ type, values, setOrderData }) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  // these functions allow for better code readability
  const formattedName = (field) => `${type}.${field}`;

  // const formattedError = (field) =>
  //   Boolean(
  //     getIn(touched, formattedName(field)) &&
  //       getIn(errors, formattedName(field))
  //   );

  // const formattedHelper = (field) =>
  //   getIn(touched, formattedName(field)) && getIn(errors, formattedName(field));

  return (
    <Box
      display="grid"
      gap="15px"
      gridTemplateColumns="repeat(4, minmax(0, 1fr))"
      sx={{
        "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
      }}
    >
      <TextField
        fullWidth
        type="text"
        label="First Name"
        onChange={(e) => {
          if (type === "billingAddress") {
            setOrderData({
              ...values,
              billingAddress: {
                ...values.billingAddress,
                firstName: e.target.value,
              },
              shippingAddress: {
                ...values.shippingAddress,
              },
            });
          } else if (type === "shippingAddress") {
            setOrderData({
              ...values,
              billingAddress: {
                ...values.billingAddress,
              },
              shippingAddress: {
                ...values.shippingAddress,
                firstName: e.target.value,
              },
            });
          }
        }}
        value={values[type].firstName}
        name={formattedName("firstName")}
        sx={{ gridColumn: "span 2" }}
        // required
      />
      <TextField
        fullWidth
        type="text"
        label="Last Name"
        onChange={(e) => {
          if (type === "billingAddress") {
            setOrderData({
              ...values,
              billingAddress: {
                ...values.billingAddress,
                lastName: e.target.value,
              },
              shippingAddress: {
                ...values.shippingAddress,
              },
            });
          } else if (type === "shippingAddress") {
            setOrderData({
              ...values,
              billingAddress: {
                ...values.billingAddress,
              },
              shippingAddress: {
                ...values.shippingAddress,
                lastName: e.target.value,
              },
            });
          }
        }}
        value={values[type].lastName}
        name={formattedName("lastName")}
        sx={{ gridColumn: "span 2" }}
        // required
      />
      <TextField
        fullWidth
        type="text"
        label="Country"
        onChange={(e) => {
          if (type === "billingAddress") {
            setOrderData({
              ...values,
              billingAddress: {
                ...values.billingAddress,
                country: e.target.value,
              },
              shippingAddress: {
                ...values.shippingAddress,
              },
            });
          } else if (type === "shippingAddress") {
            setOrderData({
              ...values,
              billingAddress: {
                ...values.billingAddress,
              },
              shippingAddress: {
                ...values.shippingAddress,
                country: e.target.value,
              },
            });
          }
        }}
        value={values[type].country}
        name={formattedName("country")}
        sx={{ gridColumn: "span 4" }}
        // required
      />
      <TextField
        fullWidth
        type="text"
        label="Street Address"
        onChange={(e) => {
          if (type === "billingAddress") {
            setOrderData({
              ...values,
              billingAddress: {
                ...values.billingAddress,
                street1: e.target.value,
              },
              shippingAddress: {
                ...values.shippingAddress,
              },
            });
          } else if (type === "shippingAddress") {
            setOrderData({
              ...values,
              billingAddress: {
                ...values.billingAddress,
              },
              shippingAddress: {
                ...values.shippingAddress,
                street1: e.target.value,
              },
            });
          }
        }}
        value={values[type].street1}
        name={formattedName("street1")}
        sx={{ gridColumn: "span 2" }}
        // required
      />
      <TextField
        fullWidth
        type="text"
        label="Street Address 2 (optional)"
        onChange={(e) => {
          if (type === "billingAddress") {
            setOrderData({
              ...values,
              billingAddress: {
                ...values.billingAddress,
                street2: e.target.value,
              },
              shippingAddress: {
                ...values.shippingAddress,
              },
            });
          } else if (type === "shippingAddress") {
            setOrderData({
              ...values,
              billingAddress: {
                ...values.billingAddress,
              },
              shippingAddress: {
                ...values.shippingAddress,
                street2: e.target.value,
              },
            });
          }
        }}
        value={values[type].street2}
        name={formattedName("street2")}
        sx={{ gridColumn: "span 2" }}
        // required
      />
      <TextField
        fullWidth
        type="text"
        label="City"
        onChange={(e) => {
          if (type === "billingAddress") {
            setOrderData({
              ...values,
              billingAddress: {
                ...values.billingAddress,
                city: e.target.value,
              },
              shippingAddress: {
                ...values.shippingAddress,
              },
            });
          } else if (type === "shippingAddress") {
            setOrderData({
              ...values,
              billingAddress: {
                ...values.billingAddress,
              },
              shippingAddress: {
                ...values.shippingAddress,
                city: e.target.value,
              },
            });
          }
        }}
        value={values[type].city}
        name={formattedName("city")}
        sx={{ gridColumn: "span 2" }}
        // required
      />
      <TextField
        fullWidth
        type="text"
        label="State"
        onChange={(e) => {
          if (type === "billingAddress") {
            setOrderData({
              ...values,
              billingAddress: {
                ...values.billingAddress,
                state: e.target.value,
              },
              shippingAddress: {
                ...values.shippingAddress,
              },
            });
          } else if (type === "shippingAddress") {
            setOrderData({
              ...values,
              billingAddress: {
                ...values.billingAddress,
              },
              shippingAddress: {
                ...values.shippingAddress,
                state: e.target.value,
              },
            });
          }
        }}
        value={values[type].state}
        name={formattedName("state")}
        sx={{ gridColumn: "1fr" }}
        // required
      />
      <TextField
        fullWidth
        type="text"
        label="Zip Code"
        onChange={(e) => {
          if (type === "billingAddress") {
            setOrderData({
              ...values,
              billingAddress: {
                ...values.billingAddress,
                zipCode: e.target.value,
              },
              shippingAddress: {
                ...values.shippingAddress,
              },
            });
          } else if (type === "shippingAddress") {
            setOrderData({
              ...values,
              billingAddress: {
                ...values.billingAddress,
              },
              shippingAddress: {
                ...values.shippingAddress,
                zipCode: e.target.value,
              },
            });
          }
        }}
        value={values[type].zipCode}
        name={formattedName("zipCode")}
        sx={{ gridColumn: "1fr" }}
        // required
      />
    </Box>
  );
};

export default AddressForm;
