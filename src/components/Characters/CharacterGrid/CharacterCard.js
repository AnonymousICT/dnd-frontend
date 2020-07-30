import React from 'react'
import {useHistory} from 'react-router-dom'
import './characterCard.scss'


export default function CharacterCard({character}) {
    const history = useHistory();
    const handleRedirect = () => {
        history.push(`character/edit/${character._id}`)
    }

    return (
        <div className={"character-card " + character.job.toLowerCase()} onClick={handleRedirect}>
            <h2>{character.name}</h2>
            <p>Level {character.level} {character.race} {character.job}</p>
        </div>
    )
}
