import React, {useContext} from 'react'
import {Context} from '../../context/Context'

export default function SpecificSpell() {
    const {specificSpell} = useContext(Context)
    // if(!specificSpell) return null

    const {name, level, range, components, school, classes, material, desc, duration, higher_level, ritual, concentration, casting_time} = specificSpell

    return (
        <div className='specific-spell-container'>
            <h1 className='spell-name'>{name}</h1>
            <p>Level: {level} {(school || {name:""}).name} {ritual ? "(ritual)" : null}</p>
            <p>Casting Time: {casting_time}</p>
            <p>Spell Range: {range}</p>
            <p>Components: {components} {material}</p>
            <p>Duration: {concentration ? "Concentration ," : null} {duration}</p>
            <p>Classes: {(classes || [{name: ""}]).map(index => index.name).join(', ')}</p>
            <p>Description: {desc}</p>
            <p>{higher_level}</p>
        </div>
    )
}
