import React, { useEffect, useState } from 'react';
import AddProduct from '../components/AddProduct';
import ApiUrl from '../Local/ApiUrl';

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
        setfoods(data[0])
        setCategory(data[1])
    }

    useEffect(() => {
        loadData()
    }, [])
    return (
        <div id="product_manage" className='p-4 border rounded'>
            {
                foods.map((data) => {
                    return (
                        <>

                        </>
                    )
                })
            }
            <div className='my-2'>{
                category?
                <AddProduct category={category ? category : []} />:''
            }
            </div>
        </div>
    );
};

export default ProductManage;