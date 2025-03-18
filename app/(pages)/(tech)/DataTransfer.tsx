import { Pressable, ScrollView, Text, View } from 'react-native';
import HeaderPages from '../../../components/HeaderPages';
import HeaderDescriptionPage from '../../../components/HeaderDescriptionPage';
import { DataTransferIcon } from '../../../components/Icons';
import { useState } from 'react';
import ConvertComponent from '../../../components/ConvertComponent';

type DataTransferUnit = 'b/s' | 'kb/s' | 'mb/s' | 'gb/s' | 'tb/s';

const conversionFactors = {
  'b/s': 1,
  'kb/s': 1000,
  'mb/s': 1000000,
  'gb/s': 1000000000,
  'tb/s': 1000000000000,
};

export default function DataTransfer() {
  const [bitPerSecond, setBitPerSecond] = useState('');
  const [kilobitPerSecond, setKilobitPerSecond] = useState('');
  const [megabitPerSecond, setMegabitPerSecond] = useState('');
  const [gigabitPerSecond, setGigabitPerSecond] = useState('');
  const [terabitPerSecond, setTerabitPerSecond] = useState('');
  const [activeUnit, setActiveUnit] = useState<DataTransferUnit>('b/s');

  const clearInputs = () => {
    setBitPerSecond('');
    setKilobitPerSecond('');
    setMegabitPerSecond('');
    setGigabitPerSecond('');
    setTerabitPerSecond('');
  };

  const convertDataTransfer = (value: string, unit: DataTransferUnit) => {
    setActiveUnit(unit);
    const cleanedValue = value.replace(/[^0-9.]/g, '');
    const numericValue = parseFloat(cleanedValue) || 0;
    if (isNaN(numericValue)) return;

    const bitsPerSecond = numericValue * conversionFactors[unit];

    setBitPerSecond(
      unit === 'b/s' ? cleanedValue : (bitsPerSecond / conversionFactors['b/s']).toFixed(2),
    );
    setKilobitPerSecond(
      unit === 'kb/s' ? cleanedValue : (bitsPerSecond / conversionFactors['kb/s']).toFixed(2),
    );
    setMegabitPerSecond(
      unit === 'mb/s' ? cleanedValue : (bitsPerSecond / conversionFactors['mb/s']).toFixed(2),
    );
    setGigabitPerSecond(
      unit === 'gb/s' ? cleanedValue : (bitsPerSecond / conversionFactors['gb/s']).toFixed(2),
    );
    setTerabitPerSecond(
      unit === 'tb/s' ? cleanedValue : (bitsPerSecond / conversionFactors['tb/s']).toFixed(2),
    );
  };

  return (
    <ScrollView className='bg-background-app w-full h-full'>
      <HeaderPages />
      <HeaderDescriptionPage
        title='Data Transfer'
        icon={<DataTransferIcon size={58} color='#3498DB' />}
      />

      <View className='flex-col items-center'>
        <ConvertComponent
          abb='b/s'
          title='Bits per second'
          description='1 b/s'
          onChangeText={value => convertDataTransfer(value, 'b/s')}
          value={bitPerSecond}
          isActive={activeUnit === 'b/s'}
          onPress={clearInputs}
          keyboardType='decimal-pad'
          maxLength={9}
        />
        <ConvertComponent
          abb='kb/s'
          title='Kilobits per second'
          description='1 kb/s = 1000 b/s'
          onChangeText={value => convertDataTransfer(value, 'kb/s')}
          value={kilobitPerSecond}
          isActive={activeUnit === 'kb/s'}
          onPress={clearInputs}
          keyboardType='decimal-pad'
          maxLength={9}
        />
        <ConvertComponent
          abb='mb/s'
          title='Megabits per second'
          description='1 mb/s = 1000 kb/s'
          onChangeText={value => convertDataTransfer(value, 'mb/s')}
          value={megabitPerSecond}
          isActive={activeUnit === 'mb/s'}
          onPress={clearInputs}
          keyboardType='decimal-pad'
          maxLength={9}
        />
        <ConvertComponent
          abb='gb/s'
          title='Gigabits per second'
          description='1 gb/s = 1000 mb/s'
          onChangeText={value => convertDataTransfer(value, 'gb/s')}
          value={gigabitPerSecond}
          isActive={activeUnit === 'gb/s'}
          onPress={clearInputs}
          keyboardType='decimal-pad'
          maxLength={9}
        />
        <ConvertComponent
          abb='tb/s'
          title='Terabits per second'
          description='1 tb/s = 1000 gb/s'
          onChangeText={value => convertDataTransfer(value, 'tb/s')}
          value={terabitPerSecond}
          isActive={activeUnit === 'tb/s'}
          onPress={clearInputs}
          keyboardType='decimal-pad'
          maxLength={2}
        />
      </View>

      {(bitPerSecond ||
        kilobitPerSecond ||
        megabitPerSecond ||
        gigabitPerSecond ||
        terabitPerSecond) && (
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
