import React, { useState } from "react";
import Counter from "./Counter";
import { debounce } from "lodash";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../slices/CartSlice";

const CartItem = ({ item, disabled}) => {
  const [qty, setQty] = useState(item.qty);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userstate);

  // const debouncedUpdateCartItem = debounce(() => {
  //   console.log("this is debounced update")
  // }, 500);

  // const handlePlusClick = () => {
  //   // setCount((prevCount) => prevCount + 1);
  //   debouncedUpdateCartItem();
  // };

  return (
    <CartItemBox>
      <div className="item-thumbnail">
        <img src={item.productImage} alt="" />
      </div>
      <div className="item-detail">
        <div className="main-detail">
          <h2 title={item.productName}>{item.productName.length > 30 ? item.productName.slice(0, 30)+"..." : item.productName}</h2>
          <p>Rs. {item.price}</p>
        </div>
        <div className="actions">
          <Counter disabled={disabled} qty={qty} setQty={setQty} countInStock={item.countInStock} />
          <p
            onClick={() => {
              dispatch(
                removeFromCart({ productId: item.productId, token: user.token })
              );
            }}
          >
            {" "}
            x Remove
          </p>
        </div>
      </div>
    </CartItemBox>
  );
};

const CartItemBox = styled.div`
  display: flex;
  padding: 20px 0;
  /* align-items: center; */
  border-bottom: 1px solid #e2e2e2;
  height: 230px;

  .item-thumbnail {
    width: 25%;
    height: 100%;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
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

      p:last-child {
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

export default CartItem;
