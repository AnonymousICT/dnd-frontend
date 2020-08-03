import React, { useContext } from 'react'
import { Context } from '../../context/Context'

import CharacterShoppingCart from './CharacterShoppingCart'

export default function SelectCharacter() {
    const { allCharacters, selectCharacter, setSelectCharacter } = useContext(Context)
    const handleSelection = (e) => {
        setSelectCharacter(e.target.value)
    }

    return (
        <div>
            <select value={selectCharacter} onChange={handleSelection}>
                <option value="NoOp">----</option>
                {allCharacters.map((character, i)=> <option value={character._id} key={i}>{character.name}</option>)}
            </select>

            <CharacterShoppingCart />
        </div>
    )
}
