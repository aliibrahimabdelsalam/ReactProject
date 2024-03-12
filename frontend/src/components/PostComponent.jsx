/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";

const PostComponent = ({ data, setDel }) => {
  const [userId, setUserId] = useState('');
  const time1 = Date.now();
  const time2 = new Date(data.createdAt).getTime();
  const differ = time1 - time2;

  const hour = Math.floor(differ / (1000 * 60 * 60 ));
  const min = Math.floor(differ / (1000 * 60  ));
  const day = Math.floor(differ / (1000 * 60 * 60 * 24));
  useEffect(() => {
    const cookies = new Cookies();
    const token = cookies.get('token');
    const tokenData = JSON.parse(atob(token.split('.')[1]));
    setUserId(tokenData.id)
  },[])
  function handleDelete(e, id) {
    const cookies = new Cookies();
    const token = cookies.get('token');

    e.preventDefault();
    axios.delete(`http://localhost:8000/api/v1/posts/${id}`, {headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token} `,
      }})
      .then(res => {
        setDel(true)
      }).catch(err => {
      console.log(err.response.data.message)
      })
  }
  return (
  <div className="flex justify-center mt-4">
    <div className="bg-white w-1/2 p-4 rounded-lg shadow-lg">
      <div className="flex flex-col text-neutral-900 m-2">
          <div className="flex justify-between mb-1">
            <div className="flex start ">
              {/* <img src={data.user.media} alt="image" /> */}
              <div className="w-10 h-10 rounded-full overflow-hidden ">
                <img alt="image" className="object-cover w-full h-full "src={data.user.media} />
                </div>
              <p className="text-lg ml-5 font-semibold mb-2">{data.user.name}</p>
            </div>
              {day ? <p className=" font-semibold mb-2 text-sm">from {day} day</p>:''}
              {(!day && hour)? <p className=" font-semibold mb-2 text-sm">from {hour} hour</p>:''}
              {(min && !hour)?<p className=" font-semibold mb-2 text-sm">from {min} min</p>:''}
              {(!min)?<p className=" font-semibold mb-2 text-sm">from a second</p>:''}
          </div>
          <hr className="mb-4"></hr>
        <p className="text-gray-600">{data.description}</p>
        <img src={data.media} className="mt-4 w-full h-auto rounded-lg" alt="Post Media" />
      </div>
      <div className="mt-4 flex items-center justify-between">
          {data.user._id === userId && (
            <>
              <button onClick={(e) => handleDelete(e, data._id)}
              className="text-white btn btn-active btn-primary hover:bg-purple">Delete</button>
              <Link to={`/post/${data._id}`}className="text-white btn btn-active btn-primary hover:bg-purple">
              Update</Link>
            </>
        )}
      </div>
    </div>
  </div>

  )
}
export default PostComponent