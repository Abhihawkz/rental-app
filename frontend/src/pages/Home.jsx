import { useEffect, useState } from "react";
import { get, post } from "../services/ApiEndPoint";
import Card from "../components/Card";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { Logout } from "../redux/AuthSlice";
import { FaBoxOpen, FaCartPlus, FaSignOutAlt } from "react-icons/fa";

const Home = () => {
  const [data, setData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("available");

  const dispatch = useDispatch();
  const user = useSelector((state) => state.Auth.user);
  const navigate = useNavigate();

  const fetchData = async (category) => {
    try {
      let response;
      if (category === "available") {
        response = await get("/api/v1/product/getAll");
        setData(response.data.products);
      } else if (category === "rented") {
        response = await get("/api/v1/product/userRented");
        if (response.data.products.length === 0) {
          setData([]);
        } else {
          const rentedProducts = response.data.products.map((item) => ({
            ...item.product,
            startDate: item.startDate,
            endDate: item.endDate,
            totalPrice: item.totalPrice,
          }));
          setData(rentedProducts);
        }
      }
    } catch (error) {
      toast.error("Failed to fetch data.");
    }
  };

  useEffect(() => {
    fetchData("available");
  }, []);

  const onLogout = async () => {
    try {
      const response = await post("/api/v1/user/logout");
      if (response.status === 200) {
        toast.success(response.data.message);
        dispatch(Logout());
        navigate("/signin");
      }
    } catch (error) {
      toast.error("Logout failed.");
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    fetchData(category);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex justify-between items-center px-6 py-4 w-full border-b-2 border-gray-200 bg-white">
        <div className="text-lg font-medium text-gray-800 cursor-pointer">
          Welcome, {user.username ? user.username : "no Name"}!
        </div>
        <button
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md cursor-pointer"
          onClick={onLogout}
        >
          <FaSignOutAlt className="inline-block mr-2" /> Logout
        </button>
      </div>
      <div className="flex h-screen">
        <div className="w-1/6 bg-white p-8 border-r-2 border-gray-200 h-full">
          <div
            className="flex items-center space-x-3 text-lg font-semibold text-gray-600 mb-4 cursor-pointer hover:bg-gray-100 px-2 py-1 rounded-md transition-all"
            onClick={() => handleCategoryClick("available")}
          >
            <FaBoxOpen className="text-lg" />
            <span>All Equipments</span>
          </div>
          <div
            className="flex items-center space-x-3 text-lg font-semibold text-gray-600 mb-4 cursor-pointer hover:bg-gray-100 px-2 py-1 rounded-md transition-all"
            onClick={() => handleCategoryClick("rented")}
          >
            <FaCartPlus className="text-lg" />
            <span>Rented Equipments</span>
          </div>
          {user.role === "admin" && (
            <div className="flex items-center space-x-3 text-lg font-semibold text-gray-600 mb-4 cursor-pointer hover:bg-gray-100 px-2 py-1 rounded-md transition-all">
              <FaBoxOpen className="text-lg" />
              <Link to={"/admin"}>Add Equipments</Link>
            </div>
          )}
        </div>
        <div className="w-full pl-4 pt-8">
          {selectedCategory === "rented" && data.length === 0 ? (
            <div className="text-center text-xl font-semibold text-gray-700">
              No items you have rented
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {data.map((product) => (
                <div
                  key={product._id}
                  className="border rounded-lg p-4 bg-white shadow-md"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-40 object-cover mb-4"
                  />
                  <h3 className="text-xl font-semibold text-gray-800">
                    {product.name}
                  </h3>
                  <p className="text-gray-600">{product.description}</p>
                  <p className="text-lg font-medium text-gray-900">
                    Price: Rs - {product.price}
                  </p>

                  {selectedCategory === "rented" && (
                    <>
                      <p className="text-sm text-gray-600">
                        Rented from:{" "}
                        {new Date(product.startDate).toLocaleDateString()} -{" "}
                        {new Date(product.endDate).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-600">
                        Total Price: Rs - {product.totalPrice}
                      </p>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
