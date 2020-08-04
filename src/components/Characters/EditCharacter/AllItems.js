import React, {useState, useEffect, useContext} from 'react'
import {Context} from '../../../context/Context'
import axios from 'axios'

export default function AllItems() {
    const [isEquipmentChecked, setIsEquipmentChecked] = useState({})
    const { currentCharacter, setCurrentCharacter } = useContext(Context)
    
    useEffect(()=>{
        // eslint-disable-next-line react-hooks/exhaustive-deps
        if(currentCharacter.items.length > 0) {
            const checkboxes = currentCharacter.items.reduce((obj, item) => {
                return {
                    ...obj,
                    [item.uid]: item.isEquipped
                }
            }, {});
            setIsEquipmentChecked(checkboxes);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[currentCharacter])

    const handleEquipped = (e, item) => {
        item.isEquipped = e.target.checked;
        setIsEquipmentChecked({...isEquipmentChecked, [item.uid]: e.target.checked})   
        let characterItems = currentCharacter.items.map((equipment) => equipment.uid === item.uid ? item : equipment);
        setCurrentCharacter({...currentCharacter, items: characterItems});
        console.log("current character", currentCharacter);
        //Save the character
        submitToDb(characterItems)
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

    const renderEquipped = (item, key) => {
        if(!item) {
            return <li>Missing Item</li>
        }
        if(item.equipment_category.name === "Armor") {
            return (
                <li key={key} title="check to equip">
                    <input type="checkbox" value={item.name} checked={isEquipmentChecked[item.uid] || false} onChange={(e)=>handleEquipped(e, item)} />
                    <label>{item.name}</label>
                </li>
            )
        } else {
            return <li key={key}>{item.name}</li>
        }
    }

    return (
        !currentCharacter.items ? <ul><li>Loading...</li></ul> : 
            <ul>
                {currentCharacter.items.map((item, i) => renderEquipped(item, i))}
            </ul>
    )
}
