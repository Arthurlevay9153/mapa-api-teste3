import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Importação das três telas do projeto das subpastas corretas
import HomeScreen from './src/screens/HomeScreen';
import ContinentListScreen from './src/screens/ContinentListScreen';
import DetailsScreen from './src/screens/DetailsScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen 
          name="HomeScreen" 
          component={HomeScreen} 
          options={{ title: 'Continentes do Mundo' }} 
        />
        {/* ESSA LINHA ADICIONA A TELA QUE ESTAVA FALTANDO E RESOLVE O ERRO VERMELHO */}
        <Stack.Screen 
          name="ContinentListScreen" 
          component={ContinentListScreen} 
          options={({ route }) => ({ title: `Países: ${route.params?.continentName || ''}` })} 
        />
        <Stack.Screen 
          name="DetailsScreen" 
          component={DetailsScreen} 
          options={{ title: 'Visão Detalhada' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
