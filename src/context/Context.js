import React, {useState, useEffect, createContext} from 'react'
import {
    fetchSpellData, fetchSpecificSpell,
    fetchClassData, fetchSpecificClass,
    fetchRaceData, fetchSpecificRace,
    fetchAbilityScores, fetchAbilityScoreDesc,
    fetchClassLeveling, fetchUsersCharacters
} from '../api'
const Context = createContext()

function ContextProvider({children}) {
    // all data state
    const [allSpells, setAllSpells] = useState([])
    const [allClasses, setAllClasses] = useState([])
    const [allRaces, setAllRaces] = useState([])
    const [allAttributes, setAttributes] = useState([])
    const [allCharacters, setAllCharacters] = useState([])
    
    // specific data return
    const [specificSpell, setSpecificSpell] = useState([])
    const [classData, setClassData] = useState([])
    const [classLevels, setClassLevels] = useState([])
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
    const [isChecked, setIsChecked] = useState({})
    
    const [attributeValue, setAttributeValue] = useState({})
    const [characterId, setCharacterId] = useState('')

    //attribute-entry methods
    const attributeSort = {
        STR: 0,
        DEX: 1,
        CON: 2,
        INT: 3,
        WIS: 4,
        CHA: 5,
    }
const sortFunction = (a, b) =>  attributeSort[a[0]] - attributeSort[b[0]]    

const handleAttributeValueChange = (e) => {
    setAttributeValue({...attributeValue, [e.target.name]: +e.target.value});
}    

const {ability_bonuses} = raceData
                            //copy an object to another variable without the references
const attributeTotal = JSON.parse(JSON.stringify(attributeValue));

const racialBonus = (name) => ((ability_bonuses || []).filter(bonus => bonus.name === name)[0] || {bonus:0}).bonus

Object.keys(attributeTotal).forEach(key => attributeTotal[key] += racialBonus(key));

const displayAttributeModifer = (attributeTotal) => {
        return Math.round((attributeTotal - 1) / 2 - 4.9)
}

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

    //fetch the specificClass' leveling
    useEffect(()=>{
        const fetchedLevelsData = async () => {
            setClassLevels(await fetchClassLeveling(characterClass))
        }
        fetchedLevelsData()
    },[characterClass])

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


    //fetch all user's characters
    useEffect(()=>{
        const fetchedCharacters = async () => {
            setAllCharacters(await fetchUsersCharacters())
        }
        fetchedCharacters()
    },[])

    

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
            classLevels,
            hoveredAttribute, setHoveredAttribute,
            isChecked, setIsChecked,
            characterId, setCharacterId,
            allCharacters,

            attributeValue, setAttributeValue,
            attributeSort,
            sortFunction,
            handleAttributeValueChange,
            displayAttributeModifer,
        }}>
            {children}
        </Context.Provider>
    )
}

export {ContextProvider, Context}