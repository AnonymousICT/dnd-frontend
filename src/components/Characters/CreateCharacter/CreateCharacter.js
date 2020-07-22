import React, {useContext}  from 'react'
import {Context} from '../../../context/Context'
import RaceSelector from './RaceSelector'
import SelectCharacterClass from './SelectCharacterClass'
import AttributeEntry from './AttributeEntry'
import axios from 'axios'

import './style.css'

const handleSubmit =() => {
    //do the thing Juli
}

export default function CreateCharacter() {
    const {characterName, setCharacterName, characterLevel ,setCharacterLevel,} = useContext(Context)

    return ( 
        <div>
            <form className='character-create-form'>
                <input type='string' value={characterName} onChange={(e)=>setCharacterName(e.target.value)} placeholder='Character Name'/>
                <input type='number' value={characterLevel} onChange={(e)=>setCharacterLevel(e.target.value)} placeholder='level 1' min='1' max='20'/>
                <RaceSelector />
                <SelectCharacterClass />
                <AttributeEntry />
                <input  type='submit' value='Submit' />
            </form>
        </div>
    )
}
