import { ScrollView, Text, TextInput, View, Pressable, Animated } from 'react-native';
import HeaderPages from '../../../components/HeaderPages';
import HeaderDescriptionPage from '../../../components/HeaderDescriptionPage';
import {
  CosIcon,
  SenIcon,
  TanIcon,
  TrigonometryIcon,
  CalculateIcon,
} from '../../../components/Icons';
import ResultComponent from '../../../components/ResultComponent';
import { useState } from 'react';
import CalculateComponent, { Operation } from '../../../components/CalculateComponent';
import { useTranslation } from 'react-i18next';

const scaleValue = new Animated.Value(1);

export default function Trigonometry() {
  const { t } = useTranslation();

  const operations: Operation[] = [
    {
      id: 'sen',
      title: t('trigonometryCard.operations.sine.title'),
      icon: <SenIcon size={32} color='#6C3483' />,
      description: t('trigonometryCard.operations.sine.description'),
    },
    {
      id: 'cos',
      title: t('trigonometryCard.operations.cosine.title'),
      icon: <CosIcon size={32} color='#6C3483' />,
      description: t('trigonometryCard.operations.cosine.description'),
    },
    {
      id: 'tan',
      title: t('trigonometryCard.operations.tangent.title'),
      icon: <TanIcon size={32} color='#6C3483' />,
      description: t('trigonometryCard.operations.tangent.description'),
    },
  ];

  const [result, setResult] = useState(t('trigonometryCard.defaultResult'));
  const [selectedOperation, setSelectedOperation] = useState<string>(operations[0]?.id || '');
  const [valueTextInputValues, setValueTextInputValues] = useState('');

  const handleOperationFromChild = (text: string) => {
    setSelectedOperation(text);
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

  const handleCalculate = (selectedOperation: string) => {
    if (!valueTextInputValues) {
      setResult(t('trigonometryCard.errors.enterAngle'));
      return;
    }
    const angle = parseFloat(valueTextInputValues);
    if (isNaN(angle)) {
      setResult(t('trigonometryCard.errors.invalidInput'));
      return;
    }

    switch (selectedOperation) {
      case 'sen':
        const sinRadians = (angle * Math.PI) / 180;
        setResult(
          t('trigonometryCard.result.sine', {
            angle: angle,
            value: Math.sin(sinRadians).toFixed(2),
          }),
        );
        break;
      case 'cos':
        const cosRadians = (angle * Math.PI) / 180;
        setResult(
          t('trigonometryCard.result.cosine', {
            angle: angle,
            value: Math.cos(cosRadians).toFixed(2),
          }),
        );
        break;
      case 'tan':
        if (angle % 90 === 0 && angle % 180 !== 0) {
          setResult(t('trigonometryCard.errors.indefiniteTangent'));
          return;
        }
        const tanRadians = (angle * Math.PI) / 180;
        setResult(
          t('trigonometryCard.result.tangent', {
            angle: angle,
            value: Math.tan(tanRadians).toFixed(2),
          }),
        );
        break;
      default:
        setResult(t('trigonometryCard.errors.invalidOperation'));
    }
  };

  return (
    <ScrollView className='bg-background-app w-full h-full'>
      <HeaderPages />
      <View className='mb-4'>
        <HeaderDescriptionPage
          title={t('trigonometryCard.title')}
          icon={<TrigonometryIcon size={54} color='#6C3483' />}
        />
      </View>

      <View className='mb-6'>
        <ResultComponent result={result} />
        <CalculateComponent
          operations={operations}
          onCalculate={handleCalculate}
          onSendOperation={handleOperationFromChild}
        />
      </View>

      <View className='flex mx-auto mb-5'>
        <Text className='text-gray-300 text-2xl font-Satoshi font-semibold text-center'>
          {t('trigonometryCard.values')}
        </Text>

        <View className='mt-2'>
          <TextInput
            className='bg-gray-800 rounded-2xl p-4 font-Satoshi text-center text-2xl w-72 text-slate-300'
            placeholder={t('trigonometryCard.enterAngle')}
            placeholderTextColor='#cbd5e1'
            keyboardType='number-pad'
            value={valueTextInputValues}
            onChangeText={text => {
              const numericText = text.replace(/[^0-9]/g, '');
              setValueTextInputValues(numericText.slice(0, 3));
            }}
            maxLength={3}
          />
        </View>
      </View>

      {valueTextInputValues && (
        <View>
          <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
            <Pressable
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              onPress={() => handleCalculate(selectedOperation)}
              className='rounded-2xl mx-auto mb-10'
              accessibilityLabel={t('trigonometryCard.calculateButton')}>
              <CalculateIcon size={58} color='white' />
            </Pressable>
          </Animated.View>
        </View>
      )}
    </ScrollView>
  );
}
