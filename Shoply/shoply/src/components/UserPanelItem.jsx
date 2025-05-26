import { Avatar, Box, Switch, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { Button } from "../styles/Button";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, updateAdmin } from "../slices/userSlice";


const UserPanelItem = ({ singleUser }) => {
  const { user } = useSelector((state) => state.userstate);
  const dispatch = useDispatch();
  const handleRoleChange = (e) => {
    user && dispatch(updateAdmin({ token: user.token, userId: singleUser._id }));
  };

  const handleDeleteUser= () => {
    user && dispatch(deleteUser({ token: user.token, userId: singleUser._id }))
  }

  

  return (
    <div>
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
        height={"80px"}
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
            <Avatar>{singleUser.username.charAt(0).toUpperCase()}</Avatar>
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
                Name : {singleUser.username}
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
                Email : {singleUser.email}
              </Typography>
            </Box>

            <Switch
              checked={singleUser.isAdmin}
              onChange={handleRoleChange}
              inputProps={{ "aria-label": "controlled" }}
            />
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
          <Button style={{ width: "30%" }} onClick={handleDeleteUser}>Delete</Button>
          {/* <Button style={{ width: "30%" }}>Update</Button> */}
        </Box>
      </Box>
    </div>
  );
};

export default UserPanelItem;
