import { useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { Link, useNavigate } from "react-router-dom";

const LoginComponent = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
   
    const [error, setError] = useState("");
    const navigate = useNavigate();
    function handleSubmit(e) {
        e.preventDefault();
        const configuration = {
      method: "post",
      url: "http://localhost:8000/api/v1/auth/login",
      data: {
        email,
        password,
      }
        };
        const cookies = new Cookies();

      axios(configuration)
          .then((result) => {
            cookies.set('token',result.data.token, {
          path: "/",
        })
        console.log(result ,"res")
        navigate('/home')
      })
      .catch((error) => {
        setError(error.response.data.message);
          console.error(error, "error");
    console.error(error.response.data.message);
      });

    }
  return (
      <div className="flex bg-white  justify-center items-center min-h-screen ">
        <div className="hidden md:block w-1/2 p-8">
        <img
          src="/login.png" // replace with the actual path to your image
          alt="Left background"
          className="w-full h-full object-cover"
        />
        </div>
      <div className="w-1/2 p-8">
        <div className="shadow-2xl rounded-md p-8 bg-white w-96">
            <h1 className="text-2xl text-center text-blue font-semibold mb-4">Login</h1>
            <form className="flex flex-col gap-4 text-blue" onSubmit={(e)=>handleSubmit(e)}  >
                  <label className="bg-white input input-bordered flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
              <input type="text" className="text-sm ml-1 w-full text-neutral-950 placeholder-metal" placeholder="Email" onChange={(e) => { setEmail(e.target.value); } } value={email} />
                  </label>
                  <label className=" bg-white input input-bordered flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
            <input type="password" className="text-sm ml-1 w-full text-neutral-950 placeholder-metal" placeholder="Password" onChange={(e) => { setPassword(e.target.value) } }  value={password}/>
                </label>
                <button type="submit" className="text-white btn btn-active btn-primary" onClick={(e)=>handleSubmit(e)}>Submit</button>

        </form>
        {error && (<p className="text-error	">{error}</p>)}
          <p className="mt-4 text-metal">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue hover:underline ">
              Register here
            </Link>
          </p>

        </div>
      </div>
    </div>
  )
}

export default LoginComponent