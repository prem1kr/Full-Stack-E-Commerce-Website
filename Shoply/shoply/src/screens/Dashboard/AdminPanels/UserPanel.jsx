import React, { useEffect, useState } from 'react'
import { Box, Pagination, Typography } from "@mui/material";
import Title from './Title';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { fetchAllUsers } from '../../../slices/userSlice';
import UserPanelItem from '../../../components/UserPanelItem';
import { paginate } from '../../../utils/utils';
import { Bounce, toast } from "react-toastify";

const UserPanel = () => {
  const dispatch = useDispatch()
  const {allUsers, user, error, loading} = useSelector(state => state.userstate)
  const [pageSize, setPageSize] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    user && dispatch(fetchAllUsers({token : user.token}))
  }, [])

  
  useEffect(() => {
    if(error && !loading){
      toast.success(error, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        transition: Bounce,
      })
    }
  }, [error, loading])

  const handlePageChange = (e, value) => {
    setCurrentPage(value);
  };

  const paginatedResult = allUsers && paginate(allUsers, currentPage - 1, pageSize);

  return (
    <Box
      sx={{
        padding: "30px 60px",
      }}
    >
      <Title heading={"Users"}/>
      <Box mt={4} bgcolor={"whitesmoke"}>
        {allUsers &&
          paginatedResult &&
          paginatedResult.map((singleUser) => (
            <UserPanelItem key={singleUser._id} singleUser={singleUser} />
          ))}
        { allUsers && (
          <Box
            py={3}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Pagination
              count={Math.ceil(allUsers.length / pageSize)}
              color="primary"
              page={currentPage}
              onChange={handlePageChange}
            />
          </Box>
        )}
      </Box>
     
    </Box>
  )
}

export default UserPanel