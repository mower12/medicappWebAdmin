import React from 'react'
import BasicLayout from '../../basiLayout'
import TablaValidarRegistro from '../../tablaValidarRegistro'


const ValidarUsuario = () => {

    

    return(
        <BasicLayout>
            <h1>Paramédicos pendientes de validación</h1>
        <TablaValidarRegistro />
        </BasicLayout> 
    )
}

export default ValidarUsuario;