import React from 'react'
import { BrowserRouter, Route, Routes} from "react-router-dom";
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home.jsx';
const App = () => {
  return (
    <BrowserRouter>
    <Toaster />
      <Routes>
        <Route path='/signin' element={<Login />} />
        <Route path='/signup' element={<Register />}  />
        <Route path='/' element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;