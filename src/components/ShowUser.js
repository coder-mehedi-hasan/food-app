import React, { useState } from 'react';
import ApiUrl from '../Local/ApiUrl';
import Cookies from 'js-cookie';

const ShowUser = ({ user }) => {
    const [role, setrole] = useState('')
    const promotRole = async (e) => {
        e.preventDefault()
        const res = await fetch(`${ApiUrl}/update/role/${user._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                foodapp: Cookies.get('foodapp')
            },
            body: JSON.stringify({
                role: role
            })
        })
        if (res.status === 200) {
            alert("Done")
            window.location.reload()
        }
        else {
            alert("Failed")
        }
    }
    return (
        <div className='row border border-success rounded my-3 p-2'>
            <div className="col">
                <p className='m-0 text-success'>{user.name}</p>
            </div>
            <div className="col">
                <p className='m-0 text-success'>{user.email}</p>
            </div>
            <div className="col">
                <p className='m-0 text-success'>{user.phone}</p>
            </div>
            <div className="col">
                <p className='m-0 text-success'>{user.role}</p>
            </div>
            {
                Cookies.get('role') === 'admin' ?
                    <div className="col">
                        <select className="form-select" aria-label="Default select"
                            onChange={(e) => setrole(e.target.value)}
                        >
                            <option value="admin">Admin</option>
                            <option value="officer">Officer</option>
                            <option value="user">User</option>
                        </select>
                        <button onClick={promotRole} type='button' className='btn btn-success'>Promot</button>
                    </div> : ''
            }
        </div>
    );
};

export default ShowUser;