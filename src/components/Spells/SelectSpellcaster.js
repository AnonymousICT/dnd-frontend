import React, { useEffect, useContext } from 'react'
import { Context } from '../../context/Context'

export default function SelectSpellCaster() {
    const { allCharacters, selectCharacter, setSelectCharacter,  setCurrentCharacter} = useContext(Context)

    const handleSelection = (e) => {
        setSelectCharacter(e.target.value)
    }

    useEffect(()=>{
        // eslint-disable-next-line react-hooks/exhaustive-deps
        setCurrentCharacter(allCharacters.find((item)=>item._id === selectCharacter)) 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[selectCharacter])

    let spellcasters = allCharacters.filter(character => 
        character.job !== "Barbarian" 
        && character.job !== "Fighter"
        && character.job !== "Monk"
        && character.job !== "Rogue"
    )
        
    return (
        <div>
            <select value={selectCharacter} onChange={handleSelection}>
                <option value="NoOp">----</option>
                {spellcasters.map((caster ,i)=><option data-character={caster} value={caster._id} key={i}>{caster.name}</option>)}
            </select>
        </div>
    )
}
