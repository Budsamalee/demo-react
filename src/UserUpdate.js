import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import {Typography, Grid, TextField, Button} from '@mui/material';

export default function UserUpdate() {
  const { id } = useParams();

  useEffect(() => {
    var requestOptins = {
        method: 'GET',
        redirect: 'follow'
    }

    fetch(" https://www.mecallapi.com/api/users/"+id, requestOptins)
        .then(res => res.json())
        .then(result => {
            console.log("result ->", result)
            if (result['status'] === 'ok') { // เข้าข้อมูลไปยัง status
                console.log("--- COME ---")
                setFName(result["user"]["fname"])
                setLName(result["user"]["lname"])
                setUserName(result["user"]["username"])
                setEmail(result["user"]["email"])
                setAvatar(result["user"]["avatar"])
            }
        })
        .catch(error => console.log('error',error));
  }, [id])
  const handleSubmit = event => {
    event.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "id": id,
        "fname": fname,
        "lname": lname,
        "username": username,
        "email": email,
        "avatar": avatar,
    })
    var requestOptins = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
    }
    fetch("https://www.mecallapi.com/api/users/update ", requestOptins)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            alert(result['message'])
            if (result['status'] === 'ok') {
                window.location.href = '/'
            }
        })
        .catch(error => console.log("error ->", error))
  }
  const [fname, setFName] = useState('');
  const [lname, setLName] = useState('');
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm" sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom component="div">
            Update User
        </Typography>
        <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField id="fname" label="First Name" variant="outlined" fullWidth required
                     onChange={(e)=>setFName(e.target.value)}
                     value={fname}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField id="lname" label="Last Name" variant="outlined" fullWidth required
                     onChange={(e)=>setLName(e.target.value)}
                     value={lname}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField id="username" label="Username" variant="outlined" fullWidth required
                     onChange={(e)=>setUserName(e.target.value)}
                     value={username}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField id="email" label="Email" variant="outlined" fullWidth required 
                     onChange={(e)=>setEmail(e.target.value)}
                     value={email}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField id="avatar" label="Profile" variant="outlined" fullWidth required 
                     onChange={(e)=>setAvatar(e.target.value)}
                     value={avatar}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button type="submit" variant="contained" fullWidth>Update</Button>
                </Grid>
            </Grid>
        </form>
      </Container>
    </React.Fragment>
  );
}

