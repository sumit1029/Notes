import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {

    const {showAlert} = props;
    const [credentials, setCredentials] = useState({email: "", password: ""});
    let navigate = useNavigate();

    const onChange = (e) =>{
        setCredentials({...credentials, [e.target.name]:e.target.value})
     }

    const handleSubmit = async(e) =>{
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json", 
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password}),
          });

          const json = await response.json();
          if(json.succsess){
            //save the auth token and redirect
            showAlert("Login Successfull", 'success');
            localStorage.setItem('token', json.authToken);
            navigate("/");
          }else{
            showAlert("Invalid Credentials", 'danger');
          }
        //   console.log(json);
    }

    

    return (
        <div className='mt-4'>
            <h2>Login to continue to NoteHooker</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" onChange={onChange} value={credentials.email} required/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" name="password" className="form-control" id="password" onChange={onChange} value={credentials.password} required/>
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    );
}

export default Login;
