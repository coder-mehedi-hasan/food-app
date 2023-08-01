import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ApiUrl from '../Local/ApiUrl';
import Cookies from 'js-cookie';

const EditAllProduct = ({ orders, info }) => {
    const [condition, setcondition] = useState("processing")
    const orderConditionSubmit = async (e, id) => {
        e.preventDefault()
        const res = await fetch(`${ApiUrl}/update/condition/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': "application/json",
                foodapp: Cookies.get('foodapp')
            },
            body: JSON.stringify({ position: condition, email: info })
        })
        if (res.status !== 200) {
            window.alert('Failed')
        }
        window.alert('DOne')
    }
    return (
        <>
            <div className="p-4 border rounded border-success">
                <div className='row '>
                    <div className="col ">
                        <p className='m-0 fw-semi3bold'>{orders.date}</p>
                    </div>
                    <div className="col ">
                        <p className='m-0 fw-semibold'>{info}</p>
                    </div>
                    <div className="col text-end">
                        <p className='m-0 btn btn-danger'>{
                            orders.position === 'shipping' ? <i className="fa-solid fa-truck-fast"></i> : orders.position === 'delivired' ?
                                <i class="fa-solid fa-check"></i>
                                : 'processing'
                        }</p>
                    </div>
                </div>
                <hr />
                {
                    orders.data.map((food) => {
                        return (
                            <div className="row">
                                <div className="col">
                                    <p className='m-0 text-success'><Link to={`/product/details/${food.p_id}`} className='text-decoration-none text-success'>{food.name}</Link></p>
                                </div>
                                <div className="col">
                                    <p className='text-success'>{food.size}</p>
                                </div>
                                <div className="col">
                                    <p className='text-success'>{food.quantity}</p>
                                </div>
                                <div className="col">
                                    <p className='text-success'>{food.price}</p>
                                </div>
                                {
                                    orders.position === 'delivired' ?
                                        <div className='col'>
                                            <h3 className='h2'><i class="fa-regular fa-circle-check text-success"></i></h3>
                                        </div> : ""
                                }
                            </div>
                        )
                    })
                }
                <hr />
                <div className='row justify-content-end'>
                    <div className="col-lg-3">
                        <select class="form-select" aria-label="Default select example"
                            onChange={(e) => setcondition(e.target.value)}
                        >
                            <option className='text-success' value="processing">Processing</option>
                            <option className='text-success' value="shipping">Shipping</option>
                            <option className='text-success' value="delivired">Delivired</option>
                        </select>
                        <button type='submit' className='btn btn-success w-100' onClick={(e, id) => orderConditionSubmit(e, orders._id)}>Save</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditAllProduct;