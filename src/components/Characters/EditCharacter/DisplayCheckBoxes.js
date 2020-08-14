import React from 'react'
export default function displayCheckboxes(initArray, valuesArray, modifiers, filteredLevel, attributeValue, modMath) {
    
    const getValue = (modifiers, item) => attributeValue[modifiers ? modifiers[item] : item];
    
    const profBonus = (levels) => {
        return (levels.find((item) => item.prof_bonus) || {prof_bonus: 0}).prof_bonus;
    }

    return initArray.map( 
        (label, i) => {
            if(valuesArray.filter((item) => label === item ).length === 0) {
                return (
                    <div key={i} data-title="is not proficient">
                        <input type="checkbox" readOnly disabled/>
                        <label>{label} {modMath(getValue(modifiers, label))}</label>
                    </div>
                ) 
            } else {
                return (
                    <div key={i} data-title="is proficient">
                        <input type="checkbox" readOnly defaultChecked onClick={(e) => e.preventDefault()}/>
                        <label className='checked'>{label} <span>{(modMath(getValue(modifiers, label))) + profBonus(filteredLevel)}</span></label>
                    </div>
                )
            }
        }
    )
} 