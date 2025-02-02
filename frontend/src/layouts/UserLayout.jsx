import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const UserLayout = () => {
  const user = useSelector((state) => state.Auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      console.log("User not found, redirecting to signin");
      navigate("/signin");
    }
  }, [user, navigate]);

  if (!user) return null;

  return <Outlet />;
};

export default UserLayout;
