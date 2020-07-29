import React, {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import {Context} from '../../../context/Context'

export default function Confirm({prevStep}) {
    const [choicesArray, setChoicesArray] = useState([])
    const history = useHistory();
    
    const {
        updateAllCharcters,
        characterName, 
        characterLevel,  
        classData,
        selectedLanguage, 
        selectedTrait,
        attributeValue,
        allAttributes,
        sortFunction,
        raceData,
        isChecked,
        racialBonus,
    } = useContext(Context)

    const userId = localStorage.getItem('userId')

    const attributeTotal = JSON.parse(JSON.stringify(attributeValue));

    useEffect(()=>{
        setChoicesArray(Object.keys(isChecked).map(key => isChecked[key].key))
    },[isChecked])
    
    Object.keys(attributeTotal).forEach(key => attributeTotal[key] += racialBonus(key));
    
    const handleCharacterSubmit = async (e) => {
        try {
            const newCharacter = {
                userId,
                name: characterName,
                level: characterLevel,
                race: raceData.name,
                languageChoice: selectedLanguage,
                traitChoice: selectedTrait,
                profChoice: choicesArray,
                job: classData.name,
                choices: choicesArray,
                strength: attributeTotal.STR,
                dexterity: attributeTotal.DEX,
                constitution: attributeTotal.CON,
                intelligence: attributeTotal.INT,
                wisdom: attributeTotal.WIS,
                charisma: attributeTotal.CHA,
            }
            await axios.post("https://dnd-backend-node.herokuapp.com/characters/new", newCharacter)
            history.push("/characters?created")
            updateAllCharcters()
        } catch (err) {
            console.error(err)
        }
    }

    //bug note changing races creates an undesired effect. must create a function to reset state of stuff that isn't applicable to other races

    return (

        <div className='confirm-container'>
            <ul>
                <li>Character Name: {characterName}</li>
                <li> Level {characterLevel}, {classData.name}</li>
                <li>Race: {raceData.name}</li>

                <li>{selectedLanguage}</li>
                <li>{selectedTrait}</li>

                {allAttributes.sort(sortFunction).map((attribute, i)=>{
                    return (
                    <li key={i}>{attribute[0]}: {attributeTotal[attribute[0]]}</li>
                    )
                })}
                <li>Proficiency Choices: {Object.keys(isChecked).map(key => isChecked[key].key).join(", ")}</li>
            </ul>
            <button onClick={prevStep}>Go Back</button>
            <button onClick={handleCharacterSubmit} >Submit</button>
        </div>
    )
}
