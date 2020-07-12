import React, {useState, useEffect, createContext} from 'react'
import {fetchSpellData, fetchSpecificSpell} from '../api'
const Context = createContext()

function ContextProvider({children}) {
    const [allSpells, setAllSpells] = useState([])
    const [selectedSpell, setSelectedSpell] = useState('')
    const [specificSpell, setSpecificSpell] = useState([])

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const [userData, setUserData] = useState({})


    //fetches every spell
    useEffect(()=>{
        const fetchedAllSpells = async () => {
            setAllSpells(await fetchSpellData())
        }
        fetchedAllSpells()
    },[])

    //fetches a specific spell
    useEffect(()=>{
        const fetchedSpecificSpellData = async () => {
            setSpecificSpell(await fetchSpecificSpell(selectedSpell))
        }
        fetchedSpecificSpellData(selectedSpell)
    },[selectedSpell])

    return (
        <Context.Provider value={{
            allSpells,
            specificSpell,
            selectedSpell,setSelectedSpell,
            email, setEmail,
            password, setPassword,
            userData, setUserData
            
        }}>
            {children}
        </Context.Provider>
    )

}

export {ContextProvider, Context}