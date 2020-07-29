import React, {useState, useContext} from 'react'
import axios from 'axios'
import {Link , useHistory} from 'react-router-dom'
import {Context} from '../../context/Context'

export default function Register() {
    const {email, setEmail, password, setPassword} =useContext(Context)
    const [confirmPassword, setConfirmPassword] = useState('')
    const [displayName, setDisplayName] = useState('')

    const history = useHistory();

    const handleUserRegistration = async (e) => {
        e.preventDefault();
        try {
            if(password !== confirmPassword) {
                alert('passwords do not match')
                return 
            }
            const registerUser = { email, password, passwordCheck:confirmPassword, displayName}
            await axios.post(`${process.env.REACT_APP_CLIENT_URL}/users/register`, registerUser);
            history.push("/login?registered")
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <form className ='registration form' onSubmit={handleUserRegistration}>
            <input type='email' placeholder='email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <input type='password' placeholder='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <input type='password' placeholder='type password again' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}/>
            <input placeholder='Display Name *Optional* ' value={displayName} onChange={(e)=>setDisplayName(e.target.value)}/>
            <input type='submit' value='Register New Account' />
            <Link to='/login'> Already have an account? Click here to Login</Link>
        </form>
    )
}
