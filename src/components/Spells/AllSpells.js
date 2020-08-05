import React,{useState, useEffect, useContext} from 'react'
import {ResourceContext} from '../../context/ResourceContext'
import { ReactTabulator } from 'react-tabulator'
import { Context } from '../../context/Context'
import {fetchAllSpecificSpellData} from '../../api/SpellAPI'

//check the current user's class vs the spell class requirements
//only add 1 copy EVER to the spellbook

export default function AllSpells() {
    const [allSpellModels, setAllSpellModels] = useState([])
    const [spellMasterList, setSpellMasterList] = useState([])
    const { selectCharacter, allCharacters } = useContext(Context)
    const {allSpells, setSpellSelection} = useContext(ResourceContext)

    useEffect(() => {
        const fireAndForget = async () => {
            const apiAllSpells = await fetchAllSpecificSpellData()
            setSpellMasterList([...apiAllSpells])
        }
        fireAndForget();
    }
    ,[])

    useEffect(() => {
        let character = allCharacters.find((char) => char._id === selectCharacter)
        if(spellMasterList.length && character) {
            setAllSpellModels([...spellMasterList.filter((spell) => {return spell.classes.find((job) => job.name  === character.job)} )])
        }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    ,[selectCharacter, spellMasterList])

    const columns = [
        { 
            title: "Name", 
            field: "name", 
            width: 200 ,
            cellClick:(e, cell)=>{
            setSpellSelection(cell._cell.row.data.url)} 
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
                    data={allSpellModels.length === 0 ? allSpells : 
                        allSpellModels}
                    columns={columns}
                    options={options}
                />
            </div>
        </div>
    )
}
            