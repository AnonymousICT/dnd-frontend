import React, {useState, useContext} from 'react'
import {ResourceContext} from '../../context/ResourceContext'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';

export default function AllEquipment() {
    const [rowsPerPage, setRowsPerPage] = React.useState(20);
    const [page, setPage] = useState(0);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    const {
        allEquipment, 
        equipmentCategories, 
        setEquipmentSelection, 
        equipmentCategory,
        setSpecificEquipmentSelection,
    } = useContext(ResourceContext)

    const filteredGear = (gearType) => gearType? equipmentCategory : allEquipment ||[]

    // tomorrow's plan is to create a item detail page and then within that page have an option to select a character and add it to that character

    return (
        <div className="equipment-container">
            <div className="equipment-filters">
                {!equipmentCategories ? <h1>Loading...</h1> : equipmentCategories.map(category => <button onClick={(e)=>setEquipmentSelection(e.target.value)} value={category[1]} key={category[0]}>{category[0]}</button>)}
            </div>
            <div className="table-container">
                <div>
                <TablePagination
                        rowsPerPageOptions={[10, 20, 50]}
                        component="div"
                        count={filteredGear(equipmentCategory).length}
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
                            {filteredGear(equipmentCategory).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                                <TableRow className="tbl-row" key={row.name} onClick={(e)=>setSpecificEquipmentSelection(row.url)}>
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
                        count={filteredGear(equipmentCategory).length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />   
                </div>
            </div>
        </div>
    )
}
