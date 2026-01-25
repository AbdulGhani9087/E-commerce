import React,{useContext} from 'react'
import './CartItems.css'
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../Assets/cart_cross_icon.png'

export const CartItems = () => {
    const {getTotalCartAmount,all_product, cartItems, removeFromCart, addToCart } = useContext(ShopContext);

    return (
        <div className='cartitems'>
            <h1>Your Cart</h1>
            <div className="cartitems-format-main">
                <p>Product</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr />
            {all_product.map((product) => {
                if(cartItems[product.id] > 0){
                    return (
                        <div key={product.id}>
                            <div className="cartitems-format">
                                <img src={product.image} alt={product.name} className='carticon-product-icon'/>
                                <p>{product.name}</p>
                                <p>${product.new_price}</p>
                                <div className="cartitems-quantity-controls">
                                    <button 
                                        className="cartitems-quantity-btn"
                                        onClick={() => removeFromCart(product.id)}
                                    >
                                        -
                                    </button>
                                    <button className='cartitems-quantity'>
                                        {cartItems[product.id]}
                                    </button>
                                    <button 
                                        className="cartitems-quantity-btn"
                                        onClick={() => addToCart(product.id)}
                                    >
                                        +
                                    </button>
                                </div>
                                <p>${product.new_price * cartItems[product.id]}</p>
                                <img 
                                    src={remove_icon} 
                                    onClick={() => { removeFromCart(product.id) }} 
                                    alt="Remove" 
                                    title="Remove from cart"
                                />
                            </div>
                            <hr />
                        </div>
                    );
                }
                return null;
            })}
            
            {/* Add checkout section if needed */}
            <div className="cartitems-down">
                <div className="cartitems-total">
                    <h2>Cart Totals</h2>
                    <div>
                        <div className="cartitems-total-item">
                            <p>Subtotal</p>
                            <p>${all_product.reduce((total, product) => {
                                return total + (product.new_price * (cartItems[product.id] || 0));
                            }, 0)}</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <p>Shipping Fee</p>
                            <p>Free</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <h3>Total</h3>
                            <h3>${all_product.reduce((total, product) => {
                                return total + (product.new_price * (cartItems[product.id] || 0));
                            }, 0)}</h3>
                        </div>
                    </div>
                    <button>PROCEED TO CHECKOUT</button>
                </div>
                <div className="cartitems-promocode">
                    <p>If you have a promo code, Enter it here</p>
                    <div className="cartitems-promobox">
                        <input type="text" placeholder="promo code" />
                        <button>Apply</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartItems