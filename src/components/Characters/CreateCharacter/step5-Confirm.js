import React, {useContext} from 'react'
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import {Context} from '../../../context/Context'

export default function Confirm({prevStep}) {
    const history = useHistory();
    
    const {
        characterName, 
        characterLevel,  
        classData,
        selectedLanguage, 
        selectedTrait,
        attributeValue,
        allAttributes,
        sortFunction,
        raceData,

    } = useContext(Context)

    const {name, ability_bonuses} = raceData

    const attributeTotal = JSON.parse(JSON.stringify(attributeValue));

    const racialBonus = (name) => ((ability_bonuses || []).filter(bonus => bonus.name === name)[0] || {bonus:0}).bonus

    Object.keys(attributeTotal).forEach(key => attributeTotal[key] += racialBonus(key));
    
    console.log(attributeTotal)

    const handleCharacterSubmit = async (e) => {
        try {
            const newCharacter = {
                name: characterName,
                level: characterLevel,
                race: raceData.name,
                job: classData.name,
                strength: attributeTotal.STR,
                dexterity: attributeTotal.DEX,
                constitution: attributeTotal.CON,
                intelligence: attributeTotal.INT,
                wisdom: attributeTotal.WIS,
                charisma: attributeTotal.CHA,
            }
            await axios.post("https://dnd-backend-node.herokuapp.com/characters/new", newCharacter)
            history.push("/characters?created")
        } catch (err) {
            console.err(err)
        }
    }

    return (

        <div className='confirm-container'>
            <ul>
                <li>Character Name: {characterName}</li>
                <li> Level {characterLevel}, {classData.name}</li>
                <li>Race: {name}</li>
                <li>{!selectedLanguage ? null : selectedLanguage}</li>
                <li>{!selectedTrait ? null : selectedTrait}</li>
                {allAttributes.sort(sortFunction).map((attribute, i)=>{
                    return (
                    <li key={i}>{attribute[0]}: {attributeTotal[attribute[0]]}</li>
                    )
                })}
            </ul>
            <button onClick={prevStep}>Go Back</button>
            <button onClick={handleCharacterSubmit} >Submit</button>
        </div>
    )
}
