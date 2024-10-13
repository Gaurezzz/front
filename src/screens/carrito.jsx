import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image,  Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import { useCart, useContext } from './CartContext';
import { API_TOKEN_USER, API_TOKEN_PWD, API_URL_FACTURACION,API_FIRMAR_PWD, API_URL_FIRMADOR } from '@env';


const Carrito = () => {

  const { cart, removeFromCart, updateQuantity, calculateTotal } = useCart();  
  const [tokenFacturacion, setTokenFacturacion] = useState("");
  const [tipoDTE, setTipoDTE] = useState("01");
  const [numControl, setNumControl] = useState("");
  const [fechaDia, setFechaDia] = useState("");
  const [id_Emisor, setIdEmisor] = useState("");
  const [nitE, setNitE] = useState("");
  const [nrcE, setNrcE] = useState("");
  const [nombreE, setNombreE] = useState("");
  const [codActividadE, setCodActividadE] = useState("");
  const [desActividadE, setDesActividadE] = useState("");
  const [codEstablecimiento, setCodEstablecimiento] = useState("");
  const [departamentoE, setDepartamentoE] = useState("");
  const [municipioE, setMunicipioE] = useState("");
  const [complementoE, setComplementoE] = useState("");
  const [telefonoE, setTelefonoE] = useState("");
  const [correoE, setCorreoE] = useState("");
  const [id_Receptor, setIdReceptor] = useState("");
  const [tipoDocumentoR, setTipoDocumentoR] = useState("");
  const [numDocumentoR, setNumDocumentoR] = useState("");
  const [nombreR, setNombreR] = useState("");
  const [codActividadR, setCodActividadR] = useState("");
  const [desActividadR, setDesActividadR] = useState("");
  const [municipioR, setMunicipioR] = useState("");
  const [departamentoR, setDepartamentoR] = useState("");
  const [telefonoR, setTelefonoR] = useState("");
  const [correoR, setCorreoR] = useState("");
  const [complementoR, setComplementoR] = useState("");

  //Obtener datos de emisor
  useEffect(() => {
    axios
      .get(`${API_URL_FACTURACION}/api/emisores/06142803901121`, { timeout: 10000 })
      .then((response) => {
        setIdEmisor(response.data.datos[0].id);
        setNitE(response.data.datos[0].nit);
        setNrcE(response.data.datos[0].nrc);
        setNombreE(response.data.datos[0].n_Emisor);
        setCodActividadE(response.data.datos[0].cod_Actividad);
        setDesActividadE(response.data.datos[0].des_Actividad);
        setCodEstablecimiento(response.data.datos[0].cod_Establecimiento);
        setDepartamentoE(response.data.datos[0].cod_Departamento);
        setMunicipioE(response.data.datos[0].cod_Municipio);
        setComplementoE(response.data.datos[0].complemento);
        setTelefonoE(response.data.datos[0].telefono);
        setCorreoE(response.data.datos[0].correo);
      })
      .catch((error) => {
        console.error("Error al obtener datos de emisor disponibles:", error);
      });
},[]);

//Obtener datos de receptor 
  useEffect(() => {
    if (numDocumentoR) {
      axios
        .get(`${API_URL_FACTURACION}/api/receptores/${numDocumentoR}`, { timeout: 10000 })
        .then((response) => {
          setIdReceptor(response.data.receptor[0].id);
          setTipoDocumentoR(response.data.receptor[0].cod_documento);
          setNombreR(response.data.receptor[0].n_receptor);
          setCodActividadR(response.data.receptor[0].cod_Actividad);
          setDesActividadR(response.data.receptor[0].des_Actividad);
          setTelefonoR(response.data.receptor[0].telefono);
          setCorreoR(response.data.receptor[0].correo);
          setDepartamentoR(response.data.receptor[0].cod_Departamento);
          setMunicipioR(response.data.receptor[0].cod_Municipio);
          setComplementoR(response.data.receptor[0].complemento);
        })
        .catch((error) => {
          console.error("Error al obtener datos de receptor disponibles:", error);
        });
    } else {
      getReceptorDocumento();
    }
  }, [numDocumentoR]);

  const getReceptorDocumento = async () => {
    try {
      const receptorDocumento = await AsyncStorage.getItem('numDocumento');
      if (receptorDocumento) {
        setNumDocumentoR(receptorDocumento);
      }
    } catch (error) {
      console.error('Error al obtener el numero de documento desde AsyncStorage:', error);
    }
  };

  const formatearHora = () => {
    const ahora = new Date();
    const horas = String(ahora.getHours()).padStart(2, '0'); 
    const minutos = String(ahora.getMinutes()).padStart(2, '0');  
    const segundos = String(ahora.getSeconds()).padStart(2, '0');  
    return `${horas}:${minutos}:${segundos}`;  // Retorna en formato HH:MM:SS
  };

  const obtenerFechaActual = () => {
    try {
      const hoy = new Date();
      const anio = hoy.getFullYear();
      const mes = String(hoy.getMonth() + 1).padStart(2, '0'); 
      const dia = String(hoy.getDate()).padStart(2, '0');
      
      // Formato [yyyy-MM-dd]
      return `${anio}-${mes}-${dia}`;
    } catch (error) {
      console.error("Error al obtener la fecha actual:", error);
      return null; 
    }
  };

  const generarNumControl = async () => {
    try {
      const response = await axios.get(`${API_URL_FACTURACION}/api/documentos/ultimo-num-control`, { timeout: 1000000 });
      const ultimoSecuencial = response.data.secuencial;
  
      // Generar los valores necesarios
      const siglas = 'DTE';
      const codigoTipoDocumento = tipoDTE; 
      const codigoEstablecimiento = 'DPS00101';
      const nuevoSecuencial = (ultimoSecuencial).toString().padStart(15, '0'); 
  
      // Construir el num_Control completo
      const num_Control = `${siglas}-${codigoTipoDocumento}-${codigoEstablecimiento}-${nuevoSecuencial}`;
      
      setNumControl(num_Control);
      return num_Control; 
    } catch (error) {
      console.error('Error al generar el número de control:', error);
      return null; 
    }
  };

  // Funcion para generar un codigo de generacion (UUIDV4)
  const generarCodGeneracion = () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx"
    .replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0;
      const v = c == "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    })
    .toUpperCase();
  };

  //Generar y guardar un nuevo token
  const generarNuevoToken = async () => {
    const user = API_TOKEN_USER;
    const password = API_TOKEN_PWD;

    const data = new URLSearchParams();
    data.append('user', user);
    data.append('pwd', password);

    try {
      const response = await axios.post('https://apitest.dtes.mh.gob.sv/seguridad/auth', data.toString(), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      const nuevoToken = response.data.body.token;
      const fechaActual = new Date().toISOString().split('T')[0];

      const resData = await fetch(`${API_URL_FACTURACION}/api/tokens/guardar-token`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "bearer_Token": nuevoToken,
          "fecha_Emision": fechaActual,
          "estado": "Activo",
          "id_emisor": 1,
        }),
      }).then(res => res.json());

      if (resData.status === 201) {
        console.log(resData.message);
        setTokenFacturacion(nuevoToken);
        setFechaDia(fechaActual);
      } else {
        console.log(resData.message);
      }

    } catch (error) {
      console.error("Error al generar el token:", error);
      throw error;
    }
  };

  //Funcion el token de facturacion
  const obtenerToken = async () => {
    const fechaDia = new Date().toISOString().split('T')[0];
    try {
      const responseToken = await axios.get(`${API_URL_FACTURACION}/api/tokens/activo`);
  
      // Verificar si no hay token activo o si el token tiene un estado 404
      if (!responseToken.data.Token || responseToken.data.status === 404) {
        await generarNuevoToken(); 
      } else {
        const tokenActivo = responseToken.data.Token[0];
        
        // Si el token es de una fecha diferente, inactivarlo y generar uno nuevo
        if (tokenActivo.fecha_Emision !== fechaDia) {
          await fetch(`${API_URL_FACTURACION}/api/tokens/${tokenActivo.id}/actualizar-estado`, {
            method: 'PATCH',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              "estado": "Inactivo",
            }),
          })
          .then((res) => res.json())
          .then(async (resData) => {
            if (resData.status === 200) {
              console.log(resData.message);
              await generarNuevoToken(); // Generar un nuevo token después de inactivar el anterior
            } else {
              console.log(resData.message);
            }
          })
          .catch((error) => {
            console.error("Error al actualizar el token:", error);
          });
        } else {
          // Si el token es válido, configurarlo
          setTokenFacturacion(tokenActivo.bearer_Token);
          setFechaDia(fechaDia);
          return tokenActivo.bearer_Token; // Retornar el token
        }
      }
    } catch (error) {
      console.error("Error al obtener el token:", error);
      await generarNuevoToken();
    }
  
    return await axios.get(`${API_URL_FACTURACION}/api/tokens/activo`).then(res => res.data.Token[0].bearer_Token).catch(() => null);
  };

  //Funcion para obtener los datos detalles de los productos
  const datosDetalles = () => {
    const detalles = [];
  
    cart.forEach((item, index) => {
      const code = item.code;
      const qty = item.quantity;
      const description = item.name;
      let price = parseFloat(item.price.replace('$', ''));
      let total = price * qty;
  
      // Redondear el precio y el total a dos decimales
      price = Math.round(price * 100) / 100;
      total = Math.round(total * 100) / 100;
  
      let ivaItem = 0;
      let ventaGravada = 0;
  
      ventaGravada = Math.round((price * qty) * 100) / 100;
      ivaItem = Math.round((ventaGravada - (price / 1.13) * qty) * 100) / 100;
  
      // Crear el detalle
      let detalle = {
        numItem: index + 1,
        tipoItem: 1,
        numeroDocumento: null,
        codigo: code,
        descripcion: description,
        cantidad: qty,
        uniMedida: 59,
        precioUni: price,
        montoDescu: 0.0,
        ventaNoSuj: 0.0,
        ventaExenta: 0.0,
        ventaGravada: ventaGravada,
        psv: 0.0,
        noGravado: 0.0,
        tributos: null,
        codTributo: null,
        ivaItem: ivaItem
      };
  
      detalles.push(detalle);
    });
  
    return detalles;
  };

  // Función para convertir números a letras
  const convertirNumeroALetras = (num) => {
    const unidades = ["", "UNO", "DOS", "TRES", "CUATRO", "CINCO", "SEIS", "SIETE", "OCHO", "NUEVE"];
    const decenas = ["", "DIEZ", "VEINTE", "TREINTA", "CUARENTA", "CINCUENTA", "SESENTA", "SETENTA", "OCHENTA", "NOVENTA"];
    const centenasArray = ["", "CIENTO", "DOSCIENTOS", "TRESCIENTOS", "CUATROCIENTOS", "QUINIENTOS", "SEISCIENTOS", "SETECIENTOS", "OCHOCIENTOS", "NOVECIENTOS"];
    const especialesDiez = ["DIEZ", "ONCE", "DOCE", "TRECE", "CATORCE", "QUINCE", "DIECISEIS", "DIECISIETE", "DIECIOCHO", "DIECINUEVE"];
    const especialesVeinte = ["", "VEINTIUNO", "VEINTIDOS", "VEINTITRES", "VEINTICUATRO", "VEINTICINCO", "VEINTISEIS", "VEINTISIETE", "VEINTIOCHO", "VEINTINUEVE"];

    function convertirGrupo(n) {
        let salida = "";

        if (n === 100) {
            return "CIEN";
        }

        if (n > 99) {
            salida += centenasArray[Math.floor(n / 100)] + " ";  
            n = n % 100;
        }

        if (n >= 30) {
            salida += decenas[Math.floor(n / 10)] + (n % 10 === 0 ? "" : " Y ");
            n = n % 10;
        } else if (n >= 20) {
            salida += especialesVeinte[n - 20];
            n = 0;
        } else if (n >= 10) {
            salida += especialesDiez[n - 10];
            n = 0;
        }

        if (n > 0 && n < 10) {
            salida += unidades[n];
        }

        return salida.trim();
    }

    function dividirNumero(num) {
        const partes = num.toFixed(2).split('.');
        return [parseInt(partes[0], 10), parseInt(partes[1], 10)];
    }

    const [parteEntera, parteDecimal] = dividirNumero(num);
    let resultado = "";

    const millones = Math.floor(parteEntera / 1000000);
    if (millones > 0) {
        resultado += convertirGrupo(millones) + " MILLÓN" + (millones > 1 ? "ES" : "") + " ";
    }

    const miles = Math.floor((parteEntera % 1000000) / 1000);
    if (miles > 0) {
        resultado += convertirGrupo(miles) + " MIL ";
    }

    const centenasParte = parteEntera % 1000;
    if (centenasParte > 0) {
        resultado += convertirGrupo(centenasParte) + " ";
    }

    if (parteEntera === 0) {
        resultado = "CERO ";
    }

    if (parteDecimal > 0) {
        resultado += "CON " + convertirGrupo(parteDecimal) + " CENTAVOS";
    }

    resultado += " USD";

    return resultado.trim();
};

  //Funcion para generar un resumen a partir del detalle de productos
  const calcularResumen = (detalles) => {
    let totalNoSuj = 0.0;
    let totalExenta = 0.0;
    let totalGravada = 0.0;
    let subTotalVentas = 0.0;
    let totalDescu = 0.0;
    let reteRenta = 0.0;
    let totalIva = 0.0;

    // Acumular los valores de los detalles
    detalles.forEach(detalle => {
        totalNoSuj += detalle.ventaNoSuj || 0;
        totalExenta += detalle.ventaExenta || 0;
        totalGravada += detalle.ventaGravada || 0;
        totalDescu += detalle.montoDescu || 0;
        totalIva += detalle.ivaItem || 0;
    });

    subTotalVentas = totalNoSuj + totalExenta + totalGravada;

    // Calcular el subtotal y total a pagar
    const subTotal = parseFloat((subTotalVentas - totalDescu).toFixed(2));
    const montoTotalOperacion = parseFloat((subTotal).toFixed(2));
    const totalPagar = parseFloat((subTotal).toFixed(2));

    // Crear el resumen con todos los campos
    let resumen = {
        totalNoSuj: parseFloat(totalNoSuj.toFixed(2)),
        totalExenta: parseFloat(totalExenta.toFixed(2)),
        totalGravada: parseFloat(totalGravada.toFixed(2)),
        subTotalVentas: parseFloat(subTotalVentas.toFixed(2)),
        descuNoSuj: 0.0,  
        descuExenta: 0.0, 
        descuGravada: parseFloat(totalDescu.toFixed(2)),
        porcentajeDescuento: 0.0, 
        totalDescu: parseFloat(totalDescu.toFixed(2)),
        tributos: null, 
        subTotal: subTotal,
        ivaRete1: 0,  
        reteRenta: parseFloat(reteRenta.toFixed(2)),
        montoTotalOperacion: parseFloat(montoTotalOperacion.toFixed(2)),
        totalNoGravado: 0.0, 
        totalPagar: totalPagar,
        totalLetras: convertirNumeroALetras(montoTotalOperacion), 
        saldoFavor: 0.0, 
        condicionOperacion: 1,  
        pagos: null,  
        numPagoElectronico: null, 
        totalIva: parseFloat(totalIva.toFixed(2)),
    };

    resumen.totalPagar = totalPagar;
    resumen.totalIva = parseFloat(totalIva.toFixed(2));
    resumen.montoTotalOperacion = montoTotalOperacion;

    return resumen;
};

//Funcion para generar JSON para API de firmar documento
const generarFacturaJSON = (detallesCompra,resumenCompra, codigoGeneracion, numeroControl) => {
  let facturaJson = {};
  const usernit = API_TOKEN_USER;
  const passPriv = API_FIRMAR_PWD;
  const horaActual = formatearHora();
  const fechaActual=obtenerFechaActual();
  facturaJson = {
    nit: usernit,
    activo: true,
    passwordPri: passPriv,
    dteJson: {
      identificacion: {
        version: 1,
        ambiente: "00",
        tipoDte: tipoDTE,
        numeroControl: numeroControl,
        codigoGeneracion: codigoGeneracion,
        tipoModelo: 1,
        tipoOperacion: 1,
        tipoContingencia: null,
        motivoContin: null,
        fecEmi: fechaActual,
        horEmi: horaActual,
        tipoMoneda: "USD",
      },
      documentoRelacionado: null,
      emisor: {
        nit: nitE,
        nrc: nrcE,
        nombre: nombreE,
        codActividad: codActividadE,
        descActividad: desActividadE,
        nombreComercial: null,
        tipoEstablecimiento: codEstablecimiento,
        direccion: {
          departamento: departamentoE,
          municipio: municipioE,
          complemento: complementoE,
        },
        telefono: telefonoE,
        codEstableMH: "0000",
        codEstable: "0000",
        codPuntoVentaMH: "0000",
        codPuntoVenta: "0000",
        correo: correoE,
      },
      receptor: {
        tipoDocumento: tipoDocumentoR,
        numDocumento: numDocumentoR,
        nrc: null,
        nombre: nombreR,
        codActividad: codActividadR,
        descActividad: desActividadR,
        direccion: {
          departamento: departamentoR,
          municipio: municipioR,
          complemento: complementoR,
        },
        telefono: telefonoR,
        correo: correoR,
      },
      otrosDocumentos: null,
      ventaTercero: null,
      cuerpoDocumento: detallesCompra,
      resumen: resumenCompra,
      extension: {
        nombEntrega: null,
        docuEntrega: null,
        nombRecibe: null,
        docuRecibe: null,
        observaciones: null,
        placaVehiculo: null,
      },
      apendice: null,
    },
  };
  return facturaJson;
}

// Función para almacenar solo la parte dteJson y agregar sello y docFirmado
const jsonParaGuardar = (facturaJson, sello, firma) => {
  const documentoParaGuardar = {
    ...facturaJson.dteJson,
    firmaElectronica: firma,  
    selloRecibido: sello, 
  };
  return documentoParaGuardar;
};

//Generar y guardar un nuevo documento 
  const registrarEstadoDocumento = async (documentoId, estado, fecha, descripcion, comentario) => {
    try {
      const resData = await fetch(`${API_URL_FACTURACION}/api/estado-documento`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "id_Documento": documentoId,
          "estado_Documento": estado,
          "fh_Procesamiento": fecha,
          "descripcionMsg": descripcion,
          "observaciones": comentario,
        }),
      }).then(res => res.json());
      if (resData.status === 201) {
        console.log(resData.message);
      } else {
        console.log(resData.message);
      }

    } catch (error) {
      console.error("Error al registrar estado del documento:", error);
      throw error;
    }
  };

  //Generar y guardar un nuevo documento 
  const generarNuevoDocumento = async (numeroControl,codigoGeneracion,jsonFactura,tokenFactura) => {
    try {
      const resData = await fetch(`${API_URL_FACTURACION}/api/documentos`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "num_Control": numeroControl,
          "cod_Generacion": codigoGeneracion,
          "id_TipoDTE": 1,
          "id_Emisor": id_Emisor,
          "id_Receptor": id_Receptor,
        }),
      }).then(res => res.json());

      if (resData.status === 201) {
        console.log(resData.message);
        const documentoId = resData.documento.id;
        
        const resultadoFirma = await firmarDocumento(jsonFactura, tokenFactura, documentoId);

        if (resultadoFirma) {
          return resultadoFirma; 
        } else {
          console.log("No se pudo firmar o enviar el documento");
          return null;
        }
      } else {
        console.log(resData.message);
      }
    } catch (error) {
      console.error("Error al generar nueva peticion de documento:", error);
      throw error;
    }
  };

  //Funcion para enviar el documento a recepcion DTE del MH
  const enviarDocumentoMH = async (documentoFirmado, token, docId) => {
    try {
      const resData = await fetch('https://apitest.dtes.mh.gob.sv/fesv/recepciondte', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization':token
        },
        body: JSON.stringify({
          "ambiente": "00",
          "idEnvio": 1,
          "version": 1,
          "tipoDte": tipoDTE,
          "documento": documentoFirmado,
        }),
      }).then(res => res.json());
      if (resData.estado === "PROCESADO") {
        console.log(resData);
        const estadoDocumento=resData.estado;
        const fechaProcesamiento=resData.fhProcesamiento;
        const descripcion=resData.descripcionMsg;
        const sello=resData.selloRecibido
        const comentarios="Se ha enviado correctamente la factura al MH";

        registrarEstadoDocumento(docId,estadoDocumento,fechaProcesamiento,descripcion,comentarios);

      return {
        sello: sello,
        docId: docId
      };

      } else {
        console.log("No se pudo enviar el documento al MH");
        console.log(resData);
        return null;
      }

    } catch (error) {
      console.error("Error al enviar el documento al MH", error);
      throw error;
    }
  };

  // Función para firmar un documento
  const firmarDocumento = async (documentoJson, tokenFacturacion, docId) => {
    try {
      const resData = await fetch(`${API_URL_FIRMADOR}/firmardocumento/`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(documentoJson),
      }).then(res => res.json());

      if (resData.status === "OK") {
        const docFirmado = resData.body;

        const resultadoEnvio = await enviarDocumentoMH(docFirmado, tokenFacturacion, docId);

        return {
          ...resultadoEnvio,
          docFirmado
        };
      } else {
        console.log("No se pudo firmar el documento");
        return null;
      }

    } catch (error) {
      console.error("Error al firmar el documento", error);
      throw error;
    }
  };

  //Funcion para guardar cada producto en la base de datos
  const guardarProductosDocumento = async (codGeneracion, detalles) => {
    try {
      const promises = detalles.map(detalle => {
        return fetch(`${API_URL_FACTURACION}/api/cuerpo-documento`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            cod_Documento: codGeneracion,
            num_Item: detalle.numItem,
            id_TipoItem: detalle.tipoItem,
            id_Unidad_Medida: 39,
            codigo: detalle.codigo,
            descripcion: detalle.descripcion,
            cantidad: detalle.cantidad,
            precio_Unitario: detalle.precioUni,
            monto_Descuento: detalle.montoDescu,
            venta_Gravada: detalle.ventaGravada,
            iva_Item: detalle.ivaItem
          }),
        })
        .then(response => {
          if (!response.ok) {
            return response.json().then(errorData => {
              throw new Error(`Error ${response.status}: ${JSON.stringify(errorData)}`);
            });
          }
          return response.json();
        });
      });
  
      const results = await Promise.all(promises);
   
      results.forEach((resData, index) => {
        if (resData.status === 201) {
          console.log(`Producto ${detalles[index].descripcion} guardado correctamente`);
        } else {
          console.error(`Error al guardar el producto ${detalles[index].descripcion}:`, resData.reason);
        }
      });
    } catch (error) {
      console.error("Error al guardar productos del documento:", error.message || error);
      throw error;
    }
  };

  //Funcion para actualizar los datos del documento con la compra
  const actualizarDocumento = async (codGeneracion, sello, resumen, docJson) => {
    try {
      const horaActual = formatearHora();
      const fechaActual=obtenerFechaActual();
      const resData = await fetch(`${API_URL_FACTURACION}/api/documentos/${codGeneracion}/actualizar-documento`, {
        method: 'PATCH',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sello_Recibido: sello,
          fecha_Emision: fechaActual,
          hora_Emision: horaActual,
          total_Gravada: resumen.totalGravada,
          subtotal_Ventas: resumen.subTotalVentas,
          total_Descuento: resumen.totalDescu,
          subTotal: resumen.subTotal,
          monto_Total_Operacion: resumen.montoTotalOperacion,
          total_Pagar: resumen.totalPagar,
          total_Letras: resumen.totalLetras,
          total_Iva: resumen.totalIva,
          docJSON: docJson
        }),
      }).then(res => res.json());

      if (resData.status === 200 && resData.message === "Documento actualizado correctamente") {
        console.log(resData.message);
      } else {
        console.error("No se pudo actualizar el documento en la BD:", resData);
      }

    } catch (error) {
      console.error("Error al actualizar documento", error);
      throw error; 
    }
  };

  //Funcion para actualizar los datos del documento con la compra
  const registrarDocumentoProcesado = async (codigoGeneracion, sello, docId) => {
    try {
      const fechaActual=obtenerFechaActual();
      const resData = await fetch(`${API_URL_FACTURACION}/api/historial-documento`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          n_Dte: "Factura Electronica",
          cod_Generacion:codigoGeneracion,
          sello_Recibido: sello,
          estado: "PROCESADO",
          fecha_emision:fechaActual,
          id_Documento:docId
        }),
      }).then(res => res.json());
      if (resData.status === 201 && resData.message === "Se ha registrado un nuevo documento en el historial") {
        console.log(resData.message);
      } else {
        console.error("No se pudo registrar un nuevo documento procesado en la BD:", resData);
      }

    } catch (error) {
      console.error("Error al registrar documento en historial", error);
      throw error; 
    }
  };

  //Funcion para enviar archivo JSON y PDF a Usuario
  const enviarJsonCorreo = async (codigoGeneracion, correo) => {
    try {
      const resData = await fetch(`${API_URL_FACTURACION}/api/documentos/enviar-correo`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          codigo_generacion:codigoGeneracion,
          email: correo,
        }),
      }).then(res => res.json());
      if (resData.status === 200) {
        console.log(resData.message);
      } else {
        console.error("No se pudo enviar el correo", resData);
      }

    } catch (error) {
      console.error("Error al enviar correo y acceso a la base de datos", error);
      throw error; 
    }
  };

  //Alerta de confirmacion
  const mostrarAlertaConfirmacion = () => {
    Alert.alert(
      "Confirmación de compra",
      "¿Estás seguro de que deseas realizar la compra?",
      [
        {
          text: "Cancelar",
          onPress: () => console.log("Compra cancelada"),
          style: "cancel",
        },
        {
          text: "Aceptar",
          onPress: () => realizarCompra(),
        },
      ],
      { cancelable: false }
    );
  };

  const realizarCompra = async() => {
    try{
      const token = await obtenerToken();
      if (!token) {
        throw new Error("Token no disponible");
      }
      
      const numeroControl = await generarNumControl(); 
      if (!numeroControl) {
        throw new Error("Número de control no disponible");
      }

      const codigoGeneracion =  await generarCodGeneracion();
      if (!codigoGeneracion) {
        throw new Error("Codigo de generacion no disponible");
      }

      const detallesCompra = datosDetalles();
      const resumen = calcularResumen(detallesCompra);
      const JsonFactura=generarFacturaJSON(detallesCompra,resumen, codigoGeneracion, numeroControl);
      const resultado = await generarNuevoDocumento(numeroControl, codigoGeneracion, JsonFactura, token);
      
      if (resultado) {
        const selloRecibido=resultado.sello;
        const documentoId=resultado.docId;
        const docFirmado=resultado.docFirmado;
        const jsonGuardar=jsonParaGuardar(JsonFactura,selloRecibido,docFirmado);
        await guardarProductosDocumento(codigoGeneracion,detallesCompra);
        await actualizarDocumento(codigoGeneracion,selloRecibido,resumen,jsonGuardar);
        await registrarDocumentoProcesado(codigoGeneracion,selloRecibido,documentoId);
        console.log(JSON.stringify(jsonGuardar, null, 2));
        await enviarJsonCorreo(codigoGeneracion,correoR);
        
        Alert.alert(
          "Compra Realizada",
          "La compra se realizó correctamente.",
          [
            { text: "Aceptar", onPress: () => console.log("Compra confirmada") }
          ],
          { cancelable: false }

        );
      } else {
        console.log("No se pudo enviar el documento al MH");
      }
    } catch (error) {
      console.error("Error al realizar la compra:", error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={item.image} style={styles.cartImage} />
      <View style={styles.cartDetails}>
        <Text style={styles.cartItemName}>{item.name}</Text>
        <Text style={styles.cartItemPrice}>${parseFloat(item.price.replace('$', '')).toFixed(2)}</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity === 1} style={styles.quantityButton}>
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <TouchableOpacity onPress={() => updateQuantity(item.id, item.quantity + 1)} style={styles.quantityButton}>
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => removeFromCart(item.id)} style={styles.removeButton}>
          <Text style={styles.removeButtonText}>Eliminar</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total: ${(parseFloat(item.price.replace('$', '')) * item.quantity).toFixed(2)}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={cart}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={() => <Text style={styles.emptyText}>Tu carrito está vacío</Text>}
      />

      {/* Total del carrito */}
      <View style={styles.totalCarritoContainer}>
        <Text style={styles.totalCarritoText}>Total: ${calculateTotal()}</Text>
      </View>

      {/* Botón de Comprar */}
      <TouchableOpacity style={styles.comprarButton} onPress={mostrarAlertaConfirmacion}>
        <Text style={styles.comprarButtonText}>Comprar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  cartItem: {
    flexDirection: 'row',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    paddingBottom: 10,
  },
  cartImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  cartDetails: {
    flex: 1,
    marginLeft: 10,
  },
  cartItemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cartItemPrice: {
    color: 'red',
    fontSize: 16,
    marginVertical: 5,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  quantityButton: {
    backgroundColor: '#A9D6E5',
    padding: 5,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantityText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  removeButton: {
    backgroundColor: '#013A63',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 10,
    width: 80,
  },
  removeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  totalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  totalText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  emptyText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  totalCarritoContainer: {
    borderTopWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalCarritoText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  comprarButton: {
    backgroundColor: '#013A63',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10, 
   
  },
  comprarButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Carrito;
