import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FormularioDeFacturacion.css'
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Buffer } from 'buffer';
import QRCode from 'qrcode';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const FormularioFactura = () => {
  const [qrDataURL, setQrDataURL] = useState('');
  const [mensajeRespuesta, setMensajeRespuesta] = useState('');
  const [datosFormulario, setDatosFormulario] = useState({
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
  

  const enviarSolicitudAServidorNode = async () => {
    try {
      const url = "http://192.168.0.104:8080/api/facturacion/generarfacturab/"
      const response = await axios.post(url, datosFormulario);
      const datosRespuesta = response.data;

        console.log(datosRespuesta);
       // console.log('El CAE es:', datosRespuesta.mensaje.response.cae)
       // console.log('FechVencimiento CAE es:', datosRespuesta.mensaje.response.cae)

      const { cae, vencimiento } = datosRespuesta.mensaje.response;
      const { CbteTipo, Concepto, DocNro, DocTipo, FchServDesde, FchServHasta, FchVtoPago, ImpIVA, ImpTotal, MonCotiz, MonId, PtoVta } = datosRespuesta.mensaje.response;
      console.log('CbteTipo', CbteTipo, 'Concepto', Concepto, 'DocNro', DocNro, 'DocTipo', DocTipo, 'FchServDesde', FchServDesde, 'FchServHasta', FchServHasta, 'FchVtoPago', FchVtoPago, 'ImpIVA', ImpIVA, 'ImpTotal', ImpTotal, 'MonCotiz', MonCotiz, 'MonId', MonId, 'PtoVta', PtoVta);

      const datosProcess = ` ${cae} -- ${vencimiento}`;
      setMensajeRespuesta(`La respuesta del servidor es: ${datosProcess}`);
    } catch (error) {
      console.error(error);
    }
  }

  const generarQR = async () => {
    try {
      const objetoParaQR = {
        ver: 1,
        fecha: "2023-06-02",
        cuit: 23388147539,
        ptoVta: 1,
        tipoCmp: 6,
        nroCmp: 185,
        importe: 121,
        moneda: "PES",
        ctz: 1,
        tipoDocRec: 99,
        nroDocRec: 31879266,
        tipoCodAut: 'E',
        codAut: 73229092478952
      };

      const jsonString = JSON.stringify(objetoParaQR);
      const jsonBaseSesentaYCuatro = Buffer.from(jsonString).toString('base64');

      const generarQR = 'https://www.afip.gob.ar/fe/qr/' + '?p=' + jsonBaseSesentaYCuatro;

      const qrData = await QRCode.toDataURL(generarQR);
      setQrDataURL(qrData);
      
      console.log('\nGenerar generarQR', generarQR);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    generarQR();
  }, []);

  const handleInputChange = (event) => {
    setDatosFormulario({
      ...datosFormulario,
      [event.target.name]: event.target.value
    });
  };

  const generatePDF = () => {
    const documentDefinition = {
      content: [
        {
          
          text: 'Factura',
          style: 'header'
        },
        {
          text: `Respuesta del servidor: ${mensajeRespuesta}`,
          style: 'subheader'
        },
        {
          layout: 'lightHorizontalLines', // optional
          table: {
            headerRows: 1,
            widths: ['*', 'auto', 100, '*'],

            body: [
              ['First', 'Second', 'Third', 'The last one'],
              ['Value 1', 'Value 2', 'Value 3', 'Value 4'],
              ['Val 1', 'Val 2', 'Val 3', 'Val 4']
            ]
          }
        },
        {
          image: qrDataURL,
          width: 200,
          height: 200,
          margin: [0, 20, 0, 0] // margen superior de 20 puntos
        }
      ],
      styles: {
        header: {
          fontSize: 22,
          bold: true,
          alignment: 'center',
          margin: [0, 0, 0, 20]
        },
        subheader: {
          fontSize: 14,
          bold: true,
          alignment: 'center',
          margin: [0, 0, 0, 10]
        }
      }
    };

    pdfMake.createPdf(documentDefinition).download('factura.pdf');
  };

  return (
    <div className="formulario">
      <h2>Formulario de Facturación</h2>
      <form onSubmit={enviarSolicitudAServidorNode}>
        <label>PtoVta:</label>
        <input
          type="text"
          name="PtoVta"
          value={datosFormulario.PtoVta}
          onChange={handleInputChange}
        />

        <label>CbteTipo:</label>
        <input
          type="text"
          name="CbteTipo"
          value={datosFormulario.CbteTipo}
          onChange={handleInputChange}
        />

        <label>Concepto:</label>
        <input
          type="text"
          name="Concepto"
          value={datosFormulario.Concepto}
          onChange={handleInputChange}
        />

        <label>DocTipo:</label>
        <input
          type="text"
          name="DocTipo"
          value={datosFormulario.DocTipo}
          onChange={handleInputChange}
        />

        <label>DocNro:</label>
        <input
          type="text"
          name="DocNro"
          value={datosFormulario.DocNro}
          onChange={handleInputChange}
        />

        <label>FchServDesde:</label>
        <input
          type="text"
          name="FchServDesde"
          value={datosFormulario.FchServDesde}
          onChange={handleInputChange}
        />

        <label>FchServHasta:</label>
        <input
          type="text"
          name="FchServHasta"
          value={datosFormulario.FchServHasta}
          onChange={handleInputChange}
        />

        <label>FchVtoPago:</label>
        <input
          type="text"
          name="FchVtoPago"
          value={datosFormulario.FchVtoPago}
          onChange={handleInputChange}
        />

        <label>ImpTotal:</label>
        <input
          type="text"
          name="ImpTotal"
          value={datosFormulario.ImpTotal}
          onChange={handleInputChange}
        />

        <label>ImpIVA:</label>
        <input
          type="text"
          name="ImpIVA"
          value={datosFormulario.ImpIVA}
          onChange={handleInputChange}
        />

        <label>MonId:</label>
        <input
          type="text"
          name="MonId"
          value={datosFormulario.MonId}
          onChange={handleInputChange}
        />

        <label>MonCotiz:</label>
        <input
          type="text"
          name="MonCotiz"
          value={datosFormulario.MonCotiz}
          onChange={handleInputChange}
        />

        <button type="submit">Enviar</button>
      </form>
      <button onClick={generatePDF}>Generar PDF</button>
    </div>
  );
};

export default FormularioFactura;
