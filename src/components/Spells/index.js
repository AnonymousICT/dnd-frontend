import React from 'react'

import AllSpells from './AllSpells'
import SpecificSpell from './SpecificSpell'


import './spells.css'


export default function Spells() {
    return (
        <div className='spells'>
            <AllSpells  />
            <SpecificSpell />
        </div>
    )
}
