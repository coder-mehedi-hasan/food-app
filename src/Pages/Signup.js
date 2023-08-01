import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
    const [user, setuser] = useState({ name: '', email: '', phone: '', password: '', location: '' })
    const navigate = useNavigate()
    const inputHandle = (event) => {
        let name = event.target.name
        let value = event.target.value
        setuser({ ...user, [name]: value })
    }
    const userSubmit = async (event) => {
        event.preventDefault()
        const { name, email, phone, password, location } = user
        const response = await fetch('http://localhost:5000/createuser', {
            method: 'post',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name, email, phone, password, location
            })
        })
        if (response.status === 201) {
            alert('User Created')
            navigate('/login')
        } else {
            alert('User Not Created')
        }
    }
    return (
        <>
            <div className="container">
                <div className="row mt-5 justify-content-center">
                    <div className="col-lg-6 col-md-8 p-4 border rounded">
                        <form onSubmit={userSubmit}>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input type="text" id='name' className="form-control" name='name'
                                    required
                                    value={user.name}
                                    onChange={inputHandle}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email address</label>
                                <input type="email" id='email' className="form-control" name='email'
                                    required
                                    value={user.email}
                                    onChange={inputHandle}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="phone" className="form-label">Phone</label>
                                <input type="number" id='phone' className="form-control" name='phone'
                                    required
                                    value={user.phone}
                                    onChange={inputHandle}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input type="text" className="form-control" id="password" name='password'
                                    required
                                    value={user.password}
                                    onChange={inputHandle}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="location" className="form-label">Address</label>
                                <input type="text" className="form-control" id="location" name='location'
                                    required
                                    value={user.location}
                                    onChange={inputHandle}
                                />
                            </div>
                            <div className="row justify-content-between">
                                <div className="col-lg-6">
                                    <button type="submit" className="btn btn-success">Submit</button>
                                </div>
                                <div className="col-lg-6">
                                    <Link to="/login" className='d-block text-end link-offset-2 link-underline link-underline-opacity-0'>Alreaday have an Account</Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Signup;