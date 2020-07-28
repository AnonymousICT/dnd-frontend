import React, {useContext} from 'react'
import axios from 'axios'
import {Link, useHistory} from 'react-router-dom'
import {Context} from '../../context/Context'

export default function Login() {
    const queryStrings = new URLSearchParams(window.location.search)
    const isRegistered = queryStrings.has("registered")
    const {setUserData, email, setEmail, password, setPassword} =useContext(Context)
    const history = useHistory();

    const handleUserLogin = async (e) => {
        e.preventDefault();
        try{
            const loginUser = {email, password}
            const loginRes = await axios.post("https://dnd-backend-node.herokuapp.com/users/login",
                loginUser
            )
            setUserData({
                token: loginRes.data.token,
                user: loginRes.data.user,
            })
            localStorage.setItem('x-auth-token', loginRes.data.token)
            localStorage.setItem('userId', loginRes.data.user.id)
            localStorage.setItem('displayName', loginRes.data.user.displayName)
            history.push('/characters?')
        } catch (err){
            console.err(err)
        }
    }

    return (
        <>
        {isRegistered && <p className="account-created-message">Your account has been created</p>}
        <form className='login form' onSubmit={handleUserLogin}>
            <input value={email} onChange={(e)=>setEmail(e.target.value)} type='email' placeholder='email'/>
            <input value={password} onChange={(e)=>setPassword(e.target.value)} type='password' placeholder='password' />
            <input type='submit' value='Login' />
            <Link to='/register'> Don't have an account? Sign up for one here!</Link>
        </form>
        </>
    )
}
