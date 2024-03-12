import axios from "axios"
import { useEffect, useState } from "react"
import PostComponent from "./PostComponent";
import AddPost from "./AddPost";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

function HomeComponent() {
  const [data, setData] = useState([]);
  const [del, setDel] = useState(false);
  const [add, setAdd] = useState(false);
  const navigate = useNavigate();
  const cookies = new Cookies();
  const token=cookies.get('token')
  useEffect( ()=>{
    if (!token) {
      alert("you should Login First ")
      navigate('/login')
      return
    }
    axios.get('http://localhost:8000/api/v1/posts')
      .then(res => {
        setData(res.data.data)
      })
    return () => {
      setAdd(false)
      setDel(false)
    }
  }, [del, add])
  function handleLogout() {
    cookies.remove('token');
    navigate('/login')
  }
  return (
    <div className="bg-silver">
      <NavBar handleLogout={handleLogout} />
      <AddPost setAdd={setAdd} />
      {data.map(d => 
        <PostComponent key={d._id} data={d} setDel={setDel} />
      )}
    </div>
  )
}

export default HomeComponent