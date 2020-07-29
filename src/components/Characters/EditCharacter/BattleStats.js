import React,{useContext } from 'react'
import {AttributeContext} from '../../../context/AttributeContext'

export default function BattleStats({character:{dexterity, constitution, wisdom, job}, }) {
    const {modMath} = useContext(AttributeContext)

    const calculateInitialAC = () => {
        if(job === "Monk") {
            return modMath(dexterity)+modMath(wisdom)+10
        } else if (job === "Barbarian") {
            return modMath(dexterity)+modMath(constitution)+10
        } else {
            return modMath(dexterity)+10
        }
    }
    // armor class = 10+Dexmod as a default
    //initiative = Dev mod
    //speed from race + check to see what level monk they are for unarmored movement
    //hit_die from class info
    //deathsaves

    return (
        <div className="battle-stats-container">
            <h1>
                Armor class: {calculateInitialAC()}
            </h1>
        </div>
    )
}
