import React, {useState, useEffect} from 'react'
import Axios from 'axios'

import BasicInfo from './BasicInfo'
import Attributes from './Attributes'

export default function EditCharacter() {
    const [character, setCharacter] = useState({})

    const [userClass, setUserClass] = useState([])
    const [classLevels, setClasslevels] = useState([])
    const characterId = (window.location.href.split('/').pop()) || window.location.href.split('/').pop().pop()
    
    useEffect(()=>{
        const fetchCharacter = async () => {
            const {data} = await Axios.get(`http://localhost:5000/characters/${characterId}`, {headers: {"x-auth-token": localStorage.getItem('x-auth-token')}})
            setCharacter(data)
        }
        fetchCharacter()
    }, [characterId])
    
    const {job, languageChoice, profChoice, traitChoice,} = character
    
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
    console.log(userClass)

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
    console.log(classLevels)

    return (
        <div className="character-container">
            <BasicInfo character={character}/>
            <Attributes 
                character={character} 
                saving_throws={classLevels.saving_throws}
            />
                {!languageChoice ? null : languageChoice}
                {!profChoice ? null : profChoice.map((choice)=>choice)}
                {!traitChoice ? null: traitChoice}
        </div>
    )
}
