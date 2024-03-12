import axios from "axios";
import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

const AddPost = ({setAdd}) => {
  const [description, setDescription] = useState("");
  const [media, setMedia] = useState(null);
    const fileInputRef = useRef(null);

  const navigate = useNavigate();
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
    const cookies = new Cookies();

     const configuration = {
      method: "post",
      url: "http://localhost:8000/api/v1/posts",
       data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${cookies.get('token')} `,
      }
    };
    console.log(configuration)
    axios(configuration).then(result => {
      setAdd(true)
    })
    fileInputRef.current.value = "";
    setMedia(null)
    setDescription("")
    navigate('/home')
  }
  return (
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
          ref={fileInputRef}
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
  )
}

export default AddPost