import React, { useState, useRef, useEffect } from 'react';
import { useCart, useDispatchCart } from '../reducer/ContextReducer'
import ApiUrl from '../Local/ApiUrl';
import Cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom';

const Card = (props) => {
    const navigate = useNavigate()
    const { _id, name, images, description } = props.foodItem
    const [price, setprice] = useState(0)
    const options = props.options
    const priceOption = Object.keys((options))
    const [quantity, setquantity] = useState(1)
    const [size, setsize] = useState('')
    const sizeRef = useRef()
    const finalPrice = quantity * parseInt(options[size])
    const handleAddCart = async (e) => {
        e.preventDefault()
        const res = await fetch(`${ApiUrl}/addtocart`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                foodapp: Cookies.get('foodapp')
            },
            body: JSON.stringify({
                _id, size, quantity, name, price: finalPrice, images
            }),
            credentials: 'include'
        })
        if (res.status === 201) {
            navigate('/')
        }
    }

    useEffect(() => {
        setsize(sizeRef.current.value)
    }, [])
    return (
        <>
            <div className="card my-3 mx-2">
                {
                    images ?
                        images.map((url,index) => {
                            return (
                                <>
                                    <img key={index} src={url} className="card-img-top" style={{ height: '180px', objectFit: 'fill' }} alt="food" />
                                </>
                            )
                        })
                        : ''
                }
                <div className="card-body">
                    <h5 className="card-title"><Link to={`/product/details/${_id}`} className='text-decoration-none text-white'>{name}</Link></h5>
                    <p className="card-text">{description}</p>
                    <div className="p-0 w-100">
                        <select className="m-1 p-1 bg-success rounded" id="quantity-pcs"
                            onChange={(e) => setquantity(e.target.value)}
                        >
                            {
                                Array.from(
                                    Array(10), (e, i) => {
                                        return (
                                            <option key={i + 1} value={i + 1}>{i + 1}</option>
                                        )
                                    }
                                )
                            }
                        </select>
                        <select className="m-1 p-1 bg-success text-capitalize rounded" id="quantity-hf" ref={sizeRef}
                            onChange={(e) => setsize(e.target.value)}
                        >
                            {
                                priceOption !== [] ?
                                    priceOption.map(data => {
                                        return (
                                            <option value={data} key={data} className='text-capitalize'>{data}</option>
                                        )
                                    }) : ''
                            }
                        </select>
                        <h4 className='d-inline'>{finalPrice}</h4>
                        <button className='btn btn-success text-white w-100 py-1 my-2 btn-outline-none' onClick={handleAddCart}>Add to cart</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Card;