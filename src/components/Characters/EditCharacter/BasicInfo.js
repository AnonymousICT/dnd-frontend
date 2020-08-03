import React, {useContext} from 'react'
import {Context} from '../../../context/Context'

export default function BasicInfo() {
    const {currentCharacter} = useContext(Context)

  const {name, level, race, job} = currentCharacter

    return (
        <div className="basic-info">
            <h1>{name}</h1>
            <h2>Level {level} {race} {job}</h2>
        </div>
    )
}
