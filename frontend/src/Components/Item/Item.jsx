import React, { useContext } from 'react';
import './Item.css';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';

const Item = (props) => {
  const { addtoCart } = useContext(ShopContext);
  return (
    <div className='item'>
      <Link to={`/product/${props.id}`}>
        <img onClick={() => window.scrollTo(0,0)} src={props.image} alt={props.name} />
        {props.old_price && (
          <div className="discount-badge">
            -{Math.round((1 - props.new_price / props.old_price) * 100)}%
          </div>
        )}
      </Link>
      <div className="item-info">
        <p className="item-name">{props.name}</p>
        <div className="item-prices">
          <div className="item-price-new">${props.new_price}</div>
          {props.old_price && (
            <div className="item-price-old">${props.old_price}</div>
          )}
        </div>
        {props.rating && (
          <div className="item-rating">
            ⭐ {props.rating} {props.reviews && `(${props.reviews})`}
          </div>
        )}
        <button className="item-add-btn" onClick={() => addtoCart(props.id)}>Add to cart</button>
      </div>
    </div>
  );
};

export default Item;