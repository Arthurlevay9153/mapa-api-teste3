import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

export default function CountryCard({ country, onPress }) {
  const flagUrl = country?.flags?.png || country?.flags?.svg;
  const continent = country?.continents && country.continents.length > 0 
    ? country.continents[0] 
    : 'N/A';

  return (
    <TouchableOpacity style={cardStyles.card} onPress={onPress} activeOpacity={0.7}>
      {flagUrl ? (
        <Image source={{ uri: flagUrl }} style={cardStyles.flag} />
      ) : (
        <View style={[cardStyles.flag, { backgroundColor: '#eee', justifyContent: 'center', alignItems: 'center' }]}>
          <Text style={{ fontSize: 10 }}>Sem Bandeira</Text>
        </View>
      )}
      <View style={cardStyles.info}>
        <Text style={cardStyles.name} numberOfLines={1}>
          {country?.name?.common || 'Desconhecido'}
        </Text>
        <Text style={cardStyles.sub}>{continent}</Text>
      </View>
    </TouchableOpacity>
  );
}

const cardStyles = StyleSheet.create({
  card: { flexDirection: 'row', backgroundColor: '#fff', padding: 12, borderRadius: 10, marginBottom: 10, alignItems: 'center', elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2 },
  flag: { width: 55, height: 38, borderRadius: 4, borderWidth: 0.5, borderColor: '#ddd', marginRight: 15 },
  info: { flex: 1 },
  name: { fontSize: 16, fontWeight: 'bold', color: '#2c3e50' },
  sub: { fontSize: 13, color: '#7f8c8d', marginTop: 2 }
});
