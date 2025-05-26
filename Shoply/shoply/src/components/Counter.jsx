import React from "react";
import styled from "styled-components";

const Counter = ({ qty, setQty, countInStock, disabled }) => {
  return (
    <CounterDiv>
      <button
        disabled={disabled ? true : false}
        onClick={() => {
          parseInt(qty) >= 2 && setQty((prevQty) => parseInt(prevQty - 1));
        }}
      >
        <span>-</span>
      </button>
      <input type="number" value={qty} readOnly />
      <button
        disabled={disabled ? true : false}
        onClick={() => {
          parseInt(qty) < countInStock &&
            setQty((prevQty) => parseInt(prevQty + 1));
        }}
      >
        <span>+</span>
      </button>
    </CounterDiv>
  );
};

const CounterDiv = styled.div`
  border: 1px solid lightgray;
  width: fit-content;

  button {
    padding-inline: auto;
    width: 40px;
    padding-block: 0.7rem;
    height: 100%;
    outline: none;
    border: none;
    background-color: transparent;
  }
  input {
    padding-block: 0.7rem;
    width: 30px;
    margin: 0;
    outline: none;
    border: none;
    text-align: center;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    display: none;
  }
  /* height:  51.4px; */
`;

export default Counter;
