import React,{useState, useEffect, useContext} from 'react'
import {ResourceContext} from '../../context/ResourceContext'
import { Context } from '../../context/Context'
import {fetchAllSpecificSpellData} from '../../api/SpellAPI'
import bookloading from './bookloading.gif'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';

const cache = {};
const useLocalStorage = true;

export default function AllSpells() {
    const [loading, setLoading] = useState(true)
    const [allSpellModels, setAllSpellModels] = useState([])
    const [spellMasterList, setSpellMasterList] = useState([])
    const { selectCharacter, allCharacters } = useContext(Context)
    const { setSpellSelection } = useContext(ResourceContext)
    const [rowsPerPage, setRowsPerPage] = React.useState(20);
    const [page, setPage] = useState(0);


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    useEffect(() => {
        const cachingUtility = { 
            get: (name) => {
                if(useLocalStorage) {
                    return JSON.parse(localStorage.getItem(name));
                } else {
                    return cache[name];
                }
            }, 
            set: (name, value) => {
                if(useLocalStorage) {
                    localStorage.setItem(name, JSON.stringify(value));
                } else {
                    cache[name] = value;
                }
            }
        }
        setLoading(true);
        const fireAndForget = async () => {
            if (!cachingUtility.get("spells")) {
                const data = await fetchAllSpecificSpellData();
                const sortedSpells = data.sort((a, b) => a.level - b.level);
                sortedSpells.map((spell, idx) => spell.row = idx);
                setSpellMasterList(sortedSpells);
                cachingUtility.set("spells", sortedSpells);
            }
            setSpellMasterList(cachingUtility.get("spells"));
            setLoading(false);
        }
        fireAndForget();
    },[])

    useEffect(() => {
        let character = allCharacters.find((char) => char._id === selectCharacter)
        if (!spellMasterList) {
            setAllSpellModels([]);
        } else if (spellMasterList.length && character) {
            setAllSpellModels([...spellMasterList.filter((spell) => {return spell.classes.find((job) => job.name  === character.job)} )]);
        } else {
            setAllSpellModels([...spellMasterList]);
        }
    }
    ,[allCharacters, selectCharacter, spellMasterList])


    return (
        <div className='all-spells-container'>
            <div className="table-container">
                {loading ? <img src={bookloading} alt="Loading..." /> : 
                <div>
                    <TablePagination
                        rowsPerPageOptions={[10, 20, 50]}
                        component="div"
                        count={allSpellModels.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />                      
                    <TableContainer component={Paper}>
                        <Table className="table" aria-label="simple table" size={'small'}>
                            <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {allSpellModels.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                                <TableRow className="tbl-row" key={row.name} onClick={(e)=>setSpellSelection(row.url)}>
                                    <TableCell align="center" component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 20, 50]}
                        component="div"
                        count={allSpellModels.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />   
                </div>             
                }
            </div>
        </div>
    )
}
            