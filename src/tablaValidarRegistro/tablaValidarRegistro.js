import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import "../css/tablaUsuarios/tablaUsuarios.css";
import LogoDescarga from '../css/images/descargas.PNG';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Table from "@material-ui/core/Table";
import Dialog from '@material-ui/core/Dialog';
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import { getLocalToken } from '../api/auth'
import qs from 'querystring';
import './tablaValidarRegistro.css';
import axios from 'axios';
import { Input } from "@material-ui/core";
import { setToken } from '../api/auth';
import { host } from "../core/environment";

export default function TablaValidarRegistro() {

  const [modalVisible, setModalVisible] = useState(false);
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState({region: {value: undefined}, commune: {value: undefined}});
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [destinatario, setDestinatario] = useState('');
  const token = qs.parse(getLocalToken()).access_token;
  const [emailBody, setEmailBody] = useState('');

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const closedModal = () => {
    setModalVisible(false);
  };
  useEffect(() => {

    const getUsers = async () => {
      

      const headers = {
        withCredentials: true,
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      };

      const res = await axios.get(`${host}/user/disabled`, headers);

      console.log(res.data)

      setUsers(res.data);
    }

    getUsers()

    console.log(users)

  }, [])
  

  const send = async () => {
    const endpoint = `${host}/email/send`;

    const body = {
        email: destinatario,
        title: 'MedicApp - No ha sido aceptado su registro',
        body: emailBody,
    }

    const headers = {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    };
    

    axios.post(endpoint, body, headers)
        .then(result => {
            toast.success(`Notificacion enviada correctamente`)
            //setToken(qs.stringify(result.data));
            //window.location.reload();
        })
        .catch(error => {
            toast.warning('Estamos sufriento un error en nuestro servicio, porfavor reintente mas tarde.')
        });

}

const activate = async (userId) => {
  const endpoint = `${host}/user/${userId}/enable`;

  const headers = {
    withCredentials: true,
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  };

  axios.put(endpoint, {}, headers)
      .then(result => {
          toast.success(`Cambio de estado efectuado correctamente`)
      })
      .catch(error => {
          toast.warning('Estamos sufriento un error en nuestro servicio, porfavor reintente mas tarde.')
      });

  }

  const deleteUser = (userId) => {
    const endpoint = `${host}/user/${userId}`;
  
    const headers = {
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    };
  
    axios.delete(endpoint, headers)
        .then(result => {
            toast.success(`Se ha eliminado usuario correctamente`)
        })
        .catch(error => {
            toast.warning('Estamos sufriento un error en nuestro servicio, porfavor reintente mas tarde.')
        });
  
    }

  const _onActivate = (id) => {
  handleClose(false);
  activate(id);
  window.location.reload();
  };
  const _onDelete = (id) => {
    deleteUser(id);
    handleClose(false);
    console.log(id);
    };
  const _onSendEmail = (email,user) => {
    setEditUser(user);
    setDestinatario(email);
    handleClose(false);
    setModalVisible(true)
    console.log('Activar')
    
  };
  
  const _onSend = () => {
      send();
      setModalVisible(false)
  };
  
  return (
    <div>
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><b>Rut</b></TableCell>
            <TableCell><b>Nombres</b></TableCell>
            <TableCell><b>Apellidos</b></TableCell>
            <TableCell><b>Fecha de registro</b></TableCell>
            <TableCell><b>Certificado</b></TableCell>
            <TableCell><b>Foto de Carnet</b></TableCell>
            <TableCell><b>Foto de Perfil</b></TableCell>
            <TableCell><b>Titulo Universitario</b></TableCell>
            <TableCell><b>Estado</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>

          {users.map(row => (
            <TableRow key={row.key} >
              <TableCell component="th" scope="row">{row.rut}</TableCell>
              <TableCell component="th" scope="row">{row.firstName}</TableCell>
              <TableCell component="th" scope="row">{row.lastName}</TableCell>
              <TableCell component="th" scope="row">{row.email}</TableCell>
              <TableCell component="th" scope="row"><a href={row.certificateNationalHealth}><img src={LogoDescarga}/></a></TableCell>
              <TableCell component="th" scope="row"><a href={row.carnetImage}><img src={LogoDescarga}/></a></TableCell>
              <TableCell component="th" scope="row"><a href={row.profileImage}><img src={LogoDescarga}/></a></TableCell>
              <TableCell component="th" scope="row"><a href={row.titleImage}><img  src={LogoDescarga}/></a></TableCell>
              <TableCell component="th" scope="row">{row.enabled ? "HABILITADO" : "DESHABILITADO"}</TableCell>
              <IconButton
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={handleClick}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="long-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
                PaperProps={{
                  style: {
                    maxHeight: 48 * 4.5,
                    width: '20ch',
                  },
                }}
              >
                <MenuItem onClick={() => _onActivate(row.key)}>Activar</MenuItem>
                <MenuItem onClick={() => _onSendEmail(row.email,row)}>Enviar correo</MenuItem>
                <MenuItem onClick={() => _onDelete(row.key)}>Eliminar usuario</MenuItem>
              </Menu>
            </TableRow>
          )
          )}
        </TableBody>
      </Table>
    </Paper>
    <div>
    <Dialog open={modalVisible} onClose={setModalVisible} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Notificar </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enviar correo a <b>{editUser.firstName + ' ' + editUser.lastName}</b>
          </DialogContentText>
          <form >
          <TextField
            id="notificacion"
            label="Escribir"
            multiline
            className='textCorreo'
            rows={4}
            variant="outlined"
            onChange={e => setEmailBody(e.target.value)}
        /></form>
        </DialogContent>
        <DialogActions>
          <Button onClick={closedModal} color="primary">
            Cancel
          </Button>
          <Button onClick={_onSend} color="primary">
            Enviar correo
          </Button>
        </DialogActions>
      </Dialog>
      </div>
    </div>
  );
}
