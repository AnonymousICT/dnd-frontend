import React, {useState, useEffect} from 'react'
import Axios from 'axios'

import BasicInfo from './BasicInfo'
import Attributes from './Attributes'
import Skills from './Skills'

export default function EditCharacter() {
    const [character, setCharacter] = useState({})

    const [userClass, setUserClass] = useState([])
    const [classLevels, setClasslevels] = useState([])
    const characterId = (window.location.href.split('/').pop()) || window.location.href.split('/').pop().pop()
    
    useEffect(()=>{
        const fetchCharacter = async () => {
            const {data} = await Axios.get(`https://dnd-backend-node.herokuapp.com}/characters/${characterId}`, {headers: {"x-auth-token": localStorage.getItem('x-auth-token')}})
            setCharacter(data)
        }
        fetchCharacter()
    }, [characterId])
    
    const {job, languageChoice, traitChoice,} = character
    
    useEffect(()=>{
        const usersClassData = async () => {
            if(job) {
                const url = `https://www.dnd5eapi.co/api/classes/${job.toLowerCase()}`
                const {data}=await Axios.get(url)
                setUserClass(data)
            }
        }
        usersClassData()
    },[job])

    useEffect(()=>{
        const usersLevelData = async () => {
            if(job) {
                const url = `https://www.dnd5eapi.co/api/classes/${job.toLowerCase()}/levels`
                const {data}=await Axios.get(url)
                setClasslevels(data)
            }
        }
        usersLevelData()
    },[job])

    const filteredLevel = classLevels.filter(level => {
        return level.level === character.level
    })

    return (
        <div className="character-container">
            <BasicInfo character={character}/>
            <Attributes 
                character={character} 
                filteredLevel={filteredLevel}
                // attributesValues={attributeValues}
            />
            <Skills 
                character={character}
                userClass={userClass}
                filteredLevel={filteredLevel}
                // attributesValues={attributeValues}
            />
                {!languageChoice ? null : languageChoice}
                {!traitChoice ? null: traitChoice}
        </div>
    )
}
