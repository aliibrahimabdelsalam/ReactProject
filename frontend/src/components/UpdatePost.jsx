import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "universal-cookie";
import NavBar from "./NavBar";

const UpdatePost = () => {
  const { id } = useParams();
  const [description, setDescription] = useState("");
  const [media, setMedia] = useState(null);
  const navigate = useNavigate();
    const cookies = new Cookies();
  const token=cookies.get('token')
  useEffect(() => {
    const fetchData = async () => {
      const {data} = await axios.get(`http://localhost:8000/api/v1/posts/${id}`,{headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${token} `,
      }});
      setDescription(data.data.description)
      setMedia(data.data.media)
    };
    fetchData();
  }, []);
  function handleDec(e) {
    setDescription(e.target.value)
  }
  function handleImage(e) {
    setMedia(e.target.files[0])
  }
  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append('media', media);
    formData.append('description', description);
    const configuration = {
      method: "patch",
      url: `http://localhost:8000/api/v1/posts/${id}`,
       data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${cookies.get('token')} `,
      }
      
      };
    axios(configuration).then(result => {
      console.log(result.data)
    })
    navigate('/home')
  }
   function handleLogout() {
    cookies.remove('token');
    navigate('/login')
  }
  return (
    <>
      <NavBar handleLogout={handleLogout} />
    <div className="mt-8 p-6 bg-white shadow-md rounded-md w-1/2 mx-auto">
      <form onSubmit={(e) => handleSubmit(e)} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="bio" className="text-gray-700 text-sm">Bio</label>
          <div className="relative rounded-md shadow-sm">
            <textarea
              id="bio"
              placeholder="Write your bio here..."
              value={description}
              className="form-input block w-full leading-5 rounded-md transition duration-150 ease-in-out sm:text-sm sm:leading-5"
              onChange={handleDec}
            ></textarea>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="fileInput" className="text-gray-700 text-sm">Upload Image</label>
          <div className="relative rounded-md shadow-sm">
            <input
              id="fileInput"
              type="file"
              className="form-input block w-full leading-5 rounded-md transition duration-150 ease-in-out sm:text-sm sm:leading-5"
              onChange={handleImage}
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue text-white py-2 px-4 rounded hover:bg-purple focus:outline-none focus:shadow-outline-blue active:bg-blue-800 transition duration-150 ease-in-out"
        >
          Submit
        </button>
      </form>
    </div>
    </>

  )
}
export default UpdatePost