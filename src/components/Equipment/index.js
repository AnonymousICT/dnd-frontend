import React,{useState} from 'react'
import AllEquipment from './AllEquipment' 
import SelectCharacter from '../Characters/SelectCharacter'
import CharacterShoppingCart from './CharacterShoppingCart'
import SpecificEquipment from './SpecificEquipment'
import Modal from '../Modal/Modal'

import './equipment.scss'

export default function Equipment() {
    const [showModal, setShowModal] =useState(false)
    const closeModal = () => {
        setShowModal(false);
    }

    return (
        <div>
            <div className="cart">
                <SelectCharacter />
                <CharacterShoppingCart />
            </div>
            <AllEquipment setShowModal={setShowModal} />
            <Modal showModal={showModal} closeModal={closeModal}>
                <SpecificEquipment />
            </Modal>

        </div>
    )
}
