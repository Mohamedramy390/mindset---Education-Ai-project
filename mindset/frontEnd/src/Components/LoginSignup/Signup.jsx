import React, { useState } from 'react'
import './Signup.css'
import logo from '../Assets/logo.jpg'
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../../context/AuthContext';


const Signup = () => {
    const [form, setForm] = useState({ firstName: '', secondName: '', email: '', password: '', role: 'student' })
    const { register } = useAuth()
    const navigate = useNavigate()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    
    const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })
    
    const onSubmit = async (e) => { 
    e.preventDefault();
    setError('')
    setLoading(true)
    try {
        console.log(form.email)
        await register(form.firstName, form.secondName, form.email, form.password, form.role)
        navigate('/login')
    } catch (err) {
        const message = err?.response?.data?.message || err?.message || 'Registration failed'
        setError(message)
    } finally {
        setLoading(false)
    }
  }
    return (
        <div className="container">
            <div className='page'>
                <div className="header"> 
                    {/* <div className="logo"><img src={logo} alt=""></img></div> */}
                    <div className="create_account">Create your account</div>
                    <div className="have_account">Already have an account? <Link to="/login"><span>Login</span></Link></div>
                </div>
                <div className="inputs">
                    <div className="input">
                        {/* <MdOutlineMail className="icons"/> */}
                        <input name='email' className="email" type="email"  onChange={onChange} placeholder='Email address'/>
                    </div>
                    <div className="input">
                        {/* <RiLockPasswordLine className="icons"/> */}
                        <input name='firstName' className="name" type="text"onChange={onChange} placeholder='First Name'/>
                    </div>
                    <div className="input">
                        {/* <RiLockPasswordLine className="icons"/> */}
                        <input name='secondName' className="name" type="text"  onChange={onChange} placeholder='Second Name'/>
                    </div>
                    <div className="input">
                        {/* <RiLockPasswordLine className="icons"/> */}
                        <input name='password' className="pass" type="password"  onChange={onChange} placeholder='Password'/>
                    </div>
                    <div className="input">
                        <select className="role" id="role" onChange={onChange} name="role">
                            <option value="" disabled selected hidden>Select Role</option>
                            <option value="student">student</option>
                            <option vlaue="professor">professor</option>
                        </select>
                    </div>
                    <button onClick={onSubmit} className="signupButton" disabled={loading}>{loading ? 'Creating…' : 'Create account'}</button>
                </div>
            </div>
        </div>
    );
}

export default Signup