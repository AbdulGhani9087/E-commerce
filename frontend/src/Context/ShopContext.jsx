import React, { createContext, useState, useEffect } from 'react';
// import all_product from '../Components/Assets/all_product';

export const ShopContext = createContext(null);

const BACKEND_URL = (import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000').replace(/\/$/, '');

const getDefaultCart = () => {
  let cart = {};
  for (let i = 1; i <= 301; i++) {
    cart[i] = 0;
  }
  return cart;
};

export const ShopContextProvider = (props) => {
  const [all_product, setAllProduct] = useState([]);
  const [cartItems, setCartItems] = useState(getDefaultCart());
useEffect(() => {
  fetch(`${BACKEND_URL}/allproducts`)
    .then((response) => response.json())
    .then((data) => setAllProduct(data))
    .catch(error => console.error('Fetch error:', error));

  if (localStorage.getItem('authtoken')) {
    fetch(`${BACKEND_URL}/getcart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authtoken': localStorage.getItem('authtoken'),
      },
    })
    .then((response) => response.json())
    .then((data) => setCartItems(data))
    .catch((error) => console.error('Get cart error:', error));
  }
}, []);






  // User state for authentication
  const [user, setUser] = useState(() => {
    // Try loading user from localStorage if any
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Optional: sync user to localStorage when it changes
  useEffect(() => {
    if (user && user.isLoggedIn) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const addtoCart = (itemId) => {
  setCartItems((prev) => {
    const updated = { ...prev, [itemId]: prev[itemId] + 1 };

    if (localStorage.getItem('authtoken')) {
      fetch(`${BACKEND_URL}/addtocart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authtoken': localStorage.getItem('authtoken'),
        },
        body: JSON.stringify({
          itemId: itemId,
        }),
      })
      .then((response) => response.json())
      .then((data) => console.log('Cart updated:', data))
      .catch((err) => console.error('Add to cart error:', err));
    }

    return updated;
  });
};


  const removeFromCart = (itemId) => {
  setCartItems((prev) => {
    const updated = { ...prev, [itemId]: Math.max(prev[itemId] - 1, 0) };

    if (localStorage.getItem('authtoken')) {
      fetch(`${BACKEND_URL}/removefromcart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authtoken': localStorage.getItem('authtoken'),
        },
        body: JSON.stringify({
          itemId: itemId,
        }),
      })
      .then((response) => response.json())
      .then((data) => console.log('Removed from cart:', data))
      .catch((err) => console.error('Remove from cart error:', err));
    }

    return updated;
  });
};


const getTotalCartAmount = () => {
  let totalAmount = 0;
  for (const item in cartItems) {
    if (cartItems[item] > 0) {
      let itemInfo = all_product.find((product) => product.id === Number(item));
      if (itemInfo) {
        totalAmount += cartItems[item] * itemInfo.new_price;
      }
    }
  }
  return totalAmount;
};


  const getTotalCartItems = () => {
    let totalItems = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItems += cartItems[item];
      }
    }
    return totalItems;
  };

  useEffect(() => {
    console.log('Cart items updated:', cartItems);
  }, [cartItems]);

  const contextValue = {
    getTotalCartItems,
    getTotalCartAmount,
    all_product,
    cartItems,
    addtoCart,
    removeFromCart,
    user,
    setUser,   // <-- Add setUser here for login/signup to use
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
