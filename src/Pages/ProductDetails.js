import React from 'react';
import { useLoaderData } from 'react-router-dom';
import Card from '../components/Card';

const ProductDetails = () => {
    const product = useLoaderData()
    const options = product.options[0]
    console.log(options)
    return (
        <>

            <div className='row'>
                <div className="col-lg-6">

                    <Card foodItem={product}
                        options={options}></Card>

                </div>
            </div>

            {/*
            <div className="container mt-4">
                <div className="row border p-4 ">
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
                        <p className='h1 text-capitalize text-success'>{product.name}</p>
                        <p className='m-0 fw-medium text-success'>{product.categoryName} of Category</p>
                        <div>
                            <p className='fs-5 m-0 fw-semibold text-center border-bottom py-2 text-success text-capitalize'>price of variant</p>
                            <div className='d-flex justify-content-between my-2'>
                                {
                                    option.map((opt) => {
                                        return (
                                            <>
                                                <p className='text-uppercase m-0 fw-bold text-success'>{opt}: {options[opt]}</p>
                                            </>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div className='my-2'>
                        <p className='m-0 fw-medium text-success'>{product.description}</p>
                    </div>
                </div>
            </div>*/}
        </>
    );
};

export default ProductDetails;