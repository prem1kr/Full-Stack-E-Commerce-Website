import React from 'react'
import BreadcrumbPart from "../components/BreadcrumbPart";
import { Grid, Alert } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../styles/Button";
import WishListItem from "../components/WishListItem";


function WishList() {
  const { wishList } = useSelector(
    (state) => state.wishLishState
  );
  const { user } = useSelector((state) => state.userstate);

  console.log(wishList)


  return (
    <div>
      <BreadcrumbPart title={`${user ? user.username + "'s" : "Your"} WishList`} />
      {!user && (
        <div
          className="container"
          style={{ marginBlock: "80px", minHeight: "80vh" }}
        >
          <Alert severity="warning">
            You are not logged in. Please Login to Access your wishlist. Click{" "}
            <Link to="/login">Here</Link> to Login
          </Alert>
        </div>
      )}
      {user && wishList?.items.length < 1 && (
        <div
          className="container"
          style={{ marginBlock: "80px", minHeight: "80vh" }}
        >
          <Alert severity="info">
            You Don't Have any items in your wishlist right now.{" "}
            <Link to="/products">Shop Now</Link>
          </Alert>
        </div>
      )}

      {user && wishList?.items.length !== 0 && (
        <>
          <Grid container maxWidth={"75rem"} mx={"auto"} minHeight={"80vh"}>
            <Grid item xs={12} px={4} py={5} >
              {wishList?.items.map((item) => (
                <WishListItem item={item} key={item.productId} />
              ))}
            </Grid>
            {/* <Grid item xs={12} lg={1}></Grid> */}

            {/* <Grid item xs={12} lg={4} px={2}> */}
            {/* <CheckoutBox>
                <div className="productBox">
                  <h2>Products</h2>
                  <p>Subtotal</p>
                </div>
                <div className="productLists">
                  {wishlist &&
                    wishlist.items.map((item) => (
                      <div key={item.productId}>
                        <p>
                          {item.productName.slice(0, 15)}... X {item.qty}
                        </p>
                        <p>Rs. {(item.price * item.qty).toLocaleString("en-IN")}</p>
                      </div>
                    ))}
                </div>
                <div className="subtotalBox">
                  <div>
                    <p>Total Items : </p>
                    <p>{totalQty}</p>
                  </div>

                  <div>
                    <h2>Subtotal : </h2>
                    <p>Rs. {totalAmount.toLocaleString("en-IN")}</p>
                  </div>
                </div>
                <div className="shippingBox">
                  <h2>
                    Shipping 
                  </h2>
  
                  <p>GST 10% : Rs.{gstPercent.toLocaleString("en-IN")}</p>
                  
                </div>
                <div className="totalBox">
                  <h2>Total : </h2>
                  <h3>Rs. {(totalAmount + gstPercent).toLocaleString("en-IN")}</h3>
                </div>
              </CheckoutBox> */}
            {/* <Button style={{ marginTop: "20px", width: "100%" }}>
                <Link style={{ fontSize: "inherit" }} to={"/checkout"}>
                  CheckOut
                </Link>
              </Button> */}
            {/* </Grid> */}
          </Grid>
        </>
      )}
    </div>
  )
}

export default WishList
