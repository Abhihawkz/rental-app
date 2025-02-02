import {Outlet, useNavigate} from "react-router-dom"
import { useSelector } from "react-redux";
import { useEffect } from "react";
const AdminLayout = () => {
  const user = useSelector((state) => state.Auth.user)
 
  const navigate = useNavigate()
  useEffect(()=>{
    if(!user || user.role !== "admin"){
        console.log(user.isAdmin)
        navigate("/signin")
    }
  })
  return (
    <>
    <Outlet />
    </>
  )
}

export default AdminLayout;