import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import ListUsers from './ListUsers';
import Link from '@mui/material/Link';

export default function Users() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg" sx={{p: 2}}>
        <Paper sx={{p: 2}}>
          <Box display="flex">
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Users
              </Typography>
            </Box>
            <Box>
              <Link href="create">
                <Button variant="contained">CREATE</Button>
              </Link>
            </Box>
          </Box>
          <ListUsers />
        </Paper>
      </Container>
    </React.Fragment>
  );
}
