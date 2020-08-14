import React, {useEffect, useContext} from 'react'
import {AttributeContext} from '../../../context/AttributeContext'
import {Context} from '../../../context/Context'
import displayCheckboxes from './DisplayCheckBoxes'

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
    userClass:{saving_throws}, 
    filteredLevel}) {
        const {attributeValue, modMath, setAttributeValue} = useContext(AttributeContext)
        const {currentCharacter} = useContext(Context)
        
        useEffect(()=>{
            setAttributeValue({
                STR: currentCharacter.strength,
                DEX: currentCharacter.dexterity, 
                CON: currentCharacter.constitution,
                INT: currentCharacter.intelligence,
                WIS: currentCharacter.wisdom,
                CHA: currentCharacter.charisma
            });
        },[currentCharacter, setAttributeValue])

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

    return (
        <div className="skills-save-container">
            <div className='skills-container'>
                <h2>Skills</h2>
                {displayCheckboxes(
                    skillArray, 
                    (currentCharacter.profChoice || []).map(choice => choice.replace("Skill: ", "")), 
                    skillModifiers, 
                    filteredLevel, 
                    attributeValue, 
                    modMath)}
            </div>
        </div>
    )
}
