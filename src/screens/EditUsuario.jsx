import React, { useState, useEffect } from "react";
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, Modal, FlatList, Button, SafeAreaView, Platform, StatusBar, ScrollView } from 'react-native';
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Icon from './icon'; 
import axios from "axios";
import {API_URL_FACTURACION } from '@env';


const EditProfileScreen = ({ goBack }) => { // Agregamos goBack como prop
  const [documento, setDocumento] = useState("");
  const [numDocumento, setNumDocumento] = useState("");
  const [nombre, setNombre] = useState("");
  const [municipio, setMunicipio] = useState("");
  const [departamento, setDepartamento] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correo, setCorreo] = useState("");
  const [complemento, setComplemento] = useState("");
  const [listaDocumento,setListaDocumento] = useState([]);
  const [listaMunicipios,setListaMunicipio] = useState([]);
  const [listaDepartamentos,setListaDepartamento] = useState([]);
  const navigation = useNavigation(); //Agregar propiedad de navegacion

  const goback = () => {
    navigation.goBack();
  }

  const getReceptorDocumento = async () => {
    try {
      const receptorDocumento = await AsyncStorage.getItem('numDocumento');
      if (receptorDocumento) {
        setNumDocumento(receptorDocumento);
      }
    } catch (error) {
      console.error('Error al obtener el numero de documento desde AsyncStorage:', error);
    }
  };

  const EditarPress = async () => {
    // Validación de campos obligatorios
    if (!numDocumento) {
      alert("Por favor, ingresa un número de documento");
      return;
    }
  
    const telefonoValido = /^[0-9]{8}$/.test(telefono);
    if (!telefonoValido) {
      alert("Por favor, ingresa un número de teléfono válido (8 dígitos numéricos).");
      return;
    }
  
    
  
    // Construir el objeto a enviar solo con los campos que están definidos
    const datosActualizados = {};
  
    if (documento) datosActualizados.id_TipoDocumento = documento;
    if (numDocumento) datosActualizados.num_Documento = numDocumento;
    if (nombre) datosActualizados.n_receptor = nombre;
    if (municipio) datosActualizados.id_Municipio = municipio;
    if (telefono) datosActualizados.telefono = telefono;
    if (correo) datosActualizados.correo = correo;
    if (complemento) datosActualizados.complemento = complemento;
  
    // Realizar la solicitud para actualizar solo los campos definidos
    await fetch(`${API_URL_FACTURACION}/api/receptores/${numDocumento}/actualizar-receptor`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(datosActualizados),  // Enviar solo los campos que se han definido
    })
      .then((res) => res.json())
      .then(async (resData) => {
        if (resData.message === "Receptor actualizado correctamente" && resData.status === 200) {
          alert(resData.message);
          await AsyncStorage.setItem('numDocumento', numDocumento);
          navigation.navigate('Usuario');
        } else {
          alert(resData.message);
        }
      })
      .catch((error) => {
        console.error("Error al actualizar el receptor:", error);
      });
  };

  useEffect(() => {
    if (numDocumento) {
      // Si numDocumento existe, se hace la petición
      axios
        .get(`${API_URL_FACTURACION}/api/receptores/${numDocumento}`, { timeout: 1000000 })
        .then((response) => {
          setDocumento(response.data.receptor[0].id_TipoDocumento);
          setNombre(response.data.receptor[0].n_receptor);
          setTelefono(response.data.receptor[0].telefono);
          setCorreo(response.data.receptor[0].correo);
          setComplemento(response.data.receptor[0].complemento);
        })
        .catch((error) => {
          console.error("Error al obtener la lista de documentos disponibles:", error);
        });
    } else {
      // Si numDocumento no existe, llamar a la función getReceptorDocumento
      getReceptorDocumento();
    }
  }, [numDocumento]); // Agrega numDocumento como dependencia

  // Api para traer la lista de documentos disponibles
  useEffect(() => {
    const apiUrl = `${API_URL_FACTURACION}/api/tipo-documento-persona`;
    axios
      .get(apiUrl, { timeout: 1000000 })
      .then((response) => {
        setListaDocumento(response.data.datos);
      })
      .catch((error) => {
        console.error("Error al obtener la lista de documentos disponibles:", error);
      });
  }, []);

   // Api para traer Departamentos
   useEffect(() => {
    const apiUrl = `${API_URL_FACTURACION}/api/departamentos`;
    axios
      .get(apiUrl, { timeout: 1000000 })
      .then((response) => {
        setListaDepartamento(response.data.datos);
      })
      .catch((error) => {
        console.error("Error al obtener la lista de departamentos:", error);
      });
  }, []);

  // Obtener municipios cuando cambia el departamento seleccionado
  useEffect(() => {
    if (departamento) {
      axios
        .get(`${API_URL_FACTURACION}/api/municipios/${departamento}`, { timeout: 1000000 })
        .then((response) => {
          setListaMunicipio(response.data.datos); 
        })
        .catch((error) => {
          console.error('Error al obtener la lista de municipios:', error);
        });
    }
  }, [departamento]);

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={goback} style={styles.backButton}>
          <Icon type="AntDesign" name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.header}>Editar Detalles de Facturacion</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.container}>
          <View style={styles.avatarContainer}>
            <Image 
              source={{ uri: 'https://images.app.goo.gl/Rpbt3pQPNBgGejdN9' }} 
              style={styles.avatar} 
            />
            <TouchableOpacity style={styles.cameraIcon}>
              <Icon type="AntDesign" name="camera" size={20} color="white" />
            </TouchableOpacity>
          </View>
          
          <View>

          <Text>Selecciona un tipo de documento</Text>
            <Picker
              selectedValue={documento}
              enabled={false}
            >
              <Picker.Item label={documento} value="" />
              {listaDocumento.map((doc) => (
                <Picker.Item 
                  key={doc.id} 
                  label={doc.des_documento} 
                  value={doc.id} 
                />
              ))}
            </Picker>

            <Text style={styles.label}>Numero de documento</Text>
            <TextInput 
              style={styles.input} 
              placeholder="00000000-0" 
              value={numDocumento}
              editable={false} 
              selectTextOnFocus={false} 
            />

            <Text style={styles.label}>Nombre</Text>
            <TextInput 
              style={styles.input} 
              placeholder="Luis Perez" 
              onChangeText={setNombre}
              value={nombre}
            />
            <Text style={styles.label}>Telefono</Text>
            <TextInput 
              style={styles.input} 
              placeholder="2222-2222" 
              onChangeText={setTelefono}
              value={telefono}
            />

            <Text style={styles.label}>Correo</Text>
            <TextInput 
              style={styles.input} 
              placeholder="example@gmail.com" 
              onChangeText={setCorreo}
              value={correo}
            />

            <Text>Selecciona un Departamento</Text>
            <Picker
              selectedValue={departamento}
              onValueChange={(itemValue) => setDepartamento(itemValue)}
            >
              <Picker.Item label="Selecciona un departamento" value="" />
              {listaDepartamentos.map((dato) => (
                <Picker.Item 
                  key={dato.cod_Departamento} 
                  label={dato.n_departamento} 
                  value={dato.cod_Departamento} 
                />
              ))}
            </Picker>

            {/* Select para municipios */}
            {listaMunicipios.length > 0 && (
              <>
                <Text>Selecciona un Municipio:</Text>
                <Picker
                  selectedValue={municipio}
                  onValueChange={(itemValue) => setMunicipio(itemValue)}
                >
                  <Picker.Item label="Selecciona un municipio" value="" />
                  {listaMunicipios.map((dato) => (
                    <Picker.Item 
                      key={dato.id} 
                      label={dato.n_Municipio} 
                      value={dato.id} 
                    />
                  ))}
                </Picker>
              </>
            )}
            <TextInput 
              style={styles.input} 
              placeholder="Direccion" 
              onChangeText={setComplemento}
              value={complemento}
            />
          </View>

          <TouchableOpacity onPress={EditarPress} style={styles.button}>
            <Text style={styles.buttonText}>Guardar Cambios</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0, // Para asegurar margen en Android
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
  },
  backButton: {
    paddingRight: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20, // Espacio extra al final del contenido
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#ddd',
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 5,
    right: 130,  // Ajuste para acercar el icono a la imagen
    backgroundColor: '#007AFF',
    borderRadius: 15,
    padding: 5,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    marginTop: 5,
    fontSize: 14,
  },
  button: {
    backgroundColor: '#005490',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 8,
  },
  countryItem: {
    paddingVertical: 10,
    fontSize: 16,
  },
});

export default EditProfileScreen;
