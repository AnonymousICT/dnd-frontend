import React, {useEffect, useContext} from 'react'
import {Context} from '../../../context/Context'

const saveArray = [
    "STR",
    "DEX",
    "CON",
    "INT",
    "WIS",
    "CHA",
]

const skillArray = [
    "Athletics",
    "Acrobatics",
    "Sleight of Hand",
    "Stealth",
    "Arcana",
    "History",
    "Investigation",
    "Nature",
    "Religion",
    "Animal Handling",
    "Insight",
    "Medicine",
    "Perception",
    "Survival",
    "Deception",
    "Intimidation",
    "Performance",
    "Persuasion",
]

export default function Skills({
    character, 
    userClass:{saving_throws}, 
    filteredLevel}) {
        const {attributeValue, modMath, setAttributeValue} = useContext(Context)
        
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

    const skillModifiers = {
        Athletics: "STR",
        Acrobatics: "DEX",
        "Sleight of Hand": "DEX",
        Stealth: "DEX",
        Arcana: "INT",
        History: "INT",
        Investigation: "INT",
        Nature: "INT",
        Religion: "INT",
        "Animal Handling": "WIS",
        Insight: "WIS",
        Medicine: "WIS",
        Perception: "WIS",
        Survival: "WIS",
        Deception: "CHA",
        Intimidation: "CHA",
        Performance: "CHA",
        Persuasion: "CHA",
    }

    const savingThrows = !saving_throws ? []: saving_throws.map(save => save.name)

    const getValue = (modifiers, item) => attributeValue[modifiers ? modifiers[item] : item];

    const displayCheckboxes = (initArray, valuesArray, modifiers) => initArray.map( 
        (label, i) => {
            if(valuesArray.filter((item) => label === item ).length === 0) {
                return (
                    <div key={i}>
                        <input type="checkbox" readOnly disabled/>
                        <label>{label} {modMath(getValue(modifiers, label))}</label>
                    </div>
                ) 
            } else {
                return (
                <div key={i}>
                        <input type="checkbox" readOnly defaultChecked onClick={(e) => e.preventDefault()}/>
                        <label>{label} {modMath(getValue(modifiers, label)) + (filteredLevel[0] || []).prof_bonus}</label>
                    </div>
                )
            }
        }
    )


    return (
        <div className="skills-container">
            <h2>Saving Throws</h2>
            <div className="save-container">
                {displayCheckboxes(saveArray, savingThrows, null)}
                <h2>Skills</h2>
                {displayCheckboxes(skillArray, (character.profChoice || []).map(choice => choice.replace("Skill: ", "")), skillModifiers)}
            </div>
        </div>
    )
}
