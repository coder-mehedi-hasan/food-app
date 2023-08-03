import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import ApiUrl from '../Local/ApiUrl';
import Cookies from 'js-cookie';
import { useReactToPrint } from 'react-to-print';


const EditAllProduct = ({ orders, info }) => {
    const moneyReciept = useRef()
    const [user, setUser] = useState({})
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
        window.alert('Done')
    }
    const userLoad = async () => {
        const res = await fetch(`${ApiUrl}/user/find/${info}`, {
            method: "GET",
            headers: {
                foodapp: Cookies.get('foodapp'),
                "Content-Type": "application/json"
            }
        })
        const data = await res.json()
        if (res.status === 200) {
            setUser({ ...user, name: data.name, phone: data.phone })
        }
    }
    const pirntRecipt = ()=>{
        moneyReciept.current.style.display = 'block'
        print()
        moneyReciept.current.style.display = 'none'
    }
    const print = useReactToPrint({
        content: () => moneyReciept.current,
        pageStyle: `@media print {
            @page {
              size: 52mm 74mm;
            }
          }`,
    })
    useEffect(() => {
        userLoad()
    }, [])
    return (
        <>
            {/* print order  */}
            <div ref={moneyReciept} style={{display:"none"}}>
                <div className='row p-1 ' id='printRec'  >
                    <div className="row justify-content-between">
                        <div className="col">
                            <p className='m-0'>Order Date : {orders.date}</p>
                            <p className='m-0'>Shipping Date : {new Date().toDateString()}</p>
                        </div>
                    </div>

                    <p className='m-0 text-center'><span className='border-bottom'>Money Receipt</span></p>
                    <h4 className='m-0 text-center'>Food Application</h4>
                    <hr />
                    <div className='row justify-content-between'>
                        <p className='m-0 col'>Name: {user.name}</p>
                        <p className='m-0 col text-end'>Phone: {user.phone}</p>
                    </div>
                    <hr />
                    {
                        orders.data.map((food) => {
                            return (
                                <div className="row">
                                    <div className="col-6">
                                        <p className='m-0'>{food.name}({food.size})</p>
                                    </div>
                                    <div className="col-3">
                                        <p className='m-0'>{food.quantity}</p>
                                    </div>
                                    <div className="col-3">
                                        <p className='m-0'>{food.price}</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                    <hr />
                    <div className="row">
                        <div className="col">
                            <p className=' m-0 fw-semibold'>Total : </p>
                        </div>
                        <div className="col">
                            <p className='m-0 fw-semibold' >{orders.totalPrice}</p>
                        </div>
                    </div>
                    <hr />

                    <div className="row">
                        <div className="col">
                            <p className='fw-medium m-0'>Shipping Address : {orders.shipping}</p>
                        </div>
                    </div>
                </div>
            </div>
            {/* print order  */}

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
                <div className="row">
                    <div className="col">
                        <h4 className=' m-0 text-success'>Total : </h4>
                    </div>
                    <div className="col">
                        <h4 className='m-0 text-success text-center' >{orders.totalPrice}</h4>
                    </div>
                </div>
                <hr />

                <div className="row">
                    <div className="col">
                        <p className='fw-medium m-0'>Shipping Address : {orders.shipping}</p>
                    </div>
                </div>
                <hr />

                <div className='row justify-content-between'>
                    <div className="col-lg-3">
                        <button className='btn btn-success' onClick={pirntRecipt}>Print Reciept</button>
                    </div>
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