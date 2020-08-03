import React, { useEffect, useContext } from 'react'
import { Context } from '../../context/Context'

import CharacterShoppingCart from '../Equipment/CharacterShoppingCart'

export default function SelectCharacter() {
    const { allCharacters, selectCharacter, setSelectCharacter,  setCurrentCharacter} = useContext(Context)

    const handleSelection = (e) => {
        setSelectCharacter(e.target.value)
    }
  

    useEffect(()=>{
        // eslint-disable-next-line react-hooks/exhaustive-deps
        setCurrentCharacter(allCharacters.find((item)=>item._id === selectCharacter)) 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[selectCharacter])

    return (
        <div>
            <select value={selectCharacter} onChange={handleSelection}>
                <option value="NoOp">----</option>
                {allCharacters.map((character, i)=> <option data-character={character} value={character._id} key={i}>{character.name}</option>)}
            </select>

            <CharacterShoppingCart />
        </div>
    )
}
