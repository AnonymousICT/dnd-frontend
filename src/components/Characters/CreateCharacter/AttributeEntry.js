import React, {useContext} from 'react'
import RaceSelector from './RaceSelector'
import {Context} from '../../../context/Context'

export default function AttributeEntry() {

    const {allAttributes, AttributeData, setHoveredAttribute} = useContext(Context)
    
    const attributeSort = {
            STR: 0,
            DEX: 1,
            CON: 2,
            INT: 3,
            WIS: 4,
            CHA: 5,
    }
    const sortFunction = (a, b) =>  attributeSort[a[0]] - attributeSort[b[0]]    
    
    const onHover = (e) => {
        setHoveredAttribute(e.target.getAttribute('value'))
    }

    return (
        <div>
            <h3>Select your character's race</h3>
            <RaceSelector />
            <h3>Enter your Attributes below</h3>
            {!AttributeData ? null : <div className='hover-div'>{AttributeData.desc}</div>}
            {allAttributes.sort(sortFunction).map((attribute, i) =>{
                return (
                    <div className='attribute' key={i}>
                        <label onMouseOver={onHover} value={attribute[1]} key={i}>{attribute[0]}</label>
                        <input 
                            type="number"
                            min="3"
                            max="18"
                            defaultValue="10"
                        />
                    </div>
                ) 

            })}
        </div>
    )
}
