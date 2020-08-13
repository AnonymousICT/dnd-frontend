import React, {useState} from 'react'

import AllSpells from './AllSpells'
import SpecificSpell from './SpecificSpell'
import AddToSpellbook from './AddToSpellbook'
import SelectSpellcaster from './SelectSpellcaster'
import Modal from '../Modal/Modal'
import './spells.scss'


export default function Spells() {
    const [showModal, setShowModal] =useState(false)
    const closeModal = () => {
        setShowModal(false);
    }
    
    return (
        <div className='spells'>
            <div className="cart">
                <SelectSpellcaster />
                <AddToSpellbook />
            </div>
            <AllSpells setShowModal={setShowModal}/>
            <Modal showModal={showModal} closeModal={closeModal}>
                <SpecificSpell />
            </Modal>
        </div>
    )
}
