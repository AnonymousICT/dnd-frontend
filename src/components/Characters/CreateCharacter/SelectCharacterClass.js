import React, {useState, useContext} from 'react'
import {Context} from '../../../context/Context'

import './style.css'

export default function SelectCharacterClass() {
    const [isChecked, setIsChecked] = useState({})
    const {allClasses, characterClass, setCharacterClass, classData} = useContext(Context)

    const handleChecks = (e) => {
        let group = e.target.getAttribute('data-group');
        let selectedCount = Object.keys(isChecked).filter(key => isChecked[key].group === group && isChecked[key].checked).length;
        let choiceCount = e.target.getAttribute('data-count');
        if(isChecked[e.target.name] || (selectedCount < choiceCount)) {
            setIsChecked({...isChecked, [e.target.name]: { checked: e.target.checked, group: group}})   
        } else {
            e.preventDefault();
        }
    }
    
   
    //need to do: destructure the object and refactor conditional rendering
    
    return (
        <div className='select-class-container'>
            <select value={characterClass} onChange={(e)=>setCharacterClass(e.target.value)}>
                <option value=''>-----</option>
                {allClasses.map(index => <option key={index[0]} value={index[1]}>{index[0]}</option>)}
            </select>
            <div className='class-info-container'>
                <h1>{!classData.name ? null: classData.name}</h1>
                <p>{!classData.hit_die ? null: `1d${classData.hit_die}`}</p>
                <ul className='class-saving-throws'>
                    {!classData.saving_throws ? null: classData.saving_throws.map(index => <li key={"st-"+index.name}>{index.name}</li>)}
                </ul>
                <ul className='class-proficiences'>
                    {!classData.proficiencies ? null: classData.proficiencies.map(index => <li key={"cp-"+index.name}>{index.name}</li>)}
                </ul>
                
                {!classData.proficiency_choices ? null : 
                    classData.proficiency_choices.map( (choiceObj, choiceIndex) => { return (
                        <div className='border choices' data-key={choiceObj.choose} key={choiceIndex}> 
                            Choose {choiceObj.choose} from the list
                            <br />
                            {choiceObj.from.map((skill ,i) => {
                                return (
                                    <>
                                        <label key={choiceIndex + "-" + i + "label"}>
                                            {skill.name}
                                        </label>
                                        <input onChange={handleChecks} data-count={choiceObj.choose} data-group={"group"+choiceIndex}
                                            checked={isChecked["proficiencies" + choiceIndex + "-" + i] ? isChecked["proficiencies" + choiceIndex + "-" + i].checked : false}
                                            name={"proficiencies" + choiceIndex + "-" + i} value={skill.name}
                                            className="prof-choice" key={choiceIndex + "-" + i} type='checkbox' />
                                    </>
                                )
                            }
                            )} 
                        </div>
                        ) 
                    })
                }
               
                {!classData.subclasses ? null : 
                <p>Available sub-classes:
                {classData.subclasses.map(subClass => subClass.name)} 
                </p>}
            </div>
        </div>
    )
}
