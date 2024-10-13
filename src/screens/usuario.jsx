import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, Platform, StatusBar, ScrollView, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Icon from './icon'; 
import axios from "axios";
import {API_URL_FACTURACION } from '@env';

const ProfileScreen = ({ goBack }) => {
  const [currentScreen, setCurrentScreen] = useState('Usuario');
  const [documento, setDocumento] = useState("");
  const [numDocumento, setNumDocumento] = useState("");
  const [nombre, setNombre] = useState("");
  const [actividad, setActividad] = useState("");
  const [municipio, setMunicipio] = useState("");
  const [departamento, setDepartamento] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correo, setCorreo] = useState("");
  const [complemento, setComplemento] = useState("");
  const navigation = useNavigation(); //Agregar propiedad de navegacion

  const RegistrarReceptor = () => {
    if(numDocumento){
      alert("Ya existe un registro de detalles de facturacion");
    }else{
      navigation.navigate('SaveUser');
    }
  }

  const EditarReceptor = () => {
    navigation.navigate('EditUser');
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

  useEffect(() => {
    if (numDocumento) {
      // Si numDocumento existe, se hace la petición
      axios
        .get(`${API_URL_FACTURACION}/api/receptores/${numDocumento}`, { timeout: 100000 })
        .then((response) => {
          setDocumento(response.data.receptor[0].des_documento);
          setNombre(response.data.receptor[0].n_receptor);
          setTelefono(response.data.receptor[0].telefono);
          setCorreo(response.data.receptor[0].correo);
          setDepartamento(response.data.receptor[0].n_Departamento);
          setMunicipio(response.data.receptor[0].n_Municipio);
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

  // Retorno condicional dentro del mismo return, en vez de retorno temprano
  return (
    <SafeAreaView style={styles.safeContainer}>
        <>
          <View style={styles.headerContainer}>
            <TouchableOpacity onPress={goBack} style={styles.backButton}>
              <Icon type="AntDesign" name="arrowleft" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.header}>Detalles de Facturación</Text>
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

              <View style={styles.card}>
                <Text style={styles.cardTitle}>Información del Usuario</Text>
                <Text style={styles.label}>Tipo de documento: {documento}</Text>
                <Text style={styles.label}>Número de documento: {numDocumento}</Text>
                <Text style={styles.label}>Nombre: {nombre}</Text>
                <Text style={styles.label}>Teléfono: {telefono}</Text>
                <Text style={styles.label}>Correo: {correo}</Text>
                <Text style={styles.label}>Departamento: {departamento}</Text>
                <Text style={styles.label}>Municipio: {municipio}</Text>
                <Text style={styles.label}>Complemento: {complemento}</Text>
              </View>

              <View style={styles.buttonContainer}>
                <Button title="Registrar Datos" onPress={RegistrarReceptor} />
                <Button title="Editar Información" onPress={EditarReceptor} />
              </View>
            </View>
          </ScrollView>
        </>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
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
    paddingBottom: 20,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
});

export default ProfileScreen;
