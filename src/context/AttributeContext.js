import React, { useState, useEffect, createContext, useContext } from 'react'
import {fetchAbilityScores, fetchAbilityScoreDesc} from '../api/AbilityScoreAPI'
import axios from 'axios'
import {defaultValues} from './DefaultValues'
import {ResourceContext} from './ResourceContext'
import {Context} from './Context'

const AttributeContext = createContext()

function AttributeContextProvider({children}) {
    const {raceData} = useContext(ResourceContext)
    const {currentCharacter, setCurrentCharacter} = useContext(Context)

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

    const handleAttributeValueChange = async (attribute) => {
        const attributes = { ...attributeValue, ...attribute }
        setAttributeValue(attributes);

        const updateCharacter = {
            strength: attributes["STR"],
            dexterity: attributes["DEX"],
            constitution: attributes["CON"],
            intelligence: attributes["INT"],
            wisdom: attributes["WIS"],
            charisma: attributes["CHA"],
        };
        
        if(currentCharacter && currentCharacter._id) {
            await axios.put(`https://dnd-backend-node.herokuapp.com/characters/${currentCharacter._id}` , updateCharacter, {headers: {"x-auth-token": localStorage.getItem('x-auth-token')}})
            setCurrentCharacter({...currentCharacter, ...updateCharacter});
        }
    }

    const modMath = (score) => {
        return Math.round((score - 1) / 2 - 4.9)
    } 
    const { ability_bonuses } = raceData
    window.ability_bonuses = ability_bonuses;
    const attributeTotal = {...attributeValue};
    
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