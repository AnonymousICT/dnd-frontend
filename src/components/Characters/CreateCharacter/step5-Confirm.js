import React, {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import {Context} from '../../../context/Context'
import {ResourceContext} from '../../../context/ResourceContext'
import {AttributeContext} from '../../../context/AttributeContext'

export default function Confirm({prevStep}) {
    const [choicesArray, setChoicesArray] = useState([])
    const history = useHistory();
    
    const {
        characterName, 
        characterLevel,  
        selectedLanguage, 
        selectedTrait,
        isChecked,
        updateAllCharacters,
    } = useContext(Context)
    
    const {
        classData,
        raceData,
    } =useContext(ResourceContext)
    
    const {
        attributeValue,
        allAttributes,
        sortFunction,
        racialBonus,
        
    }=useContext(AttributeContext)
    
    const userId = localStorage.getItem('userId')

    const attributeTotal = JSON.parse(JSON.stringify(attributeValue));

    useEffect(()=>{
        setChoicesArray(Object.keys(isChecked).filter(el => el !== (null || undefined)).map(key => isChecked[key].key))
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
                strength: attributeTotal.STR,
                dexterity: attributeTotal.DEX,
                constitution: attributeTotal.CON,
                intelligence: attributeTotal.INT,
                wisdom: attributeTotal.WIS,
                charisma: attributeTotal.CHA,
            }
            await axios.post(`https://dnd-backend-node.herokuapp.com/characters/new`, newCharacter)
            history.push("/characters?created")
            updateAllCharacters()
        } catch (err) {
            console.error(err)
        }
    }

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
