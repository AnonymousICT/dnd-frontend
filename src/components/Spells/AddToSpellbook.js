import React, {useContext} from 'react'
import {useHistory} from 'react-router-dom'
import {Context} from '../../context/Context'
import axios from 'axios'


export default function AddToSpellbook() {
    const history = useHistory();
    const {characterSpells, setCharacterSpells, currentCharacter, selectCharacter}= useContext(Context)

    const removeItem = (index) => {
        setCharacterSpells([...characterSpells.filter((spell, i) => index !== i)])
    }

    return (
        <div className="character-spellbook">
            <ul>
                {characterSpells.length === 0 ? "Add some spells to your spellbook": characterSpells.map((spell, i) => 
                    <div key={i}>
                        <li key={i}>{spell.name}</li>
                        <button onClick={()=>removeItem(i)}>X</button>
                    </div>
                )}
            </ul>
        </div>
    )
}
