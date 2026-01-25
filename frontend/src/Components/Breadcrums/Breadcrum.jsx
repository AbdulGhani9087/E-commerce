import React from 'react';
import './Breadcrum.css';
import arrow_icon from '../Assets/breadcrum_arrow.png';

export const Breadcrum = ({ product }) => {
  // Guard against undefined product
  if (!product) return null; // or return "Loading..." if you want

  return (
    <div className='breadcrum'>
      HOME <img src={arrow_icon} alt="arrow" /> SHOP <img src={arrow_icon} alt="arrow" />{" "}
      {product.category?.toUpperCase() || ""} <img src={arrow_icon} alt="arrow" />{" "}
      {product.name?.toUpperCase() || ""}
    </div>
  );
};
