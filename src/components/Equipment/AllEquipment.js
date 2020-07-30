import React, {useContext} from 'react'
import {ResourceContext} from '../../context/ResourceContext'
import { ReactTabulator } from 'react-tabulator'

import './equipment.css'

export default function AllEquipment() {
    const {allEquipment, equipmentCategories, setSelection, equipmentCategory} = useContext(ResourceContext)

    const filteredGear = (gearType) => gearType? equipmentCategory : allEquipment ||[]

    const columns = [
        { title: "Name", field: "name", width: 200},
        { title: "url", field: "url", visible:false }
      ];

    const options = {
        pagination:"local",
        paginationSize: 20,
    }

    return (
        <div className="equipment-container">
            <div className="equipment-filters">
                {!equipmentCategories ? <h1>Loading...</h1> : equipmentCategories.map(category => <button onClick={(e)=>setSelection(e.target.value)} value={category[1]} key={category[0]}>{category[0]}</button>)}
            </div>
            <div className="table">
                <ReactTabulator
                    data={filteredGear(equipmentCategory)}
                    columns={columns}
                    options={options}
                    layout={"fitDataTable"}
                />
                
            </div>
            
        </div>
    )
}
