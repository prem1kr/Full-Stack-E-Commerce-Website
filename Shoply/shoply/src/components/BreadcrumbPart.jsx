import React from 'react'
import styled from 'styled-components'

const BreadcrumbPart = (props) => {
  
  return (
    <Wrapper>
    <div className='container'>
        <div className='breadcrumb_iner'>
      <h2>{props.title}</h2>
      </div>
    </div>
    </Wrapper>
  )
}

const Wrapper=styled.section`
  padding: 9rem 0;
  background-color:#B08EAD;
  height:300px;
  display:flex;
  align-items:center;
  justify-content:center;

  h2{
    color:#fff;
    font-weight:bold;
  }
  
  .breadcrumb_iner{
    text-align:center;
  }
  `;
export default BreadcrumbPart;
