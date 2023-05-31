import React, { useState } from 'react';
import axios from 'axios';
import './FormularioDeFacturacion.css'

const FormularioFactura = () => {

    const [mensajeRespuesta, setMensajeRespuesta] = useState(''); 
    const [datosFormulario, setDatosFormulario] = useState({
        CantReg: 1,
        PtoVta: '',
        CbteTipo: '',
        Concepto: '',
        DocTipo: '',
        DocNro: '',
        CbteDesde: '',
        CbteHasta: '',
        CbteFch: '',
        FchServDesde: '',
        FchServHasta: '',
        FchVtoPago: '',
        ImpTotal: 0,
        ImpTotConc: 0,
        ImpNeto: 0,
        ImpOpEx: 0,
        ImpIVA: 0,
        ImpTrib: 0,
        MonId: 'PES',
        MonCotiz: 1,
        Iva: [],
    });
  const enviarSolicitudAServidorNode = async () => {
    try {
        const url = "http://localhost:8080/enviar-datos-react"
        //const json = JSON.stringify(datosFormulario);
        const response = await axios.post(url, datosFormulario);
        const datosRespuesta = response.data;
        setMensajeRespuesta(`La respuesta del servidor es: ${datosRespuesta.mensaje}`)
        console.log(datosRespuesta);
      // Haz algo con los datos de respuesta del servidor Node.js
    } catch (error) {
      console.error(error);
    }

  }
  const handleSubmit = (e) => {
    e.preventDefault();
    enviarSolicitudAServidorNode();
    // Aquí puedes realizar alguna acción con los datos del formulario, como enviarlos al servidor
   
    console.log(datosFormulario); // Imprime los datos capturados en la consola
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatosFormulario((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return( 
  <>
        <form onSubmit={handleSubmit}>
        {/* Agrega los campos del formulario con sus correspondientes etiquetas */}
        <label>
            Punto de Venta: 
            <input
            type="text"
            name="PtoVta"
            value={datosFormulario.PtoVta}
            onChange={handleChange}
            />
        </label>
        <label>
            Tipo de factura:
            <input
            type="text"
            name="CbteTipo"
            value={datosFormulario.CbteTipo}
            onChange={handleChange}
            />
        </label>
        <label>
            Concepto:
            <input
            type="text"
            name="Concepto"
            value={datosFormulario.Concepto}
            onChange={handleChange}
            />
        </label>
        <label>
            Tipo de Doc:
            <input
            type="number"
            name="DocTipo"
            value={datosFormulario.DocTipo}
            onChange={handleChange}
            />
        </label>
        <label>
            Numero de Documento:
            <input
            type="number"
            name="DocNro"
            value={datosFormulario.DocNro}
            onChange={handleChange}
            />
        </label>
        <label>
            Importe Total: 
            <input
            type="number"
            name="ImpTotal"
            value={datosFormulario.ImpTotal}
            onChange={handleChange}
            />
        </label>
        <button type="submit">Enviar</button>
        </form>
        <h2>{mensajeRespuesta}</h2>
    </>
  );
};

export default FormularioFactura;