import React from 'react'


export default function Attributes({
    character:{
        strength, 
        dexterity, 
        constitution, 
        intelligence, 
        wisdom, 
        charisma,
    },
    filteredLevel,
    }) {

    const modMath = (score) => {
       return Math.round((score - 1) / 2 - 4.9)
    } 

    return (
        <div className="container">
            <div>
                Proficiency Bonus:{(filteredLevel[0] || []).prof_bonus}
            </div>
            <div className="attributes-mods">
                <label>Strength</label> {strength}
                <label>Mod</label> {modMath(strength)}
            </div>
            <div className="attributes-mods">
                <label>Dexterity</label> {dexterity}
                <label>Mod</label> {modMath(dexterity)}
            </div>
            <div className="attributes-mods">
                <label>Constitution</label> {constitution}
                <label>Mod</label> {modMath(constitution)}
            </div>
            <div className="attributes-mods">
                <label>Intelligence</label> {intelligence}
                <label>Mod</label> {modMath(intelligence)}
            </div>
            <div className="attributes-mods">
                <label>Wisdom</label> {wisdom}
                <label>Mod</label> {modMath(wisdom)}
            </div>
            <div className="attributes-mods">
                <label>Charisma</label> {charisma}
                <label>Mod</label> {modMath(charisma)}
            </div>
        </div>
    )
}
