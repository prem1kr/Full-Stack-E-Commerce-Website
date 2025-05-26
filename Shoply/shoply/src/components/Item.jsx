import * as React from "react";
import Card from "@mui/material/Card";
import styled from "styled-components";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Box, Paper } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../slices/CartSlice";

export default function MediaCard(props) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {user} = useSelector((state) => state.userstate)

  const handleAddToCart = () => {
    if (user) {
      let cartItem = {
        productId: props?._id,
        productName: props?.name,
        productImage: props?.image,
        countInStock: props?.countInStock,
        price: props?.price,
        qty: 1,
      };

      dispatch(addToCart({ token: user.token, product: cartItem }));
    } else {
      navigate("/login");
    }
  }


  return (
    <Card
      sx={{
        height: "437px",
        display: "flex",
        flexWrap: "wrap",
        width: "300px",
        borderRadius : "0"
      }}
      elevation={1}
      
    >
      <Div>
        <Link to={`/singleproduct/${props._id}`} style={{ display: "block" }}>
          <CardMedia
            component="img"
            sx={{
              height: "321px",
            }}
            image={props.image}
            alt={props.name}
          />
        </Link>
        <div className="icon-container" onClick={handleAddToCart}>
          <ShoppingBagOutlinedIcon />
        </div>
      </Div>

      <CardContent
      // component={Paper}
        // sx={{
        //   cursor: "pointer",
        // }}
      >
        <Typography
          gutterBottom
          variant="h5"
          component="h2"
          sx={{
            fontSize: "14px",
            color: "#767676",
            display: "inline-block",
            fontFamily: "'Jost', sans-serif",
          }}
        >
          {props.category}
        </Typography>
        <Typography
        title={props.name}
          gutterBottom
          variant="h5"
          component="h2"
          sx={{
            fontSize: "16px",
            fontWeight: "500",
            fontFamily: "'Jost', sans-serif",
            lineHeight: "1.33",
            wordWrap: "break-word",
            color: "#4B3049",
          }}
        >
          {props.name.length > 25 ? `${props.name.slice(0, 25)}...` : props.name}
        </Typography>
        <Typography
          gutterBottom
          variant="h5"
          component="h2"
          sx={{
            marginTop : "6px",
            fontSize: "16px",
            fontWeight: "500",
            display: "block",
            fontFamily: "'Jost', sans-serif",
            color : "rgba(0,0,0,0.6)"
          }}
        >
          ₹{props.price.toLocaleString()}
        </Typography>
      </CardContent>
    </Card>
  );
}

const Div = styled.div`
  position: relative;
  overflow: hidden;

  .icon-container {
    position: absolute;
    bottom: -50px;
    opacity:0.1 ;
    transition-duration: 0.5s;
    left: 50%;
    transform: translateX(-50%);
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    border-radius: 50%;
    cursor: pointer;
  }
  &:hover .icon-container{
      bottom: 20px;
      opacity: 1;
    }
`;
