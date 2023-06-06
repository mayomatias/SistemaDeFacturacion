import React, { useState, useEffect } from 'react';
import axios from 'axios';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Buffer } from 'buffer';
import QRCode from 'qrcode';

const FormularioDeFacturacionBeta = () => {
   
    const [datosVendedor, setDatosVendedor] = useState({
        CuitVendedor: 23388147539,
        nombreComercial: 'gammershop',
        razonSocial: 'Matias Andres Mayo',
        direccion: 'Mitre 424',
        telefono: '3482 217996',
        condiciónIva: 'Monotributo CAT 3',
        ingresosBrutos: 1234567891011,
        fechaInicioActividades: '31/05/2023'
    });
    const [datosEnvioBack, setDatosEnvioBack] = useState({
      CuitVendedor: 23388147539,
      PtoVta: "1",
      CbteTipo: "6",
      Concepto: 1,
      DocTipo: "90",
      DocNro: "38814753",
      FchServDesde: "22",
      FchServHasta: "22",
      FchVtoPago: "22",
      ImpTotal: "5000",
      ImpIVA: 21,
      MonId: "PES",
      MonCotiz: 1
    });
     const [objetoParaQR, setObjetoParamQR] = useState({
        ver: 1,
        fecha: null,
        cuit: datosVendedor.cuit,
        ptoVta: datosEnvioBack.PtoVta,
        tipoCmp: datosEnvioBack.CbteTipo,
        nroCmp: null,
        importe: datosEnvioBack.ImpTotal,
        moneda: datosEnvioBack.MonId,
        ctz: datosEnvioBack.MonCotiz,
        tipoDocRec: datosEnvioBack.DocTipo,
        nroDocRec: datosEnvioBack.DocNro,
        tipoCodAut: 'E', //autompletar con los datos de la factura
        codAut: null
    });
 

//-------------Metodos para eventos---------------//
    const enviarSolicitudAServidorNode = async () => {
        
        
        try {
            const url = "http://192.168.0.104:8080/api/facturacion/generarfacturab/"
            const response = await axios.post(url, datosEnvioBack);
            const datosRespuesta = response.data;
            
            console.log(response.data);

            const { CantReg, FechaComprobante, NumFactura, Cae, Vencimiento } = datosRespuesta.mensaje.response;
            console.log(`La respuesta del servidor es: \n\tCantidad de registros: ${CantReg}\n\tFecha emisión: ${FechaComprobante} \n\tNumero de factura: ${NumFactura} \n\tEl CAE es: ${Cae} \n\tFecha de vencimiento: ${Vencimiento} `);

            

            setObjetoParamQR(
                {
                    ver: CantReg,
                    fecha: FechaComprobante,
                    cuit: await datosVendedor.cuit,
                    ptoVta: datosEnvioBack.PtoVta,
                    tipoCmp: datosEnvioBack.CbteTipo,
                    nroCmp: NumFactura,
                    importe: datosEnvioBack.ImpTotal,
                    moneda: datosEnvioBack.MonId,
                    ctz: datosEnvioBack.MonCotiz,
                    tipoDocRec: datosEnvioBack.DocTipo,
                    nroDocRec: datosEnvioBack.DocNro,
                    tipoCodAut: 'E', //autompletar con los datos de la factura
                    codAut: await Cae
                }
            )

           console.log(`Datos para QR: \n ${objetoParaQR.codAut}`)

          } catch (error) {
            console.error(error);
        }
    }
    const handleInputChange = (event) => {
        setDatosEnvioBack({
            ...datosEnvioBack,
            [event.target.name]: event.target.value
        });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        enviarSolicitudAServidorNode();
    };

    return (
        <div className="formulario">
          <h2>Formulario de Facturación</h2>
          <form onSubmit={handleSubmit}>
            <label>PtoVta:</label>
            <input
              type="text"
              name="PtoVta"
              value={datosEnvioBack.PtoVta}
              onChange={handleInputChange}
            />
    
            <label>CbteTipo:</label>
            <input
              type="text"
              name="CbteTipo"
              value={datosEnvioBack.CbteTipo}
              onChange={handleInputChange}
            />
    
            <label>Concepto:</label>
            <input
              type="text"
              name="Concepto"
              value={datosEnvioBack.Concepto}
              onChange={handleInputChange}
            />
    
            <label>DocTipo:</label>
            <input
              type="text"
              name="DocTipo"
              value={datosEnvioBack.DocTipo}
              onChange={handleInputChange}
            />
    
            <label>DocNro:</label>
            <input
              type="text"
              name="DocNro"
              value={datosEnvioBack.DocNro}
              onChange={handleInputChange}
            />
    
            <label>FchServDesde:</label>
            <input
              type="text"
              name="FchServDesde"
              value={datosEnvioBack.FchServDesde}
              onChange={handleInputChange}
            />
    
            <label>FchServHasta:</label>
            <input
              type="text"
              name="FchServHasta"
              value={datosEnvioBack.FchServHasta}
              onChange={handleInputChange}
            />
    
            <label>FchVtoPago:</label>
            <input
              type="text"
              name="FchVtoPago"
              value={datosEnvioBack.FchVtoPago}
              onChange={handleInputChange}
            />
    
            <label>ImpTotal:</label>
            <input
              type="text"
              name="ImpTotal"
              value={datosEnvioBack.ImpTotal}
              onChange={handleInputChange}
            />
    
            <label>ImpIVA:</label>
            <input
              type="text"
              name="ImpIVA"
              value={datosEnvioBack.ImpIVA}
              onChange={handleInputChange}
            />
    
            <label>MonId:</label>
            <input
              type="text"
              name="MonId"
              value={datosEnvioBack.MonId}
              onChange={handleInputChange}
            />
    
            <label>MonCotiz:</label>
            <input
              type="text"
              name="MonCotiz"
              value={datosEnvioBack.MonCotiz}
              onChange={handleInputChange}
            />
    
            <button type="submit">Enviar</button>
          </form>
          <button>Generar PDF</button>
        </div>
      );

}

export default FormularioDeFacturacionBeta;