import React from 'react';

const Footer = () => {
    return (
        <>
            <footer className="d-flex flex-wrap justify-content-between text-white align-items-center py-3 my-2 border-top">
                <div className="col-md-4 d-flex align-items-center">
                    <p className="mb-3 mb-md-0 text-body">© 2023 Company, Inc</p>
                </div>

                <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
                    <li className="ms-3"><a className="text-body" href="/">Link</a></li>
                    <li className="ms-3"><a className="text-body" href="/">Link</a></li>
                    <li className="ms-3"><a className="text-body" href="/">Link</a></li>
                </ul>
            </footer>
        </>
    );
};

export default Footer;