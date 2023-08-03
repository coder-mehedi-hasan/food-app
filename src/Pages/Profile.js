import React, { useEffect, useState } from 'react';
import ApiUrl from '../Local/ApiUrl';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';

const Profile = () => {
    const [user, setUser] = useState({})
    const [update, setUpdateUser] = useState({})

    const userLoad = async () => {
        const res = await fetch(`${ApiUrl}/user`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                foodapp: Cookies.get('foodapp')
            }
        })
        const data = await res.json()
        if (res.status === 200) {
            setUser(data)
        }
    }


    const updateUser = async (e) => {
        e.preventDefault()
        const res = await fetch(`${ApiUrl}/update/user`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                foodapp: Cookies.get('foodapp')
            },
            body: JSON.stringify({
                user: update
            })
        })
        if (res.status !== 200) {
            alert("Failed")
        } else {
            alert("Done")
            window.location.reload()
        }
    }
    const handleImg = (e) => {
        const file = e.target.files[0]
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            setUpdateUser({ ...update, img: reader.result })
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
        return
    }

    useEffect(() => {
        userLoad()
    }, [])
    return (
        <>
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-lg-10">
                        <div className="row my-3 rounded border-success border p-4">
                            <div className="col-lg-6 mb-2">
                                <img src={user.img} alt="profile pic" className='img-fluid' style={{ maxHeight: "300px" }} />
                            </div>
                            <div className="col-lg-6 mb-2">
                                <p className='text-success m-0 text-end text-medium'>{user.role}</p>
                                <p className='text-success m-0 fs-2 fw-semibold'>Name: {user.name}</p>
                                <p className='text-success m-0  fw-medium'>Phone: {user.phone}</p>
                                <p className='text-success m-0  fw-medium'>Email: {user.email}</p>
                                <p className='text-success m-0 fw-medium'>Location: {user.location}</p>
                            </div>
                            <hr />
                            <div className="col-lg-12">
                                <p class="d-inline-flex gap-1">
                                    <a className="btn btn-success" data-bs-toggle="collapse" href="#multiCollapse" role="button" aria-expanded="false" aria-controls="multiCollapse">Edit Profile <i className="fa-solid fa-user-pen"></i></a>
                                </p>

                                <div class="row">
                                    <div class="col">
                                        <div class="collapse multi-collapse" id="multiCollapse">
                                            <div class="card card-body">
                                                <form onSubmit={updateUser}>
                                                    <div class="form-floating mb-3">
                                                        <input type="text" class="form-control" id="floatingInput" placeholder="Name"
                                                            name='name'
                                                            value={update.name}
                                                            onChange={(e) => setUpdateUser({ ...update, [e.target.name]: e.target.value })}
                                                        />
                                                        <label for="floatingInput">Change Name</label>
                                                    </div>
                                                    <div class="form-floating">
                                                        <input type="number" class="form-control" id="floatingNumber" placeholder="Number"
                                                            name='phone'
                                                            value={update.name}
                                                            onChange={(e) => setUpdateUser({ ...update, [e.target.name]: e.target.value })}
                                                        />
                                                        <label for="floatingNumber">Change Number</label>
                                                    </div>
                                                    <div class="form-floating">
                                                        <input type="text" class="form-control" id="floatingLocation" placeholder="Location"
                                                            name='location'
                                                            value={update.name}
                                                            onChange={(e) => setUpdateUser({ ...update, [e.target.name]: e.target.value })}
                                                        />
                                                        <label for="floatingLocation">Change Location</label>
                                                    </div>
                                                    <div class="form-floating">
                                                        <input type="file" class="form-control" id="floatingImage" placeholder="Image"
                                                            accept='.jpg, .jpeg, .png, .gif'
                                                            onChange={handleImg}

                                                        />
                                                    </div>
                                                    <button type='submit' className='btn btn-success'>Save Info</button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;