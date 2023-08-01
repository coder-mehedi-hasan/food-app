import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer'
import Cookies from 'js-cookie';
import ApiUrl from '../Local/ApiUrl';
import EditAllProduct from '../components/EditAllProduct';
import { Link } from 'react-router-dom';


const MyOrders = () => {
    const [myorder, setmyorder] = useState()
    const [allOrder, setAllOrder] = useState()
    const loadData = async () => {
        const response = await fetch(`${ApiUrl}/myorder`, {
            method: 'GET',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                foodapp: Cookies.get('foodapp')
            },
            credentials: 'include'
        })
        const data = await response.json()
        if (data.role === 'admin') {
            setAllOrder(data.allorder)
        }
        else {
            setmyorder(data.myorder.orders)
        }
    }
    console.log(myorder)
    console.log(allOrder)
    useEffect(() => {
        loadData()
    }, [])
    return (
        <>
            <div className='container-fluid'>
                <div className='row'>
                    {
                        myorder ?
                            myorder.map((item) => {
                                return (
                                    <div className='row my-3 p-4 border' key={item._id}>
                                        <div className="col-lg-12">
                                            <div className='m-auto'>
                                                <p className='m-0 fw-semibold'>{item.date}</p>
                                                <hr />
                                            </div>
                                        </div>
                                        <div className='col-lg-8 mt-2'>

                                            {
                                                item.data.map((data) => {
                                                    return (
                                                        <div key={data._id} className='row'>
                                                            <div className="col">
                                                                <p className='fw-medium'>
                                                                    <Link to={`/product/details/${data.p_id}`} className='btn'>{data.name}</Link>
                                                                </p>
                                                            </div>
                                                            <div className="col">
                                                                <p className='fw-medium'>{data.size}</p>
                                                            </div>
                                                            <div className="col">
                                                                <p className='fw-medium'>{data.quantity}</p>
                                                            </div>
                                                            <div className="col">
                                                                <p className='fw-medium'>{data.price}</p>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                        <div className="col-lg-4">
                                            <div className='d-flex align-items-center justify-content-center'>
                                                {
                                                    item.position === 'shipping' ?
                                                        <div>
                                                            <p className='text-center fs-3'>
                                                                <i className="fa-solid fa-truck-fast"></i>
                                                            </p>
                                                            <p className='m-0 fw-semibold text-center'>{item.position}</p>
                                                        </div>

                                                        :
                                                        item.position === 'delivired'

                                                            ?
                                                            <div>
                                                                <p className='text-center m-0 fs-3'>
                                                                    <i className="fa-solid fa-check-double"></i>
                                                                </p>
                                                                <p className='m-0 fw-semibold text-center'>{item.position}</p>
                                                            </div>

                                                            :
                                                            <div>
                                                                <p className='text-center m-0 fs-3'>
                                                                    <i className="fa-solid fa-spinner"></i>
                                                                </p>
                                                                <p className='m-0 fw-semibold text-center'>{item.position}</p>
                                                            </div>
                                                }
                                            </div>
                                        </div>

                                    </div>

                                )
                            })
                            :
                            allOrder ?
                                allOrder.map((data) => {
                                    return (
                                        <>
                                            <EditAllProduct data={data} key={data._id} />
                                        </>
                                    )
                                })

                                : <div className='my-3'>
                                    <h3 className='text-center text-capitalize text-white'>Your have no order</h3>
                                </div>


                    }
                </div>


            </div>
            <Footer></Footer>
        </>
    );
};

export default MyOrders;