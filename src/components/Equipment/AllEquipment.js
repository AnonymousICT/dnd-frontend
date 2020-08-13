import React, { useContext } from 'react'
import {ResourceContext} from '../../context/ResourceContext'
import RenderTable from '../Table/RenderTable'

export default function AllEquipment() {
    const {
        allEquipment, 
        equipmentCategories, 
        setEquipmentSelection, 
        equipmentCategory,
        setSpecificEquipmentSelection,
    } = useContext(ResourceContext)

    const filteredGear = (gearType) => gearType? equipmentCategory : allEquipment ||[]

    return (
        <div className="equipment-container">
            <div className="equipment-filters">
                {!equipmentCategories ? <h1>Loading...</h1> : equipmentCategories.map(category => <button onClick={(e)=>setEquipmentSelection(e.target.value)} value={category[1]} key={category[0]}>{category[0]}</button>)}
            </div>
            <div className="table-container">
                <RenderTable data={filteredGear(equipmentCategory)} setSpecificData={setSpecificEquipmentSelection} />
            </div>
        </div>
    )
}
