import axios from 'axios'

const api_url='https://www.dnd5eapi.co/api'

export const fetchClassData = async () => {
    let url = `${api_url}/classes/`

    try {
        const {data: {results}} = await axios.get(url)
       return results.map((index) => {return [index.name, index.url]})
    } catch (error) {
        return error
    }
}

export const fetchSpecificClass = async (job) => {
    let url = `https://www.dnd5eapi.co${job}`

    try {
        const {data} = await axios.get(url)
        return data
    } catch (error) {
        return error
    }
}

export const fetchRaceData = async () => {
    let url = `${api_url}/races/`

    try {
        const {data: {results}} = await axios.get(url)
       return results.map((index) => {return [index.name, index.url]})
    } catch (error) {
        return error
    }
}

export const fetchSpecificRace = async (race) => {
    let url = `https://www.dnd5eapi.co${race}`

    try {
        const {data} = await axios.get(url)
        return data
    } catch (error) {
        return error
    }
}

export const fetchAbilityScores = async () => {
    let url = `${api_url}/ability-scores`
    try {
        const {data: {results}} = await axios.get(url)
        return results.map((score)=>{
            return [score.name, score.url]
        })
    } catch (error) {
        return error
    }
}

export const fetchAbilityScoreDesc = async (score) => {
    let url = `https://www.dnd5eapi.co${score}`
    try {
        const {data} = await axios.get(url)
        return data
    } catch (error) {
        return error
    }
}

export const fetchSpellData = async () => {
    let url = `${api_url}/spells/`
    //fetch the spell name and the url of each spell 
    try {
        const {data: {results}} = await axios.get(url)
        return results.map((spell)=>{
            return [spell.name, spell.url]
        })
    } catch (error) {
        return error
    }
}

export const fetchSpecificSpell = async (spell) => {
    let url = `https://www.dnd5eapi.co${spell}`
    
    try {
        const {data} = await axios.get(url)
        return data
    } catch (error) {
        return error
    }
}