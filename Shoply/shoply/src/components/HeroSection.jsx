import React from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Button } from '../styles/Button';

const HeroSection = () => {
  return (
    <Wrapper>
    <div className="container">
    <div className="grid grid-two-column">
      <div className="
      hero-section-data">
        <p className="intro-data">Welcome to </p>
        <h1 > ShopZone </h1>
        <p>
        Discover endless possibilities. Shop the latest trends. Find your perfect style.
         Experience seamless shopping. 
        </p>
        <Link to="/products">
          <Button>show now</Button>
        </Link>
      </div>
      {/* our homepage image  */}
      <div  className="hero-section-image">
        <figure>
          <img
            src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
            alt="hero-section-family"
            className='hero-section-data '
         />
        </figure>
      </div>
    </div>
  </div>
  </Wrapper>
  
  )
}

const Wrapper = styled.section`
  padding: 10rem 0 5rem;
 
  img {
    width: 100%;
    height:autp;
  }

  .hero-section-data {
    p {
      margin: 1rem 0;
      font-weight: bolder;
    
    }

    h1 {
      margin-top: 20px;
      text-transform: capitalize;
      font-weight: bold;
      color:#4B3049;
    }

    .intro-data {
      margin-bottom: 0;
      
    }
  }

  .hero-section-image {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  figure {
    position: relative;

    &::after {
      content: "";
      width: 60%;
      height: 80%;
      background-color:#4B3049;
      position: absolute;
      left: 50%;
      top: -5rem;
      z-index: -1;
    }
  }
  .img-style {
    width: 100%;
    height: auto;
  }
  @media (max-width: 600px) {
    .grid {
      gap: 10rem;
    }
    figure::after {
      content: "";
      width: 50%;
      height: 100%;
      left: 0;
      top: 10%;
      // bottom: 10%; 
      background-color: #4B3049;
    }
  }

 `;

export default HeroSection

// https://teensmakehealthhappen.org/wp-content/uploads/2022/02/pexels-gustavo-fring-3985062-scaled.jpg