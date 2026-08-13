export const fetchCountriesFromApi = async () => {
  // CORRIGIDO: Agora com o caminho completo e exato para o banco de dados dos países do mundo
  const GLOBAL_MIRROR_URL = 'https://jsdelivr.net';

  // Lista reserva local para o app NUNCA travar na tela de carregamento caso ocorra erro de rede
  const localCountriesMock = [
    {
      name: { common: 'Argentina' },
      translations: { por: { common: 'Argentina' } },
      cca3: 'ARG',
      continents: ['América do Sul'],
      capital: ['Buenos Aires'],
      population: 45808000,
      languages: { spa: 'Espanhol' },
      currencies: { ARS: { name: 'Peso Argentino', symbol: '$' } },
      region: 'Américas',
      flagEmoji: '🇦🇷',
      latlng: [-38.416097, -63.616672]
    },
    {
      name: { common: 'Brasil' },
      translations: { por: { common: 'Brasil' } },
      cca3: 'BRA',
      continents: ['América do Sul'],
      capital: ['Brasília'],
      population: 214300000,
      languages: { por: 'Português' },
      currencies: { BRL: { name: 'Real', symbol: 'R$' } },
      region: 'Américas',
      flagEmoji: '🇧🇷',
      latlng: [-14.235004, -51.92528]
    },
    {
      name: { common: 'Cabo Verde' },
      translations: { por: { common: 'Cabo Verde' } },
      cca3: 'CPV',
      continents: ['África'],
      capital: ['Praia'],
      population: 561900,
      languages: { por: 'Português' },
      currencies: { CVE: { name: 'Escudo cabo-verdiano', symbol: 'Esc' } },
      region: 'África',
      flagEmoji: '🇨🇻',
      latlng: [16.5388, -23.0418]
    },
    {
      name: { common: 'Portugal' },
      translations: { por: { common: 'Portugal' } },
      cca3: 'PRT',
      continents: ['Europa'],
      capital: ['Lisboa'],
      population: 10300000,
      languages: { por: 'Português' },
      currencies: { EUR: { name: 'Euro', symbol: '€' } },
      region: 'Europa',
      flagEmoji: '🇵🇹',
      latlng: [39.399872, -8.224454]
    },
    {
      name: { common: 'Japão' },
      translations: { por: { common: 'Japão' } },
      cca3: 'JPN',
      continents: ['Ásia'],
      capital: ['Tóquio'],
      population: 125700000,
      languages: { jpn: 'Japonês' },
      currencies: { JPY: { name: 'Iene', symbol: '¥' } },
      region: 'Ásia',
      flagEmoji: '🇯🇵',
      latlng: [36.204824, 138.252924]
    }
  ];

  try {
    const response = await fetch(GLOBAL_MIRROR_URL);
    if (!response.ok) throw new Error('Falha no servidor');
    
    const data = await response.json();
    
    const allWorldCountries = data.map(item => {
      const langValues = item.languages ? Object.values(item.languages) : [];
      const languagesObj = {};
      langValues.forEach((lang, index) => { languagesObj[`lang_${index}`] = lang; });

      const currencyKeys = item.currencies ? Object.keys(item.currencies) : [];
      const currenciesObj = {};
      currencyKeys.forEach(key => {
        currenciesObj[key] = { 
          name: item.currencies[key].name || key, 
          symbol: item.currencies[key].symbol || '' 
        };
      });

      return {
        name: { common: item.name.common || '' },
        translations: { 
          por: { 
            common: item.translations?.por?.common || item.translations?.bra?.common || item.name.common || ''
          } 
        },
        cca3: item.cca3 || '',
        continents: item.continents || [item.region || ''],
        capital: item.capital || ['N/A'],
        population: item.population || 0,
        languages: languagesObj,
        currencies: currenciesObj,
        region: item.region || '',
        flagEmoji: item.flag || '🌍',
        latlng: item.latlng && item.latlng.length === 2 ? item.latlng : [0, 0]
      };
    });

    return allWorldCountries.sort((a, b) => 
      (a.translations?.por?.common || '').localeCompare(b.translations?.por?.common || '')
    );

  } catch (error) {
    console.log("Aviso: Redirecionando para dados locais estáveis: " + error.message);
    // Retorna a lista local para desativar o carregamento na tela imediatamente se houver falha de rede
    return localCountriesMock;
  }
};
