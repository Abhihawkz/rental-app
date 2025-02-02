import { useState } from "react";
import { post } from "../services/ApiEndPoint";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Logout } from "../redux/AuthSlice";

const Admin = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.Auth.user);

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
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !newProduct.name ||
      !newProduct.description ||
      !newProduct.price ||
      !newProduct.image
    ) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      const { name, description, price, image } = newProduct;
      const response = await post("/api/v1/product/add", {
        name,
        description,
        price,
        image,
      });
      if (response.status === 200) {
        toast.success(response.data.message);
        setNewProduct({ name: "", description: "", price: "", image: "" });
      }
    } catch (error) {
      console.log("Error while Adding the data");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex justify-between items-center px-6 py-4 w-full border-b-2 border-gray-200 bg-white">
        <div className="text-lg font-medium text-gray-800 cursor-pointer">
          Welcome, {user.username}!
        </div>
        <button
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md cursor-pointer"
          onClick={onLogout}
        >
          Logout
        </button>
      </div>

      <div className="flex h-screen">
        <div className="w-1/6 bg-white p-8 border-r-2 border-gray-200 h-full">
          <div className="text-xl font-semibold text-gray-900 mb-4">
            <Link to={"/"}>All Equipments</Link>
          </div>
        </div>

        <div className="w-full pl-4 pt-8 h-full">
          <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Add New Equipment
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={newProduct.name}
                  onChange={handleInputChange}
                  className="mt-2 p-2 w-full border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700" htmlFor="description">
                  Description
                </label>
                <textarea
                  name="description"
                  id="description"
                  value={newProduct.description}
                  onChange={handleInputChange}
                  className="mt-2 p-2 w-full border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700" htmlFor="price">
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  value={newProduct.price}
                  onChange={handleInputChange}
                  className="mt-2 p-2 w-full border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700" htmlFor="image">
                  Image URL
                </label>
                <input
                  type="text"
                  name="image"
                  id="image"
                  value={newProduct.image}
                  onChange={handleInputChange}
                  className="mt-2 p-2 w-full border border-gray-300 rounded"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-600"
              >
                Add Product
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
