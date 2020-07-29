import axios from 'axios'

import {api_url} from "./AbilityScoreAPI"

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