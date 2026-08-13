import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, TextInput, ActivityIndicator, Text } from 'react-native';
import { fetchCountriesFromApi } from '../services/api';
import CountryCard from '../components/CountryCard';

export default function ContinentListScreen({ route, navigation }) {
  const { continentId, continentName } = route.params;
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const allCountries = await fetchCountriesFromApi();
      
      // Filtra os países para conter apenas o continente selecionado
      const regionCountries = allCountries.filter(item => {
        const itemContinent = item?.continents && item.continents.length > 0 ? item.continents[0] : '';
        return itemContinent.toLowerCase().includes(continentId.toLowerCase());
      });

      setCountries(regionCountries);
      setFilteredCountries(regionCountries);
      setLoading(false);
    };
    loadData();
  }, [continentId]);

  const handleSearch = (text) => {
    setSearch(text);
    if (text.trim() === '') {
      setFilteredCountries(countries);
    } else {
      const filtered = countries.filter(item => {
        const namePt = item?.translations?.por?.common?.toLowerCase() || '';
        const nameEn = item?.name?.common?.toLowerCase() || '';
        return namePt.includes(text.toLowerCase()) || nameEn.includes(text.toLowerCase());
      });
      setFilteredCountries(filtered);
    }
  };

  if (loading) {
    return (
      <View style={generalStyles.center}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text style={generalStyles.loadingText}>Buscando países da região...</Text>
      </View>
    );
  }

  return (
    <View style={generalStyles.container}>
      <TextInput
        placeholder={`🔍 Pesquisar em ${continentName}...`}
        style={generalStyles.searchBar}
        value={search}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filteredCountries}
        keyExtractor={(item, index) => item?.cca3 || index.toString()}
        renderItem={({ item }) => (
          <CountryCard 
            country={item} 
            onPress={() => navigation.navigate('DetailsScreen', { country: item })}
          />
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', color: '#7f8c8d', marginTop: 30 }}>
            Nenhum país cadastrado nesta região.
          </Text>
        }
      />
    </View>
  );
}

const generalStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f6f9', paddingHorizontal: 15 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f4f6f9' },
  loadingText: { marginTop: 12, color: '#555', fontSize: 16, fontWeight: '500' },
  searchBar: { backgroundColor: '#fff', padding: 12, borderRadius: 8, marginVertical: 15, borderWidth: 1, borderColor: '#e0e0e0', fontSize: 15 }
});
