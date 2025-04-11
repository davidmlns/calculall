import {
  TriangleIcon,
  SquareIcon,
  RectangleIcon,
  RhombusIcon,
  PentagonIcon,
  HexagonIcon,
  CircleIcon,
  ArcIcon,
  ShapeIcon,
  CalculateIcon,
} from '../../../components/Icons';
import HeaderPages from '../../../components/HeaderPages';
import { ScrollView, Text, TextInput, View, Pressable, Animated } from 'react-native';
import HeaderDescriptionPage from '@/components/HeaderDescriptionPage';
import CalculateComponent, { Operation } from '@/components/CalculateComponent';
import ResultComponent from '@/components/ResultComponent';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Shapes = (): JSX.Element => {
  const { t } = useTranslation();
  const [values, setValues] = useState<string[]>(['']);
  const [areaResult, setAreaResult] = useState('');
  const [perimeterResult, setPerimeterResult] = useState('');
  const [selectedOperation, setSelectedOperation] = useState<string>('triangle');
  const [error, setError] = useState<string | null>(null);

  const scaleValue = new Animated.Value(1);

  const operations: Operation[] = [
    {
      id: 'triangle',
      title: t('shapesCard.operations.triangle.title'),
      icon: <TriangleIcon size={32} color='#6C3483' />,
      description: t('shapesCard.operations.triangle.description'),
    },
    {
      id: 'square',
      title: t('shapesCard.operations.square.title'),
      icon: <SquareIcon size={32} color='#6C3483' />,
      description: t('shapesCard.operations.square.description'),
    },
    {
      id: 'rectangle',
      title: t('shapesCard.operations.rectangle.title'),
      icon: <RectangleIcon size={32} color='#6C3483' />,
      description: t('shapesCard.operations.rectangle.description'),
    },
    {
      id: 'trapezoid',
      title: t('shapesCard.operations.trapezoid.title'),
      icon: <ShapeIcon size={32} color='#6C3483' />,
      description: t('shapesCard.operations.trapezoid.description'),
    },
    {
      id: 'rhombus',
      title: t('shapesCard.operations.rhombus.title'),
      icon: <RhombusIcon size={32} color='#6C3483' />,
      description: t('shapesCard.operations.rhombus.description'),
    },
    {
      id: 'pentagon',
      title: t('shapesCard.operations.pentagon.title'),
      icon: <PentagonIcon size={32} color='#6C3483' />,
      description: t('shapesCard.operations.pentagon.description'),
    },
    {
      id: 'hexagon',
      title: t('shapesCard.operations.hexagon.title'),
      icon: <HexagonIcon size={32} color='#6C3483' />,
      description: t('shapesCard.operations.hexagon.description'),
    },
    {
      id: 'circle',
      title: t('shapesCard.operations.circle.title'),
      icon: <CircleIcon size={32} color='#6C3483' />,
      description: t('shapesCard.operations.circle.description'),
    },
    {
      id: 'arc',
      title: t('shapesCard.operations.arc.title'),
      icon: <ArcIcon size={32} color='#6C3483' />,
      description: t('shapesCard.operations.arc.description'),
    },
  ];

  const calculateShape = (
    values: number[],
    operation: string,
  ): { area: number; perimeter: number } => {
    switch (operation) {
      case 'triangle':
        const [a, b, c] = values;
        const s = (a + b + c) / 2;
        return {
          area: Math.sqrt(s * (s - a) * (s - b) * (s - c)),
          perimeter: a + b + c,
        };
      case 'square':
        const side = values[0];
        return {
          area: side * side,
          perimeter: 4 * side,
        };
      case 'rectangle':
        const [length, width] = values;
        return {
          area: length * width,
          perimeter: 2 * (length + width),
        };
      case 'trapezoid':
        const [a1, b1, h] = values;
        return {
          area: ((a1 + b1) / 2) * h,
          perimeter: a1 + b1 + 2 * Math.sqrt(Math.pow((b1 - a1) / 2, 2) + Math.pow(h, 2)),
        };
      case 'rhombus':
        const [sideR, height] = values;
        return {
          area: sideR * height,
          perimeter: 4 * sideR,
        };
      case 'pentagon':
        const sideP = values[0];
        return {
          area: (5 / 4) * Math.pow(sideP, 2) * (1 / Math.tan(Math.PI / 5)),
          perimeter: 5 * sideP,
        };
      case 'hexagon':
        const sideH = values[0];
        return {
          area: ((3 * Math.sqrt(3)) / 2) * Math.pow(sideH, 2),
          perimeter: 6 * sideH,
        };
      case 'circle':
        const radius = values[0];
        return {
          area: Math.PI * Math.pow(radius, 2),
          perimeter: 2 * Math.PI * radius,
        };
      case 'arc':
        const [radiusA, angle] = values;
        return {
          area: (Math.PI * Math.pow(radiusA, 2) * angle) / 360,
          perimeter: (2 * Math.PI * radiusA * angle) / 360,
        };
      default:
        throw new Error(t('shapesCard.error.invalidOperation'));
    }
  };

  const handleOperationFromChild = (text: string): void => {
    setSelectedOperation(text);
    setValues(['']);
  };

  const handleCalculate = (): void => {
    try {
      const numericValues = values.map(v => parseFloat(v));
      if (numericValues.some(isNaN)) {
        throw new Error(t('shapesCard.error.invalidInput'));
      }
      const { area, perimeter } = calculateShape(numericValues, selectedOperation);

      setAreaResult(t('shapesCard.result.area', { value: area.toFixed(2) }));

      if (selectedOperation === 'circle') {
        setPerimeterResult(t('shapesCard.result.circumference', { value: perimeter.toFixed(2) }));
      } else if (selectedOperation === 'arc') {
        setPerimeterResult(t('shapesCard.result.length', { value: perimeter.toFixed(2) }));
      } else {
        setPerimeterResult(t('shapesCard.result.perimeter', { value: perimeter.toFixed(2) }));
      }

      setError(null);
    } catch (error) {
      setError(error.message);
      setAreaResult('');
      setPerimeterResult('');
    }
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

  const getInputFields = () => {
    return t(`shapesCard.inputs.${selectedOperation}`, { returnObjects: true });
  };

  return (
    <ScrollView className='bg-background-app w-full h-full'>
      <HeaderPages />
      <View className='mb-4'>
        <HeaderDescriptionPage
          title={t('shapesCard.title')}
          icon={<TriangleIcon size={52} color='#6C3483' />}
        />
      </View>

      <View className='mb-6'>
        <View className='flex'>
          <TextInput
            placeholderTextColor='#c7c7c7'
            placeholder={t('shapesCard.defaultResult')}
            className='bg-gray-800 rounded-lg font-Satoshi rounded-b-none p-4 text-2xl flex-wrap w-96 h-16 mx-auto text-center text-slate-300'
            editable={false}
            selectTextOnFocus={false}
            value={areaResult}
          />
          <TextInput
            className='bg-gray-800 rounded-lg font-Satoshi rounded-t-none p-4 text-2xl flex-wrap w-96 h-16 mx-auto text-center text-slate-300'
            editable={false}
            selectTextOnFocus={false}
            value={perimeterResult}
          />
        </View>

        <CalculateComponent
          operations={operations}
          onCalculate={handleCalculate}
          onSendOperation={handleOperationFromChild}
        />
      </View>

      <View className='flex  mx-auto'>
        {getInputFields().map((label: string, index: number) => (
          <View key={index} className='mt-4'>
            <Text className='text-gray-300 text-xl font-semibold font-Satoshi mb-1'>{label}</Text>
            <TextInput
              className='bg-gray-800 rounded-2xl p-4 mx-auto font-Satoshi text-center text-2xl w-80 text-slate-300'
              placeholder={`${t('shapesCard.enter')} ${label}`}
              placeholderTextColor='#cbd5e1'
              keyboardType='number-pad'
              value={values[index] || ''}
              onChangeText={text => {
                const newValues = [...values];
                newValues[index] = text;
                setValues(newValues);
              }}
              maxLength={7}
            />
          </View>
        ))}
      </View>

      {values.some(v => v) && (
        <View className='mt-5'>
          <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
            <Pressable
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
              onPress={handleCalculate}
              className='rounded-2xl mx-auto mb-10'
              accessibilityLabel={t('shapesCard.calculateButton')}>
              <CalculateIcon size={58} color='white' />
            </Pressable>
          </Animated.View>
        </View>
      )}
    </ScrollView>
  );
};

export default Shapes;
