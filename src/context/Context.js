import React, {useState, useEffect, createContext} from 'react'
import {
    fetchSpellData, fetchSpecificSpell,
    fetchClassData, fetchSpecificClass,
    fetchRaceData, fetchSpecificRace,
    fetchAbilityScores, fetchAbilityScoreDesc,
} from '../api'
const Context = createContext()

function ContextProvider({children}) {
    // all data state
    const [allSpells, setAllSpells] = useState([])
    const [allClasses, setAllClasses] = useState([])
    const [allRaces, setAllRaces] = useState([])
    const [allAttributes, setAttributes] = useState([])

    // specific data return
    const [specificSpell, setSpecificSpell] = useState([])
    const [classData, setClassData] = useState([])
    const [raceData, setRaceData] = useState([])
    const [AttributeData, setAttributeData] = useState([])
    
    // user auth state
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [userData, setUserData] = useState({})
    
    // user's choice state
    const [characterName, setCharacterName] = useState('')
    const [characterLevel ,setCharacterLevel] = useState(1)
    const [characterClass, setCharacterClass] = useState('')
    const [characterRace, setCharacterRace] = useState('')
    const [selectedSpell, setSelectedSpell] = useState('')
    const [selectedLanguage, setSelectedLanguage] = useState('')
    const [selectedTrait, setSelectedTrait] = useState('')
    const [hoveredAttribute, setHoveredAttribute] = useState('')

    
    
    //fetches every spell
    useEffect(()=>{
        const fetchedAllSpells = async () => {
            setAllSpells(await fetchSpellData())
        }
        fetchedAllSpells()
    },[])

    //fetches a specific spell
    useEffect(()=>{
        const fetchedSpecificSpellData = async () => {
            setSpecificSpell(await fetchSpecificSpell(selectedSpell))
        }
        fetchedSpecificSpellData(selectedSpell)
    },[selectedSpell])

    // fetch all classses
    useEffect(()=> {
        const fetchedAllClasses = async () => {
            setAllClasses(await fetchClassData())
        }
        fetchedAllClasses()
    }, [])

    //fetch specificClass
    useEffect(()=>{
        const fetchedSpecificClassData = async () => {
            setClassData(await fetchSpecificClass(characterClass))
        }
        fetchedSpecificClassData()
    }, [characterClass])

    // fetch all races
    useEffect(()=>{
        const fetchedRaceData = async() => {
            setAllRaces(await fetchRaceData())
        }
        fetchedRaceData()
    },[])
    
    // fetch a specific Race
    useEffect(()=>{
        const fetchedSpecificRace = async () => {
            setRaceData(await fetchSpecificRace(characterRace))
        }
        fetchedSpecificRace()
    },[characterRace])

    //fetch all attribute scores
    useEffect(()=> {
        const fetchedData = async() => {
            setAttributes(await fetchAbilityScores())
        }
        fetchedData()
    }, [])

    //fetch attribute score desc
    useEffect(()=>{
        const fetchedData = async()=>{
            setAttributeData(await fetchAbilityScoreDesc(hoveredAttribute))
        }
        fetchedData()
    },[hoveredAttribute])

    return (
        <Context.Provider value={{
            allSpells,
            specificSpell,
            selectedSpell,setSelectedSpell,
            allClasses, setAllClasses,

            email, setEmail,
            password, setPassword,
            userData, setUserData,

            characterName, setCharacterName,
            characterLevel ,setCharacterLevel,
            characterClass, setCharacterClass,
            classData, setClassData,
            allRaces, setAllRaces,
            raceData, setRaceData,
            characterRace, setCharacterRace,
            selectedLanguage, setSelectedLanguage,
            selectedTrait, setSelectedTrait,
            allAttributes, setAttributes,
            AttributeData, setAttributeData,
            hoveredAttribute, setHoveredAttribute,
        }}>
            {children}
        </Context.Provider>
    )

}

export {ContextProvider, Context}