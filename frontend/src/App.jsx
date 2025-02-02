import React from 'react'
import { BrowserRouter, Route, Routes} from "react-router-dom";
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Product from './pages/Product.jsx';
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<Register />}  />
        <Route path='/products' element={<Product />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;