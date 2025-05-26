import React, { useState } from "react";
import BreadcrumbPart from "../components/BreadcrumbPart";
import { Grid, Alert } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../styles/Button";
import CartItem from "../components/CartItem";
const Cart = () => {
  const { cart, totalQty, totalAmount } = useSelector(
    (state) => state.cartState
  );
  const { user } = useSelector((state) => state.userstate);

    let gstPercent = Number((totalAmount * 0.10).toFixed(0))
  
  return (
    <div>
      <BreadcrumbPart title={`${user ? user.username + "'s" : "Your"} Cart`} />
      {!user && (
        <div
          className="container"
          style={{ marginBlock: "80px", minHeight: "80vh" }}
        >
          <Alert severity="warning">
            You are not logged in. Please Login to Access your cart. Click{" "}
            <Link to="/login">Here</Link> to Login
          </Alert>
        </div>
      )}
      {user && cart?.items.length < 1 && (
        <div
          className="container"
          style={{ marginBlock: "80px", minHeight: "80vh" }}
        >
          <Alert severity="info">
            You Don't Have any items in your cart right now.{" "}
            <Link to="/products">Shop Now</Link>
          </Alert>
        </div>
      )}

      {user && cart?.items.length !== 0 && (
        <>
          <Grid container maxWidth={"80rem"} mx={"auto"} mt={4} mb={6}>
            <Grid item xs={12} lg={7} px={2}>
              {cart?.items.map((item) => (
                <CartItem disabled={true} item={item} key={item.productId} />
              ))}
            </Grid>
            <Grid item xs={12} lg={1}></Grid>

            <Grid item xs={12} lg={4} px={2}>
              <CheckoutBox>
                <div className="productBox">
                  <h2>Products</h2>
                  <p>Subtotal</p>
                </div>
                <div className="productLists">
                  {cart &&
                    cart.items.map((item) => (
                      <div key={item.productId}>
                        <p>
                          {item.productName.slice(0, 15)}... X {item.qty}
                        </p>
                        <p>Rs. {(item.price * item.qty).toLocaleString("en-IN")}</p>
                      </div>
                    ))}
                </div>
                <div className="subtotalBox">
                  {/* <div>
                    <p>GST 18% : </p>
                    <p>Rs. 199</p>
                  </div> */}

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
              </CheckoutBox>
              <Button style={{ marginTop: "20px", width: "100%" }}>
                <Link style={{ fontSize: "inherit" }} to={"/checkout"}>
                  CheckOut
                </Link>
              </Button>
            </Grid>
          </Grid>
        </>
      )}
    </div>
  );
};

const CheckoutBox = styled.div`
  background-color: #f5f5f5;
  padding: 5px 30px;

  .productBox {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0 10px;
    font-size: 16px;
    border-bottom: 1px solid #e2e2e2;

    h2,
    p {
      font-size: 18px;
      font-weight: 500;
      margin-bottom: 0;
    }
  }
  .productLists {
    padding: 20px 0 10px 0;
    div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;

      p {
        font-size: 15px;
        font-weight: normal;
        margin: 0;
      }
    }
  }

  .subtotalBox {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    gap: 15px;
    padding: 20px 0;
    font-size: 16px;
    border-block: 1px solid #e2e2e2;

    div {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    h2,
    p {
      font-size: 16px;
      font-weight: normal;
      margin-bottom: 0;
    }
  }

  .shippingBox {
    padding: 20px 0;
    border-bottom: 1px solid #e2e2e2;
    display: flex;
    justify-content: space-between;

    h2 {
      font-size: 18px;
      font-weight: 500;
    }
    p {
        font-size: 14px;
        font-weight: normal;
        margin: 0;
      }

    /* div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;

      
    } */
  }
  .totalBox {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 20px;
    padding-bottom: 10px;

    h2,
    h3 {
      font-size: 18px;
      font-weight: 500;
    }
  }
`;
export default Cart;
