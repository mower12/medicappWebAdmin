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
import EditIcon from '@material-ui/icons/Edit';


export default function TablaUsuarios() {
  const [modalVisible, setModalVisible] = useState(false);
  const [emailBody, setEmailBody] = useState('');
  const [idRegion, setIdRegion] = useState('');
  const [regiones, setRegiones] = useState([]);
  const [comunas, setComunas] = useState([]);
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState({region: {value: undefined}, commune: {value: undefined}});
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const token = qs.parse(getLocalToken()).access_token;
  const moment = require('moment');
  const [emailForm, setEmailForm] = useState('');
  const [regionForm, setRegionForm] = useState('');
  const [comunaForm, setComunaForm] = useState('');
  const [direccionForm, setDireccionForm] = useState('');
  const [fechaDeNacimientoForm, setFechaDeNacimientoForm] = useState('');
  

  const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }));

  const _onChangeEditEmail = (value) => {
    setEditUser({...editUser, email: value})
  }
  const _onChangeEditRegion = (value) => {
    setEditUser({...editUser, region: { value }})
  }
  const _onChangeEditComuna = (value) => {
    setEditUser({...editUser, commune: { value }})
  }
  const _onChangeEditDireccion = (value) => {
    setEditUser({...editUser, address: value})
  }

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
    
  };
  const _getRegionById = (idRegion) => {
    setIdRegion(idRegion);
    getComuna(idRegion);
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
  const getComuna = async (idRegion) => {
    const headers = {
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    };

    const res = await axios.get(`http://localhost:8080/region/${idRegion}/communes`, headers);

    console.log(res.data)
    setComunas(res.data);
    
  }
  const _editUser = async () => {
    const endpoint = `http://localhost:8080/user/${editUser.key}`;
  
    const headers = {
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    };
  
    axios.put(endpoint, editUser, headers)
        .then(result => {
            toast.success(`Cambio de estado efectuado correctamente`)
        })
        .catch(error => {
            toast.warning('Estamos sufriento un error en nuestro servicio, porfavor reintente mas tarde.')
        });
  
    }
  const _onEdit = (user) => {
    getComuna(user.region.value)
    setEditUser(user);
    setModalVisible(true);
    handleClose(false);
  };

  const _modifiUser = () => {
    _editUser();
    window.location.reload();
  };

  const _onIdRegion = (id) => {
    setRegionForm(id);
    _getRegionById(id);
    _onChangeEditRegion(id)
  };
    
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
    getRegion()

    console.log(users)

  }, [])

    const classes = useStyles();
    

  return (
    <div>
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
            <TableCell><b></b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>

          {users.map(row => (
            <TableRow key={row.key} >
              <TableCell component="th" scope="row">{row.rut}</TableCell>
              <TableCell component="th" scope="row">{row.firstName}</TableCell>
              <TableCell component="th" scope="row">{row.lastName}</TableCell>
              <TableCell component="th" scope="row">{row.email}</TableCell>
              <TableCell component="th" scope="row">{row.region.label}</TableCell>
              <TableCell component="th" scope="row">{row.commune.label}</TableCell>
              <TableCell component="th" scope="row">{row.address}</TableCell>
              <TableCell component="th" scope="row">{moment(row.birthDay).format('DD-MM-YYYY')}</TableCell>
              <EditIcon onClick={()=> _onEdit(row)} />
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
            Modificar información del usuario <b>{editUser.firstName + ' ' + editUser.lastName}</b>
          </DialogContentText>
          <form className={classes.root} noValidate autoComplete="off">
          <div>

          <TextField
          disabled
          id="outlined-required"
          label="Rut"
          defaultValue={editUser.rut}
          variant="outlined"
        />
        
        <TextField
          disabled
          id="outlined-required"
          label="Nombre"
          defaultValue={editUser.firstName}
          variant="outlined"
        />
        
        <TextField
          disabled
          id="outlined-required"
          label="Apellido"
          defaultValue={editUser.lastName}
          variant="outlined"
        />
        <TextField
          required
          id="outlined-required"
          label="Email"
          defaultValue={editUser.email}
          onChange={(e) => _onChangeEditEmail(e.target.value)}
          variant="outlined"
        />
        <TextField
          id="outlined-select-currency"
          select
          label="Region"
          variant="outlined"
          defaultValue={editUser.region.value}
          onChange={e => _onIdRegion(e.target.value)}
        >
           {regiones.map((region) => (
            <MenuItem key={region.value} value={region.value} >
              {region.label} 
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="outlined-select-currency"
          select
          label="Comuna"
          variant="outlined"
          defaultValue={editUser.commune.value}
          onChange={(e) => _onChangeEditComuna(e.target.value)}

        >
          {comunas.map((communes) => (
            <MenuItem key={communes.value} value={communes.value}>
              {communes.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          required
          id="outlined-required"
          label="Dirección"
          defaultValue={editUser.address}
          onChange={(e) => _onChangeEditDireccion(e.target.value)}
          variant="outlined"
        />
        <TextField
          disabled
          id="outlined-required"
          label="Fecha de nacimiento"
          defaultValue={moment(editUser.birthDay).format('DD-MM-YYYY')}
          onChange={setFechaDeNacimientoForm}
          variant="outlined"
        />
          </div>
        </form>
            
        </DialogContent>
        <DialogActions>
          <Button onClick={closedModal} color="primary">
            Cancel
          </Button>
          <Button onClick={() => _modifiUser()} color="primary">
            Modificar
          </Button>
        </DialogActions>
      </Dialog>
      </div>
    </div>
  );
}
