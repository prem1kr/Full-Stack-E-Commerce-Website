import { Box } from "@mui/material";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../slices/CartSlice";


const Confirmation = () => {
  const dispatch = useDispatch()
  const {user} = useSelector(state => state.userstate)

  useEffect(() => {
    dispatch(clearCart(user?.token))
    
  }, [])

  return (
    <Box m="90px auto" width="80%" height="50vh">
      <Alert severity="success">
        <AlertTitle>Success</AlertTitle>
        You have successfully made an Order —{" "}
        <strong>Congrats on Making your Purchase</strong>
      </Alert>
    </Box>
  );
};

export default Confirmation;