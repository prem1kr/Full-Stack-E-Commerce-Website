import React from "react";
import './aboutus.css';
import { Box, Divider, Grid, Typography } from "@mui/material";

export default function About() {
    return (
        <Box sx={{
            // marginTop: "50px", marginBottom: "50px",
            //  padding: "0px 44px 0px 44px",
            backgroundColor: "#f4edf2"
        }} >
            <Box className="about-section">
                <h2 sx={{ fontWeight: "bolder", fontSize: "50px" }}>ABOUT US</h2>
            </Box>
            <Box className="ban" sx={{ paddingBlock: "65px" }}>
                <Grid container sx={{
                    display: "flex", maxWidth: "1100px", px: {
                        xs: "20px",
                        md: "30px",
                        lg: 0
                    }, marginInline: "auto"
                }}>
                    <Grid item xs={12} md={5} lg={6} sx={{
                        pr: {
                            xs: "0",
                            md: "25px",
                            lg: "50px"
                        },
                        order: {
                            xs: 2,
                            md: 0
                        }
                    }}>
                        <Typography variant="h2" sx={{
                            color: " #795376",
                            fontSize: "2.5rem",
                            fontWeight: "500",
                            whiteSpace: "normal",
                            fontFamily: '"Jost", sans-serif',
                            mb: "20px",
                            textAlign: {
                                xs: "center",
                                md: "left"
                            }
                        }}>We are your favrouite Store</Typography>
                        <Divider color="#795376" sx={{
                            width : "50px",
                            mx : {
                                xs : "auto",
                                md : "0"
                            },
                            border : "2px solid #795376",
                            borderColor : "#795376",
                            opacity : "1",
                            mb: "20px",
                            display : {
                                xs : "block",
                                md : "none"
                            }
                        }} />
                        <p style={{ textAlign: "justify", color: "#525252", textAlignLast : "center" }}>Welcome to ShopZone, your ultimate destination for all things tech and fashion.
                            We bring you a diverse range of products, including watches, phones, cameras, and laptops.
                            With our carefully curated selection, you can find the perfect gadget or stylish accessory to suit your needs.
                        </p>

                        <p style={{ textAlign: "justify", color: "#525252",textAlignLast : "center"}}>At ShopZone, we prioritize quality and customer satisfaction. Our team of experts ensures that every
                            product we offer meets the highest standards. Whether you're a tech enthusiast or a fashion-forward individual,
                            we have something for everyone. Browse through our categories and discover the latest trends in technology
                            and style. Shop with confidence at ShopZone and elevate your shopping experience today.
                        </p>
                    </Grid>
                    <Grid item xs={12} md={7} lg={6} sx={{
                        order: {
                            xs: 1,
                            md: 0
                        },
                        mb: {
                            xs: "50px",
                            md: "0"
                        },
                        display: {
                            xs: "flex",
                        },
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <img style={{ height: "350px", width: "500px", }} src="https://static.rfstat.com/renderforest/images/v2/landing-pics/mobile-app-promo/banner-video.jpg" alt="" />
                    </Grid>
                </Grid>
            </Box>

            {/* <Box className="row">
            <h2 sx={{textAlign:"center", color: "#4B3049"}}>Our Team</h2>
                <Box className="column">
                    <Box className="card">
                        <img src="https://www.w3schools.com/w3images/team1.jpg" alt="Jane" sx={{ width: "100%" }} />
                        <Box className="container">
                            <h2>Jane Doe</h2>
                            <p className="title">CEO</p>
                            <p>Some text that describes me lorem ipsum ipsum lorem.</p>
                            <p>jane@example.com</p>
                            <p><button className="button">Contact</button></p>
                        </Box>
                    </Box>
                </Box>

                <Box className="column">
                    <Box className="card">
                        <img src="https://www.w3schools.com/w3images/team2.jpg" alt="Mike" sx={{ width: "100%" }} />
                        <Box className="container">
                            <h2>Mike Ross</h2>
                            <p className="title">Product Manager</p>
                            <p>Some text that describes me lorem ipsum ipsum lorem.</p>
                            <p>mike@example.com</p>
                            <p><button className="button">Contact</button></p>
                        </Box>
                    </Box>
                </Box>

                <Box className="column">
                    <Box className="card">
                        <img src="https://www.w3schools.com/w3images/team3.jpg" alt="John" sx={{ width: "100%" }} />
                        <Box className="container">
                            <h2>John Doe</h2>
                            <p className="title">Customer Support, Manager</p>
                            <p>Some text that describes me lorem ipsum ipsum lorem.</p>
                            <p>john@example.com</p>
                            <p><button className="button">Contact</button></p>
                        </Box>
                    </Box>
                </Box>
            </Box> */}
        </Box>
    )
}