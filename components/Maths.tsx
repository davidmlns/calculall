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
import { useTranslation } from 'react-i18next';

export default function Maths() {
  const { t } = useTranslation();
  return (
    <View className='mx-auto mt-6 flex-row justify-center flex-wrap items-center gap-6'>
      <FilterableCard
        id='Angles'
        title={t('mathematicalCardTitle.Angles')}
        category='Maths'
        icon={<AngleIcon size={52} color='#6C3483' />}
        route='/(pages)/(maths)/Angles'
      />

      <FilterableCard
        id='Average'
        title={t('mathematicalCardTitle.Average')}
        category={t('categoryName.maths')}
        icon={<AverageIcon size={52} color='#6C3483' />}
        route='/(pages)/(maths)/Average'
      />
      <FilterableCard
        id='Base numeric'
        title={t('mathematicalCardTitle.BaseNumeric')}
        category={t('categoryName.maths')}
        icon={<BaseNumericIcon size={52} color='#6C3483' />}
        route='/(pages)/(maths)/BaseNumeric'
      />

      <FilterableCard
        id='Equations'
        title={t('mathematicalCardTitle.Equations')}
        category={t('categoryName.maths')}
        icon={<EquationIcon size={52} color='#6C3483' />}
        route='/(pages)/(maths)/Equations'
      />

      <FilterableCard
        id='Fractions'
        title={t('mathematicalCardTitle.Fractions')}
        category={t('categoryName.maths')}
        icon={<FractionIcon size={52} color='#6C3483' />}
        route='/(pages)/(maths)/Fractions'
      />
      <FilterableCard
        id='Length'
        title={t('mathematicalCardTitle.Length')}
        category={t('categoryName.maths')}
        icon={<LengthIcon size={52} color='#6C3483' />}
        route='/(pages)/(maths)/Length'
      />

      <FilterableCard
        id='MCM/MCD'
        title={t('mathematicalCardTitle.MCM/MCD')}
        category={t('categoryName.maths')}
        icon={<MCMMCDIcon size={52} color='#6C3483' />}
        route='/(pages)/(maths)/MCMMCD'
      />

      <FilterableCard
        id='Num Gen'
        title={t('mathematicalCardTitle.Num Gen')}
        category={t('categoryName.maths')}
        icon={<NumberGeneratorIcon size={52} color='#6C3483' />}
        route='/(pages)/(maths)/NumberGenerator'
      />

      <FilterableCard
        id='Prime Nro'
        title={t('mathematicalCardTitle.Prime Nro')}
        category={t('categoryName.maths')}
        icon={<PrimeNumberIcon size={52} color='#6C3483' />}
        route='/(pages)/(maths)/PrimeNumber'
      />

      <FilterableCard
        id='Probability'
        title={t('mathematicalCardTitle.Probability')}
        category={t('categoryName.maths')}
        icon={<ProbabilityIcon size={52} color='#6C3483' />}
        route='/(pages)/(maths)/Probability'
      />

      <FilterableCard
        id='Roman Nro'
        title={t('mathematicalCardTitle.Roman Nro')}
        category={t('categoryName.maths')}
        icon={<RomanNumberIcon size={52} color='#6C3483' />}
        route='/(pages)/(maths)/RomanNumber'
      />

      <FilterableCard
        id='Shapes'
        title={t('mathematicalCardTitle.Shapes')}
        category={t('categoryName.maths')}
        icon={<ShapeIcon size={52} color='#6C3483' />}
        route='/(pages)/(maths)/Shapes'
      />

      <FilterableCard
        id='Statistics'
        title={t('mathematicalCardTitle.Statistics')}
        category={t('categoryName.maths')}
        icon={<StatisticsIcon size={52} color='#6C3483' />}
        route='/(pages)/(maths)/Statistics'
      />

      <FilterableCard
        id='Trigonometry'
        title={t('mathematicalCardTitle.Trigonometry')}
        category={t('categoryName.maths')}
        icon={<TrigonometryIcon size={52} color='#6C3483' />}
        route='/(pages)/(maths)/Trigonometry'
      />
    </View>
  );
}
