import React, {useContext} from 'react'
import {useHistory} from 'react-router-dom'
import {Context} from '../../context/Context'
import axios from 'axios'

export default function CharacterShoppingCart() {
    const history = useHistory();
    const {characterItems, selectCharacter, setCharacterItems} = useContext(Context)

    const removeItem = (index) => {
        setCharacterItems(characterItems.filter((item, i) => index !== i))
    }

    const submitToDb = async (e) => {
        try {
            const updateCharacterItem = {
                items: characterItems
            }
            await axios.put(`https://dnd-backend-node.herokuapp.com/characters/${selectCharacter}`, updateCharacterItem, {headers: {"x-auth-token": localStorage.getItem('x-auth-token')}})
            history.push(`/character/edit/${selectCharacter}?itemsAdded=true`)
            setCharacterItems([])
        } catch (err) {
            console.error(err)
        }
    } 

    return (
        <div className="character-cart">
            This will display the items added to the specific character
            <ul>
                {characterItems.length === 0 ?  "Cart is empty" : characterItems.map((item, i) => 
                    <div key={i}>
                        <li key={i}>{item.name}</li>
                        <button onClick={()=>removeItem(i)}>X</button>
                    </div>
                )}
            </ul>

            <button onClick={submitToDb}>Finalize selection</button>
        </div>
    )
}
