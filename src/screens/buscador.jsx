import React, { useState, useContext } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar, Modal, Button, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { TextInput } from 'react-native';
import Icon from './icon';
import { CartContext } from './CartContext';
import Carrito from './carrito'; // Importar el componente de carrito

const products = [
  { id: '1',code:'0001', name: 'Smart band', price: '$45.00', categoria: 'Tecnología', image: require('@/../../assets/smartband.webp') },
  { id: '16',code:'0002', name: 'Ropero 8 puertas', price: '$449.00', categoria: 'Muebles', image: require('@/../../assets/ropero.webp') },
  { id: '2',code:'0003', name: 'Audífono TWS ', price: '$8.00', categoria: 'Tecnología', image: require('@/../../assets/audifonostwc.jpeg') },
  { id: '35',code:'0004', name: 'Calzado Sandalia', price: '$39.90', categoria: 'Calzado', image: require('@/../../assets/calzado.webp') },
  { id: '3',code:'0005', name: 'Celular Iphone', price: '$165.00', categoria: 'Tecnología', image: require('@/../../assets/celular.jpg' )},
  { id: '54',code:'0006', name: 'Clean Invisible', price: '$7.30', categoria: 'Belleza', image: require('@/../../assets/corrector.webp') },
  { id: '45',code:'0007', name: 'Zapato Hoka ', price: '$179.90', categoria: 'Calzado', image: require('@/../../assets/hoka.webp') },
  { id: '17',code:'0008', name: 'Cama Firme ', price: '$410.00', categoria: 'Muebles', image: require('@/../../assets/cama.webp') },
  { id: '41',code:'0009', name: 'Zapato formal', price: '$59.90', categoria: 'Calzado', image: require('@/../../assets/zapato2.webp') },
  { id: '4',code:'0010', name: 'Barra de sonido', price: '$219.00', categoria: 'Tecnología', image: require('@/../../assets/barrasonido.jpeg') },
  { id: '51',code:'0011', name: 'Rubor Polvo', price: '$37.99', categoria: 'Belleza', image: require('@/../../assets/rubor.webp') },
  { id: '5',code:'0012', name: 'Reloj smartwatch ', price: '$49.00', categoria: 'Tecnología', image: require('@/../../assets/reloj.webp') },
  { id: '39',code:'0013', name: 'Calzado Sandalia  ', price: '$39.99', categoria: 'Calzado', image: require('@/../../assets/sandaliarojo.webp') },
  { id: '25',code:'0014', name: 'Ropero 3 puertas', price: '$299.00', categoria: 'Muebles', image: require('@/../../assets/3.webp') },
  { id: '52',code:'0015', name: 'Oil-Absorbing', price: '$15.99', categoria: 'Belleza', image: require('@/../../assets/piedra.webp') },
  { id: '6',code:'0016', name: 'Celular Samsung', price: '$199.00', categoria: 'Tecnología', image: require('@/../../assets/Celular-Samsung.webp') },
  { id: '7',code:'0017', name: 'Celular motorola', price: '$105.00', categoria: 'Tecnología', image: require('@/../../assets/motorola.webp') },
  { id: '44',code:'0018', name: 'Zapato Nike ', price: '$79.90', categoria: 'Calzado', image: require('@/../../assets/nike.webp') },
  { id: '59',code:'0019', name: 'Clinique Líquido', price: '$34.99', categoria: 'Belleza', image: require('@/../../assets/desmaquillante.webp') },
  { id: '29',code:'0020', name: 'Comedor ', price: '$599.90', categoria: 'Muebles', image: require('@/../../assets/comedor.webp') },
  { id: '56',code:'0021', name: 'Desmaquillador ', price: '$5.99', categoria: 'Belleza', image: require('@/../../assets/Desmaquillador.webp') },
  { id: '8',code:'0022', name: 'Celular Huawei', price: '$115.00', categoria: 'Tecnología', image: require('@/../../assets/huawei.webp') },
  { id: '9',code:'0023', name: 'Pantalla Samsung', price: '$876.00', categoria: 'Tecnología', image: require('@/../../assets/pantallasamsung.webp') },
  { id: '28',code:'0024', name: 'Silla de Oficina', price: '$125.00', categoria: 'Muebles', image: require('@/../../assets/silla.jpeg') },
  { id: '10',code:'0025', name: 'Pantalla Xiaomi', price: '$876.00', categoria: 'Tecnología', image: require('@/../../assets/pantallaxiaomi.webp') },
  { id: '11',code:'0026', name: 'Audífonos', price: '$19.90', categoria: 'Tecnología', image: require('@/../../assets/audifonos.webp') },
  { id: '58',code:'0027', name: 'Clinique Mascara', price: '31.99', categoria: 'Belleza', image: require('@/../../assets/mascara.webp') },
  { id: '43',code:'0028', name: 'Zapato Adidas ', price: '$79.90', categoria: 'Calzado', image: require('@/../../assets/adidas2.webp') },
  { id: '12',code:'0029', name: 'Kit de internet', price: '$280.00', categoria: 'Tecnología', image: require('@/../../assets/internet.webp') },
  { id: '36',code:'0030', name: 'Sandalia casual', price: '$39.99', categoria: 'Calzado', image: require('@/../../assets/sandaliacasual.webp') },
  { id: '34',code:'0031', name: 'Calzado Mocasin', price: '$45.99', categoria: 'Calzado', image: require('@/../../assets/mocasin2.webp') },
  { id: '27',code:'0032', name: 'Soporte movible', price: '$29.40', categoria: 'Muebles', image: require('@/../../assets/soporte.webp') },
  { id: '13',code:'0033', name: 'Impresora l3250 ', price: '$224.00', categoria: 'Tecnología', image: require('@/../../assets/impresora.webp') },
  { id: '14',code:'0034', name: 'Adaptador RJ45', price: '$45.00', categoria: 'Tecnología', image: require('@/../../assets/adaptador.webp') },
  { id: '53',code:'0035', name: 'Máscara de pestaña', price: '$12.99', categoria: 'Belleza', image: require('@/../../assets/pestalol.webp') },
  { id: '30',code:'0036', name: 'Loveseat ', price: '$559.00', categoria: 'Muebles', image: require('@/../../assets/Loveseat.webp') },
  { id: '15',code:'0037', name: 'Control switch ', price: '$99.90', categoria: 'Tecnología', image: require('@/../../assets/control.webp') },
  { id: '37',code:'0038', name: 'Sandalia casual', price: '$39.99', categoria: 'Calzado', image: require('@/../../assets/sandaliablanca.webp') },
  { id: '18',code:'0039', name: 'Rack Dragon', price: '$99.90', categoria: 'Muebles', image: require('@/../../assets/dragon.png') },
  { id: '19',code:'0040', name: 'Protector', price: '$17.90', categoria: 'Muebles', image: require('@/../../assets/protector.webp') },
  { id: '60',code:'0041', name: 'Tattoo Studio Brow', price: '$10.73', categoria: 'Belleza', image: require('@/../../assets/Tattoo.webp') },
  { id: '40',code:'0042', name: 'Zapato de vestir  ', price: '$59.90', categoria: 'Calzado', image: require('@/../../assets/zapato.webp') },
  { id: '20',code:'0043', name: 'Sofá cama', price: '$869.00', categoria: 'Muebles', image: require('@/../../assets/sofa.webp') },
  { id: '55',code:'0044', name: 'Blush ', price: '$12.99', categoria: 'Belleza', image: require('@/../../assets/Blush.webp') },
  { id: '42',code:'0045', name: 'Zapato Adidas ', price: '$79.90', categoria: 'Calzado', image: require('@/../../assets/adidas.webp') },
  { id: '21',code:'0046', name: 'Gavetero', price: '$189.00', categoria: 'Muebles', image: require('@/../../assets/gavetero.jpeg') },
  { id: '22',code:'0047', name: 'Kit de mesas ', price: '$172.35', categoria: 'Muebles', image: require('@/../../assets/kit.webp') },
  { id: '38',code:'0048', name: 'Calzado Mocasin ', price: '$45.90', categoria: 'Calzado', image: require('@/../../assets/mocasinrojo.webp') },
  { id: '23',code:'0049', name: 'Modulo bajo ', price: '$120.00', categoria: 'Muebles', image: require('@/../../assets/modulo.webp') },
  { id: '57',code:'0050', name: 'MAC LÁPIZ', price: '$26.99', categoria: 'Belleza', image: require('@/../../assets/mac.webp') },
  { id: '24',code:'0051', name: 'Cama individual', price: '$209.10', categoria: 'Muebles', image: require('@/../../assets/individual.webp') },
  { id: '26',code:'0052', name: 'Sofá cama', price: '$599.90', categoria: 'Muebles', image: require('@/../../assets/sofacama.webp') },
  { id: '31',code:'0053', name: 'Sandalia', price: '39.90', categoria: 'Calzado', image: require('@/../../assets/sandalia.webp') },
  { id: '32',code:'0054', name: 'Calzado Mocasin', price: '$45.00', categoria: 'Calzado', image: require('@/../../assets/mocasin.webp') },
  { id: '33',code:'0055', name: 'Calzado Sandalia', price: '$39.99', categoria: 'Calzado', image: require('@/../../assets/sandalia2.webp') },
  { id: '46',code:'0056', name: 'Polvo', price: '$11.99', categoria: 'Belleza', image: require('@/../../assets/polvo.webp') },
  { id: '47',code:'0057', name: 'Foundation ', price: '$20.99', categoria: 'Belleza', image: require('@/../../assets/base.webp') },
  { id: '48',code:'0058', name: 'Eye Booster', price: '$10.50', categoria: 'Belleza', image: require('@/../../assets/delineador.webp') },
  { id: '49',code:'0059', name: 'Gel Limpiador', price: '$17.25', categoria: 'Belleza', image: require('@/../../assets/gel.webp') },
  { id: '50',code:'0060', name: 'Super Smooth', price: '$6.99', categoria: 'Belleza', image: require('@/../../assets/lapiz.webp') },
];


const Buscador = () => {
  const { addToCart } = useContext(CartContext);
  const [searchKey, setSearchKey] = useState('');
  const [currentScreen, setCurrentScreen] = useState('Buscador');
  const [selectedProduct, setSelectedProduct] = useState(null); // Producto seleccionado para mostrar en el modal
  const [quantity, setQuantity] = useState(1); // Cantidad del producto, empieza desde 1
  const [cart, setCart] = useState([]); // Carrito de compras
  const [modalVisible, setModalVisible] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0); // Precio total que se actualiza dinámicamente

  const handleAddToCart = () => {
    if (selectedProduct) {
      addToCart(selectedProduct, quantity); // Agrega el producto con la cantidad seleccionada
      setModalVisible(false); // Cierra el modal después de agregar el producto
    }
  };

  // Función para filtrar productos basados en la búsqueda
  const handleSearch = (text) => {
    setSearchKey(text);
  };

  // Filtrar productos por búsqueda
  const filteredProducts = products.filter((product) => {
    return product.name.toLowerCase().includes(searchKey.toLowerCase());
  });

  const renderProduct = ({ item }) => (
    <TouchableOpacity onPress={() => {
      setSelectedProduct(item); // Guardar el producto seleccionado
      setModalVisible(true); // Mostrar el modal
      setQuantity(1); // Restablecer la cantidad a 1 cuando se abre el modal
      setTotalPrice(parseFloat(item.price.replace('$', ''))); // Establecer el precio total inicial
    }}>
      <View style={styles.productContainer}>
        <Image source={item.image} style={styles.productImage} />
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>{item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  const increaseQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
    updateTotalPrice(quantity + 1); // Actualizar el precio total
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
      updateTotalPrice(quantity - 1); // Actualizar el precio total
    }
  };

  const updateTotalPrice = (newQuantity) => {
    const productPrice = parseFloat(selectedProduct.price.replace('$', '')); // Extraer el precio numérico del producto
    const newTotalPrice = productPrice * newQuantity;
    setTotalPrice(newTotalPrice);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'Buscador':
        return (
          <View style={styles.container}>
            <FlatList
              data={filteredProducts} // Filtrar productos
              renderItem={renderProduct}
              keyExtractor={(item) => item.id}
              numColumns={3} // Mostrar 3 productos por fila
              columnWrapperStyle={styles.columnWrapper} // Asegurarse de que las columnas estén bien distribuidas
              contentContainerStyle={styles.productList}
            />

            {/* Modal para mostrar detalles del producto */}
            <Modal
              visible={modalVisible}
              transparent={true}
              animationType="slide"
              onRequestClose={() => setModalVisible(false)}
            >
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  {selectedProduct && (
                    <>
                      <Image source={selectedProduct.image} style={styles.modalImage} />
                      <Text style={styles.modalProductName}>{selectedProduct.name}</Text>
                      <Text style={styles.modalProductPrice}>{selectedProduct.price}</Text>

                      {/* Contador de cantidad */}
                      <View style={styles.quantityContainer}>
                        <TouchableOpacity onPress={decreaseQuantity} style={styles.quantityButton}>
                          <Text style={styles.quantityButtonText}>-</Text>
                        </TouchableOpacity>
                        <Text style={styles.quantityText}>{quantity}</Text>
                        <TouchableOpacity onPress={increaseQuantity} style={styles.quantityButton}>
                          <Text style={styles.quantityButtonText}>+</Text>
                        </TouchableOpacity>
                      </View>

                      {/* Mostrar total a pagar */}
                      <Text style={styles.totalText}>Total: ${totalPrice.toFixed(2)}</Text>

                      {/* Botón Agregar al carrito */}
                      <TouchableOpacity style={styles.addButton} onPress={handleAddToCart}>
                        <Text style={styles.addButtonText}>Agregar al carrito</Text>
                      </TouchableOpacity>

                      <Button title="Cerrar" onPress={() => setModalVisible(false)} />
                    </>
                  )}
                </View>
              </View>
            </Modal>
          </View>
        );
      case 'Carrito':
        return <Carrito cart={cart} setCart={setCart} />; // Mostrar carrito
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value={searchKey}
            onChangeText={handleSearch}
            placeholder='¿Qué quieres buscar?'
          />
        </View>
        <View style={styles.searchIconContainer}>
          <Feather name='search' size={24} style={styles.searchIcon} />
        </View>
      </View>

      {/* Renderiza la pantalla seleccionada */}
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" />
        <View style={{ flex: 1 }}>{renderScreen()}</View>
      </SafeAreaView>
    </View>
  );
};

styles = StyleSheet.create({
  container:{
      flex:1,
      alignItems: 'center',
      justifyContent: 'center',
  },
  searchContainer:{
      marginHorizontal: 12,
      flexDirection:"row",
      justifyContent:'center',
      alignContent:"center",
      backgroundColor:"#A9D6E5",
      borderRadius: 14,
      marginVertical:"",
      height: 50,
      marginTop: 15
  },
  searchIconContainer: {
      backgroundColor: "#013A63",
      width: 50,
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 14,
  },
  searchIcon:{
      color:"white",
  },
  searchWrapper:{
      flex:1,
      backgroundColor:"#A9D6E5",
      marginLeft: 30,
      borderRadius: 10,
  },
  searchInput:{
      width:"100%",
      height:"100%",
      paddingHorizontal:"",
  },

  safeArea: {
      flex: 1,
      backgroundColor: '#fff',
    },
    container: {
      flex: 1,
      padding: 10,
      backgroundColor: '#fff',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#013A63',
  
    },
    categoryScroll: {
      marginBottom: 0, // Reducido para eliminar el espacio extra
    },
    categoryContainer: {
      flexDirection: 'row',
      height: 40,
      paddingVertical: 5,
    },
    categoryButton: {
      paddingHorizontal: 15,
      paddingVertical: 5,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: '#012A4A',
      marginRight: 10, // Añadido para un mejor espaciado entre categorías
    },
    selectedCategoryButton: {
      backgroundColor: '#012A4A',
    },
    categoryText: {
      fontSize: 16,
      color: '#2C7DA0',
    },
    selectedCategoryText: {
      color: '#fff',
    },
    productList: {
      justifyContent: 'space-between',
      marginTop: 0, // Ajustado para que los productos estén más cerca de las categorías
    },
    productContainer: {
      flex: 1,
      margin: 10,
      alignItems: 'center', // Centrar los elementos
      justifyContent: 'center', // Asegura que se distribuyan bien
    },
    productImage: {
      width: 80, // Ajustado para mostrar 3 productos por fila
      height: 80, // Ajustado para mostrar 3 productos por fila
      borderRadius: 10,
    },
    productName: {
      fontSize: 14, // Ajustado para el tamaño de los productos
      fontWeight: 'bold',
      marginTop: 5,
    },
    productPrice: {
      fontSize: 14, // Ajustado para el tamaño de los productos
      color: 'red',
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semitransparente
    },
    modalContent: {
      backgroundColor: '#fff', // Fondo blanco
      padding: 20,
      width: '80%',
      borderRadius: 10,
      alignItems: 'center',
    },
    modalImage: {
      width: 150,
      height: 150,
      borderRadius: 10,
      marginBottom: 20,
    },
    modalProductName: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    modalProductPrice: {
      fontSize: 20,
      color: 'red',
      marginBottom: 20,
    },
    totalText: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    quantityContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
    },
    quantityButton: {
      backgroundColor: '#A9D6E5',
      padding: 10,
      borderRadius: 5,
      marginHorizontal: 10,
    },
    quantityButtonText: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    quantityText: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    addButton: {
      backgroundColor: '#013A63',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      marginBottom: 10,
    },
    addButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    navbar: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingVertical: 10,
      borderTopWidth: 1,
      borderColor: '#ddd',
      backgroundColor: '#fff',
    },
    contentText: {
      fontSize: 18,
      color: '#333',
    },
    columnWrapper: {
      justifyContent: 'space-between', // Esto asegura que las columnas estén correctamente alineadas
    },
});


export default Buscador;
