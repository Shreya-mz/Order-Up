import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';

const courts = Array.from({ length: 25 }, (_, i) => ({ id: i + 1, name: `Court ${i + 1}` }));

export default function CourtSelection() {

  const renderCourtCard = ({ item }) => (
    <TouchableOpacity 
      style={styles.card} 
      onPress={() => alert(`Aapne ${item.name} select kiya hai!`)}
    >
      <Text style={styles.cardText}>{item.id}</Text>
      <Text style={styles.cardSubText}>Food Court</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerTitle}>Select Your Food Court</Text>
      
      {/* 3. FlatList ka use */}
      <FlatList
        data={courts} 
        renderItem={renderCourtCard} 
        
        keyExtractor={(item) => item.id.toString()} 
        numColumns={3} 
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
}

// 🎨 Design (Styles)
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f8f8', paddingTop: 50 },
  headerTitle: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 20, color: '#333' },
  listContainer: { paddingHorizontal: 10 },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 8,
    height: 100,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    
    elevation: 3, 
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  cardText: { fontSize: 24, fontWeight: 'bold', color: '#fc8019' }, 
  cardSubText: { fontSize: 12, color: '#686b78' }
});