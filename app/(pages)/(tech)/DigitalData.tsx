import { Pressable, ScrollView, Text, View } from 'react-native';
import HeaderPages from '../../../components/HeaderPages';
import HeaderDescriptionPage from '../../../components/HeaderDescriptionPage';
import { DigitalDataIcon } from '../../../components/Icons';
import { useState } from 'react';
import ConvertComponent from '../../../components/ConvertComponent';

type DigitalDataUnit = 'B' | 'KB' | 'MB' | 'GB' | 'TB';

const conversionFactors = {
  B: 1,
  KB: 1024,
  MB: 1048576,
  GB: 1073741824,
  TB: 1099511627776,
};

export default function DigitalData() {
  const [bytes, setBytes] = useState('');
  const [kilobytes, setKilobytes] = useState('');
  const [megabytes, setMegabytes] = useState('');
  const [gigabytes, setGigabytes] = useState('');
  const [terabytes, setTerabytes] = useState('');
  const [activeUnit, setActiveUnit] = useState<DigitalDataUnit>('B');

  const clearInputs = () => {
    setBytes('');
    setKilobytes('');
    setMegabytes('');
    setGigabytes('');
    setTerabytes('');
  };

  const convertDigitalData = (value: string, unit: DigitalDataUnit) => {
    setActiveUnit(unit);
    const cleanedValue = value.replace(/[^0-9.]/g, '');
    const numericValue = parseFloat(cleanedValue) || 0;
    if (isNaN(numericValue)) return;

    const bytesValue = numericValue * conversionFactors[unit];

    setBytes(unit === 'B' ? cleanedValue : (bytesValue / conversionFactors['B']).toFixed(2));
    setKilobytes(unit === 'KB' ? cleanedValue : (bytesValue / conversionFactors['KB']).toFixed(2));
    setMegabytes(unit === 'MB' ? cleanedValue : (bytesValue / conversionFactors['MB']).toFixed(2));
    setGigabytes(unit === 'GB' ? cleanedValue : (bytesValue / conversionFactors['GB']).toFixed(2));
    setTerabytes(unit === 'TB' ? cleanedValue : (bytesValue / conversionFactors['TB']).toFixed(2));
  };

  return (
    <ScrollView className='bg-background-app w-full h-full'>
      <HeaderPages />
      <HeaderDescriptionPage
        title='Digital Data'
        icon={<DigitalDataIcon size={58} color='#3498DB' />}
      />

      <View className='flex-col items-center'>
        <ConvertComponent
          abb='B'
          title='Bytes'
          description='1 B'
          onChangeText={value => convertDigitalData(value, 'B')}
          value={bytes}
          isActive={activeUnit === 'B'}
          onPress={clearInputs}
          keyboardType='decimal-pad'
          maxLength={9}
        />
        <ConvertComponent
          abb='KB'
          title='Kilobytes'
          description='1 KB = 1024 B'
          onChangeText={value => convertDigitalData(value, 'KB')}
          value={kilobytes}
          isActive={activeUnit === 'KB'}
          onPress={clearInputs}
          keyboardType='decimal-pad'
          maxLength={9}
        />
        <ConvertComponent
          abb='MB'
          title='Megabytes'
          description='1 MB = 1024 KB'
          onChangeText={value => convertDigitalData(value, 'MB')}
          value={megabytes}
          isActive={activeUnit === 'MB'}
          onPress={clearInputs}
          keyboardType='decimal-pad'
          maxLength={9}
        />
        <ConvertComponent
          abb='GB'
          title='Gigabytes'
          description='1 GB = 1024 MB'
          onChangeText={value => convertDigitalData(value, 'GB')}
          value={gigabytes}
          isActive={activeUnit === 'GB'}
          onPress={clearInputs}
          keyboardType='decimal-pad'
          maxLength={9}
        />
        <ConvertComponent
          abb='TB'
          title='Terabytes'
          description='1 TB = 1024 GB'
          onChangeText={value => convertDigitalData(value, 'TB')}
          value={terabytes}
          isActive={activeUnit === 'TB'}
          onPress={clearInputs}
          keyboardType='decimal-pad'
          maxLength={2}
        />
      </View>

      {(bytes || kilobytes || megabytes || gigabytes || terabytes) && (
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
