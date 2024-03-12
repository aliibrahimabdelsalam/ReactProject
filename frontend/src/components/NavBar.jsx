import { Link } from "react-router-dom"

const NavBar = ({handleLogout,image}) => {
  return (
    <div className="navbar bg-base-100 bg-blue text-white">
        <div className="flex-1">
            <a className="btn btn-ghost text-xl">BLOG</a>
        </div>
        <div className="flex-none">
            <div className="dropdown dropdown-end">
            <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
                <div className="card-body">
                <span className="font-bold text-lg">8 Items</span>
                <span className="text-info">Subtotal: $999</span>
                <div className="card-actions">
                    <button className="btn btn-primary btn-block">View cart</button>
                </div>
                </div>
            </div>
              </div>
              <div className="navbar-center">
                <Link to={'/home'} className="btn btn-ghost text-xl">Home</Link>
              </div>
            <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                <img  alt="Tailwind CSS Navbar component" src={image} />
                </div>
            </div>
            <ul tabIndex={0} className="menu menu-sm bg-blue dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                <li>
                <Link to={'/profile'} className="justify-between">
                    Profile
                    <span className="badge">New</span>
                </Link>
                </li>
                <li><button onClick={()=>handleLogout()}>Logout</button></li>
            </ul>
            </div>
        </div>
    </div>
  )
}

export default NavBar