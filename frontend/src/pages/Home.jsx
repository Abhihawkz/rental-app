import { useEffect, useState } from "react";
import { get } from "../services/ApiEndPoint";

const Home = () => {
  
    const [data,setData] = useState([])
     
    useEffect(()=>{
        async function getData(){
            const response = await get("/api/v1/product/getAll")
            console.log(response.data)
            setData(response.data.products)
        }
        getData()
    },[])
  
    return (
    <>
    <div>Home page</div>
    {data.map(({name,_id})=>(<p key={_id}>{name}</p>))}
    </>
  )
}

export default Home;