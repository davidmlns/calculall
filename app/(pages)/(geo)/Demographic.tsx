import { ScrollView, Text, TextInput, View, Pressable, Animated } from 'react-native';
import HeaderPages from '../../../components/HeaderPages';
import HeaderDescriptionPage from '../../../components/HeaderDescriptionPage';
import { PopulationDensityIcon, CalculateIcon } from '../../../components/Icons';
import ResultComponent from '../../../components/ResultComponent';
import { useState } from 'react';

export default function Demographic() {
  const [result, setResult] = useState('The result will appear here');
  const [population, setPopulation] = useState('');
  const [area, setArea] = useState('');

  const scaleValue = new Animated.Value(1);

  const calculateDensity = (population: number, area: number): string => {
    if (population <= 0 || area <= 0) return 'Values must be positive';
    if (area === 0) return 'Area cannot be zero';

    const density = population / area;
    return `Density: ${Number(density.toFixed(2))} people/km²`;
  };

  const handleCalculateDensity = () => {
    const pop = parseFloat(population);
    const a = parseFloat(area);

    if (!population || !area) {
      setResult('Please enter required values');
      return;
    }

    if (isNaN(pop) || isNaN(a)) {
      setResult('Invalid input values');
      return;
    }

    setResult(calculateDensity(pop, a));
  };

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.5,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <ScrollView className='bg-background-app w-full h-full'>
      <HeaderPages />
      <HeaderDescriptionPage
        title='Demographic'
        icon={<PopulationDensityIcon size={51} color='#D35400' />}
      />
      <ResultComponent result={result} />

      <View className='flex mt-6 mx-auto'>
        <Text className='text-gray-300 text-2xl font-semibold text-center'>Values</Text>

        <View className='mt-2'>
          <TextInput
            className='bg-gray-800 rounded-2xl p-4 mx-auto text-center text-2xl w-72 text-slate-300'
            placeholder='Population'
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={population}
            onChangeText={setPopulation}
            maxLength={9}
          />
        </View>
        <View className='mt-4'>
          <TextInput
            className='bg-gray-800 rounded-2xl p-4 mx-auto text-center text-2xl w-72 text-slate-300'
            placeholder='Area (km²)'
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={area}
            onChangeText={setArea}
            maxLength={7}
          />
        </View>
      </View>

      {population && area && (
        <View className='mt-5'>
          <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
            <Pressable
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              onPress={handleCalculateDensity}
              className='rounded-2xl mx-auto mb-10'
              accessibilityLabel='Calculate Button'>
              <CalculateIcon size={58} color='white' />
            </Pressable>
          </Animated.View>
        </View>
      )}
    </ScrollView>
  );
}
