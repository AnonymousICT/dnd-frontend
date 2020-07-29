import axios from 'axios'

import {api_url} from "./AbilityScoreAPI"

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