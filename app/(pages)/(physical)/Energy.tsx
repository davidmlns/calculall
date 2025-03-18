import { Pressable, ScrollView, Text, View } from 'react-native';
import HeaderPages from '../../../components/HeaderPages';
import HeaderDescriptionPage from '../../../components/HeaderDescriptionPage';
import { EnergyIcon } from '../../../components/Icons';
import { useState } from 'react';
import ConvertComponent from '../../../components/ConvertComponent';

type EnergyUnit = 'J' | 'KJ' | 'Cal' | 'kWh' | 'BTU';

const conversionFactors = {
  J: 1,
  KJ: 1000,
  Cal: 4.184,
  kWh: 3.6e6,
  BTU: 1055,
};

export default function Energy() {
  const [joule, setJoule] = useState('');
  const [kilojoule, setKilojoule] = useState('');
  const [calorie, setCalorie] = useState('');
  const [kilowattHour, setKilowattHour] = useState('');
  const [britishThermalUnit, setBritishThermalUnit] = useState('');
  const [activeUnit, setActiveUnit] = useState<EnergyUnit>('J');

  const clearInputs = () => {
    setJoule('');
    setKilojoule('');
    setCalorie('');
    setKilowattHour('');
    setBritishThermalUnit('');
  };

  const convertEnergy = (value: string, unit: EnergyUnit) => {
    setActiveUnit(unit);
    const cleanedValue = value.replace(/[^0-9.]/g, '');
    const numericValue = parseFloat(cleanedValue) || 0;
    if (isNaN(numericValue)) return;

    const joules = numericValue * conversionFactors[unit];

    setJoule(unit === 'J' ? cleanedValue : (joules / conversionFactors.J).toFixed(2));
    setKilojoule(unit === 'KJ' ? cleanedValue : (joules / conversionFactors.KJ).toFixed(2));
    setCalorie(unit === 'Cal' ? cleanedValue : (joules / conversionFactors.Cal).toFixed(2));
    setKilowattHour(unit === 'kWh' ? cleanedValue : (joules / conversionFactors.kWh).toFixed(2));
    setBritishThermalUnit(
      unit === 'BTU' ? cleanedValue : (joules / conversionFactors.BTU).toFixed(2)
    );
  };

  return (
    <ScrollView className="bg-background-app w-full h-full">
      <HeaderPages />
      <HeaderDescriptionPage title="Energy" icon={<EnergyIcon size={58} color="#2E86C1" />} />

      <View className="flex-col items-center">
        <ConvertComponent
          abb="J"
          title="Joule"
          description="1 J"
          onChangeText={(value) => convertEnergy(value, 'J')}
          value={joule}
          isActive={activeUnit === 'J'}
          onPress={clearInputs}
          keyboardType="decimal-pad"
          maxLength={9}
        />
        <ConvertComponent
          abb="KJ"
          title="Kilojoule"
          description="1 KJ = 1000 J"
          onChangeText={(value) => convertEnergy(value, 'KJ')}
          value={kilojoule}
          isActive={activeUnit === 'KJ'}
          onPress={clearInputs}
          keyboardType="decimal-pad"
          maxLength={9}
        />
        <ConvertComponent
          abb="Cal"
          title="Calorie"
          description="1 Cal = 4.184 J"
          onChangeText={(value) => convertEnergy(value, 'Cal')}
          value={calorie}
          isActive={activeUnit === 'Cal'}
          onPress={clearInputs}
          keyboardType="decimal-pad"
          maxLength={9}
        />
        <ConvertComponent
          abb="kWh"
          title="Kilowatt-hour"
          description="1 kWh = 3.6 × 10 J"
          onChangeText={(value) => convertEnergy(value, 'kWh')}
          value={kilowattHour}
          isActive={activeUnit === 'kWh'}
          onPress={clearInputs}
          keyboardType="decimal-pad"
          maxLength={9}
        />
        <ConvertComponent
          abb="BTU"
          title="British Thermal Unit"
          description="1 BTU = 1055 J"
          onChangeText={(value) => convertEnergy(value, 'BTU')}
          value={britishThermalUnit}
          isActive={activeUnit === 'BTU'}
          onPress={clearInputs}
          keyboardType="decimal-pad"
          maxLength={9}
        />
      </View>

      {(!!joule || !!kilojoule || !!calorie || !!kilowattHour || !!britishThermalUnit) && (
        <View>
          <Pressable
            onPress={clearInputs}
            className="bg-icon-background rounded-xl pr-4 pl-4 pt-3 pb-3 mx-auto mt-10"
          >
            <Text className="text-slate-800 text-3xl font-semibold">Clear</Text>
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
}
