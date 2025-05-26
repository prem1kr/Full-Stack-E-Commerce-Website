import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { removeFromWishList } from "../slices/wishListSlice";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { Button } from "../styles/Button";
import { addToCart } from "../slices/CartSlice";

const WishListItem = ({ item }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.userstate);

  const handleAddToCart = (product) => {
    if (user) {
      let cartItem = {
        productId: product?._id,
        productName: product?.productName,
        productImage: product?.productImage,
        countInStock: parseInt(product?.countInStock),
        price: parseInt(product?.price),
        qty: 1,
      };

      dispatch(addToCart({ token: user.token, product: cartItem }));
    } else {
      navigate("/login");
    }
  };

  return (
    <WishListItemBox>
      <div className="item-thumbnail">
        <img src={item.productImage} alt="" />
      </div>
      <div className="item-detail">
        <div className="main-detail">
          <h2 title={item.productName}>{item.productName.length > 30 ? item.productName.slice(0, 30) + "..." : item.productName}</h2>
          <p>Rs. {item.price}</p>
        </div>
        <div className="actions">
          <p
            onClick={() => {
              dispatch(
                removeFromWishList({ productId: item.productId, token: user.token })
              );
            }}
          >
            {" "}
            x Remove
          </p>
          <Button
            style={{
              backgroundColor: "#4B3049",
              fontSize: "16px",
              textTransform: "capitalize",
              fontWeight: "500",
              fontFamily: "'Jost', sans-serif",
              display: "flex",
              alignItems: "center",
              gap: "13px",
            }}
            onClick={() => handleAddToCart(item)}
          >
            Add To Cart <ShoppingBagOutlinedIcon style={{ marginBottom: "5px" }} />
          </Button>
        </div>
      </div>
    </WishListItemBox>
  )
}
const WishListItemBox = styled.div`
  display: flex;
  padding: 20px 0;
  /* align-items: center; */
  border-bottom: 1px solid #e2e2e2;
  height: 160px;

  .item-thumbnail {
    width: 25%;
    height: 100%;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      object-position: center;
      // filter : drop-shadow(1px 1px 8px lightgray)
      // box-shadow : 1px 1px 8px lightgray
    }
  }
  .item-detail {
    padding-left: 30px;
    width: 75%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 5px;

    .main-detail {
      display: flex;
      justify-content: space-between;

      h2 {
        font-size: 25px;
        font-weight: 500;
        text-transform: capitalize;
      }
    }

    .actions {
      display: flex;
      justify-content: space-between;
      align-items: center;

      p:first-child {
        color: #919191;
        font-size: 14px;
        cursor: pointer;
        padding: 6px 10px;

        &:hover {
          background-color: #e2e2e2;
          color: #4b3049;
        }
      }
    }
  }
`;


export default WishListItem
