import { View } from 'react-native';
import { icons } from './Icons';
import FilterableCard from './FilterableCard';
import { useTranslation } from 'react-i18next';

export default function Maths() {
  const { t } = useTranslation();
  return (
    <View className='mx-auto mt-6 flex-row justify-center flex-wrap items-center gap-6'>
      <FilterableCard
        id='Angles'
        title={t('mathematicalCardTitle.Angles')}
        category={t('categoryName.maths')}
        icon={icons.AngleIcon}
        iconSize={52}
        iconColor='#6C3483'
        route='/(pages)/(maths)/Angles'
      />

      <FilterableCard
        id='Average'
        title={t('mathematicalCardTitle.Average')}
        category={t('categoryName.maths')}
        icon={icons.AverageIcon}
        iconSize={52}
        iconColor='#6C3483'
        route='/(pages)/(maths)/Average'
      />
      <FilterableCard
        id='Base numeric'
        title={t('mathematicalCardTitle.BaseNumeric')}
        category={t('categoryName.maths')}
        icon={icons.BaseNumericIcon}
        iconSize={52}
        iconColor='#6C3483'
        route='/(pages)/(maths)/BaseNumeric'
      />

      <FilterableCard
        id='Equations'
        title={t('mathematicalCardTitle.Equations')}
        category={t('categoryName.maths')}
        icon={icons.EquationIcon}
        iconSize={52}
        iconColor='#6C3483'
        route='/(pages)/(maths)/Equations'
      />

      <FilterableCard
        id='Fractions'
        title={t('mathematicalCardTitle.Fractions')}
        category={t('categoryName.maths')}
        icon={icons.FractionIcon}
        iconSize={52}
        iconColor='#6C3483'
        route='/(pages)/(maths)/Fractions'
      />
      <FilterableCard
        id='Length'
        title={t('mathematicalCardTitle.Length')}
        category={t('categoryName.maths')}
        icon={icons.LengthIcon}
        iconSize={52}
        iconColor='#6C3483'
        route='/(pages)/(maths)/Length'
      />

      <FilterableCard
        id='MCM/MCD'
        title={t('mathematicalCardTitle.MCM/MCD')}
        category={t('categoryName.maths')}
        icon={icons.MCMMCDIcon}
        iconSize={52}
        iconColor='#6C3483'
        route='/(pages)/(maths)/MCMMCD'
      />

      <FilterableCard
        id='Num Gen'
        title={t('mathematicalCardTitle.Num Gen')}
        category={t('categoryName.maths')}
        icon={icons.NumberGeneratorIcon}
        iconSize={52}
        iconColor='#6C3483'
        route='/(pages)/(maths)/NumberGenerator'
      />

      <FilterableCard
        id='Prime Nro'
        title={t('mathematicalCardTitle.Prime Nro')}
        category={t('categoryName.maths')}
        icon={icons.PrimeNumberIcon}
        iconSize={52}
        iconColor='#6C3483'
        route='/(pages)/(maths)/PrimeNumber'
      />

      <FilterableCard
        id='Probability'
        title={t('mathematicalCardTitle.Probability')}
        category={t('categoryName.maths')}
        icon={icons.ProbabilityIcon}
        iconSize={52}
        iconColor='#6C3483'
        route='/(pages)/(maths)/Probability'
      />

      <FilterableCard
        id='Roman Nro'
        title={t('mathematicalCardTitle.Roman Nro')}
        category={t('categoryName.maths')}
        icon={icons.RomanNumberIcon}
        iconSize={52}
        iconColor='#6C3483'
        route='/(pages)/(maths)/RomanNumber'
      />

      <FilterableCard
        id='Shapes'
        title={t('mathematicalCardTitle.Shapes')}
        category={t('categoryName.maths')}
        icon={icons.ShapeIcon}
        iconSize={52}
        iconColor='#6C3483'
        route='/(pages)/(maths)/Shapes'
      />

      <FilterableCard
        id='Statistics'
        title={t('mathematicalCardTitle.Statistics')}
        category={t('categoryName.maths')}
        icon={icons.StatisticsIcon}
        iconSize={52}
        iconColor='#6C3483'
        route='/(pages)/(maths)/Statistics'
      />

      <FilterableCard
        id='Trigonometry'
        title={t('mathematicalCardTitle.Trigonometry')}
        category={t('categoryName.maths')}
        icon={icons.TrigonometryIcon}
        iconSize={52}
        iconColor='#6C3483'
        route='/(pages)/(maths)/Trigonometry'
      />
    </View>
  );
}
