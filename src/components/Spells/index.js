import React from 'react'

import AllSpells from './AllSpells'
import SpecificSpell from './SpecificSpell'
import AddToSpellbook from './AddToSpellbook'
import './spells.css'
import SelectSpellcaster from './SelectSpellcaster'


export default function Spells() {
    return (
        <div className='spells'>
            <SelectSpellcaster />
            <AddToSpellbook />
            <AllSpells  />
            <SpecificSpell />
        </div>
    )
}
