import React from 'react'
import AllEquipment from './AllEquipment' 
import SelectCharacter from '../Characters/SelectCharacter'
import CharacterShoppingCart from './CharacterShoppingCart'
import SpecificEquipment from './SpecificEquipment'

export default function Equipment() {
    return (
        <div>
            <div className="cart">
                <SelectCharacter />
                <CharacterShoppingCart />
            </div>
            <AllEquipment />
            <SpecificEquipment />
        </div>
    )
}
