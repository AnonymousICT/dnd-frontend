import React, {useState, useEffect, useContext} from 'react'
import {Context} from '../../../context/Context'
import Axios from 'axios'

import BasicInfo from './BasicInfo'
import Attributes from './Attributes'

export default function EditCharacter() {
    const [character, setCharacter] = useState({})
    const [userClass, setUserClass] = useState([])
    const [classLevels, setClasslevels] = useState([])
    const {characterId, setCharacterId} = useContext(Context)
    
    setCharacterId((window.location.href.split('/').pop()) || window.location.href.split('/').pop().pop())

    
    useEffect(()=>{
        const fetchCharacter = async () => {
            const {data} = await Axios.get(`https://dnd-backend-node.herokuapp.com/characters/${characterId}`, {headers: {"x-auth-token": localStorage.getItem('x-auth-token')}})
            setCharacter(data[0])
        }
        fetchCharacter()
    }, [characterId])
    
    const {job, languageChoice, profChoice, traitChoice,} = character
    
    useEffect(()=>{
        const usersClassData = async () => {
            const url = `https://www.dnd5eapi.co/api/classes/${job}`
            const {data}=await Axios.get(url)
            setUserClass(data)
        }
        usersClassData()
    },[job])

    useEffect(()=>{
        const usersLevelData = async () => {
            const url = `https://www.dnd5eapi.co/api/classes/${job}/levels`
            const {data}=await Axios.get(url)
            setClasslevels(data)
        }
        usersLevelData()
    },[job])


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
