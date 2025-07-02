import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import {Typography, Grid, TextField, Button} from '@mui/material';

export default function UserCreate() {
  const handleSubmit = event => {
    event.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "fname": fname,
        "lname": lname,
        "username": username,
        "email": email,
        "avatar": avatar,
    })
    var requestOptins = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
    }
    fetch("https://www.mecallapi.com/api/users/create", requestOptins)
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
            Create User
        </Typography>
        <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField id="fname" label="First Name" variant="outlined" fullWidth required
                     onChange={(e)=>setFName(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField id="lname" label="Last Name" variant="outlined" fullWidth required
                     onChange={(e)=>setLName(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField id="username" label="Username" variant="outlined" fullWidth required
                     onChange={(e)=>setUserName(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField id="email" label="Email" variant="outlined" fullWidth required 
                     onChange={(e)=>setEmail(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField id="avatar" label="Profile" variant="outlined" fullWidth required 
                     onChange={(e)=>setAvatar(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button type="submit" variant="contained" fullWidth>CREATE</Button>
                </Grid>
            </Grid>
        </form>
      </Container>
    </React.Fragment>
  );
}

