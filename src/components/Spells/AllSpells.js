import React,{useContext} from 'react'
import {ResourceContext} from '../../context/ResourceContext'

export default function AllSpells() {
    const {allSpells, setSelectedSpell} = useContext(ResourceContext)
    return (
        <div className='all-spells-container'>
            <table className='spell-table'>
                <thead>
                    <tr>
                        <th>Spells</th>
                    </tr>
                </thead>
                <tbody>
                    {allSpells.map((index)=>
                        <tr key={index}>
                            <td key={index} onClick={(e)=>setSelectedSpell(index[1])}>{index[0]}</td>
                        </tr> 
                    )}
                </tbody>
            </table>
        </div>
    )
}
            