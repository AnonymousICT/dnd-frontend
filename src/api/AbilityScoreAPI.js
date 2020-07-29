import axios from 'axios'

export const api_url='https://www.dnd5eapi.co/api'

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
