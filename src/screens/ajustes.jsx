import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, Platform, StatusBar, ScrollView } from 'react-native';
import Icon from './icon';
import Usuario from './usuario'; // Importa el componente Usuario

const SettingsScreen = () => {
  const [showProfile, setShowProfile] = useState(false);

  // Función para regresar a la pantalla de ajustes
  const goBack = () => setShowProfile(false);

  if (showProfile) {
    return <Usuario goBack={goBack} />;
  }

  return (
    <SafeAreaView style={styles.safeContainer}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.container}>
          <Text style={styles.header}>Ajustes</Text>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Cuenta</Text>
            <TouchableOpacity style={styles.option} onPress={() => setShowProfile(true)}>
              <Icon type="SimpleLineIcons" name="user" size={45} color="black" />
              <Text style={styles.optionText}>Edita tu perfil</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.option}>
              <Icon type="MaterialCommunityIcons" name="security" size={45} color="black" />
              <Text style={styles.optionText}>Seguridad</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.option}>
              <Icon type="Ionicons" name="notifications-outline" size={45} color="black" />
              <Text style={styles.optionText}>Notificaciones</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.option}>
              <Icon type="AntDesign" name="lock" size={45} color="black" />
              <Text style={styles.optionText}>Privacidad</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Soporte</Text>
            <TouchableOpacity style={styles.option}>
              <Icon type="AntDesign" name="questioncircleo" size={45} color="black" />
              <Text style={styles.optionText}>Ayuda y Soporte</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.option}>
              <Icon type="AntDesign" name="infocirlceo" size={45} color="black" />
              <Text style={styles.optionText}>Términos y políticas</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <TouchableOpacity style={styles.option}>
              <Icon type="AntDesign" name="flag" size={45} color="black" />
              <Text style={styles.optionText}>Reporta un problema</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.option}>
              <Icon type="Ionicons" name="exit-outline" size={45} color="black" />
              <Text style={styles.optionText}>Salir</Text>
            </TouchableOpacity>
          </View>
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
  scrollContent: {
    paddingBottom: 20, // Para agregar un espacio extra al final del contenido
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  optionText: {
    fontSize: 16,
    marginLeft: 20, 
  },
});

export default SettingsScreen;
