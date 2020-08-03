import React, {useContext} from 'react'
import {Context} from '../../../context/Context'
import axios from 'axios'

export default function AllItems() {
    const { currentCharacter, setCurrentCharacter } = useContext(Context)
    
    const {items} = currentCharacter
    const handleEquipped = (item) => {
        item.isEquipped = !item.isEquipped;
        let allItems = currentCharacter.items.map((equip) => equip._id === item._id? item : equip);
        currentCharacter.items = allItems;
        console.log("current character", currentCharacter);
        setCurrentCharacter(currentCharacter);
        //Save the character
        submitToDb(allItems)
    }

    const submitToDb = async (items) => {
        try {
            const updateCharacterItem = {
                items: items
            }
            await axios.put(`https://dnd-backend-node.herokuapp.com/characters/${currentCharacter._id}`, updateCharacterItem, {headers: {"x-auth-token": localStorage.getItem('x-auth-token')}})
        } catch (err) {
            console.error(err)
        }
    } 

    console.log(currentCharacter, "outside function")
    const renderEquipped = (item, key) => {
        if(item.equipment_category.name === "Weapon" || item.equipment_category.name === "Armor") {
            return (
                <li key={key} title="check to equip">
                    <input type="checkbox" value={item.isEquipped || false} onChange={()=>handleEquipped(item)} />
                    <label>{item.name}</label>
                </li>
            )
        } else {
            return <li key={key}>{item.name}</li>
        }
    }

    return (
        !currentCharacter.items ? null : 
            <ul>
                {items.map((item, i) => item ? renderEquipped(item, i): "Loading")}
            </ul>
    )
}
