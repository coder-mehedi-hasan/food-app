import React, { useEffect, useState } from 'react';
import { useCart, useDispatchCart } from '../reducer/ContextReducer'
import ApiUrl from '../Local/ApiUrl';
import Cookies from 'js-cookie';
import ShowCart from '../components/ShowCart';
import { useNavigate } from 'react-router-dom';

const MyCart = () => {
    const [cart, setCart] = useState([])
    const [shipping, setShipping] = useState('')
    const navigate = useNavigate()
    const loadUser = async () => {
        const res = await fetch(`${ApiUrl}/user`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                foodapp: Cookies.get('foodapp')
            },
            credentials: 'include'
        })
        const data = await res.json()
        if (res.status !== 200) {
            alert('Please Log In')
            navigate('/login')
        } else {
            setCart(data.carts)
        }
    }
    useEffect(() => {
        loadUser()
    }, [])

    if (cart.length === 0) {
        return (
            <div className='my-4 border rouned p-4'>
                <h4 className='text-center text-white'>Cart Is Empty</h4>
            </div>
        )
    }

    let totalPrice = cart.reduce((total, food) => parseInt(total) + parseInt(food.price), 0)
    const handleCheckOut = async () => {
        const response = await fetch(`${ApiUrl}/orderData`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                foodapp: Cookies.get('foodapp')
            },
            body: JSON.stringify({
                data: cart,
                date: new Date().toDateString(),
                totalPrice:totalPrice,
                shipping:shipping
            })

        })
        if (response.status !== 201) {
            alert('Failed')
        } else {
            navigate('/myorder')
        }
    }


    return (
        <>
            <div className="container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md table-responsive-lg table-responsive-xl table-responsive-xxl">
                <table className="table table-hover">
                    <thead className='text-success fs-4'>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Size</th>
                            <th scope="col">Amount</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cart.map((data, index) => {
                                return (
                                    <ShowCart key={data._id} data={data} index={index} />
                                )
                            })
                        }
                    </tbody>
                </table>
                <div>
                    <h3>Total Price {totalPrice ? totalPrice : 0} TK</h3>
                </div>
                <div className='py-2'>
                    <form onSubmit={handleCheckOut}>
                        <div className="form-floating">
                            <textarea className="form-control" required placeholder="Must Have Shipping Address" value={shipping} id="floatingTextarea" onChange={(e)=>setShipping(e.target.value)}></textarea>
                            <label htmlFor="floatingTextarea">Shipping Place</label>
                        </div>
                        <button type='submit' className='btn bg-success mt-5' >Check Out</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default MyCart;