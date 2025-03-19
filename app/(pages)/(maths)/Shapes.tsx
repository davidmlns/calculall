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
} from '../../../components/Icons';
import HeaderPages from '../../../components/HeaderPages';
import { ScrollView, Text, TextInput, View, Pressable } from 'react-native';
import HeaderDescriptionPage from '@/components/HeaderDescriptionPage';
import CalculateComponent, { Operation } from '@/components/CalculateComponent';
import ResultComponent from '@/components/ResultComponent';
import { useState } from 'react';

const operations: Operation[] = [
  {
    id: 'triangle',
    title: 'Triangle',
    icon: <TriangleIcon size={32} color='#6C3483' />,
    description: 'Area & Perimeter',
  },
  {
    id: 'square',
    title: 'Square',
    icon: <SquareIcon size={32} color='#6C3483' />,
    description: 'Area & Perimeter',
  },
  {
    id: 'rectangle',
    title: 'Rectangle',
    icon: <RectangleIcon size={32} color='#6C3483' />,
    description: 'Area & Perimeter',
  },
  {
    id: 'trapezoid',
    title: 'Trapezoid',
    icon: <ShapeIcon size={32} color='#6C3483' />,
    description: 'Area & Perimeter',
  },
  {
    id: 'rhombus',
    title: 'Rhombus',
    icon: <RhombusIcon size={32} color='#6C3483' />,
    description: 'Area & Perimeter',
  },
  {
    id: 'pentagon',
    title: 'Pentagon',
    icon: <PentagonIcon size={32} color='#6C3483' />,
    description: 'Area & Perimeter',
  },
  {
    id: 'hexagon',
    title: 'Hexagon',
    icon: <HexagonIcon size={32} color='#6C3483' />,
    description: 'Area & Perimeter',
  },
  {
    id: 'circle',
    title: 'Circle',
    icon: <CircleIcon size={32} color='#6C3483' />,
    description: 'Area, Diameter & Circumference',
  },
  {
    id: 'arc',
    title: 'Circular Arc',
    icon: <ArcIcon size={32} color='#6C3483' />,
    description: 'Length & Area',
  },
];

const calculateShape = (
  values: number[],
  operation: string,
): { area: number; perimeter: number } => {
  switch (operation) {
    case 'triangle':
      // Heron's formula for area
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
      throw new Error('Invalid operation');
  }
};

export default function Shapes(): JSX.Element {
  const [values, setValues] = useState<string[]>(['']);
  const [areaResult, setAreaResult] = useState('');
  const [perimeterResult, setPerimeterResult] = useState('');
  const [selectedOperation, setSelectedOperation] = useState<string>(operations[0]?.id || '');
  const [error, setError] = useState<string | null>(null);

  const handleOperationFromChild = (text: string): void => {
    setSelectedOperation(text);
    // Reset values when operation changes
    setValues(['']);
  };

  const handleCalculate = (): void => {
    try {
      const numericValues = values.map(v => parseFloat(v));
      if (numericValues.some(isNaN)) {
        throw new Error('Please enter valid values');
      }
      const { area, perimeter } = calculateShape(numericValues, selectedOperation);
      setAreaResult(`Area: ${area.toFixed(2)}`);
      setPerimeterResult(`Perimeter: ${perimeter.toFixed(2)}`);
      setError(null);
    } catch (error) {
      setError(error.message);
      setAreaResult('');
      setPerimeterResult('');
    }
  };

  const getInputFields = () => {
    switch (selectedOperation) {
      case 'triangle':
        return ['Side A (cm)', 'Side B (cm)', 'Side C (cm)'];
      case 'rectangle':
        return ['Length (cm)', 'Width (cm)'];
      case 'trapezoid':
        return ['Base A (cm)', 'Base B (cm)', 'Height (cm)'];
      case 'rhombus':
        return ['Side (cm)', 'Height (cm)'];
      case 'circle':
        return ['Radius (cm)'];
      case 'arc':
        return ['Radius (cm)', 'Angle (°)'];
      case 'square':
      case 'pentagon':
      case 'hexagon':
        return ['Side (cm)'];
      default:
        return ['Side (cm)'];
    }
  };

  return (
    <ScrollView className='bg-background-app w-full h-full'>
      <HeaderPages />
      <HeaderDescriptionPage title='Shapes' icon={<TriangleIcon size={58} color='#6C3483' />} />

      <View className='flex mb-4'>
        <TextInput
          placeholderTextColor='#c7c7c7'
          placeholder='The result will appear here'
          className='bg-gray-800 rounded-lg rounded-b-none p-4 text-2xl flex-wrap w-96 h-16 mx-auto text-center text-slate-300'
          editable={false}
          selectTextOnFocus={false}
          value={areaResult}
        />
        <TextInput
          className='bg-gray-800 rounded-lg rounded-t-none p-4 text-2xl flex-wrap w-96 h-16 mx-auto text-center text-slate-300'
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

      <View className='flex mt-6 mx-auto'>
        {getInputFields().map((label, index) => (
          <View key={index} className='mt-2'>
            <Text className='text-gray-300 text-xl font-semibold mb-1'>{label}</Text>
            <TextInput
              className='bg-gray-800 rounded-lg p-4 text-center text-2xl w-96 text-slate-300'
              placeholder={`Enter ${label}`}
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
        <View>
          <Pressable
            onPress={handleCalculate}
            className='bg-icon-background rounded-xl pr-4 pl-4 pt-3 pb-3 mx-auto mt-10'>
            <Text className='text-slate-800 text-3xl font-semibold'>Calculate</Text>
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
}
