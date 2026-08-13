import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image } from 'react-native';

export default function HomeScreen({ navigation }) {
  // Lista dos 5 blocos continentais vinculados às imagens locais da pasta assets
  const continents = [
    { 
      name: 'África', 
      id: 'África', 
      image: require('../../assets/continents/africa.jpg') 
    },
    { 
      name: 'Américas', 
      id: 'América', 
      image: require('../../assets/continents/america.jpg') 
    },
    { 
      name: 'Ásia', 
      id: 'Ásia', 
      image: require('../../assets/continents/asia.jpg') 
    },
    { 
      name: 'Europa', 
      id: 'Europa', 
      image: require('../../assets/continents/europa.jpg') 
    },
    { 
      name: 'Oceania', 
      id: 'Oceania', 
      image: require('../../assets/continents/oceania.jpg') 
    },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <Text style={styles.welcomeTitle}>Selecione um Continente</Text>
      <Text style={styles.welcomeSub}>Explore os países e mapas de cada região do mundo.</Text>

      {continents.map((item) => (
        <TouchableOpacity 
          key={item.id} 
          style={styles.continentCard}
          onPress={() => navigation.navigate('ContinentListScreen', { continentId: item.id, continentName: item.name })}
          activeOpacity={0.8}
        >
          {/* Renderiza a imagem local do continente ocupando o fundo do card */}
          <Image source={item.image} style={styles.cardImage} resizeMode="cover" />
          
          {/* Gradiente ou overlay escuro para deixar o texto legível por cima da imagem */}
          <View style={styles.overlay}>
            <Text style={styles.cardText}>{item.name}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f6f9' },
  content: { padding: 20, alignItems: 'center' },
  welcomeTitle: { fontSize: 24, fontWeight: 'bold', color: '#2c3e50', marginTop: 10, textAlign: 'center' },
  welcomeSub: { fontSize: 15, color: '#7f8c8d', textAlign: 'center', marginTop: 5, marginBottom: 25, paddingHorizontal: 10 },
  
  continentCard: { 
    width: '100%', 
    height: 130, 
    borderRadius: 15, 
    marginBottom: 20, 
    overflow: 'hidden', // Garante que a imagem respeite as bordas arredondadas do card
    elevation: 4, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.15, 
    shadowRadius: 4 
  },
  cardImage: { 
    width: '100%', 
    height: '100%', 
    position: 'absolute' 
  },
  overlay: { 
    flex: 1, 
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Película preta com 40% de opacidade para destacar o texto
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  cardText: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    color: '#fff', // Texto branco para contrastar com o fundo escurecido
    letterSpacing: 1.2
  }
});
