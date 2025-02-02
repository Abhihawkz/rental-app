import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { post } from "../services/ApiEndPoint";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { SetUser } from "../redux/AuthSlice.js";


const Login = () => {
  
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const {email,password} = formData;
      const response = await post("/api/v1/user/login",{email,password})
      if(response.status == 200){
        toast.success(response.data.message)
        dispatch(SetUser(response.data.user))
        navigate('/')
      }
      setError("");
      setFormData({
        email: "",
        password: "",
      });
    } catch (err) {
      if (err.response && err.response.data) {
        setError(
          err.response.data.message || "An error occurred while registering"
        );
      } else {
        setError("Network error or server down");
      }
      setSuccessMessage("");
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100">
      <div className="w-full max-w-xs sm:max-w-sm p-4 sm:p-6 bg-white rounded-xl shadow-lg border border-gray-300 transition-all duration-300 ease-in-out transform hover:scale-101">
        <h2 className="text-2xl font-semibold text-center text-blue-600 mb-6">
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-800 text-sm font-medium mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-800 text-sm font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600 text-sm">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Register
          </Link>
        </p>
        {error && <div className="mt-4 text-red-600 text-sm">{error}</div>}
      </div>
    </div>
  );
};

export default Login;
