import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer'
import Cookies from 'js-cookie';
import ApiUrl from '../Local/ApiUrl';
import EditAllProduct from '../components/EditAllProduct';
import { Link } from 'react-router-dom';


const MyOrders = () => {
    const [search, setsearch] = useState('')
    const [filterOption, setfilterOption] = useState('all')
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
                                                                <p className='text-center m-0'>
                                                                    <div class="spinner-border ms-auto" aria-hidden="true"></div>
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
                                <>
                                    <div className='row my-3'>
                                        <div className="col-8">
                                            <input type="text" className='form-control' placeholder='Search order by id/email' onChange={(e) => setsearch(e.target.value)} />
                                        </div>
                                        <div className="col-4">
                                            <select class="form-select" aria-label="Default select example"
                                                onChange={(e) => setfilterOption(e.target.value)}
                                            >
                                                <option value='all'>All</option>
                                                <option value="processing">Processing</option>
                                                <option value="shipping">Shipping</option>
                                                <option value="delivired">Delivired</option>
                                            </select>
                                        </div>
                                    </div>
                                    {
                                        allOrder.map((data, index) => {
                                            return (
                                                <>
                                                    {
                                                        filterOption === 'all' ?
                                                            data.orders.filter(item => (item.date < Date.now) && (data.email.toLowerCase().includes(search.toLowerCase()))).map((order) => {
                                                                return (
                                                                    <EditAllProduct key={order._id} orders={order} info={data.email} />)
                                                            }) : data.orders.filter(item => (item.position === filterOption) && (item.date < Date.now) && (data.email.toLowerCase().includes(search.toLowerCase()))).map((order) => {
                                                                return (
                                                                    <EditAllProduct key={order._id} orders={order} info={data.email} />)
                                                            })
                                                    }
                                                </>
                                            )
                                        })
                                    }
                                </>


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