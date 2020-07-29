import React, { useState, useEffect, createContext, useContext } from 'react'
import {fetchAbilityScores, fetchAbilityScoreDesc} from '../api/AbilityScoreAPI'
import {defaultValues} from './DefaultValues'
import {ResourceContext} from './ResourceContext'

const AttributeContext = createContext()

function AttributeContextProvider({children}) {
    const {raceData} = useContext(ResourceContext)

    const [allAttributes, setAttributes] = useState(defaultValues.allAttributes)
    const [hoveredAttribute, setHoveredAttribute] = useState('')
    const [AttributeData, setAttributeData] = useState([])
    const [attributeValue, setAttributeValue] = useState(defaultValues.attributeValue(allAttributes))

     //attribute-entry methods
     const attributeSort = {
        STR: {sortOrder: 0, translation: "strength"},
        DEX: {sortOrder: 1, translation: "dexterity"},
        CON: {sortOrder: 2, translation: "constitution"},
        INT: {sortOrder: 3, translation: "intelligence"},
        WIS: {sortOrder: 4, translation: "wisdom"},
        CHA: {sortOrder: 5, translation: "charisma"},
        strength: {sortOrder: 0, translation: "STR"},
        dexterity: {sortOrder: 1, translation: "DEX"},
        constitution: {sortOrder: 2, translation: "CON"},
        intelligence: {sortOrder: 3, translation: "INT"},
        wisdom: {sortOrder: 4, translation: "WIS"},
        charisma: {sortOrder: 5, translation: "CHA"},
        [undefined]: {sortOrder: 99, translation: "strength"}
    }
    const sortFunction = (a, b) => attributeSort[a[0]].sortOrder - attributeSort[b[0]].sortOrder

    const handleAttributeValueChange = (e) => {
        setAttributeValue({ ...attributeValue, [e.target.name]: +e.target.value });
    }
        
    const modMath = (score) => {
        return Math.round((score - 1) / 2 - 4.9)
     } 
     const { ability_bonuses } = raceData
     window.ability_bonuses = ability_bonuses;
    const attributeTotal = JSON.parse(JSON.stringify(attributeValue));
    
    const racialBonus = (name) => ((ability_bonuses || defaultValues.raceData.ability_bonuses).filter(bonus => bonus.name === name)[0] || { bonus: 0 }).bonus

    Object.keys(attributeTotal).forEach(key => attributeTotal[key] += racialBonus(key));

    const displayAttributeModifer = (attributeTotal) => {
        return Math.round((attributeTotal - 1) / 2 - 4.9)
    }
    

    //fetch all attribute scores
    useEffect(() => {
        const fetchedData = async () => {
            setAttributes(await fetchAbilityScores())
        }
        fetchedData()
    }, [])

    useEffect(() => {
        const fetchedData = async () => {
            setAttributeData(await fetchAbilityScoreDesc(hoveredAttribute))
        }
        fetchedData()
    }, [hoveredAttribute])

    return (
        <AttributeContext.Provider value={{
            allAttributes, setAttributes,
            hoveredAttribute, setHoveredAttribute,
            AttributeData, setAttributeData,
            attributeValue, setAttributeValue,
            attributeSort, sortFunction,
            handleAttributeValueChange,
            modMath, racialBonus,
            displayAttributeModifer
        }}>
            {children}
        </AttributeContext.Provider>
    )
}

export {AttributeContextProvider, AttributeContext}