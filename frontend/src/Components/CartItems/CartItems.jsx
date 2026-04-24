import React, { useContext, useState } from 'react'
import './CartItems.css'
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../Assets/cart_cross_icon.png'

export const CartItems = () => {
    const { getTotalCartAmount, all_product, cartItems, removeFromCart, addToCart } = useContext(ShopContext);
    const [orderPlaced, setOrderPlaced] = useState(false);

    const handleCheckout = () => {
        if (getTotalCartAmount() > 0) {
            setOrderPlaced(true);
            // Scroll to top to see the message
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            alert("Your cart is empty!");
        }
    };

    if (orderPlaced) {
        return (
            <div className='order-success-container'>
                <div className="success-icon-wrapper">
                    <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                </div>
                <h1>Thanks for Shopping!</h1>
                <p>Your order has been placed successfully. We'll send you a confirmation email with your order details shortly.</p>
                <button className='back-to-shop-btn' onClick={() => window.location.replace("/")}>
                    Continue Shopping
                </button>
            </div>
        );
    }

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
                if (cartItems[product.id] > 0) {
                    return (
                        <div key={product.id}>
                            <div className="cartitems-format">
                                <img src={product.image} alt={product.name} className='carticon-product-icon' />
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

            <div className="cartitems-down">
                <div className="cartitems-total">
                    <h2>Cart Totals</h2>
                    <div>
                        <div className="cartitems-total-item">
                            <p>Subtotal</p>
                            <p>${getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <p>Shipping Fee</p>
                            <p>Free</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <h3>Total</h3>
                            <h3>${getTotalCartAmount()}</h3>
                        </div>
                    </div>
                    <button onClick={handleCheckout}>PROCEED TO CHECKOUT</button>
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