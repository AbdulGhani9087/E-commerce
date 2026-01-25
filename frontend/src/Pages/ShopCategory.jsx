import React, { useState, useEffect, useContext } from 'react';
import './CSS/ShopCategory.css';
import { ShopContext } from '../Context/ShopContext';
import dropdown_icon from '../Components/Assets/dropdown_icon.png';
import Item from '../Components/Item/Item';

export const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);

  const [sortOption, setSortOption] = useState('default');
  const [visibleProducts, setVisibleProducts] = useState(12);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [showFilters, setShowFilters] = useState(false);

  //console.log('All products in context:', all_product);

  // Filter products by category (case-insensitive)
  const categoryProducts = all_product.filter(
    (item) => item.category?.toLowerCase() === props.category?.toLowerCase()
  );

  // Determine max price safely
  const maxPrice = Math.max(...categoryProducts.map((item) => item.new_price), 1000);

  // Update price range when maxPrice changes
  useEffect(() => {
    setPriceRange([0, maxPrice]);
  }, [maxPrice]);

  // Filter products by price range
  const priceFilteredProducts = categoryProducts.filter(
    (item) => item.new_price >= priceRange[0] && item.new_price <= priceRange[1]
  );

  // Sort products
  const sortedProducts = [...priceFilteredProducts].sort((a, b) => {
    switch (sortOption) {
      case 'price-low-high':
        return a.new_price - b.new_price;
      case 'price-high-low':
        return b.new_price - a.new_price;
      case 'name-a-z':
        return a.name.localeCompare(b.name);
      case 'name-z-a':
        return b.name.localeCompare(a.name);
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  // Pagination
  const productsToShow = sortedProducts.slice(0, visibleProducts);

  // Handlers
  const loadMore = () => setVisibleProducts((prev) => prev + 8);
  const handleSortChange = (e) => setSortOption(e.target.value);
  const handlePriceRangeChange = (min, max) => {
    setPriceRange([min, max]);
    setVisibleProducts(12); // reset pagination when filter changes
  };
  const resetFilters = () => {
    setSortOption('default');
    setPriceRange([0, maxPrice]);
    setVisibleProducts(12);
  };

  // Determine if still loading
  const isLoading = !all_product || all_product.length === 0;

  return (
    <div className='shop-category'>
      {isLoading ? (
        <p>Loading products...</p>
      ) : (
        <>
          <img className='shopcategory-banner' src={props.banner} alt={props.category} />

          <div className="shopcategory-header">
            <h1>{props.category} Collection</h1>
            <p>Discover our amazing {props.category.toLowerCase()} products</p>
          </div>

          <div className="shopcategory-controls">
            <div className="shopcategory-filter-toggle">
              <button 
                className="filter-btn"
                onClick={() => setShowFilters(!showFilters)}
              >
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </button>
            </div>

            <div className="shopcategory-indexSort">
              <p>
                <span>Showing 1-{productsToShow.length}</span> out of {categoryProducts.length} products
              </p>
              <div className="shopcategory-sort">
                <select value={sortOption} onChange={handleSortChange}>
                  <option value="default">Sort By: Default</option>
                  <option value="price-low-high">Price: Low to High</option>
                  <option value="price-high-low">Price: High to Low</option>
                  <option value="name-a-z">Name: A to Z</option>
                  <option value="name-z-a">Name: Z to A</option>
                  <option value="rating">Rating</option>
                </select>
              </div>
            </div>
          </div>

          <div className={`shopcategory-filters ${showFilters ? 'show' : ''}`}>
            <div className="filter-section">
              <h3>Price Range</h3>
              <div className="price-range">
                <span>${priceRange[0]} - ${priceRange[1]}</span>
                <input 
                  type="range" 
                  min="0" 
                  max={maxPrice} 
                  value={priceRange[1]}
                  onChange={(e) => handlePriceRangeChange(priceRange[0], parseInt(e.target.value))}
                  className="price-slider"
                />
              </div>
              <div className="price-buttons">
                <button onClick={() => handlePriceRangeChange(0, 50)}>Under $50</button>
                <button onClick={() => handlePriceRangeChange(50, 100)}>$50 - $100</button>
                <button onClick={() => handlePriceRangeChange(100, 200)}>$100 - $200</button>
                <button onClick={() => handlePriceRangeChange(200, maxPrice)}>Over $200</button>
              </div>
            </div>

            <div className="filter-actions">
              <button className="reset-btn" onClick={resetFilters}>
                Reset Filters
              </button>
            </div>
          </div>

          <div className="shopcategory-products">
            {productsToShow.length > 0 ? (
              productsToShow.map((item) => (
                <Item 
                  key={item.id} 
                  id={item.id} 
                  name={item.name} 
                  image={item.image} 
                  new_price={item.new_price} 
                  old_price={item.old_price}
                  rating={item.rating}
                  reviews={item.reviews}
                />
              ))
            ) : (
              <div className="no-products">
                <h3>No products found</h3>
                <p>Try adjusting your filters</p>
              </div>
            )}
          </div>

          {visibleProducts < sortedProducts.length && (
            <div className="shopcategory-loadmore" onClick={loadMore}>
              Load More Products
            </div>
          )}

          {productsToShow.length > 0 && (
            <div className="shopcategory-results">
              <p>Showing {productsToShow.length} of {sortedProducts.length} products</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ShopCategory;
