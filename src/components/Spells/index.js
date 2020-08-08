import React from 'react'

import AllSpells from './AllSpells'
import SpecificSpell from './SpecificSpell'
import AddToSpellbook from './AddToSpellbook'
import './spells.scss'
import SelectSpellcaster from './SelectSpellcaster'


export default function Spells() {
    return (
        <div className='spells'>
            <div className="cart">
                <SelectSpellcaster />
                <AddToSpellbook />
            </div>
            <AllSpells  />
            <SpecificSpell />
        </div>
    )
}
