import React, { useEffect, useState } from 'react';
import ApiUrl from '../Local/ApiUrl';
import Cookies from 'js-cookie';
import ShowUser from '../components/ShowUser';

const UsersList = () => {
    const [users, setusers] = useState([])
    const [search, setsearch] = useState('')
    const [filter, setfilter] = useState('all')
    const usersLoad = async () => {
        const res = await fetch(`${ApiUrl}/all/users`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                foodapp: Cookies.get('foodapp')
            }
        })
        const data = await res.json()
        if (res.status === 200) {
            setusers(data)
        }
    }

    console.log(users)

    useEffect(() => {
        usersLoad()
    }, [])
    return (
        <div className='container-fluid'>
            <div className='row my-3'>
                <div className="col-8">
                    <input type="text" className='form-control' placeholder='Search order by id/email' onChange={(e) => setsearch(e.target.value)} />
                </div>
                <div className="col-4">
                    <select class="form-select" aria-label="Default select example"
                        onChange={(e) => setfilter(e.target.value)}
                    >
                        <option value='all'>All</option>
                        <option value="admin">Admin</option>
                        <option value="officer">Officer</option>
                        <option value="user">User</option>
                    </select>
                </div>
            </div>
            <hr />
            <div>
                {
                    filter === 'all' ?
                        users.filter(item => (item.email.toLowerCase().includes(search.toLowerCase()))).map((user) => {
                            return (
                                <ShowUser key={user._id} user={user} />)
                        }) : users.filter(item => (item.role === filter) && (item.email.toLowerCase().includes(search.toLowerCase()))).map((user) => {
                            return (
                                <ShowUser key={user._id} user={user} />)
                        })
                }
            </div>

        </div >
    );
};

export default UsersList;