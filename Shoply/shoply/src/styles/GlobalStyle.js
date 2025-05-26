import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`




* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Jost", sans-serif;
}


html {
  font-size: 16px;
  /* scroll-behavior: smooth; */
  /* 1rem = 10px */
  overflow-x: hidden;
}

body {
  overflow-x: hidden;
   scrollbar-color: rgb(98, 84, 243);
    scrollbar-width: thin;
}

body::-webkit-scrollbar {
  width: 0.4rem;
}

body::-webkit-scrollbar-track {
   background-color: lightgray;
}

body::-webkit-scrollbar-thumb {
  background: #fff;
    border: 1px solid transparent;
    border-radius: 5px;
    background-clip: content-box;
}

// .MuiFormLabel-root {
//   font-size: 1.4rem !important;
// }

h1,
h2,
h3,
h4 {
   font-family: "Jost", sans-serif;

}

h1 {
  
    font-size: 4rem;
    font-weight: 900;
  }
 
   h2 {
     font-size: 2.5rem;
     font-weight: 300;
     white-space: normal;  
    }
  
  h3 {
    font-size: 1.3rem;
    font-weight: 400;
  }

  p, button {

    font-size: 1.1rem;
    line-height: 1.5;
    font-weight:400;
  }

  a {
    text-decoration: none;
  }
  
  li {
    list-style: none;
  }

${"" /* resuable code section  */}

.container {
    max-width: 80rem;
    margin: 0 auto;
  }
  
.grid {
    display: grid;
    gap: 1.5rem;
    row-gap: 2rem;
  }
  
  .grid-two-column {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .grid-three-column {
    grid-template-columns: repeat(4, 1fr);
    justify-items:  center;
  }
  
  .grid-four-column{
     grid-template-columns: 1fr 1.2fr .5fr .8fr ;
  }

  .intro-data {
    margin-bottom: 0;
    text-transform: uppercase;
    color:#4B3049;
  }

  @media (max-width: 900px) {
    .container {
    max-width: 130rem;
    padding: 0 3.2rem;
  }
  }
 
   @media (max-width: 600px) {
       html {
      font-size: 50%;
    }

.grid{
  gap: 3.2rem;
}
      .grid-two-column , .grid-three-column, .grid-four-column{
          grid-template-columns: 1fr;
        }
    }

`;
