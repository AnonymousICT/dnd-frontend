import React,{ useContext } from 'react'
import {AttributeContext} from '../../../context/AttributeContext'
import {Context} from '../../../context/Context'


export default function BattleStats({userClass, filteredLevel}) {
    const {modMath} = useContext(AttributeContext)
    const {currentCharacter} = useContext(Context)
    const {dexterity, constitution, level, wisdom, job, race} = currentCharacter;

    const calculateInitialAC = () => {
        if(job === "Monk") {
            return modMath(dexterity)+modMath(wisdom)+10
        } else if (job === "Barbarian") {
            return modMath(dexterity)+modMath(constitution)+10
        } else {
            return modMath(dexterity)+10
        }
    }

    const calculateEquippedAC = (character) => {
        let equippedArmor = character.items.filter(item => item.isEquipped)

        let armorStats = (equippedArmor[0] || []).armor_class
        if(character.items.length === 0 || !equippedArmor) {
            return calculateInitialAC()
        } else if (!armorStats) {
            return calculateInitialAC()
        } else if(armorStats.dex_bonus && armorStats.max_bonus=== null) {
            return armorStats.base + modMath(dexterity)
        } else if (armorStats.dex_bonus && armorStats.max_bonus > 0) {
            if(modMath(dexterity) > armorStats.max_bonus) {
                return armorStats.base + armorStats.max_bonus
            } else {
                return armorStats.base + modMath(dexterity)
            }
        } else {
            return armorStats.base
        }
    }
 
    const averagetHitDie = (hitDie) => {
        return (hitDie/ 2) + 1
    }

    const calculateHP = () => {
        return (averagetHitDie(userClass.hit_die) + modMath(constitution)) * level 
    }

    const calculateSpeed = (race, job) => {
        let speed
        let monkBonus
        if(race === "Gnome" || race ==="Halfling") {
            speed = 25
        } else {
            speed = 30
        }
        
        if(job === "Monk") {
            monkBonus = filteredLevel[0] ? filteredLevel[0].class_specific.unarmored_movement: 0
        } 
        
        return speed + (monkBonus || 0)
    }
    
    // armor class = 10+Dexmod as a default check if armor is equipped
    //deathsaves
    return (
        <div className="battle-stats-container">
            <p>Armor class: {calculateEquippedAC(currentCharacter)}</p>
            <p>Initiative: {modMath(dexterity)}</p>
            <p>Speed: {calculateSpeed(race , job)} feet</p>

            <p title="Initial Hit points are calculated by adding your Constitution Modifier and the average hit die value multiplied by your character's level or (HP = Level * (Hit Die average + CON modifier))">Max Hit Points: { calculateHP() }</p>
            <p>Hit Dice:  1d{userClass.hit_die}</p>

            <div className="death-saves">
                work on this later
            </div>
        </div>
    )
}
