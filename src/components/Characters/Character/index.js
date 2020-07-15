import React from 'react'
import BasicInfo from './BasicInfo'
import Attributes from './Attributes'
import BattleInfo from './BattleInfo'
import SpellInfo from './SpellInfo'
import MiscInfo from './MiscInfo'

export default function Character() {
    return (
        <div className='single-character'>
            <BasicInfo />
            <Attributes />
            <BattleInfo />
            <SpellInfo />
            <MiscInfo />
        </div>
    )
}
