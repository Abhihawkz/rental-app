import { useEffect, useState } from "react";
import { get, post } from "../services/ApiEndPoint";
import Card from "../components/Card";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Logout } from "../redux/AuthSlice";

const Home = () => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch()
  const user = useSelector((state) => state.Auth.user);
  const navigate = useNavigate()
  useEffect(() => {
    async function getData() {
      const response = await get("/api/v1/product/getAll");
      console.log(response.data);
      setData(response.data.products);
    }
    getData();
  }, []);

  const onLogout = async() => {
    try {
        const response = await post("/api/v1/user/logout")
        if(response.status == 200){
            toast.success(response.data.message)
            dispatch(Logout())
            navigate("/signin")    
        }
    } catch (error) {
        
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="flex justify-between items-center px-6 py-4 w-full border-b-2 border-gray-200 bg-white">
          <div className="text-lg font-medium text-gray-800 cursor-pointer">
            Welcome, {user.username}!
          </div>
          <h2 className="text-3xl font-semibold text-center flex-1 text-gray-900">
            Equipments
          </h2>
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md cursor-pointer"
            onClick={onLogout}
          >
            Logout
          </button>
        </div>
        <div className="p-8">

        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data.map((product) => (
            <Card
              key={product._id}
              name={product.name}
              image={product.image}
              description={product.description}
              price={product.price}
              available={product.available}
            />
          ))}
        </div>
      </div>
      </div>
    </>
  );
};

export default Home;
