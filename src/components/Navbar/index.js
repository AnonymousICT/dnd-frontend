import React from 'react'
import {Link} from 'react-router-dom'

export default function Navbar() {
    return (
        <nav className='navigation'>
            <ul className='navigation-list'>
                <li className='navigation-item'>
                    <Link to='/'>Home</Link>
                </li>
                <li className='navigation-item'>
                    <Link to='/spells'>Spell List</Link>
                </li>
                <li className='navigation-item'>
                    <Link to='/characters'>Create a Character</Link>
                </li>
            </ul>
        </nav>
    )
}
