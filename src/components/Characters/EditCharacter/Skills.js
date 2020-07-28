import React from 'react'

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

export default function Skills({character:{profChoice, strength, dexterity, constitution, intelligence, wisdom, charisma}, userClass:{saving_throws}, filteredLevel}) {
    const modMath = (score) => {
        return Math.round((score - 1) / 2 - 4.9)
     } 

    const savesModifiers = {
        STR: modMath(strength),
        DEX: modMath(dexterity),
        CON: modMath(constitution),
        INT: modMath(intelligence),
        WIS: modMath(wisdom),
        CHA: modMath(charisma)
    }

    const skillModifiers = {
        Athletics: modMath(strength),
        Acrobatics: modMath(dexterity),
        "Sleight of Hand": modMath(dexterity),
        Stealth: modMath(dexterity),
        Arcana: modMath(intelligence),
        History: modMath(intelligence),
        Investigation: modMath(intelligence),
        Nature: modMath(intelligence),
        Religion: modMath(intelligence),
        "Animal Handling": modMath(wisdom),
        Insight: modMath(wisdom),
        Medicine: modMath(wisdom),
        Perception: modMath(wisdom),
        Survival: modMath(wisdom),
        Deception: modMath(charisma),
        Intimidation: modMath(charisma),
        Performance: modMath(charisma),
        Persuasion: modMath(charisma),
    }

    const savingThrows = !saving_throws ? []: saving_throws.map(save => save.name)

    const displayCheckboxes = (initArray, valuesArray, modifiers) => initArray.map( 
        (label, i) => {
            if(valuesArray.filter((item) => label === item ).length === 0) {
                return (
                    <div key={i}>
                        <input type="checkbox" readOnly disabled/>
                        <label>{label} {modifiers[label]}</label>
                    </div>
                ) 
            } else {
                return (
                <div key={i}>
                        <input type="checkbox" readOnly defaultChecked onClick={(e) => e.preventDefault()}/>
                        <label>{label} {modifiers[label] + (filteredLevel[0] || []).prof_bonus}</label>
                    </div>
                )
            }
        }
    )

    return (
        <div className="skills-container">
            <h2>Saving Throws</h2>
            <div className="save-container">
                {displayCheckboxes(saveArray, savingThrows, savesModifiers)}
                <h2>Skills</h2>
                {displayCheckboxes(skillArray, (profChoice || []).map(choice => choice.replace("Skill: ", "")), skillModifiers)}
            </div>
        </div>
    )
}
