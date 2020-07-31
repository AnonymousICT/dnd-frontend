import React, {useContext} from 'react'
import {ResourceContext} from '../../context/ResourceContext'
import { ReactTabulator } from 'react-tabulator'
import SpecificEquipment from './SpecificEquipment'

import './equipment.css'

export default function AllEquipment() {
    const {
        allEquipment, 
        equipmentCategories, 
        setEquipmentSelection, 
        equipmentCategory,
        setSpecificEquipmentSelection,
    } = useContext(ResourceContext)

    const filteredGear = (gearType) => gearType? equipmentCategory : allEquipment ||[]

    const columns = [
        { 
            title: "Name", 
            field: "name", 
            width: 200,
            cellClick: (e,cell) => {
                setSpecificEquipmentSelection(cell._cell.row.data.url)
            }
        },
      ];

    const options = {
        pagination:"local",
        paginationSize: 20,
    }

    // tomorrow's plan is to create a item detail page and then within that page have an option to select a character and add it to that character

    return (
        <div className="equipment-container">
            <div className="equipment-filters">
                {!equipmentCategories ? <h1>Loading...</h1> : equipmentCategories.map(category => <button onClick={(e)=>setEquipmentSelection(e.target.value)} value={category[1]} key={category[0]}>{category[0]}</button>)}
            </div>
            <div className="table-container">
                <div className="table">
                    <ReactTabulator
                        data={filteredGear(equipmentCategory)}
                        columns={columns}
                        options={options}
                        layout={"fitDataTable"}
                    />
                </div>
                <SpecificEquipment />
            </div>
        </div>
    )
}
