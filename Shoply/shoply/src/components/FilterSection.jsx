// import { Update } from '@material-ui/icons'
import React from 'react'
import { useState,useEffect } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useSelector,useDispatch } from 'react-redux'
import { fetchProducts } from '../slices/ProductSlice';

const FilterSection = () => {

  const [text, setText] = useState('');
  const [category, setCategory] = useState('');

  const {products} =useSelector((state)=> state.productstate);

  const dispatch=useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, [category, dispatch])

  const UpdateFilterValue=(event)=>{
         setText(event.target.value);
  }
  const handleChange=(event)=>{
    setCategory(event.target.value);
  }

  return (
    <div className='filter-search'>
     <form onSubmit={(e)=>e.preventDefault()}>
     <input type="text" name="text" value={text} placeholder="SEARCH" onChange={UpdateFilterValue}/>
     </form>

     <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="category">Category</InputLabel>
        <Select
          // labelId="demo-multiple-name-label"
          id="category"
          value={category}
          onChange={handleChange}
          input={<OutlinedInput label="Category" />}
        >
            <MenuItem value="mobile">Mobile</MenuItem>
            <MenuItem value="laptop">Laptop</MenuItem>
            <MenuItem value="computer">Computer</MenuItem>
            <MenuItem value="watch">Watch</MenuItem>
            <MenuItem value="accessories">Accessories</MenuItem>
        </Select>
      </FormControl>
    </div>
  )
}

export default FilterSection
