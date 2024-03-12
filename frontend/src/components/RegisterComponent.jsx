import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

const RegisterComponent = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

  const navigate = useNavigate();
  const cookies = new Cookies();
    function handleSubmit(e) {
        e.preventDefault();
      if (password != confirmPassword) {
        setError('confirm password is not equal password');
        throw new Error('Passwords do not match');

      } else if (!isNaN(name)) { 
        setError(' name is should be String');
        throw new Error(' name is should be String');
        
      }

        const configuration = {
      method: "post",
      url: "http://localhost:8000/api/v1/auth/signup",
      data: {
        email,
        name,
        password,
        passwordConfirm:confirmPassword
      },
      };
      console.log(configuration)
      axios(configuration)
        .then((result) => {
          cookies.set('token',result.data.token)
        navigate('/home')
      })
        .catch((error) => {
        setError(error.response.data.message);
        
          console.error(error, "error");
    console.error(error.response.data.message);
      });

    }
  return (
      <div className="flex justify-center bg-white  items-center min-h-screen">
        <div className="w-1/2 p-8 flex justify-center">
          <div className="shadow-2xl rounded-md p-8 bg-white w-96">
            <h1 className="text-2xl text-center text-blue font-semibold mb-4">Register</h1>
            <form className="flex flex-col gap-4 text-blue" onSubmit={(e)=>handleSubmit(e)}  >
                  <label className=" bg-white input input-bordered flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
            <input type="text" className="text-sm	ml-1 w-full text-neutral-950 placeholder-metal" placeholder="Email" onChange={(e) => { setEmail(e.target.value); console.log(e.target.value)} } value={email} />
                  </label>
                  <label className="bg-white input input-bordered flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                  <input type="text" className="text-sm ml-1 w-full text-neutral-950 placeholder-metal" placeholder="Username" onChange={(e)=> setName(e.target.value) }  value={name}/>
                  </label>
                  <label className="bg-white input input-bordered flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
            <input type="password" className="text-sm ml-1 w-full text-neutral-950 placeholder-metal" placeholder="Password" onChange={(e) => { setPassword(e.target.value) } }  value={password}/>
                </label>
                <label className="bg-white input input-bordered flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                  <input type="password" className="text-sm ml-1 w-full text-neutral-950 placeholder-metal" placeholder="Confirm Password" onChange={(e)=> setConfirmPassword(e.target.value) }  value={confirmPassword}/>
                </label>
                <button type="submit" className="text-white btn btn-active btn-primary mt-4" onClick={(e)=>handleSubmit(e)}>Submit</button>

          </form>
          {!error ? (
          <p className="text-success"></p>
          ) : (
            <p className="text-error	">{error}</p>
          )}
          <p className="mt-4 text-metal">
            I have alredy an account?{' '}
            <Link to="/login" className="text-blue hover:underline ">
               Login
            </Link>
          </p>
          </div>
        </div>
      </div>
  )
}

export default RegisterComponent