import React from "react";
import axios from "axios";

const FormularioDeFacturacion = () => {

    const enviarSolicitudAServidorNode = async () => {
        const datos ={
            "title": "prueba MATI",
            "description": "Prueba React!",
            "code": "# prueba prueba WEBSOKET1",
            "price": 100,
            "status": true,
            "category": "notebooks",
            "thumbnail": ["modificado put","modificado put 2"],		
            "stock": 1
        }

        console.log("Hola Mundo")
        try {
            const url = "http://192.168.0.105:8080/enviar-datos-react"
            const json = JSON.stringify(datos);
            const response = await axios.post(url, { json } );
            const datosRespuesta = response.data;
            console.log(datosRespuesta);
      
          // Haz algo con los datos de respuesta del servidor Node.js
        } catch (error) {
          console.error(error);
        }
    };


    return(
        <button onClick={ enviarSolicitudAServidorNode }>Formulario</button>
    )
}

export default FormularioDeFacturacion;