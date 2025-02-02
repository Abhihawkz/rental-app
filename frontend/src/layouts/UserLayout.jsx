import {Outlet, useNavigate} from "react-router-dom"
import { useSelector } from "react-redux";
import { useEffect } from "react";
const UserLayout = () => {
  const user = useSelector((state) => state.Auth.user)
 
  const navigate = useNavigate()
  useEffect(()=>{
    if(!user && user.username){
        navigate("/signin")
    }
  })
  return (
    <><Outlet /></>
  )
}

export default UserLayout;