import axios from 'axios'

const api_url='https://www.dnd5eapi.co/api'

export const fetchClassData = async () => {
    const url = `${api_url}/classes/`

    try {
        const {data: {results}} = await axios.get(url)
       return results.map((index) => {return [index.name, index.url]})
    } catch (error) {
        return error
    }
}

export const fetchSpecificClass = async (job) => {
    const url = `https://www.dnd5eapi.co${job}` 

    try {
        const {data} = await axios.get(url)
        return data
    } catch (error) {
        return error
    }
}

export const fetchClassLeveling = async(job) => {
    const url = `https://www.dnd5eapi.co${job}/levels`

    try {
        if(!job){
            return null
        } else {
            const {data} = await axios.get(url)
            return data
        }
    } catch (error) {
        return error
    }
}

export const fetchRaceData = async () => {
    const url = `${api_url}/races/`

    try {
        const {data: {results}} = await axios.get(url)
       return results.map((index) => {return [index.name, index.url]})
    } catch (error) {
        return error
    }
}

export const fetchSpecificRace = async (race) => {
    const url = `https://www.dnd5eapi.co${race}`

    try {
        const {data} = await axios.get(url)
        return data
    } catch (error) {
        return error
    }
}

export const fetchAbilityScores = async () => {
    const url = `${api_url}/ability-scores`
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
    const url = `https://www.dnd5eapi.co${score}`
    try {
        const {data} = await axios.get(url)
        return data
    } catch (error) {
        return error
    }
}

export const fetchSpellData = async () => {
    const url = `${api_url}/spells/`
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
    const url = `https://www.dnd5eapi.co${spell}`
    
    try {
        const {data} = await axios.get(url)
        return data
    } catch (error) {
        return error
    }
}

export const fetchUsersCharacters = async () => {
    const url = 'https://dnd-backend-node.herokuapp.com/characters'
    try {
        const {data} = await axios.get(url)
        return data
    } catch (error) {
        return error
    }
}