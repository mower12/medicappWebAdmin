import validarRegistro from '../page/validarRegistro';
import reportes from '../page/reportes';
import usuarios from '../page/usuarios';
import error404 from '../page/error404';

export default [
    {
        path: "/",
        exact: true,
        page: validarRegistro
    },
    {
        path: "/validarRegistro",
        exact: true,
        page: validarRegistro
    },
    {
        path: "/reportes",
        exact: true,
        page: reportes
    },
    {
        path: "/usuarios",
        exact: true,
        page: usuarios
    },
    {
        path: "*",
        exact: true,
        page: error404
    }

]