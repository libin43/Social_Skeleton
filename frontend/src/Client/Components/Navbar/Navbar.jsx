import React, { useEffect } from 'react';
import axios from '../../utils/axios'
import { useNavigate, Link } from 'react-router-dom';
import { verifyToken } from '../../utils/constants';
import { userChange } from '../../Redux/usernameReducer';
import { imageChange } from '../../Redux/userimageReducer';
import { useSelector, useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import './Navbar.css';

function Navbar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const name = useSelector((state) => {
        return state.name;
    })

    const userimage = useSelector((state) => {
        return state.image;
    })

    const handleLogout = (e) => {
        e.preventDefault();
        Swal.fire({
            title: 'Logout?',
            text: "Do you want to Logout?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Logout'
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.clear();
                dispatch({ type: 'logout' })
                navigate('/')
            }
        })
    }

    useEffect(() => {
        console.log('use effect working')
        const Token = localStorage.getItem("token")

        if (!Token) {
            navigate('/')
        } else {
            const body = JSON.stringify({ Token })
            axios.post(verifyToken, body, { headers: { "Content-Type": "application/json" } })
                .then((response) => {

                    console.log(response, 'res in navbar')
                    dispatch(userChange(response.data.user.name))
                    dispatch(imageChange(response.data.user.image))

                    console.log(name, 'its name')
                    console.log(response.data.user.image, 'its image')

                })
        }
    }, [dispatch])
    return (
        <div className="row">
            <div className="nav">
                <nav class="navbar navbar-expand-lg navbar-light bg-light w-100">
                    <div class="container-fluid">
                        <a class="navbar-brand" href="#">Web-App</a>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarNavDropdown">
                            <ul class="navbar-nav">
                                <li class="nav-item">
                                    <Link className="nav-link" to={'/'}>Home</Link>
                                </li>
                                {name &&
                                    <ul class="navbar-nav">
                                        <li class="nav-item">
                                            <Link className="nav-link" to={'/feed'}>Feed</Link>
                                        </li>
                                        <li class="nav-item">
                                            <Link className="nav-link" to={'/profile'}>Profile</Link>
                                        </li>

                                    </ul>
                                }
                                <li class="nav-item dropdown">
                                    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        {name ? name : 'Menu '}
                                    </a>
                                    {
                                        name ?
                                            <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">

                                                <li><a class="dropdown-item" onClick={handleLogout} href="#">Logout</a></li>
                                            </ul> :
                                            <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">

                                                <li><Link className="nav-link" to={'/login'}>Login</Link></li>
                                                <li><Link className="nav-link" to={'/signup'}>Signup</Link></li>
                                            </ul>

                                    }

                                </li>
                            </ul>
                        </div>
                    </div>
                    <ul class="navbar-nav">
                        <Link className="nav-link" to={'/profile'}>
                            <li className='img-list'>
                                <img
                                    src={userimage}
                                    className="rounded-circle"
                                    height={100}
                                    alt="Profile Picture" />
                            </li>
                        </Link>

                    </ul>
                </nav>
            </div>

        </div>
    )
}

export default Navbar;