import React,{useContext} from 'react'
import {ResourceContext} from '../../context/ResourceContext'
import { ReactTabulator } from 'react-tabulator'

export default function AllSpells() {
    const {allSpells, setSelection} = useContext(ResourceContext)
    const columns = [
        { 
            title: "Name", 
            field: "name", 
            width: 200 ,
            cellClick:(e, cell)=>{
            setSelection(cell._cell.row.data.url)} 
        },
    ]
    const options = {
        pagination:"local",
        paginationSize: 20,
    }
    
    return (
        <div className='all-spells-container'>
            <div className="table">
                <ReactTabulator 
                    data={allSpells}
                    columns={columns}
                    options={options}
                />
            </div>
        </div>
    )
}
            