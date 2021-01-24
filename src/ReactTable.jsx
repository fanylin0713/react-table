import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    tableHeadFont:{
        fontWeight: 'bold'
    }
});

const data = [
    {
        region: '桃園市',
        town: '八德區',
        name: '宏亞食品巧克力觀光工廠'
    },
    {
        region: '臺南市',
        town: '永康區',
        name: '台灣金屬創意館'
    },
    {
        region: '桃園市',
        town: '龜山區',
        name: '臺灣菸酒(股)公司林口觀光酒廠'
    },
];

export default function BasicTable() {
    const classes = useStyles();
    const cors = 'https://cors-anywhere.herokuapp.com/';
    const requestURL = 'https://gis.taiwan.net.tw/XMLReleaseALL_public/scenic_spot_C_f.json';
    const [tableData, setTableData] = useState([]);

    React.useEffect(() => {
        fetch(`${cors}${requestURL}`, {
            method: "GET",
            mode: 'cors',
            contentType: 'application/json',
            headers: new Headers({
                'Access-Control-Allow-Origin': '*',
                "X-Requested-With": "XMLHttpRequest"
            })
        })
            .then(res => { console.log(res); setTableData(res) })
    }, []);

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow >
                        <TableCell className={classes.tableHeadFont}>Region</TableCell>
                        <TableCell className={classes.tableHeadFont}>Town</TableCell>
                        <TableCell className={classes.tableHeadFont}>Name</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row) => (
                        <TableRow hover key={row.region}>
                            <TableCell>
                                {row.region}
                            </TableCell>
                            <TableCell>{row.town}</TableCell>
                            <TableCell>{row.name}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}