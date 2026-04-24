import React, { useState, useEffect, useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { ShopContext } from '../../Context/ShopContext'

export const Navbar = () => {
    const [menu, setMenu] = useState("shop");
    const { getTotalCartItems, isAdmin, setIsAdmin } = useContext(ShopContext);
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();

    // Detect scroll for navbar background change
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Update menu based on current route
    useEffect(() => {
        const path = location.pathname.substring(1);
        if (path === '') setMenu("shop");
        else if (['men', 'women', 'kids'].includes(path)) setMenu(path);
        else if (path.startsWith('admin')) setMenu("admin");
    }, [location]);

    const handleMenuClick = (menuItem) => {
        setMenu(menuItem);
    };

    const handleLogout = () => {
        localStorage.removeItem('authtoken');
        localStorage.removeItem('user');
        setIsAdmin(false);
        window.location.replace("/");
    };

    return (
        <div className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
            <div className="nav-logo">
                <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                    <img src={logo} alt="logo" className="logo-spin" />
                    <p className="logo-text">Shopper</p>
                </Link>
                <div className="logo-glow"></div>
            </div>
            
            <ul className="nav-menu">
                {[
                    { key: "shop", path: "/", label: "Shop" },
                    { key: "men", path: "/men", label: "Men" },
                    { key: "women", path: "/women", label: "Women" },
                    { key: "kids", path: "/kids", label: "Kids" }
                ].map((item) => (
                    <li 
                        key={item.key} 
                        onClick={() => handleMenuClick(item.key)}
                        className={menu === item.key ? 'active' : ''}
                    >
                        <Link to={item.path} className="nav-link">
                            {item.label}
                            {menu === item.key && (
                                <>
                                    <hr />
                                    <div className="active-dot"></div>
                                </>
                            )}
                        </Link>
                        <div className="menu-hover-effect"></div>
                    </li>
                ))}

                {/* Admin Panel link — only visible for admins */}
                {isAdmin && (
                    <li
                        onClick={() => handleMenuClick("admin")}
                        className={`nav-admin-item ${menu === "admin" ? 'active' : ''}`}
                    >
                        <Link to="/admin" className="nav-link nav-admin-link">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
                                <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
                            </svg>
                            Admin
                            {menu === "admin" && (
                                <>
                                    <hr />
                                    <div className="active-dot"></div>
                                </>
                            )}
                        </Link>
                        <div className="menu-hover-effect"></div>
                    </li>
                )}
            </ul>
            
            <div className="nav-login-cart">
                {localStorage.getItem('authtoken') ? (
                    <button className='logoutbutton' onClick={handleLogout}>
                        Logout
                    </button>
                ) : (
                    <Link to='/login' className="login-link">
                        <button className="login-btn">
                            <span className="btn-text">Login</span>
                            <span className="btn-glow"></span>
                        </button>
                    </Link>
                )}

                <Link to='/cart' className="cart-link">
                    <div className="cart-container">
                        <img src={cart_icon} alt="cart icon" className="cart-icon" />
                        <div className="nav-cart-count">
                            {getTotalCartItems && getTotalCartItems()}
                            <div className="cart-pulse"></div>
                        </div>
                        <div className="cart-badge"></div>
                    </div>
                </Link>
            </div>

            {/* Animated background elements */}
            <div className="nav-bg-circle circle-1"></div>
            <div className="nav-bg-circle circle-2"></div>
        </div>
    )
}