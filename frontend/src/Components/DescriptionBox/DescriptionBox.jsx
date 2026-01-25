import React, { useState } from 'react'
import './DescriptionBox.css'

export const DescriptionBox = () => {
  const [activeTab, setActiveTab] = useState('description');
  
  return (
    <div className='Descriptionbox'>
        <div className="descriptionbox-navigator">
            <div 
                className={`descriptionbox-nav-box ${activeTab === 'description' ? 'active' : ''}`}
                onClick={() => setActiveTab('description')}
            >
                Description
            </div>
            <div 
                className={`descriptionbox-nav-box fade ${activeTab === 'reviews' ? 'active' : ''}`}
                onClick={() => setActiveTab('reviews')}
            >
                Reviews (122)
            </div>
        </div>
        
        {activeTab === 'description' && (
            <div className="descriptionbox-description">
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure modi, vitae voluptatibus perspiciatis nobis incidunt eum aliquam fuga repudiandae laudantium sit maxime, nisi totam! Quam.
                </p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, assumenda.</p>
            </div>
        )}
        
        {activeTab === 'reviews' && (
            <div className="descriptionbox-description">
                <p>Reviews content goes here...</p>
                {/* Add your reviews content */}
            </div>
        )}
    </div>
  )
}

export default DescriptionBox