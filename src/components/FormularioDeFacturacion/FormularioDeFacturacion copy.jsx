import React, { useState } from 'react';
import axios from 'axios';
import './FormularioDeFacturacion.css'
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Buffer } from 'buffer';
import QRCode from 'qrcode';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const FormularioFactura = () => {

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
        //const json = JSON.stringify(datosFormulario);
        const response = await axios.post(url, datosFormulario);
        const datosRespuesta = response.data;
        
        console.log(datosRespuesta);
       // console.log('El CAE es:', datosRespuesta.mensaje.response.cae)
       // console.log('FechVencimiento CAE es:', datosRespuesta.mensaje.response.cae)

        const {cae, vencimiento} =  datosRespuesta.mensaje.response
        const {CbteTipo, Concepto, DocNro, DocTipo, FchServDesde, FchServHasta, FchVtoPago, ImpIVA, ImpTotal, MonCotiz, MonId, PtoVta} = datosRespuesta.mensaje.response
       // console.log(cae)
       // console.log(vencimiento)
       console.log('CbteTipo',CbteTipo,'Concepto', Concepto,'DocNro', DocNro,'DocTipo', DocTipo,'FchServDesde', FchServDesde,'FchServHasta', FchServHasta,'FchVtoPago', FchVtoPago,'ImpIVA', ImpIVA,'ImpTotal', ImpTotal,'MonCotiz', MonCotiz,'MonId', MonId,'PtoVta', PtoVta);

        const datosProcess = ` ${cae} -- ${vencimiento}`
        //console.log(datosProcess)
        setMensajeRespuesta(`La respuesta del servidor es: ${datosProcess}`)
      // Haz algo con los datos de respuesta del servidor Node.js
    } catch (error) {
      console.error(error);
    }
  }
  
  const docDefinition = {
    content: [
      {text: `This is a header ${Math.random()*100}`, style: 'header'},
      'No styling here, this is a standard paragraph',
      {text: 'Another text', style: 'anotherStyle'},
      {text: 'Multiple styles applied', style: ['header', 'anotherStyle']},
    ],

    styles: {
      header: {
        fontSize: 22,
        bold: true,
      },
      anotherStyle: {
        italics: true,
        alignment: 'right',
      },
    },
  };

  const createPdf = () => {
    const pdfGenerator = pdfMake.createPdf(docDefinition);
    pdfGenerator.getBlob((blob) => {
      const url = URL.createObjectURL(blob);
      setUrl(url)
    })
    pdfGenerator.download()
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    enviarSolicitudAServidorNode();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatosFormulario((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

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
  }
  const jsonString = JSON.stringify(objetoParaQR);
  const jsonBaseSesentaYCuatro = Buffer.from(jsonString).toString('base64');;

  const generarQR = 'https://www.afip.gob.ar/fe/qr/' + '?p=' + jsonBaseSesentaYCuatro;

  console.log('JSON Base 64: ', jsonBaseSesentaYCuatro);
  console.log('\nGenerar QR', generarQR);
  const qrDataURL = QRCode.toDataURL(generarQR);
   qrDataURL.then( dataQR => {dataQR});

  const generatePDF = () => {
    const data = {
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
    };

    const documentDefinition = {
      content: [
        {
          text: 'Factura',
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 20] // margen inferior de 20 puntos
        },
        {
          text: `Punto de Venta: ${data.PtoVta}`,
          fontSize: 12
        },
        {
          text: `Tipo de Comprobante: ${data.CbteTipo}`,
          fontSize: 12
        },
        {
          text: `Concepto: ${data.Concepto}`,
          fontSize: 12
        },
        {
          text: `Tipo de Documento: ${data.DocTipo}`,
          fontSize: 12
        },
        {
          text: `Número de Documento: ${data.DocNro}`,
          fontSize: 12
        },
        {
          text: `Fecha de Servicio Desde: ${data.FchServDesde}`,
          fontSize: 12
        },
        {
          text: `Fecha de Servicio Hasta: ${data.FchServHasta}`,
          fontSize: 12
        },
        {
          text: `Fecha de Vencimiento de Pago: ${data.FchVtoPago}`,
          fontSize: 12
        },
        {
          text: `Importe Total: ${data.ImpTotal}`,
          fontSize: 12
        },
        {
          text: `IVA: ${data.ImpIVA}%`,
          fontSize: 12
        },
        {
          text: `Moneda: ${data.MonId}`,
          fontSize: 12
        },
        {
          text: `Cotización Moneda: ${data.MonCotiz}`,
          fontSize: 12
        },
        {
          image: dataQR,
          width: 200,
          height: 200,
          margin: [0, 20, 0, 0] // margen superior de 20 puntos
        }
      ]
    };

    pdfMake.createPdf(documentDefinition).download('factura.pdf');
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
        <button onClick={generatePDF}>Generar PDF</button>
        </form>
        <h2>{mensajeRespuesta}</h2>
    </>
  );
};

export default FormularioFactura;