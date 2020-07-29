import React, {useContext} from 'react'
import {Context} from '../../../context/Context'
import {ResourceContext} from '../../../context/ResourceContext'
import {renderClassLevel} from './renderClassLevels'
import {validCells} from './validCells'

import './style.css'

export default function SelectCharacterClass({nextStep, prevStep}) {
    const {
        characterClass, setCharacterClass, 
        characterLevel, 
        isChecked, setIsChecked} = useContext(Context)
        
    const {
        allClasses, 
        classData, 
        classLevels, 
        
    } = useContext(ResourceContext)
    const {
        name, 
        hit_die, 
        saving_throws, 
        proficiencies, 
        proficiency_choices,
        subclasses } = classData

    const handleChecks = (e) => {
        let group = e.target.getAttribute('data-group');
        let selectedCount = Object.keys(isChecked).filter(key => isChecked[key].group === group && isChecked[key].checked).length;
        let choiceCount = e.target.getAttribute('data-count');
        let key = e.target.getAttribute('value')
        if(isChecked[e.target.name] || (selectedCount < choiceCount)) {
            setIsChecked({...isChecked, [e.target.name]: { checked: e.target.checked, group: group, key:key}})   
        } else {
            e.preventDefault();
        }
    }

    let headers = validCells; 
    
    if(!classLevels) {}
    else {
             window.classLevels = classLevels;
            }
        

    //clear on load when swapping to a different class/race
    
    return (
        <div className='select-class-container'>
            <h3>Choose your character's class</h3>
            <select value={characterClass} onChange={(e)=>setCharacterClass(e.target.value)}>
                <option key="noOp" value=''>-----</option>
                {allClasses.map(index => <option key={index[0]} value={index[1]}>{index[0]}</option>)}
            </select>
            
            <div className='class-info-container'>
                <h1>{name}</h1>
                <p>{!hit_die ? null: `1d${hit_die}`}</p>
                <ul className='class-saving-throws'>
                    {!saving_throws ? null: saving_throws.map(index => <li key={"st-"+index.name}>{index.name}</li>)}
                </ul>
                <ul className='class-proficiences'>
                    {!proficiencies ? null: proficiencies.map(index => <li key={"cp-"+index.name}>{index.name}</li>)}
                </ul>
                
                {!proficiency_choices ? null : 
                    proficiency_choices.map( (choiceObj, choiceIndex) => { return (
                        <div className='border choices' data-key={choiceObj.choose} key={choiceIndex}> 
                            Choose {choiceObj.choose} from the list
                            <br />
                            {choiceObj.from.map((skill ,i) => {
                                return (
                                    <div key={i}>
                                        <label key={choiceIndex + "-" + i + "label"}>
                                            {skill.name}
                                        </label>
                                        <input 
                                            type='checkbox' 
                                            className="prof-choice" 
                                            onChange={handleChecks} 
                                            name={"proficiencies" + choiceIndex + "-" + i} 
                                            data-count={choiceObj.choose} 
                                            data-group={"group"+choiceIndex}
                                            checked={isChecked["proficiencies" + 
                                            choiceIndex + "-" + i] ? isChecked["proficiencies" + choiceIndex + "-" + i].checked : false}
                                            value={skill.name}
                                            key={choiceIndex + "-" + i}
                                        />
                                    </div>
                                )
                            }
                            )} 
                        </div>
                        ) 
                    })
                }
               
                {!subclasses ? null : 
                    <p>Available sub-classes: {subclasses.map(subClass => subClass.name)} 
                </p>}
            </div>
            
            {!classLevels ? null : 
                <div className='class-levels-container'>
                   <table>
                        <thead>
                            <tr>
                                {headers.map((header, i) => 
                                    <th className={header} key={i}>
                                        {header}
                                    </th>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {classLevels.filter((cl) => cl.level <= characterLevel).map((item , levelIndex) =>
                                <tr key= {'class-row' + levelIndex}>
                                {headers.map((header, id) => 
                                            <td key={'class-cell'+ id}>
                                                {renderClassLevel(item[header], header)}
                                            </td>
                                        )}
                                </tr>
                            )}
                        </tbody>
                   </table>
                </div>
            }
            <button onClick={prevStep}>Go Back</button>
            <button onClick={nextStep}>Next</button>
        </div>
    )
}
