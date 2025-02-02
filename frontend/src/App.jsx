import React from 'react'
import { BrowserRouter, Route, Routes} from "react-router-dom";
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home.jsx';
import AdminLayout from './layouts/AdminLayout.jsx';
import Admin from './pages/Admin.jsx';
import UserLayout from './layouts/UserLayout.jsx';
import PublicLayout from './layouts/PublicLayout.jsx';
const App = () => {
  return (
    <BrowserRouter>
    <Toaster />
      <Routes>
        <Route path='/admin' element={<AdminLayout />}>
        <Route index element={<Admin/>}>
        </Route>
        </Route>
        <Route path='/' element={<PublicLayout/>}>
        <Route path='signin' element={<Login />} />
        <Route path='signup' element={<Register />}  />
        </Route>
        <Route path='/' element={<UserLayout />}>
        <Route index element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;