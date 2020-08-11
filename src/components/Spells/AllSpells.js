import React,{useState, useEffect, useContext} from 'react'
import {ResourceContext} from '../../context/ResourceContext'
import { Context } from '../../context/Context'
import { ReactTabulator } from 'react-tabulator'
import {fetchAllSpecificSpellData} from '../../api/SpellAPI'
import bookloading from './bookloading.gif'

const cache = {};

export default function AllSpells() {
    const [loading, setLoading] = useState(true)
    const [allSpellModels, setAllSpellModels] = useState([])
    const [spellMasterList, setSpellMasterList] = useState([])
    const { selectCharacter, allCharacters } = useContext(Context)
    const { setSpellSelection } = useContext(ResourceContext)

    useEffect(() => {
        setLoading(true);
        const fireAndForget = async () => {
            if (cache.spells) {
                setSpellMasterList(cache.spells);
            } else {
                const data = await fetchAllSpecificSpellData();
                const sortedSpells = data.sort((a, b) => a.level - b.level);
                sortedSpells.map((spell, idx) => spell.row = idx);
                console.log(sortedSpells);
                setSpellMasterList(sortedSpells);
                cache.spells = sortedSpells;
            }
            setLoading(false);
        }
        fireAndForget();
    },[])

    useEffect(() => {
        let character = allCharacters.find((char) => char._id === selectCharacter)
        if(spellMasterList.length && character) {
            setAllSpellModels([...spellMasterList.filter((spell) => {return spell.classes.find((job) => job.name  === character.job)} )])
        }
    }
    ,[allCharacters, selectCharacter, spellMasterList])

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
                {loading ? <img src={bookloading} alt="Loading..." /> : 
                    <ReactTabulator 
                        data={allSpellModels.length === 0 ? spellMasterList : 
                            allSpellModels}
                        columns={columns}
                        options={options}
                    />
                }
            </div>
        </div>
    )
}
            