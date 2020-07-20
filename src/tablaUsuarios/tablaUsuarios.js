import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import TextField from '@material-ui/core/TextField';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import DialogContentText from '@material-ui/core/DialogContentText';
import { makeStyles } from '@material-ui/core/styles';
import './tablaUsuarios.css';
import { getLocalToken } from '../api/auth'
import qs from 'querystring';
import axios from 'axios';


export default function TablaUsuarios() {
  const [modalVisible, setModalVisible] = useState(false);
  const [emailBody, setEmailBody] = useState('');
  const [regiones, setRegiones] = useState([]);
  const [users, setUsers] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const token = qs.parse(getLocalToken()).access_token;
  const moment = require('moment');
  

  const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }));

  const closedModal = () => {
    setModalVisible(false);
  };
  const _onSend = () => {
    setModalVisible(false)
};
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const _onEnable = () => {
    getRegion();
    handleClose(false);
    setModalVisible(true)
    console.log('Activar')
    
  };
  const getRegion = async () => {
    const headers = {
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    };

    const res = await axios.get('http://localhost:8080/region', headers);

    console.log(res.data)
    setRegiones(res.data);
    
  }
  useEffect(() => {

    const getUsers = async () => {
      const token = qs.parse(getLocalToken()).access_token;

      const headers = {
        withCredentials: true,
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      };

      const res = await axios.get('http://localhost:8080/user', headers);

      console.log(res.data)

      setUsers(res.data);
    }

    getUsers()

    console.log(users)

  }, [])

    const classes = useStyles();

  return (
    <div>
      <center>
      <form noValidate autoComplete="off">
      <TextField id="standard-basic" label="Buscar usuario" />
      <Button onClick={() => _onEnable()} variant="contained" color="primary">Buscar</Button>
    </form>
    </center>
    <br/>
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><b>Rut</b></TableCell>
            <TableCell><b>Nombres</b></TableCell>
            <TableCell><b>Apellidos</b></TableCell>
            <TableCell><b>Email</b></TableCell>
            <TableCell><b>Region</b></TableCell>
            <TableCell><b>Comuna</b></TableCell>
            <TableCell><b>Direccion</b></TableCell>
            <TableCell><b>Fecha de nacimiento</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>

          {users.map(row => (
            <TableRow >
              <TableCell component="th" scope="row">{row.rut}</TableCell>
              <TableCell component="th" scope="row">{row.firstName}</TableCell>
              <TableCell component="th" scope="row">{row.lastName}</TableCell>
              <TableCell component="th" scope="row">{row.email}</TableCell>
              <TableCell component="th" scope="row">{row.region.label}</TableCell>
              <TableCell component="th" scope="row">{row.commune.label}</TableCell>
              <TableCell component="th" scope="row">{row.address}</TableCell>
              <TableCell component="th" scope="row">{moment(row.birthDay).format('DD-MM-YYYY')}</TableCell>
            </TableRow>
          )
          )}

        </TableBody>
      </Table>
    </Paper>
    <div>
    <Dialog open={modalVisible} onClose={setModalVisible} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Modificar</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Modificar información del usuario
          </DialogContentText>
          <form className={classes.root} noValidate autoComplete="off">
          <div>
          <TextField
          required
          id="outlined-required"
          label="Rut"
          defaultValue=""
          variant="outlined"
        />
        
        <TextField
          required
          id="outlined-required"
          label="Nombre"
          defaultValue=""
          variant="outlined"
        />
        
        <TextField
          required
          id="outlined-required"
          label="Apellido"
          defaultValue=""
          variant="outlined"
        />
        <TextField
          required
          id="outlined-required"
          label="Email"
          defaultValue=""
          variant="outlined"
        />
        <TextField
          id="outlined-select-currency"
          select
          label="Region"
          variant="outlined"
        >
           {regiones.map((region) => (
            <MenuItem key={region.value} value={region.value}>
              {region.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="outlined-select-currency"
          select
          label="Comuna"
          variant="outlined"
        >
        </TextField>
        <TextField
          required
          id="outlined-required"
          label="Dirección"
          defaultValue=""
          variant="outlined"
        />
        <TextField
          required
          id="outlined-required"
          label="Fecha de nacimiento"
          defaultValue=""
          variant="outlined"
        />
          </div>
        </form>
            
        </DialogContent>
        <DialogActions>
          <Button onClick={closedModal} color="primary">
            Cancel
          </Button>
          <Button onClick={_onSend} color="primary">
            Modificar
          </Button>
        </DialogActions>
      </Dialog>
      </div>
    </div>
  );
}
