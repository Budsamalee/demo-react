import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';

//function createData(
//    name: string,
//    calories: number,
//    fat: number,
//    carbs: number,
//    protein: number,
//  ) {
//    return { name, calories, fat, carbs, protein };
//  }
  
//  const rows = [
//    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//    createData('Eclair', 262, 16.0, 24, 6.0),
//    createData('Cupcake', 305, 3.7, 67, 4.3),
//    createData('Gingerbread', 356, 16.0, 49, 3.9),
//  ];

  export default function ListUsers() {
    const [items, setItems] = useState([]); //ประกาศ state ขึ้นมาโดยตป.ด้านหน้าคือตป.ที่เราจะใช้ไปแสดงผล // setItems อันหลังเป็น fucn ไว้ set ค่าลงไปในตป.ได้
    //const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        UserGet()
    }, [])

    const UserGet = () => {
        fetch("https://www.mecallapi.com/api/users") //เรียก API
         .then(res => res.json())
         .then(
            (result) => {
                setItems(result) //เอาข้อมูลที่ได้จาก API มา save ลงใน items โกยเรียกใช้ func setItems //เรียกใช้ fucn setItems 
                console.log("Data ->", result)
            },
        )
    }

    const UserDelete = id => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json")

        var raw = JSON.stringify({
            "id": id
        })

        var requestOptins = {
            method: 'DELETE',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        }
        fetch("https://www.mecallapi.com/api/users/delete", requestOptins) //เรียก API
            .then(res => res.json())
            .then((result) => {
                alert(result['message'])
                if (result['status'] === 'ok') {
                    UserGet()
                }
                console.log("Delete ->", result)
            },
    )}

    const UserUpdate = id => {
        console.log("id ->", id)
        window.location = '/update/' + id
    }

    return (
        <React.Fragment>
            <Container>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell align="center">Profile</TableCell>
                            <TableCell align="left">First Name</TableCell>
                            <TableCell align="left">Last Name</TableCell>
                            <TableCell align="left">Username</TableCell>
                            <TableCell align="left">actions</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {items.map((item) => (
                            <TableRow
                            key={item.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell component="th" scope="row">
                                {item.id}
                            </TableCell>
                            <TableCell align="left">
                                <Box display="flex" justifyContent="center">
                                    <Avatar
                                        alt={item.username}
                                        src={item.avatar}
                                    />
                                </Box>
                            </TableCell>
                            <TableCell align="left">{item.fname}</TableCell>
                            <TableCell align="left">{item.lname}</TableCell>
                            <TableCell align="left">{item.username}</TableCell>
                            <TableCell align="left">
                                <ButtonGroup variant="outlined" aria-label="outlined button group">
                                    <Button onClick={()=>UserUpdate(item.id)}>Edit</Button>
                                    <Button onClick={()=>UserDelete(item.id)}>Delete</Button>
                                </ButtonGroup>
                            </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </React.Fragment>
    )
  }