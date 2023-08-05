import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from "react-router-dom";
import noteContext from '../context/ntoes/noteContext';

const Navbar = () => {
  let location = useLocation();
  const logout = () => {
    localStorage.removeItem("token");
  }
  const context = useContext(noteContext);
  const { notes } = context;

  useEffect(() => {
    userDetails();
  }, []);

  const [details, setdetails] = useState({ name: "", email: "", date: ""});

  const userDetails = async (e) => {
    // e.preventDefault();
    const response = await fetch(`http://localhost:5000/api/auth/getuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
    });

    const json = await response.json();
    setdetails({ name: json.name, email: json.email });
    console.log(details);
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">NoteHooker</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === '/' ? 'active' : ""}`} aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === '/about' ? 'active' : ""}`} to="/about">About</Link>
              </li>
            </ul>
            {!localStorage.getItem('token') ? <div className='d-flex'>
              <Link className="btn btn-primary mx-3" to='/login' role="button">Login</Link>
              <Link className="btn btn-primary" to='/signup' role="button">Sign Up</Link>
            </div> : <div className='d-flex align-items-center'>
              <div className="btn-group" role="group">
                <button data-bs-toggle="dropdown">
                  <i className="fa-regular fa-user" style={{ "color": "#21f23a" }}></i>
                </button>
                <ul className="dropdown-menu" aria-labelledby="btnGroupDrop1">
                  <li><div className='mx-3 d-flex flex-column align-items-center'>
                  <i className="fa-solid fa-user m-3" style={{fontSize: "30px"}}></i>
                    <p>{details.name}</p>
                    <p>{details.email}</p>
                    <p>{`Notes: ${notes.length}`}</p>
                  </div></li>
                </ul>
              </div>
              <div className='d-flex align-items-center mt-3 mx-3'><p style={{ color: "white" }}>{`Welcome ${details.name.split(' ')[0]}`}</p></div>
              <Link className="btn btn-primary mx-3" to='/login' role="button" onClick={logout}>Logout</Link>
            </div>}

          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
