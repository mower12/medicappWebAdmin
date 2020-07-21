import React from 'react'
import BasicLayout from '../../basiLayout'
import TablaValidarRegistro from '../../tablaValidarRegistro'


const ValidarUsuario = () => {

    

    return(
        <BasicLayout>
            <h2>Paramédicos pendientes de validación</h2>
        <TablaValidarRegistro />
        </BasicLayout> 
    )
}

export default ValidarUsuario;