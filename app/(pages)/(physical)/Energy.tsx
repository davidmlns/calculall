import { Pressable, ScrollView, Text, View } from 'react-native';
import HeaderPages from '../../../components/HeaderPages';
import HeaderDescriptionPage from '../../../components/HeaderDescriptionPage';
import { EnergyIcon } from '../../../components/Icons';
import { useState } from 'react';
import ConvertComponent from '@/components/ConvertComponent';

type EnergyUnit = 'J' | 'KJ' | 'Cal' | 'kWh' | 'BTU';

type ConversionFactors = {
  [key in EnergyUnit]: number;
};

const conversionFactors: ConversionFactors = {
  J: 1,
  KJ: 1000,
  Cal: 4.184,
  kWh: 3.6e6,
  BTU: 1055,
};

export default function Energy() {
  const [result, setResult] = useState('');
  const [jouleValue, setJouleValue] = useState('');
  const [kiloJouleValue, setKiloJouleValue] = useState('');
  const [caloriesValue, setCaloriesValue] = useState('');
  const [kilowattHourValue, setKilowattHourValue] = useState('');
  const [britishThermalUnitValue, setBritishThermalUnitValue] = useState('');
  const [activeUnit, setActiveUnit] = useState<EnergyUnit>('J');

  const clearInputs = () => {
    setJouleValue('');
    setKiloJouleValue('');
    setCaloriesValue('');
    setKilowattHourValue('');
    setBritishThermalUnitValue('');
  };

  const convertEnergy = (value: string, unit: EnergyUnit) => {
    setActiveUnit(unit);

    const cleanedValue = value.replace(/[^0-9.]/g, '');
    const numericValue = parseFloat(cleanedValue);

    if (isNaN(numericValue)) {
      clearInputs();
      return;
    }

    const joules = numericValue * conversionFactors[unit];

    setJouleValue((joules / conversionFactors.J).toFixed(2));
    setKiloJouleValue((joules / conversionFactors.KJ).toFixed(2));
    setCaloriesValue((joules / conversionFactors.Cal).toFixed(2));
    setKilowattHourValue((joules / conversionFactors.kWh).toFixed(2));
    setBritishThermalUnitValue((joules / conversionFactors.BTU).toFixed(2));
  };

  return (
    <ScrollView className='bg-background-app w-full h-full'>
      <HeaderPages />
      <HeaderDescriptionPage title='Energy' icon={<EnergyIcon size={58} color='#2E86C1' />} />

      <View className='flex-col items-center'>
        <ConvertComponent
          abb='J'
          title='Joule'
          description='1 J'
          onChangeText={value => convertEnergy(value, 'J')}
          value={jouleValue}
          isActive={activeUnit === 'J'}
          onPress={clearInputs}
          maxLength={9}
        />
        <ConvertComponent
          abb='KJ'
          title='Kilojulio'
          description='1 J = 1000 J'
          onChangeText={value => convertEnergy(value, 'KJ')}
          value={kiloJouleValue}
          isActive={activeUnit === 'KJ'}
          onPress={clearInputs}
          maxLength={9}
        />
        <ConvertComponent
          abb='Cal'
          title='Calories'
          description='1 Cal = 4.184 J'
          onChangeText={value => convertEnergy(value, 'Cal')}
          value={caloriesValue}
          isActive={activeUnit === 'Cal'}
          onPress={clearInputs}
          maxLength={9}
        />
        <ConvertComponent
          abb='kWh'
          title='Kilowatt-hour'
          description='1 kWh = 3.6 × 10 J'
          onChangeText={value => convertEnergy(value, 'kWh')}
          value={kilowattHourValue}
          isActive={activeUnit === 'kWh'}
          onPress={clearInputs}
          maxLength={9}
        />
        <ConvertComponent
          abb='BTU'
          title='British Thermal Unit'
          description='1 BTU = 1055 J'
          onChangeText={value => convertEnergy(value, 'BTU')}
          value={britishThermalUnitValue}
          isActive={activeUnit === 'BTU'}
          onPress={clearInputs}
          maxLength={9}
        />
      </View>

      {(jouleValue ||
        kiloJouleValue ||
        caloriesValue ||
        kilowattHourValue ||
        britishThermalUnitValue) && (
        <View>
          <Pressable
            onPress={clearInputs}
            className='bg-icon-background rounded-xl pr-4 pl-4 pt-3 pb-3 mx-auto mt-10'>
            <Text className='text-slate-800 text-3xl font-semibold'>Clear</Text>
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
}
