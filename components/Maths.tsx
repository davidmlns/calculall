import { View, Text } from 'react-native';
import {
  AngleIcon,
  AverageIcon,
  BaseNumericIcon,
  EquationIcon,
  FractionIcon,
  GCMLCMIcon,
  LengthIcon,
  NumberGeneratorIcon,
  PrimeNumberIcon,
  ProbabilityIcon,
  RomanNumberIcon,
  ShapeIcon,
  StatisticsIcon,
  TrigonometryIcon,
} from './Icons';
import Card from './Card';

export default function Maths() {
  return (
    <View className='mt-6 flex-row flex-wrap justify-around'>
      <Card
        title='Angles'
        category='Maths'
        icon={<AngleIcon size={44} color='#6C3483' />}
        route='/'
      />

      <Card
        title='Average'
        category='Maths'
        icon={<AverageIcon size={44} color='#6C3483' />}
        route='/'
      />
      <Card
        title='Base numeric'
        category='Maths'
        icon={<BaseNumericIcon size={44} color='#6C3483' />}
        route='/'
      />

      <Card
        title='Equations'
        category='Maths'
        icon={<EquationIcon size={44} color='#6C3483' />}
        route='/'
      />

      <Card
        title='Fractions'
        category='Maths'
        icon={<FractionIcon size={44} color='#6C3483' />}
        route='/'
      />

      <Card
        title='GCM/LCM'
        category='Maths'
        icon={<GCMLCMIcon size={44} color='#6C3483' />}
        route='/'
      />

      <Card
        title='Length'
        category='Maths'
        icon={<LengthIcon size={44} color='#6C3483' />}
        route='/'
      />

      <Card
        title='Nro generator'
        category='Maths'
        icon={<NumberGeneratorIcon size={44} color='#6C3483' />}
        route='/'
      />

      <Card
        title='Prime Nro'
        category='Maths'
        icon={<PrimeNumberIcon size={44} color='#6C3483' />}
        route='/'
      />

      <Card
        title='Probability'
        category='Maths'
        icon={<ProbabilityIcon size={44} color='#6C3483' />}
        route='/'
      />

      <Card
        title='Roman Nro'
        category='Maths'
        icon={<RomanNumberIcon size={44} color='#6C3483' />}
        route='/'
      />

      <Card
        title='Shapes'
        category='Maths'
        icon={<ShapeIcon size={44} color='#6C3483' />}
        route='/'
      />

      <Card
        title='Statistics'
        category='Maths'
        icon={<StatisticsIcon size={44} color='#6C3483' />}
        route='/'
      />

      <Card
        title='Trigonometry'
        category='Maths'
        icon={<TrigonometryIcon size={44} color='#6C3483' />}
        route='/'
      />
    </View>
  );
}
