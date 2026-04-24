import React, { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { ShopContext } from '../Context/ShopContext'
import AdminSidebar from '../Components/Admin/AdminSidebar/AdminSidebar'
import AddProduct from '../Components/Admin/AddProduct/AddProduct'
import ListProduct from '../Components/Admin/ListProduct/ListProduct'
import './CSS/AdminPanel.css'

const AdminPanel = () => {
    const { isAdmin } = useContext(ShopContext);

    // If not admin, redirect to login
    if (!isAdmin) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className='admin-panel'>
            <AdminSidebar />
            <div className="admin-panel-content">
                <Routes>
                    <Route index element={<Navigate to="addproduct" replace />} />
                    <Route path='addproduct' element={<AddProduct />} />
                    <Route path='listproduct' element={<ListProduct />} />
                </Routes>
            </div>
        </div>
    )
}

export default AdminPanel
