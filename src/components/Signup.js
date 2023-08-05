import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {

    const {showAlert} = props;
    const [credentials, setCredentials] = useState({name:"", email: "", password: "", confirmpassword: ""});
    let navigate = useNavigate();

    const onChange = (e) =>{
        setCredentials({...credentials, [e.target.name]:e.target.value})
     }

    const handleSubmit = async(e) =>{
        e.preventDefault();
        if(!(credentials.confirmpassword === credentials.password)){
            showAlert("Password and Confirm Password Do not match", 'warning')
            setCredentials({name:credentials.name, email:credentials.email, password:"", confirmpassword:""});
         }else{

             const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
                 method: "POST",
                 headers: {
                   "Content-Type": "application/json", 
                 },
                 body: JSON.stringify({name: credentials.name, email: credentials.email, password: credentials.password}),
               });
     
               const json = await response.json();
               if(json.succsess){
                 //save the auth token and redirect
                 showAlert("Signup Successfull", 'success');
                 localStorage.setItem('token', json.authToken);
                 navigate("/");
               }else{
                showAlert("Invalid Credentials", 'danger');
               }
               console.log(json);
         }
    }
  return (
    <div className='mt-4'>
      <h2>SignUp to Create and Store your notes</h2>
      <form onSubmit={handleSubmit}>
      <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="name" className="form-control" id="name" name='name' aria-describedby="emailHelp" onChange={onChange} value={credentials.name} minLength={3} required/>
                    
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" onChange={onChange} value={credentials.email} required/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" name="password" className="form-control" id="password" onChange={onChange} value={credentials.password} minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="confirmpassword" className="form-label">Confirm Password</label>
                    <input type="password" name="confirmpassword" className="form-control" id="confirmpassword" onChange={onChange} value={credentials.confirmpassword} minLength={5} required/>
                </div>
                <button type="submit" className="btn btn-primary">Signup</button>
            </form>
    </div>
  );
}

export default Signup;
