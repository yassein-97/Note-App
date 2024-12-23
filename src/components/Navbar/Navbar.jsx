import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext/UserContext'


export default function Navbar() {
  const {token, setToken} = useContext(UserContext);

  function logOut(){
    localStorage.removeItem("token");
    setToken(null);
  }

  
  return (
    <>
      <nav className='bg-info py-3'>
        <div className="container d-flex align-items-center justify-content-between">
          <div className='d-flex align-items-center gap-2'>
            <i className="fa-regular fa-note-sticky text-dark fs-2"></i>
            <h2 className='text-dark'>Notes</h2>
          </div>

          {token? 
          <ul className='list-unstyled d-flex gap-3'>
          <li>
            <Link to={"/home"} className='text-dark text-decoration-none fs-5'>Home</Link>
          </li>
          <li>
            <Link onClick={logOut} to={"/login"} className='text-dark text-decoration-none fs-5'>Logout</Link>
          </li>
        </ul>
          :
          <ul className='list-unstyled d-flex gap-3'>
            <li>
              <Link to={"/login"} className='text-dark text-decoration-none fs-5'>Login</Link>
            </li>
            <li>
              <Link to={"/signup"} className='text-dark text-decoration-none fs-5'>Signup</Link>
            </li>
          </ul>}
        </div>
      </nav>
    </>
  )
}
