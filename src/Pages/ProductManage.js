import React, { useEffect, useState } from 'react';
import AddProduct from '../components/AddProduct';
import ApiUrl from '../Local/ApiUrl';
import Cookies from 'js-cookie';

const ProductManage = () => {
    const [foods, setfoods] = useState([])
    const [category, setCategory] = useState([])
    const loadData = async () => {
        const response = await fetch(`${ApiUrl}/api/foods`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json()
        setfoods(data)
    }
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
            setCategory(data)
        }

    }
    useEffect(() => {
        loadCategory()
        loadData()
    }, [])
    return (
        <div id="product_manage" className='p-4 border rounded'>
            <div className="row justify-content-center">

                {
                    foods.map((data) => {
                        return (
                            <div key={data._id} className='col-2 m-2 border rounded border-success p-4'>
                                <p className='m-0 text-center'>{data.name}</p>
                            </div>
                        )
                    })
                }
            </div>
            <hr />
            <div className='my-2'>{
                category ?
                    <AddProduct category={category ? category : []} /> : ''
            }
            </div>
        </div>
    );
};

export default ProductManage;