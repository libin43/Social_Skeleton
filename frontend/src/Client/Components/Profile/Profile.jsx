import React, { useState, useEffect } from 'react';
import axios from '../../utils/axios';
import { verifyToken, imageupload } from '../../utils/constants';
import { useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import {imageChange} from '../../Redux/userimageReducer';
import Swal from 'sweetalert2';



function Profile() {
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [image,setImage] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const name = useSelector((state)=>{
        return state.name;
    })

    const userimage = useSelector((state)=>{
        return state.image;
    })

    const addImage = async () => {
        const { value: file } = await Swal.fire({
            title: 'Select image',
            input: 'file',

            inputAttributes: {
                'accept': 'image/*',
                'aria-label': 'Upload your profile picture'
            }
        })
        
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                Swal.fire({

                    title: "img",
                    imageUrl: e.target.result,
                    imageHeight: 400,
                    showDenyButton: true,
                    showCancelButton: true,
                    confirmButtonText: 'Update',
                    denyButtonText: `Change`,
                }).then((result) => {
                    // console.log(result)
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                        uploadImage(file)

                    } else if (result.isDenied) {
                        addImage()
                    }
                })
            }
            reader.readAsDataURL(file)
        }
    }

    function uploadImage(file) {
        console.log(file,'upload working');
      
        const Token = localStorage.getItem("token");
        const body = JSON.stringify({Token})
        const formData = new FormData();

        formData.append("image", file);
       
        
       
        axios.post(`${imageupload}/${Token}`,formData).then((response)=>{
            console.log(response,'res in upload success front end')
            setImage(response.data.image)
            dispatch(imageChange(response.data.image))
            console.log(response.data.image,'its image in profile')
        })
        .catch((err)=>{
            console.log(err)
        })

    }

    useEffect(() => {
        const Token = localStorage.getItem("token");
        if (!Token) {
            navigate('/');
        } else {
            const body = JSON.stringify({ Token })
            axios.post(verifyToken, body, { headers: { "Content-Type": "application/json" } })
                .then((response) => {
                    console.log(response, 'res hitting in profile front end');
                    setEmail(response.data.user.email);
                    setPhone(response.data.user.phone);
                    
                })
        }
    })
    return (
        <div>
            <section style={{ backgroundColor: "#eee" }}>
                <div className="container py-5">

                    <div className="row">
                        <div className="col-lg-4">
                            <div className="card mb-4">
                                <div className="card-body text-center">

                                    <img
                                        src={userimage}
                                        alt="avatar"
                                        className="rounded-circle img-fluid"
                                        style={{ height: 150, width: 150 }}
                                    />
                                    <h5 className="my-3">{}</h5>
                                    <p className="text-muted mb-1">{ }</p>

                                    <div className="d-flex justify-content-center mb-2">

                                        <button type="button" className="btn btn-primary">
                                            Remove image
                                        </button>

                                        <button type="button" onClick={addImage} className="btn btn-outline-primary ms-1">
                                            Update image
                                        </button>
                                    </div>

                                </div>
                            </div>
                            {/* <div className="card mb-4 mb-lg-0">
                        <div className="card-body p-0">
                            <ul className="list-group list-group-flush rounded-3">
                                <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                                    <i className="fas fa-globe fa-lg text-warning" />
                                    <p className="mb-0">https://mdbootstrap.com</p>
                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                                    <i
                                        className="fab fa-github fa-lg"
                                        style={{ color: "#333333" }}
                                    />
                                    <p className="mb-0">mdbootstrap</p>
                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                                    <i
                                        className="fab fa-twitter fa-lg"
                                        style={{ color: "#55acee" }}
                                    />
                                    <p className="mb-0">@mdbootstrap</p>
                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                                    <i
                                        className="fab fa-instagram fa-lg"
                                        style={{ color: "#ac2bac" }}
                                    />
                                    <p className="mb-0">mdbootstrap</p>
                                </li>
                                <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                                    <i
                                        className="fab fa-facebook-f fa-lg"
                                        style={{ color: "#3b5998" }}
                                    />
                                    <p className="mb-0">mdbootstrap</p>
                                </li>
                            </ul>
                        </div>
                    </div> */}
                        </div>
                        <div className="col-lg-8">
                            <div className="card mb-4">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <p className="mb-0">Full Name</p>
                                        </div>
                                        <div className="col-sm-9">
                                            <p className="text-muted mb-0">{name}</p>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <p className="mb-0">Email</p>
                                        </div>
                                        <div className="col-sm-9">
                                            <p className="text-muted mb-0">{email}</p>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <p className="mb-0">Phone</p>
                                        </div>
                                        <div className="col-sm-9">
                                            <p className="text-muted mb-0">{phone}</p>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <p className="mb-0">Address</p>
                                        </div>
                                        <div className="col-sm-9">
                                            <p className="text-muted mb-0"></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <div className="row">
                        <div className="col-md-6">
                            <div className="card mb-4 mb-md-0">
                                <div className="card-body">
                                    <p className="mb-4">
                                        <span className="text-primary font-italic me-1">
                                            assigment
                                        </span>{" "}
                                        Project Status
                                    </p>
                                    <p className="mb-1" style={{ fontSize: ".77rem" }}>
                                        Web Design
                                    </p>
                                    <div className="progress rounded" style={{ height: 5 }}>
                                        <div
                                            className="progress-bar"
                                            role="progressbar"
                                            style={{ width: "80%" }}
                                            aria-valuenow={80}
                                            aria-valuemin={0}
                                            aria-valuemax={100}
                                        />
                                    </div>
                                    <p className="mt-4 mb-1" style={{ fontSize: ".77rem" }}>
                                        Website Markup
                                    </p>
                                    <div className="progress rounded" style={{ height: 5 }}>
                                        <div
                                            className="progress-bar"
                                            role="progressbar"
                                            style={{ width: "72%" }}
                                            aria-valuenow={72}
                                            aria-valuemin={0}
                                            aria-valuemax={100}
                                        />
                                    </div>
                                    <p className="mt-4 mb-1" style={{ fontSize: ".77rem" }}>
                                        One Page
                                    </p>
                                    <div className="progress rounded" style={{ height: 5 }}>
                                        <div
                                            className="progress-bar"
                                            role="progressbar"
                                            style={{ width: "89%" }}
                                            aria-valuenow={89}
                                            aria-valuemin={0}
                                            aria-valuemax={100}
                                        />
                                    </div>
                                    <p className="mt-4 mb-1" style={{ fontSize: ".77rem" }}>
                                        Mobile Template
                                    </p>
                                    <div className="progress rounded" style={{ height: 5 }}>
                                        <div
                                            className="progress-bar"
                                            role="progressbar"
                                            style={{ width: "55%" }}
                                            aria-valuenow={55}
                                            aria-valuemin={0}
                                            aria-valuemax={100}
                                        />
                                    </div>
                                    <p className="mt-4 mb-1" style={{ fontSize: ".77rem" }}>
                                        Backend API
                                    </p>
                                    <div className="progress rounded mb-2" style={{ height: 5 }}>
                                        <div
                                            className="progress-bar"
                                            role="progressbar"
                                            style={{ width: "66%" }}
                                            aria-valuenow={66}
                                            aria-valuemin={0}
                                            aria-valuemax={100}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="card mb-4 mb-md-0">
                                <div className="card-body">
                                    <p className="mb-4">
                                        <span className="text-primary font-italic me-1">
                                            assigment
                                        </span>{" "}
                                        Project Status
                                    </p>
                                    <p className="mb-1" style={{ fontSize: ".77rem" }}>
                                        Web Design
                                    </p>
                                    <div className="progress rounded" style={{ height: 5 }}>
                                        <div
                                            className="progress-bar"
                                            role="progressbar"
                                            style={{ width: "80%" }}
                                            aria-valuenow={80}
                                            aria-valuemin={0}
                                            aria-valuemax={100}
                                        />
                                    </div>
                                    <p className="mt-4 mb-1" style={{ fontSize: ".77rem" }}>
                                        Website Markup
                                    </p>
                                    <div className="progress rounded" style={{ height: 5 }}>
                                        <div
                                            className="progress-bar"
                                            role="progressbar"
                                            style={{ width: "72%" }}
                                            aria-valuenow={72}
                                            aria-valuemin={0}
                                            aria-valuemax={100}
                                        />
                                    </div>
                                    <p className="mt-4 mb-1" style={{ fontSize: ".77rem" }}>
                                        One Page
                                    </p>
                                    <div className="progress rounded" style={{ height: 5 }}>
                                        <div
                                            className="progress-bar"
                                            role="progressbar"
                                            style={{ width: "89%" }}
                                            aria-valuenow={89}
                                            aria-valuemin={0}
                                            aria-valuemax={100}
                                        />
                                    </div>
                                    <p className="mt-4 mb-1" style={{ fontSize: ".77rem" }}>
                                        Mobile Template
                                    </p>
                                    <div className="progress rounded" style={{ height: 5 }}>
                                        <div
                                            className="progress-bar"
                                            role="progressbar"
                                            style={{ width: "55%" }}
                                            aria-valuenow={55}
                                            aria-valuemin={0}
                                            aria-valuemax={100}
                                        />
                                    </div>
                                    <p className="mt-4 mb-1" style={{ fontSize: ".77rem" }}>
                                        Backend API
                                    </p>
                                    <div className="progress rounded mb-2" style={{ height: 5 }}>
                                        <div
                                            className="progress-bar"
                                            role="progressbar"
                                            style={{ width: "66%" }}
                                            aria-valuenow={66}
                                            aria-valuemin={0}
                                            aria-valuemax={100}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default Profile