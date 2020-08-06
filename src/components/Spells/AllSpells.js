import React,{useState, useEffect, useContext} from 'react'
import {ResourceContext} from '../../context/ResourceContext'
import { Context } from '../../context/Context'
import { ReactTabulator } from 'react-tabulator'
import {fetchAllSpecificSpellData} from '../../api/SpellAPI'
import bookloading from './bookloading.gif'

export default function AllSpells() {
    const [loading, setLoading] = useState(true)
    const [allSpellModels, setAllSpellModels] = useState([])
    const [spellMasterList, setSpellMasterList] = useState([])
    const { selectCharacter, allCharacters } = useContext(Context)
    const {allSpells, setSpellSelection} = useContext(ResourceContext)

    useEffect(() => {
        setLoading(true);
        const fireAndForget = async () => {
            const apiAllSpells = await fetchAllSpecificSpellData()
            setSpellMasterList([...apiAllSpells])
            setLoading(false);
        }
        fireAndForget();
    }
    ,[])

    useEffect(() => {
        //setLoading(true);
        let character = allCharacters.find((char) => char._id === selectCharacter)
        if(spellMasterList.length && character) {
            setAllSpellModels([...spellMasterList.filter((spell) => {return spell.classes.find((job) => job.name  === character.job)} )])
        }
        //setLoading(false);
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
                {loading ? <img src={bookloading} alt="Loading..." /> : null }
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
            