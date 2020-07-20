import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import { setToken } from '../api/auth';
const qs = require('querystring')

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    const endpoint = 'http://localhost:8080/auth/login';

    const body = {
        username: email,
        password: password,
        grant_type: 'password',
    }

    const headers = {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
        'Authorization': 'Basic bWVkaWNhcHA6MTIzNDU='
      }
    };

    return await axios.post(endpoint, qs.stringify(body), headers)
        .then(result => {
            toast.success(`Logeado correctamente`)
            setToken(qs.stringify(result.data));
            window.location.reload();
        })
        .catch(error => {
            if (error.response && error.response.data.error_description === 'Bad credentials') {
            toast.warning('¡Usuario o contraseña incorrecto!')
             
            } else {
              console.log(error)
              toast.error('Estamos sufriento un error en nuestro servicio, porfavor reintente mas tarde.')
            }
        });

}

  const _onLoginPressed = () => {
	login();
	
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          MedicApp
        </Typography>
        <form noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
			      onChange={e => setEmail(e.target.value) }
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
			      onChange={e => setPassword(e.target.value) }
            autoComplete="current-password"
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={_onLoginPressed}
          >
            Iniciar sesión
          </Button>
        </form>
      </div> 
     
    </Container>
  );
}