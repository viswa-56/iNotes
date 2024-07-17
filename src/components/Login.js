import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
  const [credentials, setcredentials] = useState({ email: "", password: "" })
  const navigate = useNavigate();
  const handlesubmit = async (e) => {
    e.preventDefault();
    const url = "http://localhost:5000/api/auth/login"
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    }
    )
    const json = await response.json()
    console.log(json)
    if (json.success) {
      localStorage.setItem('auth-token', json.auth_token)
      navigate('/');
      props.showAlert("Logged in successfully", "success");
    }
    else {
      props.showAlert("invalid credentials", "danger");
    }
  }
  const onchange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  return (
    <div className='mt-3'>
      <h2>Login to continue</h2>
      <form onSubmit={handlesubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" onChange={onchange} name="email" aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" onChange={onchange} name="password" id="password" />
        </div>
        <button type="submit" className="btn btn-primary" >Submit</button>
      </form>
    </div>
  )
}

export default Login
