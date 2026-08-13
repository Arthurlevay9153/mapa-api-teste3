import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function DetailsScreen({ route }) {
  const country = route?.params?.country;

  const languages = country?.languages ? Object.values(country.languages).join(', ') : 'N/A';
  const currencies = country?.currencies 
    ? Object.values(country.currencies).map(c => `${c.name || ''} (${c.symbol || ''})`).join(', ')
    : 'N/A';

  // Coleta latitude e longitude com tratamento de erros caso o array da API falhe
  const lat = country?.latlng && country.latlng.length === 2 ? country.latlng[0] : 0;
  const lng = country?.latlng && country.latlng.length === 2 ? country.latlng[1] : 0;

  return (
    <ScrollView style={detailsStyles.container} showsVerticalScrollIndicator={false}>
      {/* Substitui a imagem bloqueada por um emoji de bandeira centralizado e bonito */}
      <View style={{ alignItems: 'center', marginVertical: 15 }}>
        <Text style={{ fontSize: 100 }}>{country?.flagEmoji || '🌍'}</Text>
      </View>

      
      <Text style={detailsStyles.title}>{country?.name?.common || 'Detalhes'}</Text>
      
      <View style={detailsStyles.infoBox}>
        <Text style={detailsStyles.text}><Text style={detailsStyles.bold}>Capital:</Text> {country?.capital && country.capital.length > 0 ? country.capital[0] : 'N/A'}</Text>
        <Text style={detailsStyles.text}><Text style={detailsStyles.bold}>População:</Text> {country?.population ? country.population.toLocaleString('pt-BR') : '0'}</Text>
        <Text style={detailsStyles.text}><Text style={detailsStyles.bold}>Continente:</Text> {country?.continents && country.continents.length > 0 ? country.continents[0] : 'N/A'}</Text>
        <Text style={detailsStyles.text}><Text style={detailsStyles.bold}>Idiomas:</Text> {languages}</Text>
        <Text style={detailsStyles.text}><Text style={detailsStyles.bold}>Moeda:</Text> {currencies}</Text>
        <Text style={detailsStyles.text}><Text style={detailsStyles.bold}>Região:</Text> {country?.region || 'N/A'}</Text>
      </View>

      <Text style={detailsStyles.mapTitle}>📍 Localização Geográfica</Text>
      <View style={detailsStyles.mapWrapper}>
        <MapView
          style={detailsStyles.map}
          initialRegion={{
            latitude: lat,
            longitude: lng,
            latitudeDelta: 25,
            longitudeDelta: 25,
          }}
        >
          <Marker 
            coordinate={{ latitude: lat, longitude: lng }}
            title={country?.name?.common || 'País'}
            description={country?.capital && country.capital.length > 0 ? country.capital[0] : ''}
          />
        </MapView>
      </View>
    </ScrollView>
  );
}

const detailsStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f6f9', padding: 15 },
  largeFlag: { width: '100%', height: 210, borderRadius: 12, borderWidth: 0.5, borderColor: '#ccc', marginBottom: 15 },
  title: { fontSize: 26, fontWeight: 'bold', textAlign: 'center', color: '#2c3e50', marginBottom: 20 },
  infoBox: { backgroundColor: '#fff', padding: 18, borderRadius: 12, marginBottom: 20, elevation: 1 },
  text: { fontSize: 16, color: '#34495e', marginBottom: 8 },
  bold: { fontWeight: 'bold', color: '#2c3e50' },
  mapTitle: { fontSize: 18, fontWeight: 'bold', color: '#2c3e50', marginBottom: 10 },
  mapWrapper: { borderRadius: 12, overflow: 'hidden', height: 230, marginBottom: 35, borderWidth: 1, borderColor: '#ddd' },
  map: { width: '100%', height: '100%' }
});
