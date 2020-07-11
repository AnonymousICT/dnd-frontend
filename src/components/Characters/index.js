import React from 'react'
import CharacterGrid from './CharacterGrid/CharacterGrid'
import {useHistory} from 'react-router-dom'

export default function Characters() {
    const history = useHistory();


    if(!localStorage.getItem('x-auth-token')) {
        history.push('/login')
        return null
    }
    return (
        <div>
            <CharacterGrid />
        </div>
    )
}
