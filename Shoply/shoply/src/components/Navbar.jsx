import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import PropTypes from "prop-types";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Fab from "@mui/material/Fab";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Fade from "@mui/material/Fade";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../slices/userSlice";
import { fetchCartItems } from "../slices/CartSlice";
import { Badge } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

function ScrollTop(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });
  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );

    if (anchor) {
      anchor.scrollIntoView({
        block: "center",
        behavior: "smooth",
      });
    }
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
      >
        {children}
      </Box>
    </Fade>
  );
}
ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

function Navbar(props) {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.userstate);
  const { totalQty } = useSelector((state) => state.cartState);
  const { wishList } = useSelector((state) => state.wishLishState);

  console.log(wishList)

  const dispatch = useDispatch();

  const handleCartNavigation = () => {
    if (user) {
      navigate("/cart");
    } else {
      navigate("/login");
    }
  };

  const handleWishlistNavigation = () => {
    if (user) {
      navigate("/wishlist");
    } else {
      navigate("/login");
    }
  };

  const pages = [
    <Link
      to="/products"
      style={{
        textDecoration: "none",
        color: "#4B3049",
        fontWeight: "500",
        fontSize: "0.9rem",
      }}
    >
      Products
    </Link>,

    <Link
      to="/about"
      style={{
        textDecoration: "none",
        color: "#4B3049",
        fontWeight: "500",
        fontSize: "0.9rem",
      }}
    >
      About
    </Link>,
  ];

  const settings = [

    user ? (
      <Link
        style={{
          textDecoration: "none",
          color: "#4B3049",
          fontWeight: "400",
          fontSize: "1.6rem",
        }}
      >
        Logout
      </Link>
    ) : null,
    // :<Link to="/login" style={{ textDecoration: "none", color: "#4B3049",fontWeight:"400",fontSize:'1.6rem' }}>Login</Link>
  ];
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSession = (event) => {
    const session = event.target.innerHTML;
    if (session === "Logout") {
      dispatch(logout());
      navigate("/");
    }
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          boxShadow: "0px 10px 15px rgba(0, 0, 0, 0.05)",
          backgroundColor: "white",
          paddingLeft: "20px",
          paddingRight: "20px",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ height: "80px" }}>
            {/* <Link to="/"
                            style={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: '#4B3049',
                                textDecoration: 'none',
                            }}
                        > */}
            {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
            <Typography
              variant="h6"
              noWrap
              component={Link}
              to="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "'Just', sans-serif",
                fontSize: "2rem",
                fontWeight: 800,
                letterSpacing: "0.09rem",
                color: "#4B3049",
                // textDecoration: 'none',
              }}
            >
              ShopZone
            </Typography>
            {/* </Link> */}
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="#4B3049"
              >
                <MenuIcon sx={{ color: "#4B3049", fontSize: "2.4rem" }} />
              </IconButton>

              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page, index) => (
                  <MenuItem key={index} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            {/* <Link to="/"
                            style={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 0.93,
                                fontWeight: 700,
                                fontFamily: 'monospace',
                                letterSpacing: '.3rem',
                                color: '#4B3049',
                                textDecoration: 'none',
                            }}
                        > */}
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 0.93,
                fontSize: "2.2rem",
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "#4B3049",
              }}
            >
              LOGO
            </Typography>
            {/* </Link> */}
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                justifyContent: "center",
                gap: "50px",
              }}
            >
              {
                user?.isAdmin && (
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{
                      my: 2,
                      color: "white",
                      display: "block",
                      fontSize: "1.4rem",
                    }}>

                    <Link
                      to="/dashboard"
                      style={{
                        textDecoration: "none",
                        color: "#4B3049",
                        fontWeight: "500",
                        fontSize: "0.9rem",
                      }}
                    >
                      Dashboard
                    </Link>
                  </Button>)
              }
              {pages.map((page, index) => (
                <Button
                  key={index}
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    color: "white",
                    display: "block",
                    fontSize: "1.4rem",
                  }}
                >
                  {page}
                </Button>
              ))}
            </Box>



            <Box sx={{ flexGrow: 0 }}>
              <IconButton
                sx={{ p: 0, marginRight: "20px", color: "#4B3049" }}
                color="#4B3049 "
                size="large"
                onClick={handleWishlistNavigation}
              >
                <Badge badgeContent={wishList?.items?.length} color="secondary">
                  <FavoriteBorderIcon sx={{ fontSize: "1.85rem" }} />
                </Badge>
              </IconButton>
              <IconButton
                sx={{ p: 0, marginRight: "20px", color: "#4B3049" }}
                color="#4B3049 "
                size="large"
                onClick={handleCartNavigation}
              >
                <Badge badgeContent={totalQty} color="secondary">
                  <ShoppingCartIcon sx={{ fontSize: "1.85rem" }} />
                </Badge>
              </IconButton>
              <Tooltip title="Open settings">
                {user ? (
                  <IconButton
                    onClick={handleOpenUserMenu}
                    sx={{ p: 0, color: "#4B3049" }}
                    color="#4B3049 "
                    size="large"
                  >
                    <AccountCircle sx={{ fontSize: "1.85rem" }} />
                  </IconButton>
                ) : (
                  <IconButton
                    sx={{ p: 0, color: "#4B3049" }}
                    component={Link}
                    to="/login"
                    color="#4B3049"
                    size="large"
                  >
                    <AccountCircle sx={{ fontSize: "2.4rem" }} />
                  </IconButton>
                )}
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting, index) => (
                  <MenuItem key={index} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center" onClick={handleSession}>
                      {setting}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar id="back-to-top-anchor" />
      <ScrollTop {...props}>
        <Fab size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </>
  );
}
export default Navbar;