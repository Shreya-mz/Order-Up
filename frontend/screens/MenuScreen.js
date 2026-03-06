import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ScrollView } from 'react-native';


const menuItems = [
  { id: '1', name: 'Paneer Butter Masala', price: 150 },
  { id: '2', name: 'Veg Biryani', price: 120 },
  { id: '3', name: 'Cold Coffee', price: 60 },
  { id: '4', name: 'Masala Dosa', price: 80 },
];

export default function MenuScreen({ route }) {
  
  const [cart, setCart] = useState([]); 
  const [orderType, setOrderType] = useState('Dine-in'); 

 
  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  
  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.title}>Court Menu</Text>

      {/* 5. Dine-in vs Parcel Selector */}
      <View style={styles.typeContainer}>
        <TouchableOpacity 
          style={[styles.typeButton, orderType === 'Dine-in' && styles.activeType]}
          onPress={() => setOrderType('Dine-in')}
        >
          <Text style={orderType === 'Dine-in' ? styles.activeText : styles.inactiveText}>🍽️ Dine-in</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.typeButton, orderType === 'Parcel' && styles.activeType]}
          onPress={() => setOrderType('Parcel')}
        >
          <Text style={orderType === 'Parcel' ? styles.activeText : styles.inactiveText}>🥡 Parcel</Text>
        </TouchableOpacity>
      </View>

      {/* 6. Menu List */}
      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemCard}>
            <View>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>₹{item.price}</Text>
            </View>
            <TouchableOpacity style={styles.addButton} onPress={() => addToCart(item)}>
              <Text style={styles.addButtonText}>ADD +</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* 7. Checkout Bar (Swiggy Style) */}
      {cart.length > 0 && (
        <View style={styles.checkoutBar}>
          <Text style={styles.checkoutText}>{cart.length} Item | ₹{totalPrice}</Text>
          <TouchableOpacity style={styles.placeOrderBtn}>
            <Text style={styles.placeOrderText}>Place Order ({orderType})</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

// 🎨 Design (Styles)
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20, paddingTop: 60 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  typeContainer: { flexDirection: 'row', marginBottom: 20, gap: 10 },
  typeButton: { flex: 1, padding: 12, borderWidth: 1, borderColor: '#ddd', borderRadius: 10, alignItems: 'center' },
  activeType: { backgroundColor: '#fc8019', borderColor: '#fc8019' }, // Active state Orange
  activeText: { color: '#fff', fontWeight: 'bold' },
  inactiveText: { color: '#333' },
  itemCard: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#eee' },
  itemName: { fontSize: 18, fontWeight: '500' },
  itemPrice: { fontSize: 14, color: '#666' },
  addButton: { borderWidth: 1, borderColor: '#fc8019', paddingHorizontal: 15, paddingVertical: 5, borderRadius: 5 },
  addButtonText: { color: '#fc8019', fontWeight: 'bold' },
  checkoutBar: { position: 'absolute', bottom: 30, left: 20, right: 20, backgroundColor: '#60b246', padding: 15, borderRadius: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  checkoutText: { color: '#fff', fontWeight: 'bold' },
  placeOrderText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});