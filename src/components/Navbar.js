import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';


const Navbar = () => {
    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.removeItem('foodapp')
        Cookies.remove('foodapp')
        Cookies.remove('role')
        navigate('/')
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-success">
                <div className="container-fluid">
                    <NavLink className="navbar-brand fw-semibold fs-2 fst-italic" to="/">FoodApp</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse " id="navbarNav">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item">
                                <NavLink className="nav-link" aria-current="page" to="/">Home</NavLink>
                            </li>
                            <li>
                                {
                                    (localStorage.getItem('foodapp')) && Cookies.get('foodapp') ? <NavLink className="nav-link" aria-current="page" to="/myorder">{Cookies.get('role') === 'admin' || Cookies.get('role') === 'officer' ?
                                        <>All Order</>

                                        : 
                                        <>My Orders</>
                                        }</NavLink>
                                        : ''
                                }
                            </li>
                        </ul>
                        {
                            (!localStorage.getItem('foodapp') && !Cookies.get('foodapp')) ?
                                <div>
                                    <NavLink className="btn bg-white fw-normal mx-2 text-success text-capitalize" to="/login">log in</NavLink>
                                    <NavLink className="btn bg-white fw-normal mx-2 text-success text-capitalize" to="/signup">sign up</NavLink>
                                </div>
                                :
                                <>
                                    <>
                                        <div className="btn-group">
                                            {
                                                (Cookies.get('role') === "admin" || Cookies.get("role") === "officer") ?
                                                    <>
                                                        <button type="button" className="btn bg-white fw-normal mx-2 text-success text-capitalize dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                                                            <span className="visually-hidden"></span>
                                                            Manage
                                                            <i className="fa-solid fa-gear ms-1"></i>
                                                        </button>
                                                        <ul className="dropdown-menu bg-success">
                                                            <li><Link className="dropdown-item text-white" to='/manage/product' >Product Manage</Link></li>
                                                        </ul>
                                                    </>
                                                    : ''
                                            }
                                            <Link className="btn bg-white fw-normal mx-2 text-success text-capitalize" to='/mycart'>My Cart</Link>
                                            <Link className="btn bg-white fw-normal mx-2 text-success text-capitalize" onClick={handleLogout}>Log Out</Link>
                                        </div>
                                    </>
                                </>
                        }

                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;