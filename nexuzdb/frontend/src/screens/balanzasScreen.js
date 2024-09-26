import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import BalanzaItem from '../components/BalanzaItem';
import { styles } from '../styles';

export default function BalanzasScreen() {
  const [balanzas, setBalanzas] = useState([]);

  useEffect(() => {
    fetchBalanzas();
  }, []);

  async function fetchBalanzas() {
    try {
      const res = await fetch('http://192.168.137.155:3000/api/balanza/balanzas');
      const data = await res.json();
      setBalanzas(data);
    } catch (error) {
      console.error("Error al obtener las balanzas:", error);
    }
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={balanzas}
        renderItem={({ item }) => <BalanzaItem item={item} />}
        keyExtractor={(item) => item.balanza_id.toString()}
        ListEmptyComponent={<Text>No hay balanzas disponibles</Text>}
      />
    </View>
  );
}