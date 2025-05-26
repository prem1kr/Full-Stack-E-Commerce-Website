import { Avatar, Box, Switch, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { Button } from "../styles/Button";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, updateAdmin } from "../slices/userSlice";

const OrderPanelItem = ({ singleOrder }) => {
  const { user } = useSelector((state) => state.userstate);
  const dispatch = useDispatch();

  return (
    <div>
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
        height={"90px"}
        overflow={"hidden"}
        borderBottom={"1px solid #e2e2e2"}
        marginBottom={1}
      >
        <Box
          display={"flex"}
          height={"100%"}
          width={"65%"}
          alignItems={"center"}
          overflow={"hidden"}
          py={2.2}
        >
          <Box px={"20px"} alignSelf={"flex-start"}>
            <Avatar>
              {singleOrder?.shipping?.firstName.charAt(0).toUpperCase() +
                singleOrder?.shipping?.lastName.charAt(0).toUpperCase()}
            </Avatar>
          </Box>
          <Box
            display={"flex"}
            justifyItems={"flex-start"}
            height={"100%"}
            gap={1}
          >
            <Box width={"300px"}>
              <Typography
                variant="h3"
                sx={{
                  fontSize: "18px",
                  fontWeight: "500",
                  fontFamily: "'Jost', sans-serif",
                  lineHeight: "1.11",
                  wordWrap: "break-word",
                  color: "black",
                  mb: 1,
                }}
              >
                Name :{" "}
                {`${singleOrder?.shipping?.firstName} ${singleOrder?.shipping?.lastName}`}
              </Typography>
              <Typography
                variant="h3"
                sx={{
                  fontSize: "13px",
                  fontWeight: "500",
                  fontFamily: "'Jost', sans-serif",
                  lineHeight: "1.11",
                  wordWrap: "break-word",
                  color: "#A0A0A0",
                }}
              >
                Order-Id : {singleOrder._id}
              </Typography>
            </Box>
            <Box>
              <Typography
                variant="h3"
                sx={{
                  fontSize: "13px",
                  fontWeight: "500",
                  fontFamily: "'Jost', sans-serif",
                  lineHeight: "1.11",
                  wordWrap: "break-word",
                  color: "#A0A0A0",
                  marginBlock: "10px",
                }}
              >
                Payment Status : {singleOrder.payment_status.charAt(0).toUpperCase() + singleOrder.payment_status.slice(1)}
              </Typography>
              <Typography
                variant="h3"
                sx={{
                  fontSize: "13px",
                  fontWeight: "500",
                  fontFamily: "'Jost', sans-serif",
                  lineHeight: "1.11",
                  wordWrap: "break-word",
                  color: "#A0A0A0",
                  marginBlock: "10px",
                }}
              >
                Delivery Status : {singleOrder.delivery_status.charAt(0).toUpperCase() + singleOrder.delivery_status.slice(1)}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          py={2.2}
          height={"100%"}
          px={3}
          width={"35%"}
          textAlign={"right"}
          display={"flex"}
          flexDirection={"column"}
          gap={2}
          alignItems={"flex-end"}
        >
          <Button style={{ width: "30%" }}>Update</Button>
          {/* <Button style={{ width: "30%" }}>Update</Button> */}
        </Box>
      </Box>
    </div>
  );
};

export default OrderPanelItem;
