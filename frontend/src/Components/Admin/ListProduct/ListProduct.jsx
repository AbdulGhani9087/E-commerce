import React, { useEffect, useState } from 'react'
import './ListProduct.css'
import cross_icon from '../../Assets/cross_icon.png'

const BACKEND_URL = (import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000').replace(/\/$/, '');

const ListProduct = () => {
    const [allproducts, setAllproducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchInfo = async () => {
        setLoading(true);
        try {
            await fetch(`${BACKEND_URL}/allproducts`)
                .then((resp) => resp.json())
                .then((data) => { setAllproducts(data); });
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchInfo();
    }, [])

    const removeProduct = async (id) => {
        if (!window.confirm('Are you sure you want to delete this product?')) return;
        
        await fetch(`${BACKEND_URL}/deleteproduct`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ id: id })
        });
        await fetchInfo();
    }

    return (
        <div className='admin-list-product'>
            <h2 className="admin-list-title">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
                All Products
                <span className="admin-product-count">{allproducts.length} items</span>
            </h2>

            {loading ? (
                <div className="admin-list-loading">
                    <div className="admin-loading-spinner"></div>
                    <p>Loading products...</p>
                </div>
            ) : allproducts.length === 0 ? (
                <div className="admin-list-empty">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.5"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
                    <p>No products found. Add your first product!</p>
                </div>
            ) : (
                <>
                    <div className="admin-listproduct-header">
                        <p>Image</p>
                        <p>Title</p>
                        <p>Old Price</p>
                        <p>New Price</p>
                        <p>Category</p>
                        <p>Action</p>
                    </div>
                    <div className="admin-listproduct-allproducts">
                        {allproducts.map((product, index) => (
                            <div key={index} className="admin-listproduct-row">
                                <img src={product.image} alt={product.name} className='admin-listproduct-product-icon' />
                                <p className="admin-product-name">{product.name}</p>
                                <p className="admin-old-price">${product.old_price}</p>
                                <p className="admin-new-price">${product.new_price}</p>
                                <p><span className="admin-category-badge">{product.category}</span></p>
                                <button onClick={() => removeProduct(product.id)} className="admin-remove-btn" title="Delete product">
                                    <img src={cross_icon} alt="Remove" />
                                </button>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}

export default ListProduct
