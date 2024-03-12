import axios from "axios";
import { useEffect, useState } from "react"
import Cookies from "universal-cookie"
import PostComponent from "./PostComponent";
import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";

function Profile() {
    const [data, setData] = useState();
    const [media, setMedia] = useState();
    const [userId, setUserId] = useState();
    const [image, setImage] = useState();
    const navigate = useNavigate();
    const cookies = new Cookies();
    const token = cookies.get('token');
  
  useEffect(() => {
    if (!token) {
        alert("you should Login First ")
      navigate('/login')
      return
    }
    const userData = JSON.parse(atob(token.split('.')[1]));
    console.log(userData)
      setUserId(userData.id)
        axios.get(`http://localhost:8000/api/v1/posts/profile/${userData.id}`,{headers: {
        "Authorization": `Bearer ${token} `,
        }
        }).then(res => {
          setData(res.data.data)
          setImage(res.data.data[0].user.media)
        })
    }, [image])
  function handleImage(e) { 
    setMedia(e.target.files[0])
  }
  function changeProfilePic() {
   
    const formData = new FormData();
    formData.append('media', media);
    const configuration = {
      method: "patch",
      url: `http://localhost:8000/api/v1/auth/${userId}`,
       data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token} `,
      }
    };
    axios(configuration).then(res => {
      setImage(res.data.data.media)
    })
  }
  return (
    <div className="bg-silver">
      <NavBar image={image} />
      <div className="flex justify-center mt-6">
        <div className="bg-white w-1/2 p-4 h-96 rounded-lg shadow-lg">
          <img className="w-full object-contain h-5/6 " src={image} alt="image" />
          <input type="file" onChange={handleImage} className="file-input file-input-bordered file-input-primary file-input-sm w-1/2 max-w-xs" />
          <button className="bg-blue ml-16 text-white py-2 px-4 rounded hover:bg-purple focus:outline-none focus:shadow-outline-blue active:bg-blue-800 transition duration-150 ease-in-out"
            onClick={changeProfilePic}>Submit</button>
        </div>
      </div>
      {data?.map(d => 
        <PostComponent key={d._id} data={d} />
      )}
    </div>
  )
}

export default Profile