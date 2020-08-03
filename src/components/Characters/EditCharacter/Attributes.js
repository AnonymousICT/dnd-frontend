import React,{useEffect, useContext } from 'react'
import {AttributeContext} from '../../../context/AttributeContext'
import axios from 'axios'

export default function Attributes({
    character,
    filteredLevel,
    }) {
    
    const {
        modMath, 
        allAttributes, 
        sortFunction, 
        attributeValue, 
        handleAttributeValueChange, 
        setAttributeValue} = useContext(AttributeContext)
    
    const getAttributeValue = (attributeName) => attributeValue[attributeName];

    const handleNewAttributes = async (e) =>{
        const updateCharacter = {
            strength: attributeValue["STR"],
            dexterity: attributeValue["DEX"],
            constitution: attributeValue["CON"],
            intelligence: attributeValue["INT"],
            wisdom: attributeValue["WIS"],
            charisma: attributeValue["CHA"],
        };
        await axios.put(`https://dnd-backend-node.herokuapp.com/characters/${character._id}` , updateCharacter, {headers: {"x-auth-token": localStorage.getItem('x-auth-token')}})
    }

    useEffect(()=>{
        setAttributeValue({
            STR: character.strength,
            DEX: character.dexterity, 
            CON: character.constitution,
            INT: character.intelligence,
            WIS: character.wisdom,
            CHA: character.charisma
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[character])

    return (
        <div className="container">
            <div>
                Proficiency Bonus:{(filteredLevel[0] || []).prof_bonus}
            </div>
            {allAttributes.sort(sortFunction).map((attribute, i) =>{
                return (
                    <div className="attribute" key={i}>
                        <label>{attribute[0]}</label>
                        <input 
                            type="number"
                            min="3"
                            max="20"
                            name={attribute[0]}
                            value={attributeValue[attribute[0]] || 10}
                            onChange={handleAttributeValueChange}
                        />
                        <label>{`${attribute[0]} Mod`} {modMath(getAttributeValue(attribute[0]))}</label>
                    </div>
                )
            })}
            <button onClick={handleNewAttributes}>Submit</button>
        </div>
    )
}
