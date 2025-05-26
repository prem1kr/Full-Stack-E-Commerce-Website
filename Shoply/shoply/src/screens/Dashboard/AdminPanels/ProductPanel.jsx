import React, { useState } from "react";
import {
  Box,
  Pagination,
  Typography,
  Modal,
  Button as MuiButton,
  TextField,
  Switch,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";

import { paginate } from "../../../utils/utils";
import Title from "./Title";

import ProductPanelItem from "../../../components/ProductPanelItem";
import { Button } from "../../../styles/Button";
import { addProduct } from "../../../slices/ProductSlice";

// Modal Style
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "700px",
  bgcolor: "#F4EDF2",
  boxShadow: 24,
  p: 4,
};

const initialState = {
  name: "",
  price: 0,
  brand: "",
  category: "",
  description: "",
  countInStock: 0,
  image: "",
  featured: false,
};

const ProductPanel = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.productstate);
  const { user } = useSelector((state) => state.userstate);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const [formData, setFormData] = useState(initialState);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      formData.name &&
      formData.price &&
      formData.brand &&
      formData.category &&
      formData.description &&
      formData.image
    ) {
      dispatch(
        addProduct({
          formData: {
            ...formData,
            price: parseInt(formData.price),
            countInStock: parseInt(formData.countInStock),
          },
          token: user.token,
        })
      );
      handleClose();
      setFormData(initialState);
    }
  };

  const handlePageChange = (e, value) => {
    setCurrentPage(value);
  };

  const paginatedResult = paginate(products, currentPage - 1, pageSize);

  return (
    <Box
      sx={{
        padding: "30px 60px",
      }}
    >
      <Title heading={"Products"} />
      <Box textAlign={"right"}>
        <Button onClick={handleOpen}>Add Product</Button>
      </Box>
      <Box mt={4} bgcolor={"whitesmoke"}>
        {products &&
          paginatedResult &&
          paginatedResult.map((product) => (
            <ProductPanelItem key={product._id} product={product} />
          ))}
        {products && (
          <Box
            py={3}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Pagination
              count={Math.ceil(products.length / pageSize)}
              color="primary"
              page={currentPage}
              onChange={handlePageChange}
            />
          </Box>
        )}
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box component={"form"} sx={style}>
          <Typography
            variant="h2"
            sx={{
              fontSize: "24px",
              fontFamily: "'Jost', sans-serif",
              fontWeight: "500",
              textAlign: "center",
              mb: 4,
            }}
          >
            Add Product
          </Typography>
          <Box display={"flex"} gap={3} mb={2}>
            <TextField
              variant="outlined"
              placeholder="Product Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name: e.target.value,
                })
              }
              size="small"
              sx={{
                width: "50%",
              }}
            />
            <TextField
              variant="outlined"
              placeholder="Product Image"
              value={formData.image}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  image: e.target.value,
                })
              }
              size="small"
              sx={{
                width: "50%",
              }}
            />
          </Box>
          <Box mb={2}>
            <TextField
              variant="outlined"
              placeholder="Product Description"
              value={formData.description}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  description: e.target.value,
                })
              }
              size="small"
              fullWidth
              multiline
              rows={4}
            />
          </Box>
          <Box display={"flex"} gap={3} mb={2}>
            <TextField
              variant="outlined"
              value={formData.price}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  price: e.target.value,
                })
              }
              type="number"
              placeholder="Product Price"
              size="small"
              sx={{
                width: "50%",
              }}
            />
            <TextField
              variant="outlined"
              value={formData.countInStock}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  countInStock: e.target.value,
                })
              }
              type="number"
              placeholder="Count In Stock"
              size="small"
              sx={{
                width: "50%",
              }}
            />
          </Box>
          <Box display={"flex"} gap={3} mb={2}>
            {/* <TextField
              variant="outlined"
              value={formData.category}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  category: e.target.value,
                })
              }
              placeholder="Product Category"
              size="small"
              sx={{
                width: "50%",
              }}
            /> */}
            <FormControl sx={{width : "50%"}} size="small">
              <InputLabel>Category</InputLabel>
              <Select
                value={formData.category}
                label="Category"
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    category: e.target.value,
                  })
                }}
              >
                {/* "Mobile Phones", "PCs and Laptops", "Watches", "Cameras" */}
                <MenuItem value={"Mobile Phones"}>Mobile Phones</MenuItem>
                <MenuItem value={"PCs and Laptops"}>PCs and Laptops</MenuItem>
                <MenuItem value={"Watches"}>Watches</MenuItem>
                <MenuItem value={"Cameras"}>Cameras</MenuItem>
              </Select>
            </FormControl>
            <TextField
              variant="outlined"
              placeholder="Brand"
              value={formData.brand}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  brand: e.target.value,
                })
              }
              size="small"
              sx={{
                width: "50%",
              }}
            />
          </Box>
          <Box my={1}>
            <Switch
              inputProps={{ "aria-label": "controlled" }}
              checked={formData.featured}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  featured: e.target.checked,
                })
              }
            />
          </Box>
          <MuiButton variant="contained" onClick={handleSubmit}>
            Add
          </MuiButton>
          <MuiButton
            onClick={handleClose}
            sx={{ marginLeft: "30px" }}
            variant="contained"
          >
            Close
          </MuiButton>
        </Box>
      </Modal>
    </Box>
  );
};

export default ProductPanel;
