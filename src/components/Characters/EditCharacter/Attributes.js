import React,{useEffect, useContext } from 'react'
import {AttributeContext} from '../../../context/AttributeContext'
import {Context} from '../../../context/Context'


export default function Attributes({filteredLevel}) {
    const {currentCharacter} = useContext(Context);

    const {
        modMath, 
        allAttributes, 
        sortFunction, 
        attributeValue, 
        handleAttributeValueChange, 
        setAttributeValue} = useContext(AttributeContext)
    
    const getAttributeValue = (attributeName) => attributeValue[attributeName];


    useEffect(()=>{
        setAttributeValue({
            STR: currentCharacter.strength,
            DEX: currentCharacter.dexterity, 
            CON: currentCharacter.constitution,
            INT: currentCharacter.intelligence,
            WIS: currentCharacter.wisdom,
            CHA: currentCharacter.charisma
        });
    },[currentCharacter, setAttributeValue]);

    const profBonus = () => {
        return (filteredLevel.find((item) => item.prof_bonus) || {prof_bonus: 0}).prof_bonus;
    }

    return (
        <div className="attribute-container">
            <div className="prof-bonus">
                Proficiency Bonus: <span>{profBonus()}</span>
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
                            onChange={(e) => handleAttributeValueChange({[e.target.name]: +e.target.value})}
                        />
                        <label>Modifier {modMath(getAttributeValue(attribute[0]))}</label>
                    </div>
                )
            })}
        </div>
    )
}

