import React, {useState, useContext}  from 'react'
import {Context} from '../../../context/Context'
import SelectCharacterClass from './SelectCharacterClass'


export default function CreateCharacter() {
    const [attributeSelection, setAttributeSelection] = useState('')
    const {characterName, setCharacterName, characterLevel ,setCharacterLevel,} = useContext(Context)

    return ( 
        <div>
            <form>
                <input type='string' value={characterName} onChange={(e)=>setCharacterName(e.target.value)} placeholder='Character Name'/>

                <input type='number' value={characterLevel} onChange={(e)=>setCharacterLevel(e.target.value)} placeholder='level 1' min='1' max='20'/>

                <select value={attributeSelection} onChange={(e)=>setAttributeSelection(e.target.value)}>
                    <option>-----</option>
                    <option value='manual' >Manual Attribute entry</option>
                    <option value='pointBuy' >Point Buy</option>
                </select>
                <SelectCharacterClass />
            </form>
        </div>
    )
}
