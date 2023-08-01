import React, { useState } from 'react';
import ApiUrl from '../Local/ApiUrl';
import Cookies from 'js-cookie';


const AddProduct = ({ category }) => {
    const [product, setproduct] = useState({})
    const [img, setimg] = useState([])
    const [price, setprice] = useState({ size: '', price: '' })
    const [size, setsize] = useState({})
    const sizeOption = Object.keys(size)
    const handleChange = (e) => {
        setproduct({ ...product, [e.target.name]: e.target.value })
    }
    const addingProduct = async (e) => {
        e.preventDefault()
        const res = await fetch(`${ApiUrl}/add/food`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                foodapp: Cookies.get('foodapp')
            },
            body: JSON.stringify({
                product,
                size: size,
                images: img[0]
            })
        })
        if (res.status !== 201) {
            alert('Adding Product Failed')
        } else {
            alert('Adding Product Done')
            setprice({ size: '', price: '' })
        }
    }

    const fileBase64 = async (img) => {
        return new Promise((resolve, reject) => {
            let fileReader = new FileReader();
            fileReader.onerror = reject
            fileReader.onload = function () {
                resolve(fileReader.result)
            }
            fileReader.readAsDataURL(img)
        })
    }

    const handleImage = (e) => {
        setimg([])
        let image = e.target.files;
        Promise.all(Array.from(image).map(fileBase64))
            .then((urls) => {
                setimg((img) => [...img, urls])
            })
            .catch((error) => {
                console.error(error)
            })
    }
    return (

        <>
            <form onSubmit={addingProduct}>
                <div className="row">
                    <div className="col-lg-4">
                        <input type="text"
                            className='form-control'
                            name='name'
                            value={product.name}
                            onChange={handleChange}
                            placeholder='Product Name'
                        />
                    </div>
                    <div className="col-lg-4 form-floating">
                        <textarea className="form-control" name='description' placeholder="Leave a comment here" id="floatingTextarea2" rows={1}
                            onChange={handleChange}
                        ></textarea>
                        <label htmlFor="floatingTextarea2" className='text-secondary' >Description</label>
                    </div>
                    <div className="form-floating col-lg-4">
                        <select className="form-select" id="floatingSelect" aria-label="Floating label select example" onChange={handleChange} name='categoryName'>
                            <option value=''></option>
                            {
                                category.map((item, index) => <option key={index} value={item.CategoryName}>{item.CategoryName}</option>)
                            }
                        </select>
                        <label htmlFor="floatingSelect">Item Category</label>
                    </div>
                    <div className="col-lg-12 my-2">
                        <div className="row px-2">
                            {
                                sizeOption.length >= 1 ?
                                    <div className="col-lg-4 border p-2">
                                        <div className='d-flex justify-content-between'>
                                            <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Size</th>
                                                        <th scope="col">Price</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        sizeOption.map((data, index) => {
                                                            return (
                                                                <>
                                                                    <tr key={index}>
                                                                        <th scope="row">{data}</th>
                                                                        <td>{size[data]}</td>
                                                                    </tr>
                                                                </>
                                                            )
                                                        })
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div> : ''
                            }
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <div className="row">
                            <div className="col-5">
                                <input type="text"
                                    placeholder='size'
                                    className='form-control' name='size'
                                    onChange={(e) => setprice({ ...price, [e.target.name]: e.target.value })}
                                />
                            </div>
                            <div className="col-5">
                                <input type="number" className='form-control'
                                    placeholder='price'
                                    name="price"
                                    onChange={(e) => setprice({ ...price, [e.target.name]: e.target.value })}
                                />
                            </div>
                            <div className="col-2">
                                <div className='btn btn-success w-100' onClick={() => setsize({ ...size, [price.size]: price.price })} >Variant Add+</div>
                            </div>
                        </div>
                    </div>
                    {/* done */}
                    <div className="col-lg-12 my-3">
                        <div className="row px-2">
                            <div className="col-lg-2 border">
                                <label htmlFor="addImage" style={{ cursor: "pointer", height: "100%", width: "100%" }}>
                                    <div className='h-100 w-100 d-flex justify-content-center align-items-center'>
                                        <div>
                                            <p className='m-0 text-center fs-2 text-white'><i className="fa-duotone fa-plus"></i></p>
                                            <p className='m-0 text-center'>Add Photo</p>
                                        </div>
                                    </div>
                                </label>
                                <input type='file'
                                    id='addImage'
                                    accept='.jpg, .jpeg, .png, .mp4'
                                    multiple
                                    placeholder='size'
                                    className='form-control d-none' name='size'
                                    onChange={handleImage}
                                />
                            </div>
                            {
                                img[0] ? img[0].map((data, index) => {
                                    return (
                                        <div className='col-lg-2 p-2 border' key={index}>
                                            <img src={data} alt="select" className='img-fluid' style={{ maxHeight: "150px" }} />
                                        </div>
                                    )
                                }) : ''
                            }
                        </div>

                    </div>
                </div>
                <div>
                    <button type='submit' className='btn btn-success fw-medium w-100 ' >Add to product</button>
                </div>
            </form >
        </>
    );
};

export default AddProduct;