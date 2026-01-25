import React, { useState, useEffect, useRef } from 'react'
import './Popular.css'
import data_product from '../Assets/data'
import Item from '../Item/Item'

export const Popular = () => {
  const [popularProducts,setPopularProducts]=useState([])
  const [isVisible, setIsVisible] = useState(false);
  const [animatedItems, setAnimatedItems] = useState([]);
  const sectionRef = useRef(null);

  useEffect(()=>{
          fetch('http://localhost:4000/popularinwomen')
          .then((response)=>response.json())
          .then((data)=>setPopularProducts(data))
       },[])


  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Animate items sequentially
          data_product.forEach((_, index) => {
            setTimeout(() => {
              setAnimatedItems(prev => [...prev, index]);
            }, index * 200);
          });
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className={`popular ${isVisible ? 'visible' : ''}`} ref={sectionRef}>
        <div className="popular-header">
            <h1 className="popular-title">POPULAR IN WOMEN</h1>
            <div className="popular-underline">
                <hr />
                <div className="underline-glow"></div>
            </div>
            <p className="popular-subtitle">Discover our most loved products</p>
        </div>
        
        <div className="popular-item">
            {popularProducts.map((item, i) => (
                <div 
                    key={i} 
                    className={`item-container ${animatedItems.includes(i) ? 'animated' : ''}`}
                    style={{ animationDelay: `${i * 0.1}s` }}
                >
                    <Item 
                        image={item.image} 
                        name={item.name} 
                        new_price={item.new_price} 
                        old_price={item.old_price}
                    />
                    <div className="item-badge">Hot 🔥</div>
                </div>
            ))}
        </div>
        
        <div className="popular-bg-elements">
            <div className="bg-circle circle-1"></div>
            <div className="bg-circle circle-2"></div>
            <div className="bg-circle circle-3"></div>
        </div>
    </div>
  )
}

export default Popular