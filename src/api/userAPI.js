import axios from 'axios'

export const fetchUsersCharacters = async () => {
    const url = `https://dnd-backend-node.herokuapp.com/characters`
    try {
        // we want to look for the x-auth-token and then do the stuff
        const {data} = await axios.get(url , {headers: {"x-auth-token": localStorage.getItem('x-auth-token'), "x-auth-user": localStorage.getItem("userId")}})
        return data
    } catch (error) {
        return error
    }
}