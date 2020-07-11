import React, {useState, useEffect, createContext} from 'react'
import {fetchSpellData, fetchSpecificSpell} from '../api'
const Context = createContext()

function ContextProvider({children}) {
    const [allSpells, setAllSpells] = useState([])
    const [selectedSpell, setSelectedSpell] = useState('')
    const [specificSpell, setSpecificSpell] = useState([])
    const [isAuth, setIsAuth] = useState(false)
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
            selectedSpell,
            setSelectedSpell,
            isAuth,
            setIsAuth,
            userData,
            setUserData
            
        }}>
            {children}
        </Context.Provider>
    )

}

export {ContextProvider, Context}