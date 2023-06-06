// import

//---------DATOS VENDEDOR---------//
const datosVendedor = {
    cuit: 23388147539,
    nombreComercial: 'gammershop',
    razonSocial: 'Matias Andres Mayo',
    direccion: 'Mitre 424',
    telefono: '3482 217996',
    condiciónIva: 'Monotributo CAT 3',
    ingresosBrutos: 1234567891011,
    fechaInicioActividades: '31/05/2023'
};

//---------FORM IMPUT INGRESO DE DATOS---------//



//---------DATOS ENVIAR AL BACKEND---------//
const datosEnvioBack = {
    
    CuitVendedor: datosVendedor.cuit,
    PtoVta: "1",
    CbteTipo: "6",
    Concepto: 1,
    DocTipo: "90",
    DocNro: "38814753",
    FchServDesde: "22",
    FchServHasta: "22",
    FchVtoPago: "22",
    ImpTotal: "5000",  //va a ser la sumatoria del imput de los productos cargados con iva
    ImpIVA: 21,
    MonId: "PES",
    MonCotiz: 1
  };

    /*AGREGAGAR TODOO EL METODO POST Y respuesta del backend*/


//---------GENERACION QR EMIT FACTURA --------//
const objetoParaQR = {
    ver: 1,
    fecha: RESPUESTABACK.FECHA,
    cuit: datosVendedor.cuit,
    ptoVta: datosEnvioBack.PtoVta,
    tipoCmp: datosEnvioBack.CbteTipo,
    nroCmp: RESPUESTABACK.N|COMPROBANTE,
    importe: datosEnvioBack.ImpTotal,
    moneda: datosEnvioBack.MonId,
    ctz: datosEnvioBack.MonCotiz,
    tipoDocRec: datosEnvioBack.DocTipo,
    nroDocRec: datosEnvioBack.DocNro,
    tipoCodAut: 'E', //autompletar con los datos de la factura
    codAut: RESPUESTABACK.CAE
  };


  //---------COMPILACION CODIGO --------//