import React, { useRef, useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Cookies from 'js-cookie';
import ApiUrl from '../Local/ApiUrl';

const ProductDetails = () => {
    const navigate = useNavigate()
    const [editproduct, seteditProduct] = useState({})
    const [editoption, seteditOption] = useState({})
    const product = useLoaderData()
    const options = product.options[0]
    const optionKey = Object.keys(options)

    const deleteProduct = async () => {
        const res = await fetch(`${ApiUrl}/product/delete/${product._id}`, {
            method: "DELETE",
            headers: {
                foodapp: Cookies.get('foodapp')
            }
        })
        if (res.status === 200) {
            alert('DOne')
            navigate('/')
        }
    }
    const editProduct = async (e) => {
        e.preventDefault()
        const res = await fetch(`${ApiUrl}/update/product/${product._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                foodapp: Cookies.get('foodapp')
            },
            body: JSON.stringify({
                product: editproduct
            })
        })
        if (res.status === 200) {
            alert('Done')
        }
    }
    return (
        <>
            <div className="container mt-4" >
                {
                    Cookies.get('role') === 'admin' || Cookies.get('role') === 'officer' ?

                        <div className="row border p-4 ">
                            <div className="col-lg-12">
                                <div className="row justify-content-end">
                                    <div className="col-lg-3">
                                        <button className='btn btn-success mx-1' onClick={deleteProduct}>Delete Product</button>
                                        <button className='btn btn-success mx-1' onClick={editProduct}>Save Product</button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 mb-2 p-0 border border-white rounded overflow-hidden">
                                <div id="carouselExampleFade" className="carousel slide carousel-fade">
                                    <div className="carousel-inner">
                                        {
                                            product.images.map((src) => {
                                                return (
                                                    <>
                                                        <div className="carousel-item active me-0">
                                                            <img src={src} className="d-block w-100 img-fluid" alt="carousal" />
                                                        </div>
                                                    </>
                                                )
                                            })
                                        }
                                    </div>
                                    {
                                        product.images.length > 1 ?
                                            <>
                                                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                                    <span className="visually-hidden">Previous</span>
                                                </button>
                                                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                                    <span className="visually-hidden">Next</span>
                                                </button>
                                            </> : ''
                                    }
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <input type="text" className='form-control fs-1 fw-semibold text-capitalize text-success border-0' name='name' value={editproduct.name ? editproduct.name : product.name} onChange={(e) => seteditProduct({ ...editproduct, [e.target.name]: e.target.value })} />
                                <input type="text" className='form-control fs-5 fw-medium text-capitalize text-success border-0' name='categoryName' value={editproduct.categoryName ? editproduct.categoryName : product.categoryName} onChange={(e) => seteditProduct({ ...editproduct, [e.target.name]: e.target.value })} />
                                <div>
                                    <p className='fs-5 m-0 fw-semibold text-center border-bottom py-2 text-success text-capitalize'>price of variant</p>
                                    <div className='d-flex justify-content-between my-2'>
                                        {
                                            optionKey.map((opt) => {
                                                return (
                                                    <>
                                                        <p className='text-uppercase m-0 fw-bold text-success'>{opt}: <input readOnly type="text" name={opt} className='bg-transparent border-0 text-success fw-bold fs-6' value={editoption[opt] ? editoption[opt] : options[opt]} onChange={(e) => seteditOption({ ...editoption, [e.target.name]: e.target.value })} /></p>
                                                    </>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className='my-2'>
                                <div class="form-floating">
                                    <textarea name="description" className="form-control text-success" placeholder="Description" id="floatingTextarea2" style={{ height: "100px" }} value={editproduct.description ? editproduct.description : product.description} onChange={(e) => seteditProduct({ ...editproduct, [e.target.name]: e.target.value })}></textarea>
                                    <label htmlFor="floatingTextarea2">Description</label>
                                </div>
                            </div>
                        </div>

                        :
                        <div className='row'>
                            <div className="col-lg-6">

                                <Card foodItem={product}
                                    options={options}></Card>

                            </div>
                        </div>
                }

            </div>
        </>
    );
};

export default ProductDetails;