import { View } from 'react-native';
import { icons } from './Icons';
import FilterableCard from './FilterableCard';
import { useTranslation } from 'react-i18next';

export default function Maths() {
  const { t } = useTranslation();
  return (
    <View className='mx-auto mt-4 flex-row justify-center flex-wrap items-center gap-6'>
      <FilterableCard
        id='Angles'
        title={t('mathematicalCardTitle.Angles')}
        icon={icons.AngleIcon}
        iconSize={56}
        iconColor='#6C3483'
        route='/(pages)/(maths)/Angles'
      />

      <FilterableCard
        id='Average'
        title={t('mathematicalCardTitle.Average')}
        icon={icons.AverageIcon}
        iconSize={56}
        iconColor='#6C3483'
        route='/(pages)/(maths)/Average'
      />
      <FilterableCard
        id='Base numeric'
        title={t('mathematicalCardTitle.BaseNumeric')}
        icon={icons.BaseNumericIcon}
        iconSize={56}
        iconColor='#6C3483'
        route='/(pages)/(maths)/BaseNumeric'
      />

      <FilterableCard
        id='Equations'
        title={t('mathematicalCardTitle.Equations')}
        icon={icons.EquationIcon}
        iconSize={56}
        iconColor='#6C3483'
        route='/(pages)/(maths)/Equations'
      />

      <FilterableCard
        id='Fractions'
        title={t('mathematicalCardTitle.Fractions')}
        icon={icons.FractionIcon}
        iconSize={56}
        iconColor='#6C3483'
        route='/(pages)/(maths)/Fractions'
      />
      <FilterableCard
        id='Length'
        title={t('mathematicalCardTitle.Length')}
        icon={icons.LengthIcon}
        iconSize={56}
        iconColor='#6C3483'
        route='/(pages)/(maths)/Length'
      />

      <FilterableCard
        id='MCM/MCD'
        title={t('mathematicalCardTitle.MCM/MCD')}
        icon={icons.MCMMCDIcon}
        iconSize={56}
        iconColor='#6C3483'
        route='/(pages)/(maths)/MCMMCD'
      />

      <FilterableCard
        id='Num Gen'
        title={t('mathematicalCardTitle.Num Gen')}
        icon={icons.NumberGeneratorIcon}
        iconSize={56}
        iconColor='#6C3483'
        route='/(pages)/(maths)/NumberGenerator'
      />

      <FilterableCard
        id='Prime Nro'
        title={t('mathematicalCardTitle.Prime Nro')}
        icon={icons.PrimeNumberIcon}
        iconSize={56}
        iconColor='#6C3483'
        route='/(pages)/(maths)/PrimeNumber'
      />

      <FilterableCard
        id='Probability'
        title={t('mathematicalCardTitle.Probability')}
        icon={icons.ProbabilityIcon}
        iconSize={56}
        iconColor='#6C3483'
        route='/(pages)/(maths)/Probability'
      />

      <FilterableCard
        id='Roman Nro'
        title={t('mathematicalCardTitle.Roman Nro')}
        icon={icons.RomanNumberIcon}
        iconSize={56}
        iconColor='#6C3483'
        route='/(pages)/(maths)/RomanNumber'
      />

      <FilterableCard
        id='Shapes'
        title={t('mathematicalCardTitle.Shapes')}
        icon={icons.ShapeIcon}
        iconSize={56}
        iconColor='#6C3483'
        route='/(pages)/(maths)/Shapes'
      />

      <FilterableCard
        id='Statistics'
        title={t('mathematicalCardTitle.Statistics')}
        icon={icons.StatisticsIcon}
        iconSize={56}
        iconColor='#6C3483'
        route='/(pages)/(maths)/Statistics'
      />

      <FilterableCard
        id='Trigonometry'
        title={t('mathematicalCardTitle.Trigonometry')}
        icon={icons.TrigonometryIcon}
        iconSize={56}
        iconColor='#6C3483'
        route='/(pages)/(maths)/Trigonometry'
      />
    </View>
  );
}
