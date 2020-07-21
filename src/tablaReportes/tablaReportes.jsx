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
import DeleteIcon from '@material-ui/icons/Delete';
import EmailIcon from '@material-ui/icons/Email';
import Paper from "@material-ui/core/Paper";
import Menu from '@material-ui/core/Menu';
import Link from '@material-ui/core/Link';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CloseIcon from '@material-ui/icons/Close';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import { getLocalToken } from '../api/auth'
import qs from 'querystring';
import axios from 'axios';
import './tablaReportes.css';
import { Input } from "@material-ui/core";
import { setToken } from '../api/auth';
import { host } from "../core/environment";

export default function TablaReportes() {

  const [modalVisible, setModalVisible] = useState(false);
  const [modalUser, setModalUser] = useState(false);
  const [users, setUsers] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [editUser, setEditUser] = useState({region: {value: undefined}, commune: {value: undefined}});
  const [destinatario, setDestinatario] = useState('');
  const [cuerpoMsj, setCuerpoMsj] = useState('');
  const token = qs.parse(getLocalToken()).access_token;
  const [emailBody, setEmailBody] = useState('');
  const [userModal, setUserModal] = useState({});
  const moment = require('moment');

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const pointer = {cursor: 'pointer'};

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

      const res = await axios.get(`${host}/report`, headers);

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
        title: 'No ha sido aceptado su registro',
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
  const endpoint = `${host}/user/${userId}/disable`;

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

    };
  const _onModalUserTo = (user) => {
    handleClose(false);
    setUserModal(user);
    setModalUser(true);


  };
  const _onCloseModalUser = () => {
    handleClose(false);
    setModalUser(false)


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
            <TableCell><b>Usuario que reporta</b></TableCell>
            <TableCell><b>Usuario reportado</b></TableCell>
            <TableCell><b>Mensaje</b></TableCell>
            <TableCell><b>Fecha de registro</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>

          {users.map(row => (
            <TableRow key={row.key} >
              <TableCell component="th" scope="row"><b><Link onClick={() => _onModalUserTo(row.fromUser)} >{row.fromUser.rut}</Link></b></TableCell>
              <TableCell component="th" scope="row"><b><Link onClick={() => _onModalUserTo(row.toUser)} >{row.toUser.rut}</Link></b></TableCell>
              <TableCell component="th" scope="row">{row.message}</TableCell>
              <TableCell component="th" scope="row">{moment(row.date).format('DD-MM-YYYY HH:MM')}</TableCell>
              <ClearIcon style={pointer} onClick={() => _onActivate(row.toUser.key)}>Deshabilitar</ClearIcon>
              <EmailIcon style={pointer} onClick={() => _onSendEmail(row.toUser.email,row)}>Enviar correo</EmailIcon>
              <DeleteIcon style={pointer} onClick={() => _onDelete(row.toUser.key)}>Eliminar usuario</DeleteIcon>
            </TableRow>
          )
          )}
        </TableBody>
      </Table>
    </Paper>
    <div>
    <Dialog open={modalVisible} onClose={setModalVisible} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Notificar</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enviar correo
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
      <div>
      <Dialog open={modalUser}  onClose={setModalUser} aria-labelledby="form-dialog-title">
      <DialogTitle id="customized-dialog-title">
          Información del usuario reportado
        </DialogTitle>
        <DialogContent dividers>
          <DialogContentText>
            <b>Rut:</b> {userModal.rut}
            <br/>
            <b>Nombre:</b> {userModal.firstName}
            <br/>
            <b>Apellido:</b> {userModal.lastName}
            <br/>
            <b>Email:</b> {userModal.email}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={_onCloseModalUser} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
      </div>
    </div>
  );
}
