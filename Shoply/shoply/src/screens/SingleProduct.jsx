import React, { useEffect, useState } from "react";
import {
  Grid,
  Paper,
  Box,
  Typography,
  Rating,
  TextField,
  Avatar,
} from "@mui/material";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { createReview, fetchSingleProduct } from "../slices/singleProductSlice";
import { addToCart, fetchCartItems } from "../slices/CartSlice";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../styles/Button";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import Counter from "../components/Counter";
import { FaWhatsapp } from "react-icons/fa";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import {
  FacebookShareButton,
  WhatsappShareButton,
  TwitterShareButton,
  FacebookIcon,
  WhatsappIcon,
  TwitterIcon,
} from "react-share";
import { addToWishList } from "../slices/wishListSlice";


const SingleProduct = () => {
  const { _id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.userstate);
  const { product } = useSelector((state) => state.singleProduct);
  const [qty, setQty] = useState(1);
  const [customerRating, setCustomerRating] = useState(0);
  const [customerReview, setCustomerReview] = useState("");

  const handleReview = () => {
    if (customerReview && customerRating) {
      dispatch(createReview({
        productId: product?._id,
        message: customerReview,
        rating: customerRating,
        token: user?.token
      }))
      setCustomerReview("")
      setCustomerRating(0)
    }
  };

  useEffect(() => {
    _id && dispatch(fetchSingleProduct(_id));
  }, []);

  /* ------------------------- Add to Cart Handler *****************************/
  const handleAddToCart = () => {
    if (user) {
      let cartItem = {
        productId: product?._id,
        productName: product?.name,
        productImage: product?.image,
        countInStock: parseInt(product?.countInStock),
        price: parseInt(product?.price),
        qty: parseInt(qty),
      };

      dispatch(addToCart({ token: user.token, product: cartItem }));
    } else {
      navigate("/login");
    }
  };
  const handleAddToWishlist = () => {
    if (user) {
      let wishlistItem = {
        productId: product?._id,
        productName: product?.name,
        productImage: product?.image,
        price: parseInt(product?.price),
        countInStock: parseInt(product?.countInStock),
      };

      dispatch(addToWishList({ token: user.token, product: wishlistItem }));
    } else {
      navigate("/login");
    }
  };
  // const handleAddToWishList = () => {
  //   if (user) {
  //     let wishListItem = {
  //       productId: product?._id,
  //       productName: product?.name,
  //       productImage: product?.image,
  //       countInStock: parseInt(product?.countInStock),
  //       price: parseInt(product?.price),
  //       qty: parseInt(qty),
  //     };

  //     dispatch(addTowishList({ token: user.token, product: cartItem }));
  //   } else {
  //     navigate("/login");
  //   }
  // };

  /* ------------------------- This is the start of cart button component *****************************/
  const CartButton = () => {
    return (
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
        onClick={handleAddToCart}
      >
        Add To Cart <ShoppingBagOutlinedIcon style={{ marginBottom: "5px" }} />
      </Button>



    );
  };


  const owner_phone_number = 8219328779

  /* ------------------------- This is the end of cart button component *****************************/

  return (
    <Wrapper>
      <Grid container component={Paper} elevation={2} minHeight={"400px"}>
        <Grid item xs={12} lg={6} p={2}>
          <img
            src={product?.image}
            alt={product?.name}
            style={{ width: "100%" }}
          />
        </Grid>
        <Grid item xs={12} lg={6} p={2}>
          <Box>
            <Typography
              variant="body1"
              sx={{
                fontFamily: "'Jost', sans-serif",
                fontSize: "16px",
                lineHeight: "1.5",
                wordWrap: "break-word",
                color: "#767676",
                letterSpacing: "0.5px",
                mb: "5px",
              }}
            >
              {product?.category.charAt(0).toUpperCase() +
                product?.category?.slice(1) || ""}
            </Typography>
          </Box>
          <Typography
            variant="h1"
            sx={{
              fontSize: "28px",
              fontWeight: "500",
              lineHeight: "1.33",
              color: "#4B3049",
              fontFamily: "'Jost', sans-serif",
              mb: "6px",
            }}
          >
            {product?.name.charAt(0).toUpperCase() + product?.name?.slice(1) ||
              ""}
          </Typography>
          <Box display={"flex"} alignItems={"center"} mb={2}>
            <Rating precision={0.1} value={product?.rating || 0} readOnly size="small" />
            <span style={{ color: "#4B3049", marginLeft: "10px" }}>
              ({product?.numOfReviews})
            </span>
          </Box>
          <Box
            display={"flex"}
            alignItems={"center"}
            sx={{ mb: "20px", mt: "4px" }}
          >
            <Typography
              variant="h3"
              sx={{
                fontSize: "24px",
                fontWeight: "500",
                mr: "16px",
                color: "#4B3049",
                fontFamily: "'Jost', sans-serif",
              }}
            >
              {`$${product?.price.toLocaleString()}` || ""}
            </Typography>
            <span style={{ color: "#4B3049" }}>(In Stock)</span>
          </Box>

          <Box>
            <Typography
              variant="body1"
              fontWeight={600}
              mb={"3px"}
              sx={{
                fontFamily: "'Jost', sans-serif",
                color: "rgba(0,0,0,0.7)",
              }}
            >
              Description :
            </Typography>
            <Typography
              sx={{
                color: "#525252",
                fontSize: "16px",
                lineHeight: "1.5",
                fontFamily: "'Jost', sans-serif",
              }}
            >
              {product?.description}
            </Typography>
          </Box>
          <Box>
            {product?.countInStock > 0 ? (
              <>
                <Box display={"flex"} alignItems={"center"} mt={"30px"} gap={2}>
                  <CartButton />
                  <Counter
                    qty={qty}
                    setQty={setQty}
                    countInStock={product?.countInStock}
                  />
                </Box>
                <Button
                  style={{
                    marginTop: "20px",
                    backgroundColor: "#4B3049",
                    fontSize: "16px",
                    textTransform: "capitalize",
                    fontWeight: "500",
                    fontFamily: "'Jost', sans-serif",
                    display: "flex",
                    alignItems: "center",
                    gap: "13px",
                  }}
                  onClick={handleAddToWishlist}
                >
                  Add To wishlist <FavoriteBorderIcon style={{ marginBottom: "5px" }} />
                </Button>
              </>
            ) : (
              <Typography>Out of Stock</Typography>
            )}


            <Box sx={{ marginTop: "20px" }}>
              <Button
                onClick={() => {
                  const url = `https://api.whatsapp.com/send?phone=${owner_phone_number}&text=I'm interested in your ${product?.name} product.`;
                  window.open(url, "_blank");
                }}
                variant="contained"
                sx={{
                  color: "white",
                  bgcolor: "green.idle",
                  "&:hover": {
                    bgcolor: "green.main",
                  },
                }}
              >
                <FaWhatsapp
                  style={{
                    fontSize: "20px",
                    marginRight: "10px",
                  }}
                />
                Buy on WhatsApp
              </Button>
            </Box>

            <Box
              display={"flex"}
              gap={"10px"}
              mt={4}
              borderBottom={"1px solid #e2e2e2"}
              pb={"20px"}
            >
              Share :{" "}
              <FacebookShareButton
                url={window.location.href}
                windowHeight={"800px"}
                windowWidth={"800px"}
                windowPosition="windowCenter"

              >
                <FacebookIcon round={true} size={"25px"} />
              </FacebookShareButton>
              <WhatsappShareButton
                url={window.location.href}
                windowHeight={"800px"}
                windowWidth={"800px"}
                windowPosition="windowCenter"
                separator="--"
                title={product?.name}
              >
                <WhatsappIcon round={true} size={"25px"} />
              </WhatsappShareButton>
              <TwitterShareButton
                url={window.location.href}
                windowHeight={"800px"}
                windowWidth={"800px"}
                windowPosition="windowCenter"
              >
                <TwitterIcon round={true} size={"25px"} />
              </TwitterShareButton>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Box
        sx={{
          marginTop: {
            xs: "15px",
            md: "20px",
          },

          paddingBlock: {
            xs: "10px",
            lg: "20px",
          },
        }}
      >
        <Grid container component={Paper} elevation={4}>
          <Grid item xs={12} sm={5} md={6}>
            <Box sx={{ padding: "20px" }}>
              <Typography
                variant="h5"
                fontFamily={"'Jost', sans-serif"}
                letterSpacing={1}
                fontWeight={700}
              >
                Post a Review :
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "15px",
                  marginTop: "25px",
                }}
              >
                <Rating
                  precision={0.5}
                  value={customerRating}
                  onChange={(event, newValue) => {
                    setCustomerRating(newValue);
                  }}
                  sx={{ width: "fit-content" }}
                />
                <TextField
                  label="Message"
                  placeholder="Type your review"
                  size="small"
                  multiline
                  maxRows={4}
                  value={customerReview}
                  onChange={(e) => {
                    setCustomerReview(e.target.value);
                  }}
                  sx={{
                    width: {
                      xs: "80%",
                      sm: "90%",
                      md: "50%",
                    },
                  }}
                />
                <Button
                  onClick={handleReview}
                  style={{
                    width: "fit-content",
                    fontSize: "14px",
                    marginTop: "10px",
                  }}
                >
                  Post Review
                </Button>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={7} md={6}>
            <Box sx={{ padding: "20px" }}>
              {product?.reviews?.length > 0 && (
                <Typography
                  variant="h5"
                  fontFamily={"Poppins"}
                  letterSpacing={1}
                  fontWeight={900}
                >
                  Customer Reviews :
                </Typography>
              )}
              {product?.reviews?.length > 0 &&
                product?.reviews.map((review) => (
                  <Box key={review._id} sx={{ marginBottom: "20px" }}>
                    <Box
                      display={"flex"}
                      gap={2}
                      alignItems={"flex-start"}
                      mt={2}
                    >
                      <Avatar>
                        {review?.username?.slice(0, 1).toUpperCase()}
                      </Avatar>
                      <Typography
                        variant="subtitle1"
                        fontFamily={"Poppins"}
                        fontWeight={"700"}
                      >
                        {review?.username
                          ?.slice(0, 1)
                          .toUpperCase()
                          .concat(review?.username?.slice(1))}
                      </Typography>
                    </Box>
                    <Rating
                      readOnly
                      precision={0.5}
                      value={review?.rating}
                      sx={{ marginTop: "10px" }}
                    />
                    <Typography
                      variant="subtitle2"
                      fontFamily={"Poppins"}
                      fontWeight={"500"}
                      sx={{ marginTop: "5px", paddingRight: "70px" }}
                    >
                      {review.message}
                    </Typography>
                  </Box>
                ))}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding: 4rem 2rem 5rem;
  background-color: #f4edf2;
  min-height: 100vh;

  .container {
    max-width: 120rem;
  }
  .common-heading {
    text-align: center;
    font-weight: bold;
    color: #4b3049;
    margin-bottom: 80px;
  }
  h3 {
    text-transform: capitalize;
  }
  figure {
    width: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
    transition: all 0.5s linear;
    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 0%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      transition: all 0.2s linear;
      cursor: pointer;
    }
    &:hover::after {
      width: 100%;
    }
    &:hover img {
      transform: scale(1.2);
    }
    img {
      max-width: 90%;
      margin-top: 1.5rem;
      height: 20rem;
      transition: all 0.2s linear;
    }
  }
`;

export default SingleProduct;
