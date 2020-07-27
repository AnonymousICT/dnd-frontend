import React from 'react'


export default function Attributes({character:{strength, dexterity, constitution, intelligence, wisdom, charisma,}}) {
    const modMath = (score) => {
       return Math.round((score - 1) / 2 - 4.9)
    } 

    return (
        <div className="container">
            <div className="attributes-mods-skills">
                <label>Strength</label> {strength}
                <label>Mod</label> {modMath(strength)}
                <ul>
                    <li>saving throw</li>
                    <li>Atheletics</li>
                </ul>
            </div>
            <div className="attributes-mods-skills">
                <label>Dexterity</label> {dexterity}
                <label>Mod</label> {modMath(dexterity)}
                <ul>
                    <li>saving throw</li>
                    <li>Acrobatics</li>
                    <li>Sleight of Hand</li>
                    <li>Stealth</li>
                </ul>
            </div>
            <div className="attributes-mods-skills">
                <label>Constitution</label> {constitution}
                <label>Mod</label> {modMath(constitution)}
                <ul>
                    <li>saving throw</li>
                </ul>
            </div>
            <div className="attributes-mods-skills">
                <label>Intelligence</label> {intelligence}
                <label>Mod</label> {modMath(intelligence)}
                <ul>
                    <li>saving throw</li>
                    <li>Arcana</li>
                    <li>History</li>
                    <li>Investigation</li>
                    <li>Nature</li>
                    <li>Religion</li>
                </ul>
            </div>
            <div className="attributes-mods-skills">
                <label>Wisdom</label> {wisdom}
                <label>Mod</label> {modMath(wisdom)}
                <ul>
                    <li>saving throw</li>
                    <li>Animal Handgling</li>
                    <li>Insight</li>
                    <li>Medicine</li>
                    <li>Perception</li>
                    <li>Survival</li>
                </ul>
            </div>
            <div className="attributes-mods-skills">
                <label>Charisma</label> {charisma}
                <label>Mod</label> {modMath(charisma)}
                <ul>
                    <li>saving throw</li>
                    <li>Deception</li>
                    <li>Intimidation</li>
                    <li>Performance</li>
                    <li>Persuasion</li>
                </ul>
            </div>
        </div>
    )
}
