import React from 'react'
import './AdminSidebar.css'
import { Link, useLocation } from 'react-router-dom'

const AdminSidebar = () => {
    const location = useLocation();

    const menuItems = [
        {
            path: '/admin/addproduct',
            label: 'Add Product',
            icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/>
                </svg>
            )
        },
        {
            path: '/admin/listproduct',
            label: 'Product List',
            icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/>
                    <line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
                </svg>
            )
        }
    ];

    return (
        <div className='admin-sidebar'>
            <div className="admin-sidebar-header">
                <div className="admin-sidebar-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
                        <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
                    </svg>
                </div>
                <h3>Admin Panel</h3>
            </div>
            <nav className="admin-sidebar-nav">
                {menuItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`admin-sidebar-item ${location.pathname === item.path ? 'active' : ''}`}
                    >
                        <span className="admin-sidebar-item-icon">{item.icon}</span>
                        <span className="admin-sidebar-item-label">{item.label}</span>
                    </Link>
                ))}
            </nav>
            <div className="admin-sidebar-footer">
                <Link to="/" className="admin-sidebar-back">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
                    </svg>
                    Back to Store
                </Link>
            </div>
        </div>
    )
}

export default AdminSidebar
