import React, {useState, useEffect, createContext} from 'react'
import {
    fetchSpellData, fetchSpecificSpell,
    fetchClassData, fetchSpecificClass} from '../api'
const Context = createContext()

function ContextProvider({children}) {
    // spell state
    const [allSpells, setAllSpells] = useState([])
    const [selectedSpell, setSelectedSpell] = useState('')
    const [specificSpell, setSpecificSpell] = useState([])

    // Classes
    const [allClasses, setAllClasses] = useState([])
    const [classData, setClassData] = useState([])
    // Races
    // const [allRaces, setAllRaces] = useState([])


    // user state
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [userData, setUserData] = useState({})

    // character state
    const [characterName, setCharacterName] = useState('')
    const [characterLevel ,setCharacterLevel] = useState(1)
    // specific class data
    const [characterClass, setCharacterClass] = useState('')


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
        }}>
            {children}
        </Context.Provider>
    )

}

export {ContextProvider, Context}