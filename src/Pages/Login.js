import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'

const Login = () => {
    const navigate = useNavigate()
    const [validuser, setvaliduser] = useState({ email: '', password: '' })
    const validuserHandeler = (event) => {
        let name = event.target.name
        let value = event.target.value

        setvaliduser({ ...validuser, [name]: value })
    }
    const loginSubmit = async (event) => {
        event.preventDefault()
        const response = await fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: validuser.email,
                password: validuser.password
            })

        })
        const data = await response.json()
        console.log(data)
        if (response.status === 200) {
            localStorage.setItem('foodapp', data.authToken)
            Cookies.set("foodapp",data.authToken)
            Cookies.set('role',data.role)
            navigate('/')
        } else {
            alert('Invalid Credetials')
        }
    }
    const refPass = useRef()
    const checkbox = ()=>{
        if(refPass.current.type === "password"){
            refPass.current.type= "text"
        }
        else{
            refPass.current.type= "password"
        }
    }
    return (
        <>
            <div className="container">
                <div className="row mt-5 justify-content-center">
                    <div className="col-lg-6 col-md-8 p-4 border rounded">
                        <form onSubmit={loginSubmit} method='POST'>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email address</label>
                                <input type="email" className="form-control" id="email"
                                    required
                                    name='email'
                                    value={validuser.email}
                                    onChange={validuserHandeler}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input type="password" className="form-control" id="password"
                                    ref={refPass}
                                    required
                                    name='password'
                                    value={validuser.password}
                                    onChange={validuserHandeler}
                                />
                                <div className='my-2'>      
                                <input type='checkbox' id='checkbox' onClick={checkbox} />
                                <label htmlFor="checkbox" className='mx-1'>Show Password</label>          
                                </div>
                            </div>

                            <div className="row justify-content-between">
                                <div className="col-lg-6">
                                    <button type="submit" className="btn btn-success">Log In</button>
                                </div>
                                <div className="col-lg-6">
                                    <Link to="/signup" className='d-block text-end link-offset-2 link-underline link-underline-opacity-0'>Create an Account</Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;