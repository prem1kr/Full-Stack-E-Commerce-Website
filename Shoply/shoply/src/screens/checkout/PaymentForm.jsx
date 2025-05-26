import { Box, Divider, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";

const Payment = ({ values, setOrderData }) => {
  return (
    <Box m="30px 0">
      {/* CONTACT INFO */}
      <Box>
        <Typography sx={{ mb: "15px" }} fontSize="18px">
          Contact Info
        </Typography>
        <TextField
          fullWidth
          type="text"
          label="Email"
          onChange={(e) => {
            setOrderData({
              ...values,
              billingAddress: {
                ...values.billingAddress,
              },
              shippingAddress: {
                ...values.shippingAddress,
              },
              email: e.target.value,
            });
          }}
          value={values.email}
          name="email"
          sx={{ gridColumn: "span 4", marginBottom: "15px" }}
        />
        <TextField
          fullWidth
          type="text"
          label="Phone Number"
          onChange={(e) => {
            setOrderData({
              ...values,
              billingAddress: {
                ...values.billingAddress,
              },
              shippingAddress: {
                ...values.shippingAddress,
              },
              phoneNumber: e.target.value,
            });
          }}
          value={values.phoneNumber}
          name="phoneNumber"
          sx={{ gridColumn: "span 4", marginBottom: "15px"  }}
        />
        <FormControl fullWidth sx={{ gridColumn: "span 4", }}>
          <InputLabel id="demo-simple-select-label">Payment Method</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={values.paymentMethod}
            label="Payment Method"
            onChange={(e) => {
              setOrderData({
                ...values,
                billingAddress: {
                  ...values.billingAddress,
                },
                shippingAddress: {
                  ...values.shippingAddress,
                },
                paymentMethod: e.target.value,
              });
            }}
          >
            <MenuItem value={"cod"}>Cash on Delivery</MenuItem>
            <Divider color="black"/>
            <MenuItem value={"card"}>Card</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};

export default Payment;
