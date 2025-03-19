import { View } from 'react-native';
import {
  AngleIcon,
  AverageIcon,
  BaseNumericIcon,
  EquationIcon,
  FractionIcon,
  MCMMCDIcon,
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
    <View className='mx-auto mt-6 flex-row justify-center flex-wrap items-center gap-6'>
      <Card
        title='Angles'
        category='Maths'
        icon={<AngleIcon size={52} color='#6C3483' />}
        route='/(pages)/(maths)/Angles'
      />

      <Card
        title='Average'
        category='Maths'
        icon={<AverageIcon size={52} color='#6C3483' />}
        route='/(pages)/(maths)/Average'
      />
      <Card
        title='Base numeric'
        category='Maths'
        icon={<BaseNumericIcon size={52} color='#6C3483' />}
        route='/(pages)/(maths)/BaseNumeric'
      />

      <Card
        title='Equations'
        category='Maths'
        icon={<EquationIcon size={52} color='#6C3483' />}
        route='/(pages)/(maths)/Equations'
      />

      <Card
        title='Fractions'
        category='Maths'
        icon={<FractionIcon size={52} color='#6C3483' />}
        route='/(pages)/(maths)/Fractions'
      />

      <Card
        title='MCM/MCD'
        category='Maths'
        icon={<MCMMCDIcon size={52} color='#6C3483' />}
        route='/(pages)/(maths)/MCMMCD'
      />

      <Card
        title='Length'
        category='Maths'
        icon={<LengthIcon size={52} color='#6C3483' />}
        route='/(pages)/(maths)/Length'
      />

      <Card
        title='Num Gen'
        category='Maths'
        icon={<NumberGeneratorIcon size={52} color='#6C3483' />}
        route='/(pages)/(maths)/NumberGenerator'
      />

      <Card
        title='Prime Nro'
        category='Maths'
        icon={<PrimeNumberIcon size={52} color='#6C3483' />}
        route='/(pages)/(maths)/PrimeNumber'
      />

      <Card
        title='Probability'
        category='Maths'
        icon={<ProbabilityIcon size={52} color='#6C3483' />}
        route='/(pages)/(maths)/Probability'
      />

      <Card
        title='Roman Nro'
        category='Maths'
        icon={<RomanNumberIcon size={52} color='#6C3483' />}
        route='/(pages)/(maths)/RomanNumber'
      />

      <Card
        title='Shapes'
        category='Maths'
        icon={<ShapeIcon size={52} color='#6C3483' />}
        route='/'
      />

      <Card
        title='Statistics'
        category='Maths'
        icon={<StatisticsIcon size={52} color='#6C3483' />}
        route='/(pages)/(maths)/Statistics'
      />

      <Card
        title='Trigonometry'
        category='Maths'
        icon={<TrigonometryIcon size={52} color='#6C3483' />}
        route='/(pages)/(maths)/Trigonometry'
      />
    </View>
  );
}
