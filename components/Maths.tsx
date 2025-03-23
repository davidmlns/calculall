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
import FilterableCard from './FilterableCard';

export default function Maths() {
  return (
    <View className='mx-auto mt-6 flex-row justify-center flex-wrap items-center gap-6'>
      <FilterableCard
        id='Angles'
        title='Angles'
        category='Maths'
        icon={<AngleIcon size={52} color='#6C3483' />}
        route='/(pages)/(maths)/Angles'
      />

      <FilterableCard
        id='Average'
        title='Average'
        category='Maths'
        icon={<AverageIcon size={52} color='#6C3483' />}
        route='/(pages)/(maths)/Average'
      />
      <FilterableCard
        id='Base numeric'
        title='Base numeric'
        category='Maths'
        icon={<BaseNumericIcon size={52} color='#6C3483' />}
        route='/(pages)/(maths)/BaseNumeric'
      />

      <FilterableCard
        id='Equations'
        title='Equations'
        category='Maths'
        icon={<EquationIcon size={52} color='#6C3483' />}
        route='/(pages)/(maths)/Equations'
      />

      <FilterableCard
        id='Fractions'
        title='Fractions'
        category='Maths'
        icon={<FractionIcon size={52} color='#6C3483' />}
        route='/(pages)/(maths)/Fractions'
      />
      <FilterableCard
        id='Length'
        title='Length'
        category='Maths'
        icon={<LengthIcon size={52} color='#6C3483' />}
        route='/(pages)/(maths)/Length'
      />

      <FilterableCard
        id='MCM/MCD'
        title='MCM/MCD'
        category='Maths'
        icon={<MCMMCDIcon size={52} color='#6C3483' />}
        route='/(pages)/(maths)/MCMMCD'
      />

      <FilterableCard
        id='Num Gen'
        title='Num Gen'
        category='Maths'
        icon={<NumberGeneratorIcon size={52} color='#6C3483' />}
        route='/(pages)/(maths)/NumberGenerator'
      />

      <FilterableCard
        id='Prime Nro'
        title='Prime Nro'
        category='Maths'
        icon={<PrimeNumberIcon size={52} color='#6C3483' />}
        route='/(pages)/(maths)/PrimeNumber'
      />

      <FilterableCard
        id='Probability'
        title='Probability'
        category='Maths'
        icon={<ProbabilityIcon size={52} color='#6C3483' />}
        route='/(pages)/(maths)/Probability'
      />

      <FilterableCard
        id='Roman Nro'
        title='Roman Nro'
        category='Maths'
        icon={<RomanNumberIcon size={52} color='#6C3483' />}
        route='/(pages)/(maths)/RomanNumber'
      />

      <FilterableCard
        id='Shapes'
        title='Shapes'
        category='Maths'
        icon={<ShapeIcon size={52} color='#6C3483' />}
        route='/(pages)/(maths)/Shapes'
      />

      <FilterableCard
        id='Statistics'
        title='Statistics'
        category='Maths'
        icon={<StatisticsIcon size={52} color='#6C3483' />}
        route='/(pages)/(maths)/Statistics'
      />

      <FilterableCard
        id='Trigonometry'
        title='Trigonometry'
        category='Maths'
        icon={<TrigonometryIcon size={52} color='#6C3483' />}
        route='/(pages)/(maths)/Trigonometry'
      />
    </View>
  );
}
