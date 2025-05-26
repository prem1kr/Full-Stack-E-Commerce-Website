import React from 'react'
import styled from 'styled-components'
import { useSelector,useDispatch } from 'react-redux'
import { fetchProducts } from '../slices/ProductSlice';
import { useEffect } from 'react';
import Item from './Item';

const ProductList = (props) => {
  const {products,loading,error} =useSelector((state)=> state.productstate);

  const dispatch=useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch, props.selectedOption])

  const sortedData = [...products].sort((a, b) => {
    return props.selectedOption ==="highest" ?  b.price - a.price: a.price - b.price;
  });
 
  return (
    <Wrapper>
    <div className='container'>
     {/* <div className="grid grid-three-column">         
         { sortedData?.map((product,index)=>(       
             <Item title={product.name} key={index} description={product.description} image={product.image} price={product.price}/>       
         )
        )
         }
         </div> */}
    </div>
    </Wrapper>
  )
}
const Wrapper=styled.section`
  padding: 9rem 0;
 
  .container {
    max-width: 120rem;
    }

 `; 
export default ProductList
