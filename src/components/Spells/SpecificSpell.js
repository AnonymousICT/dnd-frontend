import React, {useContext} from 'react'
import {ResourceContext} from '../../context/ResourceContext'
import {Context} from '../../context/Context'

export default function SpecificSpell() {
    const {selectCharacter, characterSpells, setCharacterSpells} = useContext(Context)
    const {specificSpell} = useContext(ResourceContext)

    const {
        name, 
        level, 
        range, 
        components, 
        school, 
        classes, 
        material, 
        desc, 
        duration, 
        higher_level, 
        ritual, 
        concentration, 
        casting_time
    } = specificSpell

    const addToCharacter = () => {
        setCharacterSpells([...characterSpells,  {...specificSpell}])}


    return (
        <div className='specific-spell-container'>
            {!name ? null : 
            <section>
                <h1 className='spell-name'>{name}</h1>
                <p>Level: {level} {school.name} {ritual ? "(ritual)" : null}</p>
                <p>Casting Time: {casting_time}</p>
                <p>Spell Range: {range}</p>
                <p>Components: {components} {material}</p>
                <p>Duration: {concentration ? "Concentration, " : null} {duration}</p>
                <p>Classes: {classes.map(index => index.name).join(', ')}</p>
                <p>Description: {desc}</p>
                <p>{higher_level}</p>
                {!selectCharacter ? null : <button onClick={addToCharacter}>Add to Character</button>}
            </section>}
        </div>
    )
}
