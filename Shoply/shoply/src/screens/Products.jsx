import React, { useEffect, useState } from "react";

import BreadcrumbPart from "../components/BreadcrumbPart";
import styled from "styled-components";
import FilterSection from "../components/FilterSection";
import Sort from "../components/Sort";
import ProductList from "../components/ProductList";
import Item from "../components/Item";
import { Button } from "../styles/Button";
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Pagination,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { paginate, searching } from "../utils/utils";
import {
  fetchProducts,
  setSearchQuery,
  setSelectedCategories,
  setPriceRange,
  filterProducts,
} from "../slices/ProductSlice";

const NewProducts = () => {
  const title = "Products";
  const dispatch = useDispatch();
  const [pageSize, setPageSize] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
  const {
    products,
    filteredProducts,
    searchQuery,
    selectedCategories,
    priceRange,
  } = useSelector((state) => state.productstate);

  const [range, setRange] = useState([priceRange.min, priceRange.max]);
  // const [selectedCategories, setSelectedCategories] = useState([])



  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(filterProducts());
  }, [searchQuery, selectedCategories, priceRange]);

  const handleSearch = (event) => {
    dispatch(setSearchQuery(event.target.value));
  };

  const handleCategoryChange = (event) => {
    const { value, checked } = event.target;
    const updatedCategories = checked
      ? [...selectedCategories, value]
      : selectedCategories?.filter((category) => category !== value);
    dispatch(setSelectedCategories(updatedCategories));
  };

  const handlePriceChange = (e, value) => {
    // console.log(value)
    setRange(value)
    dispatch(setPriceRange({ min: value[0], max: value[1] }));
  };

  const handleClearFilter = () => {
    dispatch(setSearchQuery(""))
    dispatch(setPriceRange({ min: 0, max: 200000 }))
    dispatch(setSelectedCategories([]))
    dispatch(filterProducts());
    setRange([0, 200000]);

  };
  const paginatedProducts = paginate(filteredProducts, currentPage - 1, pageSize);

  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  return (
    <Wrapper>
      <BreadcrumbPart title={title} />
      <div className="container" style={{ minHeight: "80vh" }}>
        <Grid container mt={5}>
          <Grid
            item
            xs={0}
            sx={{
              display: {
                xs: "none",
                lg: "block",
              },
              pr: "40px",
            }}
            lg={3}
          >
            <Box>
              {/* search input */}
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={handleSearch}
                style={{
                  padding: "12px 5px 12px 15px",
                  border: "1px solid #e2e2e2",
                  outline: "none",
                  width: "100%",
                  marginBottom: "30px",
                }}
              />
            </Box>
            <Typography
              variant="h2"
              sx={{
                fontSize: "20px",
                fontFamily: "'Jost', sans-serif",
                paddingBottom: "15px",
                borderBottom: "1px solid #e2e2e2",
                marginBottom: "20px",
                color: "#4B3049",
              }}
            >
              Price
            </Typography>
            <Box>
              <Slider
                value={range}
                // min={}
                onChange={handlePriceChange}
                valueLabelDisplay="auto"
                step={1000}
                max={80000}
              />
              {/* <FormGroup>
                <FormControlLabel
                onChange={handlePriceFilter}
                value={"10-20"}
                  control={<Checkbox />}
                  label="Rs. 10k - Rs. 20k"
                />
                <FormControlLabel
                onChange={handlePriceFilter}
                value={"20-30"}
                  control={<Checkbox />}
                  label="Rs. 20k - Rs. 30k"
                />
              </FormGroup> */}
            </Box>

            <Typography
              variant="h2"
              sx={{
                fontSize: "20px",
                fontFamily: "'Jost', sans-serif",
                paddingBottom: "15px",
                borderBottom: "1px solid #e2e2e2",
                marginBlock: "20px",
                color: "#4B3049",
              }}
            >
              Category
            </Typography>
            <Box>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox />}
                  onChange={handleCategoryChange}
                  checked={
                    selectedCategories.includes("Mobile Phones") ?? false
                  }
                  value={"Mobile Phones"}
                  label="Mobile Phones"
                />
                <FormControlLabel
                  control={<Checkbox />}
                  onChange={handleCategoryChange}
                  value={"PCs and Laptops"}
                  checked={
                    selectedCategories.includes("PCs and Laptops") ?? false
                  }
                  label="PCs and Laptops"
                />
                <FormControlLabel
                  control={<Checkbox />}
                  onChange={handleCategoryChange}
                  checked={selectedCategories.includes("Cameras") ?? false}
                  value={"Cameras"}
                  label="Cameras"
                />
                <FormControlLabel
                  control={<Checkbox />}
                  checked={selectedCategories.includes("Watches") ?? false}
                  onChange={handleCategoryChange}
                  value={"Watches"}
                  label="Watches"
                />
              </FormGroup>
              <Box mt={3}>
                <Button onClick={handleClearFilter}>Clear all Filters</Button>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} lg={9}>
            <Typography
              variant="h2"
              sx={{
                fontSize: "24px",
                fontFamily: "'Jost', sans-serif",
                fontWeight: "700",
                color: "#4B3049",
                paddingBottom: "12px",
                borderBottom: "1px solid #e2e2e2",
              }}
            >
              Products
            </Typography>
            <Box
              display={"flex"}
              flexWrap={"wrap"}
              columnGap={2}
              rowGap={3}
              mt={3}
            // justifyContent={"center"}
            >
              {paginatedProducts &&
                paginatedProducts.map((product) => (
                  <Item key={product._id} {...product} />
                ))}
              {!paginatedProducts.length && (
                <Box width={"100%"}>
                  <Typography
                    variant="h3"
                    sx={{
                      fontSize: "16px",
                      fontWeight: "500",
                      textAlign: "center",
                      fontFamily: "'Jost', sans-serif",
                    }}
                  >
                    Sorry!, No Product Found For : {searchQuery}
                  </Typography>
                </Box>
              )}
            </Box>
            {paginatedProducts.length !== 0 && (
              <Box display={"flex"} py={3} justifyContent={"center"}>
                <Pagination
                  count={Math.ceil(filteredProducts.length / pageSize)}
                  color="primary"
                  onChange={(e, value) => setCurrentPage(value)}
                  page={currentPage}
                />
              </Box>
            )}
          </Grid>
        </Grid>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.section`
  .grid-filter-column {
    grid-template-columns: 0.2fr 1fr;
  }

  @media (max-width: 600px) {
    .grid-filter-column {
      grid-template-columns: 1fr;
    }
  }
`;
export default NewProducts;


// import React, { useEffect, useState } from "react";

// import BreadcrumbPart from "../components/BreadcrumbPart";
// import styled from "styled-components";
// import FilterSection from "../components/FilterSection";
// import Sort from "../components/Sort";
// import ProductList from "../components/ProductList";
// import Item from "../components/Item";
// import {Button} from '../styles/Button'
// import {
//   Box,
//   Checkbox,
//   FormControlLabel,
//   FormGroup,
//   Grid,
//   Pagination,
//   Slider,
//   TextField,
//   Typography,
// } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import { paginate, searching } from "../utils/utils";
// import { fetchProducts, filterByPrice, filterCategory, searchProducts } from "../slices/ProductSlice";

// const Products = () => {
//   const title = "Products";
//   const dispatch = useDispatch()
//   const [selectedOption, setSelectedOption] = useState("");
//   const [pageSize, setPageSize] = useState(6);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [keyword, setKeyword] = useState("");
//   const { products } = useSelector((state) => state.productstate);
//   const [priceRange, setPriceRange] = useState(0);
//   const [selectedCategories, setSelectedCategories] = useState([])
//   const [count, setCount] = useState(0)


//   const handlePriceChange = (e, value) => {
//     setCurrentPage(1);
//     setPriceRange(value)
//     dispatch(filterByPrice({price : value}))
//   }

//  const handleCategoryChange = (e) => {
//   setCurrentPage(1);
//   if(e.target.checked){
//     let value = e.target.value
//     setSelectedCategories(selectedCategories => {return [...selectedCategories, value]}) // async 
//     dispatch(filterCategory({categoryArray : [...selectedCategories, value]}))
//   }else{
//     let filteredCategory = selectedCategories.filter(category => category !== e.target.value)
//     setSelectedCategories(filteredCategory)
//     if(filteredCategory.length){
//       dispatch(filterCategory({categoryArray : filteredCategory}))
//     }else{
//       dispatch(fetchProducts())
//     }
//   }
//  }


//  const handleClearFilter = () => {
//   setPriceRange(0);
//   setSelectedCategories([])
//   dispatch(fetchProducts());
//  }

//   const handleSearch = (e) => {
//     setCurrentPage(1);
//     setKeyword(e.target.value);
//     dispatch(searchProducts({keyword : e.target.value}))
//   };

//   const paginatedProducts = paginate(products, currentPage - 1, pageSize);

//   const label = { inputProps: { "aria-label": "Checkbox demo" } };
//   return (
//     <Wrapper>
//       <BreadcrumbPart title={title} />
//       <div className="container" style={{ minHeight: "80vh" }}>
//         <Grid container mt={5}>
//           <Grid
//             item
//             xs={0}
//             sx={{
//               display: {
//                 xs: "none",
//                 lg: "block",
//               },
//               pr: "40px",
//             }}
//             lg={3}
//           >
//             <Box>
//               {/* search input */}
//               <input
//                 type="text"
//                 placeholder="Search"
//                 value={keyword}
//                 onChange={handleSearch}
//                 style={{
//                   padding: "12px 5px 12px 15px",
//                   border: "1px solid #e2e2e2",
//                   outline: "none",
//                   width: "100%",
//                   marginBottom: "30px",
//                 }}
//               />
//             </Box>
//             <Typography
//               variant="h2"
//               sx={{
//                 fontSize: "20px",
//                 fontFamily: "'Jost', sans-serif",
//                 paddingBottom: "15px",
//                 borderBottom: "1px solid #e2e2e2",
//                 marginBottom: "20px",
//                 color: "#4B3049",
//               }}
//             >
//               Price
//             </Typography>
//             <Box>
//               <Slider
//               value={priceRange}
//               onChange={handlePriceChange}
//               step={1000}
//               max={200000}
//               />
//               {/* <FormGroup>
//                 <FormControlLabel
//                 onChange={handlePriceFilter}
//                 value={"10-20"}
//                   control={<Checkbox />}
//                   label="Rs. 10k - Rs. 20k"
//                 />
//                 <FormControlLabel
//                 onChange={handlePriceFilter}
//                 value={"20-30"}
//                   control={<Checkbox />}
//                   label="Rs. 20k - Rs. 30k"
//                 />
//               </FormGroup> */}
//             </Box>

//             <Typography
//               variant="h2"
//               sx={{
//                 fontSize: "20px",
//                 fontFamily: "'Jost', sans-serif",
//                 paddingBottom: "15px",
//                 borderBottom: "1px solid #e2e2e2",
//                 marginBlock: "20px",
//                 color: "#4B3049",
//               }}
//             >
//               Category
//             </Typography>
//             <Box>
//               <FormGroup>
//                 <FormControlLabel
//                   control={<Checkbox />}
//                   onChange={handleCategoryChange}
//                   checked={selectedCategories.includes("Mobile Phones") ?? false}
//                   value={"Mobile Phones"}
//                   label="Mobile Phones"
//                 />
//                 <FormControlLabel
//                   control={<Checkbox />}
//                   onChange={handleCategoryChange}
//                   value={"PCs and Laptops"}
//                   checked={selectedCategories.includes("PCs and Laptops") ?? false}
//                   label="PCs and Laptops"
//                 />
//                 <FormControlLabel
//                   control={<Checkbox />}
//                   onChange={handleCategoryChange}
//                   checked={selectedCategories.includes("Cameras") ?? false}
//                   value={"Cameras"}
//                   label="Cameras"
//                 />
//                 <FormControlLabel
//                   control={<Checkbox />}
//                   checked={selectedCategories.includes("Watches") ?? false}
//                   onChange={handleCategoryChange}
//                   value={"Watches"}
//                   label="Watches"
//                 />
//               </FormGroup>
//               <Box mt={3}>
//                 <Button onClick={handleClearFilter}>Clear all Filters</Button>
//               </Box>
//             </Box>
//           </Grid>
//           <Grid item xs={12} lg={9}>
//             <Typography
//               variant="h2"
//               sx={{
//                 fontSize: "24px",
//                 fontFamily: "'Jost', sans-serif",
//                 fontWeight: "700",
//                 color: "#4B3049",
//                 paddingBottom: "12px",
//                 borderBottom: "1px solid #e2e2e2",
//               }}
//             >
//               Products
//             </Typography>
//             <Box
//               display={"flex"}
//               flexWrap={"wrap"}
//               columnGap={2}
//               rowGap={3}
//               mt={3}
//               // justifyContent={"center"}
//             >
//               {paginatedProducts &&
//                 paginatedProducts.map((product) => (
//                   <Item key={product._id} {...product} />
//                 ))}
//                 {
//                   !paginatedProducts.length && (
//                     <Box width={"100%"}>
//                       <Typography variant="h3" sx={{fontSize: "16px", fontWeight : "500", textAlign : "center", fontFamily : "'Jost', sans-serif"}}>Sorry!, No Product Found For : {keyword}</Typography>
//                     </Box>
//                   )
//                 }
//             </Box>
//             {
//              paginatedProducts.length !== 0 && (<Box display={"flex"} py={3} justifyContent={"center"}>
//              <Pagination
//                count={Math.ceil(products.length / pageSize)}
//                color="primary"
//                onChange={(e, value) => setCurrentPage(value)}
//                page={currentPage}
//              />
//            </Box> )
//             }
//           </Grid>
//         </Grid>
//       </div>
//     </Wrapper>
//   );
// };
// const Wrapper = styled.section`
//   .grid-filter-column {
//     grid-template-columns: 0.2fr 1fr;
//   }

//   @media (max-width: 600px) {
//     .grid-filter-column {
//       grid-template-columns: 1fr;
//     }
//   }
// `;
// export default Products;
