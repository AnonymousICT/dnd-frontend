import React, { useState, useEffect, createContext, useContext } from 'react'
import {fetchSpellData, fetchSpecificSpell } from '../api/SpellAPI'

import { fetchClassData, fetchSpecificClass,fetchClassLeveling } from '../api/ClassAPI'

import { fetchRaceData,fetchSpecificRace } from '../api/RaceAPI'

import { fetchEquipmentData, fetchEquipmentCategories, fetchEquipmentCategory } from "../api/EquipmentAPI"

import { defaultValues } from './DefaultValues'
import { Context } from './Context'

const ResourceContext = createContext()

function ResourceContextProvider({ children }) {
    //the user's character class
    const {characterClass, characterRace} = useContext(Context)
    const [selection, setSelection] = useState('')
    
    /* SPELL API CALLS*/
    const [allSpells, setAllSpells] = useState([])
    const [specificSpell, setSpecificSpell] = useState(defaultValues.specificSpell)
    
    useEffect(() => {
        const fetchedAllSpells = async () => {
            setAllSpells(await fetchSpellData())
        }
        fetchedAllSpells()
    }, [])
    
    useEffect(() => {
        const fetchedSpecificSpellData = async () => {
            setSpecificSpell(await fetchSpecificSpell(selection))
        }
        fetchedSpecificSpellData(selection)
    }, [selection])
    
    /* CLASS API CALLS*/
    const [allClasses, setAllClasses] = useState([])
    const [allRaces, setAllRaces] = useState([])
    const [classData, setClassData] = useState(defaultValues.classData)
    const [classLevels, setClassLevels] = useState([])
    
    useEffect(() => {
        const fetchedAllClasses = async () => {
            setAllClasses(await fetchClassData())
        }
        fetchedAllClasses()
    }, [])
    
    useEffect(() => {
        const fetchedSpecificClassData = async () => {
            setClassData(await fetchSpecificClass(characterClass))
        }
        fetchedSpecificClassData()
    }, [characterClass])
        
    
    useEffect(() => {
        const fetchedLevelsData = async () => {
            setClassLevels(await fetchClassLeveling(characterClass))
        }
        fetchedLevelsData()
    }, [characterClass])
    
    /* RACE API CALLS*/
    const [raceData, setRaceData] = useState(defaultValues.raceData)

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
    
    /* EQUIPMENT API CALLS*/
    const [allEquipment, setAllEquipment] = useState([])
    const [equipmentCategories, setEquipmentCategories] = useState([])
    const [equipmentCategory, setEquipementCategory] = useState(defaultValues.equipmentCategory)
    
    useEffect(()=>{
        const fetchedAllEquipment = async () => {
            setAllEquipment(await fetchEquipmentData())
        }
        fetchedAllEquipment()
    }, [])

    useEffect(()=>{
        const fetchedEquipmentCategories = async () => {
            setEquipmentCategories(await fetchEquipmentCategories())
        }
        fetchedEquipmentCategories()
    },[])

    useEffect(()=>{
        const fetchedEquipmentCategory = async () => {
            setEquipementCategory(await fetchEquipmentCategory(selection))
        }
        fetchedEquipmentCategory(selection)
    }, [selection])

        return (
            <ResourceContext.Provider value={{
                allSpells, setAllSpells,
                specificSpell, setSpecificSpell,
                selection, setSelection,
                allClasses, setAllClasses,
                allRaces, setAllRaces,
                classData, setClassData,
                classLevels, setClassLevels,
                raceData, setRaceData,
                allEquipment,
                equipmentCategories,
                equipmentCategory 
            }}>
            {children}
        </ResourceContext.Provider>
    )
}

export { ResourceContext, ResourceContextProvider }