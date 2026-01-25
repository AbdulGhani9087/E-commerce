import React from 'react'
import './Offers.css'
import exclusive_image from '../Assets/exclusive_image.png'

export const Offers = () => {
  return (
    <div className="offers">
        <div className="offers-left">
            <h1>Exclusive</h1>
            <h1>Special Offers For You</h1>
            <p>Only On Best Seller Products</p>
            <button>Check Now</button>
        </div>
        <div className="offers-right"> {/* Fixed: was "offers right" */}
            <img src={exclusive_image} alt="Exclusive Offer" />
        </div>
    </div>
  )
}

export default Offers