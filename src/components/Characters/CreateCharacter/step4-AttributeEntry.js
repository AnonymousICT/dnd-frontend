import React, {useState, useContext} from 'react'
import {Context} from '../../../context/Context'

export default function AttributeEntry({nextStep, prevStep}) {
    const [attributeValue, setAttributeValue] = useState({})
    const {allAttributes, AttributeData, setHoveredAttribute, raceData} = useContext(Context)
    
    const attributeSort = {
            STR: 0,
            DEX: 1,
            CON: 2,
            INT: 3,
            WIS: 4,
            CHA: 5,
    }
    const sortFunction = (a, b) =>  attributeSort[a[0]] - attributeSort[b[0]]    
    
    const onMouseEnter = (e) => {
        setHoveredAttribute(e.target.getAttribute('value'))
    }

    const handleAttributeValueChange = (e) => {
        setAttributeValue({...attributeValue, [e.target.name]: +e.target.value});
    }    
    
    const {ability_bonuses} = raceData
                            //copy an object to another variable without the references
    const attributeTotal = JSON.parse(JSON.stringify(attributeValue));
    
    Object.keys(attributeTotal).forEach(key => attributeTotal[key] += (ability_bonuses || []).filter(bonus => bonus.name === key)[0].bonus);
    
    const displayAttributeModifer = (attributeTotal) => {
        return Math.round((attributeTotal - 1) / 2 - 4.9)
    }

    const displayRacialBonus = (name) => ((ability_bonuses || []).filter(bonus => bonus.name === name)[0] || {bonus:0}).bonus


    return (
        <div className="attribute-entry">
            <h3>Enter your Attributes below</h3>
            {!AttributeData ? null : <div className='hover-div'>{AttributeData.desc}</div>}
            {allAttributes.sort(sortFunction).map((attribute, i) =>{
                return (
                    <div className='attribute' key={i}>
                        <label onMouseEnter={onMouseEnter} value={attribute[1]} key={i}>{attribute[0]}</label>
                        <input 
                            type="number"
                            min="3"
                            max="18"
                            placeholder="10"
                            name={attribute[0]}
                            value={attributeValue[attribute[0]] || 10}
                            onChange={handleAttributeValueChange}
                        />
                        <label name={`${attribute[0]} total`}>{attributeTotal[attribute[0]]} Total</label>

                        <label name={`${attribute[0]} modifier`}>{displayAttributeModifer(attributeTotal[attribute[0]])} Modifier</label>

                        <label name={`${attribute[0]} racial bonuses`}>{`${displayRacialBonus(attribute[0])} racial bonuses`}</label>
                    </div>
                ) 
                
            })}
            <button onClick={prevStep}>Go Back</button>
            <button onClick={nextStep}>Next</button>
        </div>
    )
}
