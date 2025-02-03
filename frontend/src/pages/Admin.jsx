import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Logout } from "../redux/AuthSlice";

const Admin = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    image: null,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.Auth.user);

  const onLogout = async () => {
    try {
      const response = await axios.post("/api/v1/user/logout");
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setNewProduct({
      ...newProduct,
      image: file,
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

    const formData = new FormData();
    formData.append("name", newProduct.name);
    formData.append("description", newProduct.description);
    formData.append("price", newProduct.price);
    formData.append("image", newProduct.image);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/product/add",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        toast.success(response.data.message);
        setNewProduct({ name: "", description: "", price: "", image: null });
      }
    } catch (error) {
      console.log("Error while adding the product", error);
      toast.error("Error while adding the product.");
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
                  Image
                </label>
                <input
                  type="file"
                  name="image"
                  id="image"
                  onChange={handleFileChange}
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
