import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const FormularioFactura = () => {
  const [datosFormulario, setDatosFormulario] = useState({});
  const [mensajeRespuesta, setMensajeRespuesta] = useState('');
  const [qrDataURL, setQrDataURL] = useState('');

  const enviarSolicitudAServidorNode = async (event) => {
    event.preventDefault();
    try {
      // Código para enviar la solicitud al servidor Node.js
      // y recibir la respuesta
      setMensajeRespuesta('Respuesta del servidor');
    } catch (error) {
      console.error(error);
    }
  };

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
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    generarQR();
  }, []);

  const generatePDF = () => {
    const documentDefinition = {
      content: [
        {
          columns: [
            {
              width: '40%',
              text: [
                { text: 'CUIT: 30-00000000-7\n', bold: true },
                { text: 'Comprobante emitido por responsable inscripto' },
              ],
            },
            {
              width: '60%',
              text: [
                { text: 'Original\n', alignment: 'right' },
                { text: 'Duplicado\n', alignment: 'right' },
              ],
            },
          ],
        },
        {
          columns: [
            {
              width: '50%',
              text: [
                { text: '00000094', fontSize: 20, bold: true },
                { text: ' - ', fontSize: 16 },
                { text: '001', fontSize: 16 },
              ],
            },
            {
              width: '50%',
              text: [
                { text: 'Punto de Venta: 00010', alignment: 'right' },
                { text: 'Fecha de Emisión: 31/12/2021', alignment: 'right' },
              ],
            },
          ],
        },
        {
          table: {
            widths: ['*', '*', '*', '*', '*', '*', '*'],
            body: [
              [
                { text: 'Comprobante Autorizado - Original', colSpan: 7, alignment: 'center', bold: true, fontSize: 14 },
                {},
                {},
                {},
                {},
                {},
                {},
              ],
              [
                { text: 'A', bold: true, fontSize: 14 },
                { text: 'B', bold: true, fontSize: 14 },
                { text: 'C', bold: true, fontSize: 14 },
                { text: 'D', bold: true, fontSize: 14 },
                { text: 'E', bold: true, fontSize: 14 },
                { text: 'F', bold: true, fontSize: 14 },
                { text: 'G', bold: true, fontSize: 14 },
              ],
              [
                { text: '1', bold: true, fontSize: 14 },
                { text: '2', bold: true, fontSize: 14 },
                { text: '3', bold: true, fontSize: 14 },
                { text: '4', bold: true, fontSize: 14 },
                { text: '5', bold: true, fontSize: 14 },
                { text: '6', bold: true, fontSize: 14 },
                { text: '7', bold: true, fontSize: 14 },
              ],
              [
                { text: '8', bold: true, fontSize: 14 },
                { text: '9', bold: true, fontSize: 14 },
                { text: '0', bold: true, fontSize: 14 },
                { text: '1', bold: true, fontSize: 14 },
                { text: '2', bold: true, fontSize: 14 },
                { text: '3', bold: true, fontSize: 14 },
                { text: '4', bold: true, fontSize: 14 },
              ],
            ],
          },
        },
        {
          columns: [
            {
              width: '50%',
              text: [
                { text: 'Cliente: Nombre del Cliente\n', bold: true },
                { text: 'Domicilio: Dirección del Cliente' },
              ],
            },
            {
              width: '50%',
              text: [
                { text: 'CUIT: 30-00000000-7\n', bold: true },
                { text: 'Condición frente al IVA: Responsable inscripto' },
              ],
            },
          ],
        },
        {
          columns: [
            {
              width: '100%',
              text: [
                { text: 'Detalle de productos o servicios:\n', bold: true },
                { text: 'Producto 1 - $100\n' },
                { text: 'Producto 2 - $200\n' },
                { text: 'Producto 3 - $300\n' },
              ],
            },
          ],
        },
        {
          columns: [
            {
              width: '50%',
              text: [
                { text: 'Subtotal: $600\n', bold: true },
                { text: 'IVA 21%: $126\n' },
                { text: 'Total: $726', bold: true },
              ],
            },
            {
              width: '50%',
              text: [
                { text: 'Importe total en letras: Setecientos veintiséis pesos' },
              ],
            },
          ],
        },
        {
          columns: [
            {
              width: '100%',
              text: [
                { text: 'Código de barras:\n', bold: true },
                { text: '*********************', fontSize: 24 },
              ],
              alignment: 'center',
            },
          ],
        },
        {
          columns: [
            {
              width: '100%',
              image: qrDataURL,
              alignment: 'center',
            },
          ],
        },
        {
          columns: [
            {
              width: '100%',
              text: [
                { text: 'Resumen de montos:', bold: true },
                { text: 'Subtotal: $600\n' },
                { text: 'IVA 21%: $126\n' },
                { text: 'Total: $726', bold: true },
              ],
            },
          ],
        },
      ],
    };

    pdfMake.createPdf(documentDefinition).open();
  };

  const handleInputChange = (event) => {
    setDatosFormulario({ ...datosFormulario, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <h1>Formulario Factura</h1>
      <form onSubmit={enviarSolicitudAServidorNode}>
        {/* Campos del formulario */}
        <button type="submit">Generar Factura</button>
      </form>
      {mensajeRespuesta && <p>{mensajeRespuesta}</p>}
      <button onClick={generatePDF}>Generar PDF</button>
    </div>
  );
};

export default FormularioFactura;
