import React from 'react'

import AllSpells from './AllSpells'
import SpecificSpell from './SpecificSpell'
import SelectCharacter from '../Characters/SelectCharacter'


import './spells.css'


export default function Spells() {
    return (
        <div className='spells'>
            <SelectCharacter />
            <AllSpells  />
            <SpecificSpell />
        </div>
    )
}
