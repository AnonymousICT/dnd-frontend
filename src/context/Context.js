import React, { useState, useEffect, createContext } from 'react'
import {fetchUsersCharacters} from '../api/userAPI'
import {defaultValues} from './DefaultValues'
const Context = createContext()

function ContextProvider({ children }) {

    // user auth state
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [userData, setUserData] = useState({})
    
    // user's choice state
    const [currentCharacter, setCurrentCharacter] = useState(defaultValues.currentCharacter)
    const [characterName, setCharacterName] = useState('')
    const [characterLevel, setCharacterLevel] = useState(1)
    const [characterClass, setCharacterClass] = useState('')
    const [characterRace, setCharacterRace] = useState('')
    const [selectedLanguage, setSelectedLanguage] = useState('')
    const [selectedTrait, setSelectedTrait] = useState('')

    const [characterId, setCharacterId] = useState('')
    const [isChecked, setIsChecked] = useState(defaultValues.isChecked(defaultValues.classData))
 
    const [allCharacters, setAllCharacters] = useState([])
    const [fetchNewData, setFetchNewData] = useState(false);

    const [AttributeData, setAttributeData] = useState([])
    //for equipment
    const [selectCharacter, setSelectCharacter] = useState('')
    const [characterItems, setCharacterItems] = useState([])
    //for spells
    const [characterSpells, setCharacterSpells] = useState([])

    const nonSpellCaster = [
        "Barbarian", 
        "Fighter",
        "Monk", 
        "Rogue",
    ]
    
    const [modalOpen, setModalOpen] = useState(false)
    const auth = localStorage.getItem('x-auth-token')
    //fetch all user's characters
    useEffect(()=>{
        if (auth) {
            const fetchedCharacters = async () => {
                setAllCharacters(await fetchUsersCharacters())
            }
            fetchedCharacters()
        } else {
            return
        }
    },[fetchNewData, auth])

    const updateAllCharacters = () => setFetchNewData(!fetchNewData);

    return (
        <Context.Provider value={{
            email, setEmail,
            password, setPassword,
            userData, setUserData,
            characterName, setCharacterName,
            characterLevel, setCharacterLevel,
            characterClass, setCharacterClass,
            
            characterRace, setCharacterRace,
            selectedLanguage, setSelectedLanguage,
            selectedTrait, setSelectedTrait,
            AttributeData, setAttributeData,
            isChecked, setIsChecked,
            characterId, setCharacterId,
            allCharacters, setAllCharacters,
            updateAllCharacters,
            selectCharacter, setSelectCharacter,
            characterItems, setCharacterItems,
            currentCharacter, setCurrentCharacter,
            characterSpells, setCharacterSpells,
            nonSpellCaster,
            modalOpen, setModalOpen
        }}>
            {children}
        </Context.Provider>
    )
}

export { ContextProvider, Context }