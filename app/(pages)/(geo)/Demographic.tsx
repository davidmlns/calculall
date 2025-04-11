import { ScrollView, Text, TextInput, View, Pressable, Animated } from 'react-native';
import HeaderPages from '../../../components/HeaderPages';
import HeaderDescriptionPage from '../../../components/HeaderDescriptionPage';
import { PopulationDensityIcon, CalculateIcon } from '../../../components/Icons';
import ResultComponent from '../../../components/ResultComponent';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function Demographic() {
  const { t } = useTranslation('');
  const [result, setResult] = useState(t('demographicCard.defaultResult'));
  const [population, setPopulation] = useState('');
  const [area, setArea] = useState('');

  const scaleValue = new Animated.Value(1);

  const calculateDensity = (population: number, area: number): string => {
    if (population <= 0 || area <= 0) return t('demographicCard.positiveValuesRequired');
    if (area === 0) return t('demographicCard.areaCannotBeZero');

    const density = population / area;
    return t('demographicCard.densityResult', { density: Number(density.toFixed(2)) });
  };

  const handleCalculateDensity = () => {
    const pop = parseFloat(population);
    const a = parseFloat(area);

    if (!population || !area) {
      setResult(t('demographicCard.enterRequiredValues'));
      return;
    }

    if (isNaN(pop) || isNaN(a)) {
      setResult(t('demographicCard.invalidInput'));
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
      <View className='mb-4'>
        <HeaderDescriptionPage
          title={t('demographicCard.title')}
          icon={<PopulationDensityIcon size={51} color='#D35400' />}
        />
      </View>
      <View className='mb-6'>
        <ResultComponent result={result} />
      </View>

      <View className='flex mx-auto'>
        <Text className='text-gray-300 text-2xl font-Satoshi font-semibold text-center'>
          {t('demographicCard.valuesTitle')}
        </Text>

        <View className='mt-2'>
          <TextInput
            className='bg-gray-800 rounded-2xl p-4 font-Satoshi mx-auto text-center text-2xl w-72 text-slate-300'
            placeholder={t('demographicCard.populationPlaceholder')}
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={population}
            onChangeText={setPopulation}
            maxLength={9}
          />
        </View>
        <View className='mt-4'>
          <TextInput
            className='bg-gray-800 rounded-2xl p-4 font-Satoshi mx-auto text-center text-2xl w-72 text-slate-300'
            placeholder={t('demographicCard.areaPlaceholder')}
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
              accessibilityLabel={t('demographicCard.calculateButtonA11yLabel')}>
              <CalculateIcon size={58} color='white' />
            </Pressable>
          </Animated.View>
        </View>
      )}
    </ScrollView>
  );
}
