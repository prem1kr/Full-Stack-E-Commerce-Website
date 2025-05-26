import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../slices/ProductSlice";
import { useEffect } from "react";
import Item from "./Item";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Box } from "@mui/material";

const Sort = () => {
  const { products, loading, error } = useSelector(
    (state) => state.productstate
  );

  const [selectedOption, setSelectedOption] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, [selectedOption]);

  const handleOptionChange = (event) => {

    setSelectedOption(event.target.value);
  };

  const sortedData = [...products].sort((a, b) => {
    return selectedOption === "High to Low"
      ? b.price - a.price
      : a.price - b.price;
  });


  return (
    <Wrapper>
      <div className="sort-selection">
        <Box sx={{ maxWidth: 120 }}>
          <FormControl>
            <InputLabel id="demo-simple-select-label">Sort By</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedOption}
              label="Sort By"
              onChange={handleOptionChange}
            >
              <MenuItem value="Low to High">Price(Low to High)</MenuItem>
              <MenuItem value="High to Low">Price(High to Low)</MenuItem>
            </Select>
          </FormControl>
        </Box>
        {/* <form action="#">
          <label htmlFor="sort"></label>
          <select
            name="sort"
            id="sort"
            className="sort-selection--style"
            value={selectedOption} onChange={handleOptionChange} */}
        {/* > */}
        {/* <option value="lowest">Price(lowest)</option> */}
        {/* <option value="#" disabled></option> */}
        {/* <option value="highest">Price(highest)</option> */}
        {/* <option value="#" disabled></option> */}
        {/* <option value="Low to High">Price(Low to High)</option> */}
        {/* <option value="#" disabled></option> */}
        {/* <option value="High to Low">Price(High to Low)</option> */}
        {/* </select>
        </form> */}
        <div className="grid" style={{
          gridTemplateColumns: "repeat(3, 1fr)",
          justifyItems: "center"
        }}>
          {sortedData?.map((product, index) => (
            <Item
              name={product.name}
              brand={product.brand}
              countInStock={product.countInStock}
              category={product.category}
              id={product._id}
              key={product._id}
              description={product.description}
              image={product.image}
              price={product.price}
            />
          ))}
        </div>
        {/* <ul>
        {sortedData.map((rec,index) => (
        <tr key={rec.index}>{rec.price}</tr>
      ))}
        </ul> */}
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.section`
  display: flex;
  justify-content: end;
  margin-top: 5rem;

  .sort-selection .sort-selection--style {
    padding: 0.5rem;
    cursor: pointer;
    background-color: #f4edf2;
    color: #795376;
    border: 1px solid #f4edf2;

    .sort-selection--option {
      padding: 0.5rem 0;
      cursor: pointer;
      height: 2rem;
      padding: 10px;
    }
  }
`;
export default Sort;
