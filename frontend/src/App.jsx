import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import { Navbar } from './Components/Navbar/Navbar'
import { Shop } from './Pages/Shop'
import { ShopCategory } from './Pages/ShopCategory'
import { Product } from './Pages/Product'
import { Cart } from './Pages/Cart'
import LoginSignup  from './Pages/LoginSignup'
import Footer from './Components/Footer/Footer'

import men_banner from './Components/Assets/banner_mens.png'
import women_banner from './Components/Assets/banner_women.png'
import kids_banner from './Components/Assets/banner_kids.png'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Shop />} />
          <Route path='/shop' element={<Shop />} />
          <Route path='/men' element={<ShopCategory banner={men_banner} category="Men" />} />
          <Route path='/women' element={<ShopCategory banner={women_banner} category="Women" />} />
          <Route path='/kids' element={<ShopCategory banner={kids_banner} category="Kids" />} />
          <Route path='/product/:productId' element={<Product />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/login' element={<LoginSignup />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App