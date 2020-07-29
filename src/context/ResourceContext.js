import React, { useState, useEffect, createContext, useContext } from 'react'
import {
    fetchSpellData, 
    fetchSpecificSpell, 
    fetchClassData, 
    fetchSpecificClass,
    fetchRaceData,
    fetchSpecificRace,
    fetchClassLeveling
} from '../api'
import {defaultValues} from './DefaultValues'
import {Context} from './Context'
const ResourceContext = createContext()

function ResourceContextProvider({ children }) {
    //the user's character class
    const {characterClass, characterRace} = useContext(Context)

    //spell resources state
    const [allSpells, setAllSpells] = useState([])
    const [specificSpell, setSpecificSpell] = useState(defaultValues.specificSpell)
    const [selectedSpell, setSelectedSpell] = useState('')
    
    //class resources state
    const [allClasses, setAllClasses] = useState([])
    const [allRaces, setAllRaces] = useState([])
    const [classData, setClassData] = useState(defaultValues.classData)
    const [classLevels, setClassLevels] = useState([])

    // specific data return
    const [raceData, setRaceData] = useState(defaultValues.raceData)

    //fetches every spell
    useEffect(() => {
        const fetchedAllSpells = async () => {
            setAllSpells(await fetchSpellData())
        }
        fetchedAllSpells()
    }, [])

    //fetches a specific spell
    useEffect(() => {
        const fetchedSpecificSpellData = async () => {
            setSpecificSpell(await fetchSpecificSpell(selectedSpell))
        }
        fetchedSpecificSpellData(selectedSpell)
    }, [selectedSpell])

    // fetch all classses
    useEffect(() => {
        const fetchedAllClasses = async () => {
            setAllClasses(await fetchClassData())
        }
        fetchedAllClasses()
    }, [])

     //fetch specificClass
     useEffect(() => {
        const fetchedSpecificClassData = async () => {
            setClassData(await fetchSpecificClass(characterClass))
        }
        fetchedSpecificClassData()
    }, [characterClass])

    //fetch the specificClass' leveliing data
    useEffect(() => {
        const fetchedLevelsData = async () => {
            setClassLevels(await fetchClassLeveling(characterClass))
        }
        fetchedLevelsData()
    }, [characterClass])

    

    // fetch all races
    useEffect(() => {
        const fetchedRaceData = async () => {
            setAllRaces(await fetchRaceData())
        }
        fetchedRaceData()
    }, [])

     // fetch a specific Race
     useEffect(() => {
        const fetchedSpecificRace = async () => {
            setRaceData(await fetchSpecificRace(characterRace))
        }
        fetchedSpecificRace()
    }, [characterRace])

    
    return (
        <ResourceContext.Provider value={{
            allSpells, setAllSpells,
            specificSpell, setSpecificSpell,
            selectedSpell, setSelectedSpell,
            allClasses, setAllClasses,
            allRaces, setAllRaces,
            classData, setClassData,
            classLevels, setClassLevels,
            raceData, setRaceData
        }}>
            {children}
        </ResourceContext.Provider>
    )
}

export { ResourceContext, ResourceContextProvider }