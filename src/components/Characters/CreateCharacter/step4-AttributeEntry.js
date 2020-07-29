import React, {useContext} from 'react'
import {AttributeContext} from '../../../context/AttributeContext'

export default function AttributeEntry({nextStep, prevStep}) {
    const {
        allAttributes, 
        AttributeData, 
        setHoveredAttribute, 
        attributeValue, 
        sortFunction, 
        handleAttributeValueChange,
        displayAttributeModifer,
        racialBonus
    } = useContext(AttributeContext)   
    
    
    const onMouseEnter = (e) => {
        setHoveredAttribute(e.target.getAttribute('value'))
    }
                            //copy an object to another variable without the references
    const attributeTotal = JSON.parse(JSON.stringify(attributeValue));

    Object.keys(attributeTotal).forEach(key => attributeTotal[key] += racialBonus(key));
    
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
                            value={attributeValue[attribute[0]]}
                            onChange={handleAttributeValueChange}
                        />
                        <label name={`${attribute[0]} total`}>{attributeTotal[attribute[0]]} Total</label>

                        <label 
                            name={`${attribute[0]} modifier`}
                        >{displayAttributeModifer(attributeTotal[attribute[0]])} Modifier</label>

                        <label name={`${attribute[0]} racial bonuses`}>{`${racialBonus(attribute[0])} racial bonuses`}</label>
                    </div>
                ) 
                
            })}
            <button onClick={prevStep}>Go Back</button>
            <button onClick={nextStep}>Next</button>
        </div>
    )
}
