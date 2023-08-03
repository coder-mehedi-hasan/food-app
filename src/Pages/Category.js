import React, { useEffect, useState } from 'react';
import ApiUrl from '../Local/ApiUrl';
import Cookies from 'js-cookie';

const Category = () => {
    const [category, setcategory] = useState([])
    const [newCat, setNewCat] = useState({ categoryName: "" })
    const loadCategory = async () => {
        const res = await fetch(`${ApiUrl}/food/category`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                foodapp: Cookies.get('foodapp')
            }
        })
        const data = await res.json()
        if (res.status === 200) {
            setcategory(data)
        }

    }


    const subCategory = async (e) => {
        e.preventDefault()
        const res = await fetch(`${ApiUrl}/add/cetagory`, {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
                foodapp: Cookies.get('foodapp')
            },
            body: JSON.stringify({
                categoryName:newCat.categoryName
            })
        })
        if (res.status !== 201) {
            alert("Failed")
        }else{
            alert("Done")
            window.location.reload()
        }
    }




    useEffect(() => {
        loadCategory()
    }, [])



    return (
        <div className='container'>
            {
                category ?
                    category.map((cat, index) => {
                        return (
                            <div className='row justify-content-between m-1 p-3 border border-success rounded' key={cat._id}>
                                <hr />
                                <div className="col-8">
                                    <p className='text-success fw-semibold'>{index + 1 + '. '}{cat.categoryName}</p>
                                </div>
                                <div className="col d-flex justify-content-end">
                                    <button type='button' className='btn btn-danger'>Delete</button>
                                </div>
                                <hr />
                            </div>

                        )
                    })
                    : ""
            }
            <div className='row justify-content-between m-1 p-3 border border-success rounded'>
                <hr />
                <form onSubmit={subCategory}>
                    <div className='row'>
                    <div className="col-8">
                        <input type="text" required name="categoryName" className='form-control text-success fw-medium' placeholder='Create A Category' onChange={(e)=> setNewCat({...newCat,[e.target.name]:e.target.value})} />
                    </div>
                    <div className="col d-flex justify-content-end">
                        <button type='submit' className='btn btn-success'>Save</button>
                    </div>
                    <hr />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Category;