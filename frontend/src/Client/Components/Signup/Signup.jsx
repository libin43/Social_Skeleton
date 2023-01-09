import axios from '../../utils/axios';
import React,{useState} from 'react';
import './Signup.css';
import { signUpPost } from '../../utils/constants';
import {useNavigate,Link} from 'react-router-dom';
import Swal from 'sweetalert2'

function Signup() {
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [phone,setPhone] = useState('');
  const [password,setPassword] = useState('');  
  const navigate = useNavigate();

  const handleSubmit =(e)=>{
    const body = JSON.stringify({name,email,phone,password})
    console.log(body)

    e.preventDefault();

    axios.post(signUpPost,body,{ headers: { "Content-Type":"application/json" }})
    .then((response)=>{
      if(response.data.status ==='created'){
        navigate('/login')
      }
      else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Email already exists!',
        })
      }
    })
    .catch((err)=>{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text:"Something went wrong! Try Again later" ,
      })
    })

  }
  
  return (
    <section className="gradient-custom">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="card bg-dark text-white" style={{borderRadius: '1rem'}}>
                <div className="card-body p-5 text-center">
                  <div className="md-5 mt-md-4 pb-1">
                    <h2 className="fw-bold mb-2 text-uppercase">Signup</h2>
                    <p className="text-white-50 mb-5">Fill your details to Register</p>
                    <div className="form-outline form-white mb-4">
                      <input type="text" id="typenameX" value={name} onChange ={(e)=>{setName(e.target.value)}} className="form-control form-control-lg" />
                      <label className="form-label" htmlFor="typenameX">Name</label>
                    </div>
                    <div className="form-outline form-white mb-4">
                      <input type="email" id="typeEmailX" value={email} onChange ={(e)=>{setEmail(e.target.value)}} className="form-control form-control-lg" />
                      <label className="form-label" htmlFor="typeEmailX">Email</label>
                    </div>
                    <div className="form-outline form-white mb-4">
                      <input type="text" id="typePhoneX" value={phone} onChange ={(e)=>{setPhone(e.target.value)}} className="form-control form-control-lg" />
                      <label className="form-label" htmlFor="typePhoneX">Phone</label>
                    </div>
                    <div className="form-outline form-white mb-4">
                      <input type="password" id="typePasswordX" value={password} onChange ={(e)=>{setPassword(e.target.value)}} className="form-control form-control-lg" />
                      <label className="form-label" htmlFor="typePasswordX">Password</label>
                    </div>
                    <p className="small mb-5 pb-lg-2"><Link className="text-white-50" to={'/login'}>Already have account?</Link></p>
                    <button className="btn btn-outline-light btn-lg px-5" onClick={handleSubmit} type="submit">Signup</button>
                    <div className="d-flex justify-content-center text-center mt-4 pt-1">
                      <a href="#!" className="text-white"><i className="fab fa-facebook-f fa-lg" /></a>
                      <a href="#!" className="text-white"><i className="fab fa-twitter fa-lg mx-4 px-2" /></a>
                      <a href="#!" className="text-white"><i className="fab fa-google fa-lg" /></a>
                    </div>
                  </div>
                  {/* <div>
                    <p className="mb-0">Don't have an account? <a href="#!" className="text-white-50 fw-bold">Sign Up</a>
                    </p>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}

export default Signup;
