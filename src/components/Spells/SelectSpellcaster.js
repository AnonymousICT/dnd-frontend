import React, { useEffect, useContext } from 'react'
import { Context } from '../../context/Context'

export default function SelectSpellCaster() {
    const { allCharacters, selectCharacter, setSelectCharacter,  setCurrentCharacter, nonSpellCaster } = useContext(Context)

    const handleSelection = (e) => {
        if(e.target.value === "NoOp") {
            setSelectCharacter(null)
        } else {
            setSelectCharacter(e.target.value)
        }
    }

    useEffect(()=>{
        
        setCurrentCharacter(allCharacters.find((item)=>item._id === selectCharacter)) 
    
    },[allCharacters, selectCharacter, setCurrentCharacter])

    let spellcasters = allCharacters.filter(character => 
       !nonSpellCaster.includes(character.job)
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
