import React, { Children } from 'react'
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { logout } from "../api/auth";
import { makeStyles } from '@material-ui/core/styles';
import './basicLayout.css';
import Avatar from '@material-ui/core/Avatar';
import Logo from '../css/images/logoLayout.png';

const useStyles = makeStyles((theme) => ({
    
   '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing(2),
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
  offset: theme.mixins.toolbar
  }));

export default function Pricing (props){
    
    const {children} = props;
    const classes = useStyles();
    const logoutApi = () => {
        logout();
        window.location.reload();
    }

    return(

    <div>
      <AppBar color="default" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
          <img className='imagen' src={Logo}/> 
          </Typography>
          <nav>
            <Link variant="button" color="textPrimary" href="/validarRegistro" className={classes.link}>
              Validar Registro
            </Link>
            <Link variant="button" color="textPrimary" href="/reportes" className={classes.link}>
              Reportes
            </Link>
            <Link variant="button" color="textPrimary" href="/usuarios" className={classes.link}>
              Usuarios
            </Link>
          </nav>
          <Button href="" onClick={logoutApi} color="primary" variant="outlined" className={classes.link}>
            Cerrar sesion
          </Button>
          <Avatar>A</Avatar>
        </Toolbar>
      </AppBar>
      <div className= {classes.offset}></div>
    {children}
    </div>

    )
}