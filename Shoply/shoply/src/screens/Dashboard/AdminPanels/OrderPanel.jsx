import React, { useEffect, useState } from 'react'
import { Box, Pagination, Typography } from "@mui/material";
import Title from './Title';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllOrders } from '../../../slices/orderSlice';
import { Bounce, toast } from 'react-toastify';
import { paginate } from '../../../utils/utils';
import OrderPanelItem from '../../../components/OrderPanelItem';

const OrderPanel = () => {
  const dispatch = useDispatch()
  const {user} = useSelector(state => state.userstate)
  const {orders, error, loading} = useSelector(state => state.orderState)


  const [pageSize, setPageSize] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    user && dispatch(fetchAllOrders(user?.token))
  }, [])

  
  useEffect(() => {
    if(error && !loading){
      toast.error(error, {
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

  const paginatedResult = orders?.length > 0 && paginate(orders, currentPage - 1, pageSize);

  return (
    <Box
    sx={{
      padding: "30px 60px",
    }}
  >
    <Title heading={"Orders"}/>
    <Box mt={4} bgcolor={"whitesmoke"}>
        {orders &&
          paginatedResult &&
          paginatedResult.map((singleOrder) => (
            <OrderPanelItem key={singleOrder._id} singleOrder={singleOrder} />
          ))}
        { orders && (
          <Box
            py={3}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Pagination
              count={Math.ceil(orders?.length / pageSize)}
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

export default OrderPanel