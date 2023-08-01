import React, { useRef } from 'react';
import ApiUrl from '../Local/ApiUrl';
import Cookies from 'js-cookie';

const ShowCart = ({ data, index }) => {
    const food = useRef()
    const removeCart = async (e) => {
        e.preventDefault()
        const res = await fetch(`${ApiUrl}/cart/delete/${data._id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                foodapp:Cookies.get('foodapp')
            },
            credentials:"include"
        })
        if(res.status !== 200){
            alert('Failed')
        }else{
            food.current.style.display = 'none'
        }
    }
    return (
        <tr ref={food}>
            <th scope='row'>{index + 1}</th>
            <td>{data.name}</td>
            <td>{data.quantity}</td>
            <td>{data.size}</td>
            <td>{data.price}</td>
            <td>
                <button className='btn p-0'><i className="fa-regular fa-trash-can" onClick={removeCart}></i></button>
            </td>
        </tr>
    );
};

export default ShowCart;