import React, { useState } from 'react'
import './AddProduct.css'
import upload_area from '../../Assets/upload_area.svg'

const BACKEND_URL = (import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000').replace(/\/$/, '');

const AddProduct = () => {
    const [image, setImage] = useState(false);
    const [loading, setLoading] = useState(false);

    const [productDetails, setProductDetails] = useState({
        name: "",
        image: "",
        category: "Women",
        old_price: "",
        new_price: "",
    });

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    }

    const changehandler = (e) => {
        setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
    }

    const Add_Product = async () => {
        if (!productDetails.name || !productDetails.old_price || !productDetails.new_price || !image) {
            alert("Please fill all fields and upload an image");
            return;
        }

        setLoading(true);
        try {
            let responseData;
            let product = { ...productDetails };

            let formData = new FormData();
            formData.append('product', image);

            await fetch(`${BACKEND_URL}/upload`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json'
                },
                body: formData
            }).then((resp) => resp.json()).then((data) => { responseData = data; });

            if (responseData.success) {
                product.image = responseData.image_url;
                await fetch(`${BACKEND_URL}/addproduct`, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(product)
                }).then((resp) => resp.json()).then((data) => {
                    if (data.success) {
                        alert("Product added successfully!");
                        setProductDetails({ name: "", image: "", category: "Women", old_price: "", new_price: "" });
                        setImage(false);
                    } else {
                        alert("Failed to add product");
                    }
                });
            }
        } catch (error) {
            alert("Error adding product: " + error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='admin-add-product'>
            <h2 className="admin-add-title">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
                Add New Product
            </h2>
            <div className="admin-addproduct-itemfield">
                <label>Product Title</label>
                <input value={productDetails.name} type="text" name='name' placeholder='Enter product name' onChange={changehandler} />
            </div>
            <div className="admin-add-product-price">
                <div className="admin-addproduct-itemfield">
                    <label>Original Price ($)</label>
                    <input value={productDetails.old_price} onChange={changehandler} type="text" name='old_price' placeholder='e.g. 99.99' />
                </div>
                <div className="admin-addproduct-itemfield">
                    <label>Offer Price ($)</label>
                    <input value={productDetails.new_price} onChange={changehandler} type="text" name='new_price' placeholder='e.g. 49.99' />
                </div>
            </div>
            <div className="admin-addproduct-itemfield">
                <label>Product Category</label>
                <select value={productDetails.category} onChange={changehandler} name="category" className="admin-add-product-selector">
                    <option value="Women">Women</option>
                    <option value="Men">Men</option>
                    <option value="Kids">Kids</option>
                </select>
            </div>
            <div className="admin-addproduct-itemfield">
                <label>Product Image</label>
                <label htmlFor="admin-file-input" className="admin-upload-label">
                    <img src={image ? URL.createObjectURL(image) : upload_area} className="admin-addproduct-thumbnail-img" alt="Upload" />
                    <span className="admin-upload-hint">{image ? 'Click to change image' : 'Click to upload image'}</span>
                </label>
                <input onChange={handleImageChange} type="file" name='image' id='admin-file-input' hidden />
            </div>

            <button onClick={Add_Product} className='admin-add-product-btn' disabled={loading}>
                {loading ? (
                    <span className="admin-btn-loading">
                        <svg className="admin-spinner" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" fill="none" strokeDasharray="31.4" strokeDashoffset="10"/></svg>
                        Adding...
                    </span>
                ) : (
                    'ADD PRODUCT'
                )}
            </button>
        </div>
    )
}

export default AddProduct
