import React, { useContext } from 'react';
import './ProductDisplay.css';
import star_icon from '../Assets/star_icon.png';
import star_dull_icon from '../Assets/star_dull_icon.png';
import { ShopContext } from '../../Context/ShopContext';

export const ProductDisplay = ({ product }) => {
    const { addtoCart } = useContext(ShopContext);

    // Guard against undefined product
    if (!product) return <p>Loading product...</p>;

    return (
        <div className='productdisplay'>
            <div className="productdisplay-left">
                <img src={product.image || ""} alt={product.name || ""} />
                <img src={product.image || ""} alt={product.name || ""} />
                <img src={product.image || ""} alt={product.name || ""} />
                <img src={product.image || ""} alt={product.name || ""} />
            </div>
            <div className="productdisplay-img">
                <img className='productdisplay-main-img' src={product.image || ""} alt={product.name || ""} />
            </div>
            <div className="productdisplay-right">
                <h1>{product.name || "Product Name"}</h1>
                <div className="productdisplay-right-star">
                  <img src={star_icon} alt="" />
                  <img src={star_icon} alt="" />
                  <img src={star_icon} alt="" />
                  <img src={star_icon} alt="" />
                  <img src={star_dull_icon} alt="" />
                  <p>4.8 (120)</p>
                </div>
                <div className="productdisplay-right-prices">
                  <div className="productdisplay-right-price-old">${product.old_price || 0}</div>
                  <div className="productdisplay-right-price-new">${product.new_price || 0}</div>
                </div>
                <div className="productdisplay-right-description">
                  {product.description || "No description available."}
                </div>
                <div className="productdisplay-right-size">
                  <h1>Select size</h1>
                  <div className="productdisplay-right-size-options">
                    <div>S</div>
                    <div>M</div>
                    <div>L</div>
                    <div>XL</div> 
                    <div>XXL</div>
                  </div>
                </div>
               <button onClick={() => addtoCart(product.id)}>Add to cart</button>
               <p className="productdisplay-right-category">
                <span>Category:</span>
                {product.category || "N/A"}
               </p>
               <p className="productdisplay-right-category">
                <span>Tags:</span>
                {product.tags?.join(", ") || "N/A"}
               </p>
            </div>
        </div>
    );
};

export default ProductDisplay;
