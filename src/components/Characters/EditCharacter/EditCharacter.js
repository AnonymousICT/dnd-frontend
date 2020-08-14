import React, {useState, useEffect, useContext} from 'react'
import {Context} from '../../../context/Context'
import Axios from 'axios'

import BasicInfo from './BasicInfo'
import Attributes from './Attributes'
import Saves from './Saves'
import Skills from './Skills'
import BattleStats from './BattleStats'
import AllItems from './AllItems'
import Spellbook from './Spellbook'

export default function EditCharacter() {
    const {currentCharacter, setCurrentCharacter, nonSpellCaster} = useContext(Context)

    const [userClass, setUserClass] = useState([])
    const [classLevels, setClasslevels] = useState([])
    const characterId = (window.location.href.split('/').pop()) || window.location.href.split('/').pop().pop()

    useEffect(()=>{
        const fetchCharacter = async () => {
            const {data} = await Axios.get(`https://dnd-backend-node.herokuapp.com/characters/${characterId}`, {headers: {"x-auth-token": localStorage.getItem('x-auth-token')}})
            setCurrentCharacter(data)
        }
        fetchCharacter()
    }, [characterId, setCurrentCharacter])
    
    const {job, languageChoice, traitChoice,} = currentCharacter
    
    useEffect(()=>{
        const usersClassData = async () => {
            if(job.toLowerCase() !== "stand user") {
                const url = `https://www.dnd5eapi.co/api/classes/${job.toLowerCase()}`
                const {data}=await Axios.get(url)
                setUserClass(data)
            }
        }
        usersClassData()
    },[job])

    useEffect(()=>{
        const usersLevelData = async () => {
            if(job.toLowerCase() !== "stand user") {
                const url = `https://www.dnd5eapi.co/api/classes/${job.toLowerCase()}/levels`
                const {data}=await Axios.get(url)
                setClasslevels(data)
            }
        }
        usersLevelData()
    },[job])

    const filteredLevel = classLevels.filter(level => {
        return level.level === currentCharacter.level
    })

    return (
        <div className="character-container">
            <div>
                <BasicInfo />
                <BattleStats 
                    userClass={userClass}
                    filteredLevel={filteredLevel}
                />
            </div>
            <div>
                <Attributes filteredLevel={filteredLevel}/>
                <Saves
                    userClass={userClass}
                    filteredLevel={filteredLevel}
                />
            </div>
            <Skills 
                userClass={userClass}
                filteredLevel={filteredLevel}
            />
                {!languageChoice ? null : languageChoice}
                {!traitChoice ? null: traitChoice}
            <AllItems />
            {!nonSpellCaster.includes(currentCharacter.job) ? 
            <Spellbook filteredLevel={filteredLevel} /> : null}
        </div>
    )
}
